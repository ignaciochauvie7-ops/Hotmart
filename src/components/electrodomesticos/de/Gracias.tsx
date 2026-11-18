import { useEffect } from 'react';
import { BASE_PATH, CURRENCY, texts as t } from '../../../config/electrodomesticos-de';
import { trackPurchaseOnce } from '../../../lib/electrodomesticos/purchase';

interface Download {
  key: string;
  label: string;
  url: string;
}

interface Props {
  /** Pago confirmado en el servidor con Dodo. */
  verified: boolean;
  /** Algún pago sigue procesándose: la página se recarga sola unas veces. */
  pending: boolean;
  /** Un botón por cada PDF comprado. */
  downloads: Download[];
  /** Id del pago del upsell, solo si está confirmado (para el pixel). */
  upsellPaymentId: string;
  upsellValue: number;
}

const MAX_RELOADS = 5;

export function Gracias({ verified, pending, downloads, upsellPaymentId, upsellValue }: Props) {
  // Purchase del upsell: solo con pago confirmado y una vez por pago.
  useEffect(() => {
    if (upsellPaymentId) trackPurchaseOnce(upsellPaymentId, upsellValue, 'reparador_pro_upsell', CURRENCY);
  }, [upsellPaymentId, upsellValue]);

  // Cobro aún en curso: se vuelve a consultar a Dodo recargando la página.
  useEffect(() => {
    if (!pending) return;
    const key = `rp_reload_${window.location.search}`;
    let n = 0;
    try {
      n = Number(window.sessionStorage.getItem(key) ?? '0');
    } catch {
      return;
    }
    if (n >= MAX_RELOADS) return;
    const id = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem(key, String(n + 1));
      } catch {
        return;
      }
      window.location.reload();
    }, 4000);
    return () => window.clearTimeout(id);
  }, [pending]);

  if (!verified) {
    return (
      <main className="rp-simple rp-thanks">
        <h1>{pending ? t.thanks.pendingTitle : t.thanks.notPaidTitle}</h1>
        {pending ? (
          <span className="rp-spin rp-thanks__spin" aria-hidden="true" />
        ) : (
          <a className="rp-btn" href={`${BASE_PATH}/oferta#oferta`}>
            {t.thanks.notPaidBack}
          </a>
        )}
      </main>
    );
  }

  return (
    <main className="rp-simple rp-thanks">
      <div className="rp-badge" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m5 12 5 5 9-10" />
        </svg>
      </div>
      <h1>{t.thanks.title}</h1>
      <ul className="rp-downloads">
        {downloads.map((d) => (
          <li key={d.key}>
            <a className="rp-btn rp-download" href={d.url} download>
              <span>{d.label}</span>
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 4v11" />
                <path d="m7 11 5 5 5-5" />
                <path d="M5 20h14" />
              </svg>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
