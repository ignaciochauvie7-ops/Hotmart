import { useEffect, useState } from 'react';
import { getDict, money, type MenoLocale } from '../../config/menopausia/i18n';
import { getPricing } from '../../config/menopausia/products';
import { getCovers } from '../../config/menopausia/covers';
import { getCookie, track } from '../../lib/menopausia/pixel';

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
  /** false en `es` (el upsell va en la landing) o si ya se compró. */
  showUpsell?: boolean;
}

export function Gracias({ locale, paid, value, currency, eventId, email, downloads = [], showUpsell = true }: Props) {
  const dict = getDict(locale);
  const g = dict.gracias;
  const pr = getPricing(locale);
  const upsellPrice = money(pr.upsell, dict.numberLocale, pr.currency);
  const upsellCover = getCovers(locale).upsell;
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
    <div className="m-shell m-gracias">
      {/* Descarga arriba, con los enlaces firmados. Nunca depende del upsell. */}
      <Downloads title={dict.downloads.title} note={dict.downloads.note} links={downloads} />

      {/* Única tarjeta de upsell — no bloquea ni retrasa la descarga.
          En `es` no se muestra: el upsell ya se ofreció en la landing. */}
      {showUpsell && (
      <section className="m-card m-upsell">
        {upsellCover && (
          <img
            className="m-upsell__cover"
            src={upsellCover.src480}
            srcSet={`${upsellCover.src480} 480w, ${upsellCover.src960} 960w`}
            sizes="140px"
            width={upsellCover.width}
            height={upsellCover.height}
            alt={upsellCover.alt}
            loading="lazy"
            decoding="async"
          />
        )}
        <h2 className="m-upsell__name">{g.upsellTitle}</h2>
        <p className="m-upsell__line">{g.upsellBody.replace('{price}', upsellPrice)}</p>
        <div className="m-upsell__price">{upsellPrice}</div>
        <button className="m-btn" onClick={addUpsell} disabled={loading}>
          {loading ? <span className="m-spin" /> : g.yes}
        </button>
        <a className="m-btn m-btn--ghost m-upsell__no" href={`/menopausia/${locale}/listo`}>{g.no}</a>
      </section>
      )}
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
    <section className="m-card m-downloads">
      <h2 className="m-downloads__title">{title}</h2>
      <div className="m-downloads__list">
        {links.map((l) => (
          <a key={l.file} className="m-btn m-dl-btn" href={l.url}>
            <DownloadIcon /> {l.file.replace(/\.pdf$/i, '')}
          </a>
        ))}
      </div>
      <p className="m-muted m-downloads__note">{note}</p>
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
