import type DodoPayments from 'dodopayments';
import { paymentIsPaid, paymentProductIds, retrievePayment, siteUrl } from '../menopausia/dodo';

/**
 * Cobro en un clic tras la compra principal (raspa y gana + 3 extras).
 * Docs: https://docs.dodopayments.com/features/upsells-and-downsells
 *
 * Se cobra a la tarjeta guardada del pago principal (checkout session con
 * `customer_id` + `payment_method_id` + `confirm: true`), sin pedir datos ni
 * abrir ningún checkout. Todo se verifica aquí, en el servidor:
 *   · el pago principal tiene que estar confirmado y ser de este embudo;
 *   · nunca se cobra un producto que el cliente ya tiene (o que se está cobrando).
 * La entrega del PDF sale sola: /gracias lista los pagos confirmados del cliente
 * y muestra el botón de cada producto pagado (igual que el producto principal).
 */

export type ChargeItem = 'upsell' | 'extra1' | 'extra2' | 'extra3';
const ITEMS: ChargeItem[] = ['upsell', 'extra1', 'extra2', 'extra3'];

export interface OneClickConfig {
  funnel: string;
  currency: string;
  language: string;
  basePath: string;
  /** Producto de Dodo de cada elemento cobrable (vacío = no disponible). */
  products: Record<ChargeItem, string>;
}

export type ChargeResult =
  | { status: 'succeeded' | 'processing'; paymentId: string; charged: ChargeItem[] }
  | { status: 'owned'; charged: [] }
  | { status: 'failed'; error: string };

function isPaymentId(id: unknown): id is string {
  return typeof id === 'string' && /^pay_[A-Za-z0-9]{6,64}$/.test(id);
}

/** Estados que NO cuentan como «ya comprado» (el cobro no se hizo). */
const DEAD = new Set(['failed', 'cancelled', 'requires_payment_method']);

// Bloqueo en memoria contra dobles clics simultáneos en la misma instancia.
const inFlight = new Map<string, number>();
const LOCK_MS = 60_000;

async function ownedProducts(client: DodoPayments, cfg: OneClickConfig, customerId: string): Promise<Set<string>> {
  const owned = new Set<string>();
  let n = 0;
  for await (const item of (client as any).payments.list({ customer_id: customerId, page_size: 100 })) {
    if (++n > 300) break;
    if (item?.metadata?.funnel !== cfg.funnel) continue;
    if (DEAD.has(String(item?.status ?? '').toLowerCase())) continue;
    if (String(item?.refund_status ?? '').toLowerCase() === 'full') continue;
    let ids = paymentProductIds(item);
    if (ids.length === 0 && isPaymentId(item?.payment_id)) ids = paymentProductIds(await retrievePayment(client, item.payment_id));
    for (const id of ids) owned.add(id);
  }
  return owned;
}

async function savedPaymentMethod(client: DodoPayments, main: any): Promise<string> {
  if (typeof main?.payment_method_id === 'string' && main.payment_method_id) return main.payment_method_id;
  try {
    const r = await (client as any).customers.retrievePaymentMethods(main.customer.customer_id);
    const items: any[] = Array.isArray(r?.items) ? r.items : [];
    items.sort((a, b) => String(b?.last_used_at ?? '').localeCompare(String(a?.last_used_at ?? '')));
    return items[0]?.payment_method_id ?? '';
  } catch (err) {
    console.error('[electrodomesticos] no se pudieron leer los medios de pago guardados', err);
    return '';
  }
}

export async function chargeOneClick(
  client: DodoPayments,
  cfg: OneClickConfig,
  requestUrl: string,
  mainPaymentId: unknown,
  rawItems: unknown,
): Promise<ChargeResult> {
  if (!isPaymentId(mainPaymentId)) return { status: 'failed', error: 'bad_payment' };
  const wanted = [...new Set(Array.isArray(rawItems) ? rawItems : [])].filter((i): i is ChargeItem =>
    ITEMS.includes(i as ChargeItem),
  );
  // El upsell se cobra solo; los extras, juntos en un único cobro.
  const kind = wanted.includes('upsell') ? 'upsell' : 'extras';
  const items = kind === 'upsell' ? (['upsell'] as ChargeItem[]) : wanted;
  if (items.length === 0 || items.some((i) => !cfg.products[i])) return { status: 'failed', error: 'bad_items' };

  // 1 · Pago principal confirmado, de este embudo, con cliente.
  const main = await retrievePayment(client, mainPaymentId);
  if (!main || main?.metadata?.funnel !== cfg.funnel || main?.metadata?.kind !== 'main' || !paymentIsPaid(main)) {
    return { status: 'failed', error: 'not_paid' };
  }
  if (String(main?.refund_status ?? '').toLowerCase() === 'full') return { status: 'failed', error: 'not_paid' };
  const customerId = main?.customer?.customer_id;
  if (typeof customerId !== 'string' || !customerId) return { status: 'failed', error: 'no_customer' };

  const lockKey = `${mainPaymentId}:${kind}`;
  const since = inFlight.get(lockKey);
  if (since && Date.now() - since < LOCK_MS) return { status: 'failed', error: 'in_progress' };
  inFlight.set(lockKey, Date.now());

  try {
    // 2 · Nunca cobrar dos veces el mismo producto.
    const owned = await ownedProducts(client, cfg, customerId);
    const toCharge = items.filter((i) => !owned.has(cfg.products[i]));
    if (toCharge.length === 0) return { status: 'owned', charged: [] };

    // 3 · Tarjeta guardada del pago principal.
    const paymentMethodId = await savedPaymentMethod(client, main);
    if (!paymentMethodId) return { status: 'failed', error: 'no_payment_method' };

    const b = main?.billing ?? {};
    const billing: Record<string, string> = {};
    for (const k of ['country', 'state', 'city', 'street', 'zipcode']) {
      if (typeof b[k] === 'string' && b[k]) billing[k] = b[k];
    }

    const base = `${siteUrl(requestUrl)}${cfg.basePath}`;
    const payload: Record<string, unknown> = {
      product_cart: toCharge.map((i) => ({ product_id: cfg.products[i], quantity: 1 })),
      customer: { customer_id: customerId },
      payment_method_id: paymentMethodId,
      confirm: true,
      billing_currency: cfg.currency,
      minimal_address: true,
      return_url: `${base}/gracias?payment_id=${mainPaymentId}`,
      metadata: { funnel: cfg.funnel, kind, main: mainPaymentId, items: toCharge.join(',') },
      force_language: cfg.language,
    };
    if (billing.country) payload.billing_address = billing;

    let session: any;
    try {
      session = await (client as any).checkoutSessions.create(payload);
    } catch (err) {
      console.error('[electrodomesticos] cobro en un clic rechazado', err);
      return { status: 'failed', error: 'charge_failed' };
    }
    const paymentId = session?.payment_id;
    if (!isPaymentId(paymentId)) return { status: 'failed', error: 'charge_failed' };

    // 4 · Esperar unos segundos el resultado (si sigue en curso, /gracias lo reconsulta).
    for (let i = 0; i < 8; i++) {
      const p = await retrievePayment(client, paymentId);
      const st = String(p?.status ?? '').toLowerCase();
      if (paymentIsPaid(p)) return { status: 'succeeded', paymentId, charged: toCharge };
      if (DEAD.has(st)) return { status: 'failed', error: 'declined' };
      await new Promise((r) => setTimeout(r, 1000));
    }
    return { status: 'processing', paymentId, charged: toCharge };
  } finally {
    inFlight.delete(lockKey);
  }
}
