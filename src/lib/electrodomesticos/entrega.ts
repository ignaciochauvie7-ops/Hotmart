import path from 'node:path';
import type DodoPayments from 'dodopayments';
import { deliveryFiles, PRODUCT_BY_BUCKET, type DeliveryFile } from '../../config/electrodomesticos-entrega';
import { paymentIsPaid, paymentProductIds, retrievePayment } from '../menopausia/dodo';

export const FUNNEL = 'electrodomesticos';

/** Formato de un id de pago de Dodo (lo único que se acepta desde la URL). */
export function isPaymentId(id: string): boolean {
  return /^pay_[A-Za-z0-9]{6,64}$/.test(id);
}

/** Pago de este embudo, confirmado y no devuelto por completo. */
export function grantsAccess(payment: any): boolean {
  if (!payment || payment?.metadata?.funnel !== FUNNEL) return false;
  if (!paymentIsPaid(payment)) return false;
  return String(payment?.refund_status ?? '').toLowerCase() !== 'full';
}

/** Archivos que cubre un pago, según los productos de Dodo de su carrito. */
export function filesOfPayment(payment: any): DeliveryFile[] {
  const ids = paymentProductIds(payment);
  return deliveryFiles.filter((f) => {
    const productId = PRODUCT_BY_BUCKET[f.bucket];
    return !!productId && ids.includes(productId);
  });
}

export function fileByKey(key: string): DeliveryFile | undefined {
  return deliveryFiles.find((f) => f.key === key);
}

/** Ruta absoluta del PDF (fuera de /public). */
export function filePath(file: DeliveryFile): string {
  return path.join(process.cwd(), 'private', 'electrodomesticos', path.basename(file.file));
}

export function downloadUrl(paymentId: string, key: string): string {
  return `/api/electrodomesticos/descarga?p=${encodeURIComponent(paymentId)}&f=${encodeURIComponent(key)}`;
}

export interface DownloadButton {
  key: string;
  label: string;
  url: string;
}

export interface Purchases {
  /** Hay al menos un pago confirmado que identifica al comprador. */
  verified: boolean;
  /** Algún pago de la URL sigue procesándose. */
  pending: boolean;
  /** Un botón por cada PDF comprado (todas las compras pagadas del comprador). */
  downloads: DownloadButton[];
  /** Pagos consultados desde la URL, por id (para el pixel). */
  seen: Record<string, any>;
}

/**
 * Compras del comprador a partir de los ids de pago de la URL.
 *
 * 1. Cada id se consulta en Dodo. Solo un pago CONFIRMADO de este embudo
 *    identifica al comprador (un pago fallido o en curso no da acceso a nada).
 * 2. Con el cliente de ese pago (su email) se listan todos sus pagos
 *    confirmados, para mostrar siempre todo lo comprado y no solo lo último.
 */
export async function loadPurchases(client: DodoPayments, paymentIds: string[]): Promise<Purchases> {
  const ids = [...new Set(paymentIds.filter(isPaymentId))];
  const seen: Record<string, any> = {};
  for (const id of ids) {
    const p = await retrievePayment(client, id);
    if (p) seen[id] = p;
  }

  const fromUrl = Object.values(seen);
  const pending = fromUrl.some(
    (p) => p?.metadata?.funnel === FUNNEL && String(p?.status ?? '').toLowerCase() === 'processing',
  );
  const anchors = fromUrl.filter(grantsAccess);
  if (anchors.length === 0) return { verified: false, pending, downloads: [], seen };

  // Todos los pagos confirmados del mismo comprador (mismo cliente = mismo email).
  const paid = new Map<string, any>();
  for (const a of anchors) paid.set(a.payment_id, a);

  const customers = new Map<string, string>();
  for (const a of anchors) {
    const customerId = a?.customer?.customer_id;
    if (typeof customerId === 'string' && customerId) {
      customers.set(customerId, String(a?.customer?.email ?? '').toLowerCase());
    }
  }

  for (const [customerId, email] of customers) {
    try {
      let n = 0;
      for await (const p of (client as any).payments.list({ customer_id: customerId, status: 'succeeded', page_size: 100 })) {
        if (++n > 300) break;
        const sameEmail = String(p?.customer?.email ?? '').toLowerCase() === email;
        if (sameEmail && grantsAccess({ status: 'succeeded', ...p }) && !paid.has(p.payment_id)) {
          paid.set(p.payment_id, p);
        }
      }
    } catch (err) {
      // Si el listado falla se muestran al menos los pagos verificados de la URL.
      console.error('[electrodomesticos] no se pudieron listar los pagos del cliente', err);
    }
  }

  const owner = new Map<string, string>(); // key del archivo → payment_id que lo cubre
  for (const p of paid.values()) {
    for (const f of filesOfPayment(p)) if (!owner.has(f.key)) owner.set(f.key, p.payment_id);
  }

  const downloads = deliveryFiles
    .filter((f) => owner.has(f.key))
    .map((f) => ({ key: f.key, label: f.label, url: downloadUrl(owner.get(f.key)!, f.key) }));

  return { verified: true, pending, downloads, seen };
}
