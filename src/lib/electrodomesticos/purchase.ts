import { track } from '../menopausia/pixel';
import { CURRENCY } from '../../config/electrodomesticos';

/**
 * Dispara Purchase una sola vez por pago: event_id = payment_id (dedup con la
 * Conversions API) y marca en localStorage para no repetirlo al recargar.
 */
export function trackPurchaseOnce(paymentId: string, value: number, contentName: string): void {
  if (!paymentId) return;
  const key = `rp_purchase_${paymentId}`;
  try {
    if (window.localStorage.getItem(key)) return;
    window.localStorage.setItem(key, '1');
  } catch {
    /* sin storage: el event_id sigue deduplicando en Meta */
  }
  track('Purchase', { value, currency: CURRENCY, content_name: contentName }, paymentId);
}
