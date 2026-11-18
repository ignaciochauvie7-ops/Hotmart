import { useEffect, useState } from 'react';
import { BASE_PATH, CURRENCY, DODO_PRODUCT_UPSELL, PRICE_UPSELL, fill, texts as t } from '../../../config/electrodomesticos-de';
import { getCookie, track } from '../../../lib/menopausia/pixel';
import { trackPurchaseOnce } from '../../../lib/electrodomesticos/purchase';
import { Img } from '../Img';

interface Props {
  /** Pago principal verificado en el servidor con Dodo. */
  paid: boolean;
  /** Importe real cobrado (19,90 o 27,80 con bump). */
  value: number;
  paymentId: string;
  email?: string;
  images: string[] | null;
}

const DEV = import.meta.env.DEV;

export function Upsell({ paid, value, paymentId, email, images }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const available = !!DODO_PRODUCT_UPSELL;
  // /gracias necesita el id del pago para mostrar las descargas.
  const thanksUrl = `${BASE_PATH}/gracias${paymentId ? `?payment_id=${encodeURIComponent(paymentId)}` : ''}`;

  // Purchase del producto principal: solo con pago confirmado y una vez por pago.
  useEffect(() => {
    if (paid) trackPurchaseOnce(paymentId, value, 'reparador_pro_main', CURRENCY);
  }, [paid, paymentId, value]);

  // Sin upsell configurado en producción: directo a la página de gracias.
  useEffect(() => {
    if (paid && !available && !DEV) window.location.replace(thanksUrl);
  }, [paid, available, thanksUrl]);

  if (!paid) {
    return (
      <main className="rp-simple">
        <h1>{t.upsell.notPaidTitle}</h1>
        <p>{t.upsell.notPaidBody}</p>
        <a className="rp-btn" href={`${BASE_PATH}/oferta#oferta`}>
          {t.upsell.notPaidBack}
        </a>
      </main>
    );
  }

  async function accept() {
    if (!available || loading) return;
    setError('');
    setLoading(true);
    track('InitiateCheckout', { value: PRICE_UPSELL, currency: CURRENCY, content_name: 'reparador_pro_upsell' });
    try {
      const res = await fetch('/api/electrodomesticos/de/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind: 'upsell', email, mainPaymentId: paymentId, fbp: getCookie('_fbp'), fbc: getCookie('_fbc') }),
      });
      const data = await res.json();
      if (res.ok && data.checkout_url) {
        window.location.href = data.checkout_url;
        return;
      }
      setError(t.offer.error);
    } catch {
      setError(t.offer.error);
    }
    setLoading(false);
  }

  return (
    <main className="rp-simple rp-upsell">
      <p className="rp-ok">{t.upsell.confirmed}</p>
      <h1>{t.upsell.title}</h1>
      <div className="rp-card">
        <Img file="upsell.webp" w={1000} h={800} alt={t.upsell.imageAlt} available={images} eager optional />
        <h2>{t.upsell.product}</h2>
        <p className="rp-muted">{t.upsell.subtitle}</p>
        <ul className="rp-list rp-list--benefit">
          {t.upsell.bullets.map((b) => (
            <li key={b}>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m5 12 5 5 9-10" />
              </svg>
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <button className="rp-btn rp-btn--buy" onClick={accept} disabled={!available || loading}>
          {loading ? <span className="rp-spin" aria-label={t.offer.loading} /> : fill(t.upsell.yes)}
        </button>
        {!available && <p className="rp-devnote">Checkout deshabilitado: falta DODO_PRODUCT_UPSELL en src/config/electrodomesticos-de.ts</p>}
        {error && (
          <p className="rp-error" role="alert">
            {error}
          </p>
        )}
        <p className="rp-under">{fill(t.upsell.under)}</p>
        <a className="rp-no" href={thanksUrl}>
          {t.upsell.no}
        </a>
      </div>
    </main>
  );
}
