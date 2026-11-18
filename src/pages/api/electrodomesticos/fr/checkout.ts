import type { APIRoute } from 'astro';
import {
  BASE_PATH,
  CURRENCY,
  DODO_PRODUCT_BUMP,
  DODO_PRODUCT_MAIN,
  DODO_PRODUCT_UPSELL,
} from '../../../../config/electrodomesticos-fr';
import { getDodoClient, siteUrl } from '../../../../lib/menopausia/dodo';
import { isPaymentId } from '../../../../lib/electrodomesticos/fr/entrega';

export const prerender = false;

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });

// Crea la sesión de checkout de Dodo (misma cuenta y cliente que menopausia).
//   kind 'main'   → DODO_PRODUCT_MAIN (+ DODO_PRODUCT_BUMP si bump) → /gracias-oferta
//   kind 'upsell' → DODO_PRODUCT_UPSELL → /gracias?upsell=1&main=<pago principal>
// (Dodo añade ?payment_id=…&status=… al volver.)
export const POST: APIRoute = async ({ request }) => {
  let body: { kind?: string; bump?: boolean; email?: string; fbp?: string; fbc?: string; mainPaymentId?: string };
  try {
    body = await request.json();
  } catch {
    return json({ error: 'bad_request' }, 400);
  }

  const kind = body.kind === 'upsell' ? 'upsell' : 'main';
  const bump = kind === 'main' && !!body.bump;

  const cart: { product_id: string; quantity: number }[] = [];
  if (kind === 'main') {
    if (!DODO_PRODUCT_MAIN) return json({ error: 'products_not_configured' }, 503);
    cart.push({ product_id: DODO_PRODUCT_MAIN, quantity: 1 });
    if (bump) {
      // Nunca cobrar un carrito distinto del que el comprador ha visto.
      if (!DODO_PRODUCT_BUMP) return json({ error: 'products_not_configured' }, 503);
      cart.push({ product_id: DODO_PRODUCT_BUMP, quantity: 1 });
    }
  } else {
    if (!DODO_PRODUCT_UPSELL) return json({ error: 'products_not_configured' }, 503);
    cart.push({ product_id: DODO_PRODUCT_UPSELL, quantity: 1 });
  }

  const client = getDodoClient();
  if (!client) return json({ error: 'dodo_not_configured' }, 503);

  const metadata: Record<string, string> = { funnel: 'electrodomesticos-fr', kind, bump: String(bump) };
  if (body.fbp) metadata.fbp = body.fbp;
  if (body.fbc) metadata.fbc = body.fbc;

  const base = `${siteUrl(request.url)}${BASE_PATH}`;
  // El upsell vuelve a /gracias con el id del pago principal, para que la página
  // muestre la compra principal aunque el pago del upsell falle.
  const mainId = typeof body.mainPaymentId === 'string' && isPaymentId(body.mainPaymentId) ? body.mainPaymentId : '';
  const upsellReturn = `${base}/gracias?upsell=1${mainId ? `&main=${mainId}` : ''}`;
  const payload: Record<string, unknown> = {
    product_cart: cart,
    billing_currency: CURRENCY,
    return_url: kind === 'main' ? `${base}/gracias-oferta` : upsellReturn,
    metadata,
    force_language: 'fr',
  };
  if (typeof body.email === 'string' && body.email.includes('@')) payload.customer = { email: body.email };

  try {
    const session = await (client as any).checkoutSessions.create(payload);
    return json({ checkout_url: session.checkout_url, session_id: session.session_id });
  } catch (err) {
    console.error('[electrodomesticos] checkout error', err);
    return json({ error: 'checkout_failed' }, 502);
  }
};
