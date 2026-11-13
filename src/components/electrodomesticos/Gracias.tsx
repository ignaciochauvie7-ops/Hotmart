import { useEffect } from 'react';
import { texts as t } from '../../config/electrodomesticos';
import { trackPurchaseOnce } from '../../lib/electrodomesticos/purchase';

interface Props {
  /** Vuelve del checkout del upsell. */
  fromUpsell: boolean;
  /** Pago del upsell verificado en el servidor con Dodo. */
  upsellPaid: boolean;
  /** Cobro del upsell todavía en curso. */
  upsellPending?: boolean;
  value: number;
  paymentId: string;
}

export function Gracias({ fromUpsell, upsellPaid, upsellPending = false, value, paymentId }: Props) {
  // Purchase del upsell: solo con pago confirmado y una vez por pago.
  useEffect(() => {
    if (upsellPaid) trackPurchaseOnce(paymentId, value, 'reparador_pro_upsell');
  }, [upsellPaid, paymentId, value]);

  return (
    <main className="rp-simple">
      <div className="rp-badge" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m5 12 5 5 9-10" />
        </svg>
      </div>
      <h1>{t.thanks.title}</h1>
      <p>{t.thanks.body}</p>
      {upsellPaid && <p className="rp-ok">{t.thanks.upsellPaid}</p>}
      {upsellPending && <p className="rp-muted">{t.thanks.upsellPending}</p>}
      {fromUpsell && !upsellPaid && !upsellPending && <p className="rp-muted">{t.thanks.upsellFailed}</p>}
    </main>
  );
}
