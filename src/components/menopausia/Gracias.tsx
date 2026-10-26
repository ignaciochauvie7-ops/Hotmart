import { useEffect, useState } from 'react';
import { getDict, money, type MenoLocale } from '../../config/menopausia/i18n';
import { prices } from '../../config/menopausia/products';
import { getCookie, track } from '../../lib/menopausia/pixel';
import { Check } from './quiz/icons';

interface Props {
  locale: MenoLocale;
  paid: boolean;
  value: number;
  currency: string;
  eventId: string;
  email?: string;
}

export function Gracias({ locale, paid, value, currency, eventId, email }: Props) {
  const dict = getDict(locale);
  const g = dict.gracias;
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
      <p className="m-chip" style={{ marginBottom: '1rem' }}>{g.upsellTag}</p>
      <h1 className="m-q">{g.upsellTitle}</h1>
      <p style={{ marginBottom: '1.25rem' }}>
        {g.upsellBody.replace('{price}', money(prices.upsell, dict.numberLocale))}
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
          <div className="m-price-now">{money(prices.upsell, dict.numberLocale)}</div>
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
