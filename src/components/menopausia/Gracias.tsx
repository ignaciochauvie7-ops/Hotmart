import { useEffect, useState } from 'react';
import { getDict, money, type MenoLocale } from '../../config/menopausia/i18n';
import { getPricing } from '../../config/menopausia/products';
import { getCookie, track } from '../../lib/menopausia/pixel';
import { Check } from './quiz/icons';

interface DownloadLink {
  file: string;
  url: string;
}

interface Props {
  locale: MenoLocale;
  paid: boolean;
  value: number;
  currency: string;
  eventId: string;
  email?: string;
  downloads?: DownloadLink[];
}

export function Gracias({ locale, paid, value, currency, eventId, email, downloads = [] }: Props) {
  const dict = getDict(locale);
  const g = dict.gracias;
  const pr = getPricing(locale);
  const upsellPrice = money(pr.upsell, dict.numberLocale, pr.currency);
  const [loading, setLoading] = useState(false);

  // Verified Purchase — fire the Pixel event with event_id = payment_id (dedup).
  useEffect(() => {
    if (paid && eventId) {
      track('Purchase', { value, currency, content_name: 'menopausia_main' }, eventId);
    }
  }, [paid, eventId, value, currency]);

  if (!paid) {
    return (
      <div className="m-shell m-center" style={{ paddingTop: '3rem' }}>
        <h1 className="m-q">{g.notPaidTitle}</h1>
        <p className="m-muted">{g.notPaidBody}</p>
      </div>
    );
  }

  async function addUpsell() {
    setLoading(true);
    try {
      const res = await fetch('/api/menopausia/upsell', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locale, email, fbp: getCookie('_fbp'), fbc: getCookie('_fbc') }),
      });
      const data = await res.json();
      if (res.ok && data.checkout_url) {
        window.location.href = data.checkout_url;
        return;
      }
    } catch {
      /* fall through to listo */
    }
    window.location.href = `/menopausia/${locale}/listo`;
  }

  return (
    <div className="m-shell">
      <Downloads title={dict.downloads.title} note={dict.downloads.note} links={downloads} />

      <p className="m-chip" style={{ marginBottom: '1rem' }}>{g.upsellTag}</p>
      <h1 className="m-q">{g.upsellTitle}</h1>
      <p style={{ marginBottom: '1.25rem' }}>
        {g.upsellBody.replace('{price}', upsellPrice)}
      </p>

      <div className="m-card">
        <div className="m-value-list">
          {g.upsellIncludes.map((item, i) => (
            <div key={i} className="m-value-item">
              <Check className="m-value-item__check" />
              <span>{item}</span>
            </div>
          ))}
        </div>
        <div className="m-price-block" style={{ marginTop: '1.25rem' }}>
          <div className="m-price-now">{upsellPrice}</div>
          <span className="m-badge-off">{g.upsellPriceLabel}</span>
        </div>
      </div>

      <button className="m-btn" style={{ marginTop: '1.5rem' }} onClick={addUpsell} disabled={loading}>
        {loading ? <span className="m-spin" /> : g.yes}
      </button>
      <a className="m-btn m-btn--ghost" href={`/menopausia/${locale}/listo`}>{g.no}</a>
    </div>
  );
}

interface DlProps {
  title: string;
  note: string;
  links: DownloadLink[];
}

export function Downloads({ title, note, links }: DlProps) {
  if (links.length === 0) return null;
  return (
    <section className="m-card" style={{ marginBottom: '1.75rem' }}>
      <h2 style={{ fontSize: '1.3rem', marginBottom: '0.9rem' }}>{title}</h2>
      <div className="m-value-list">
        {links.map((l) => (
          <a key={l.file} className="m-btn m-btn--ghost" href={l.url}
            style={{ justifyContent: 'flex-start', textDecoration: 'none', border: '1.5px solid var(--line)', borderRadius: 14 }}>
            <DownloadIcon /> {l.file.replace(/\.pdf$/i, '')}
          </a>
        ))}
      </div>
      <p className="m-muted" style={{ fontSize: '0.85rem', marginTop: '0.75rem' }}>{note}</p>
    </section>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none' }} aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="M7 10l5 5 5-5" />
      <path d="M12 15V3" />
    </svg>
  );
}
