import type { APIRoute } from 'astro';
import DodoPayments from 'dodopayments';
import { DODO_PRODUCT_BUMP, DODO_PRODUCT_MAIN, DODO_PRODUCT_UPSELL } from '../../../config/electrodomesticos';
import { delivery, type AccessLink } from '../../../config/electrodomesticos-entrega';
import { getDodoEnvironment, paymentProductIds } from '../../../lib/menopausia/dodo';
import { sendAccessEmail } from '../../../lib/electrodomesticos/email';

export const prerender = false;

function env(name: string): string {
  const meta = import.meta.env as Record<string, string | undefined>;
  return meta[name] ?? process.env[name] ?? '';
}

// Webhook propio del curso de electrodomésticos: verifica la firma de Dodo y envía el email
// de acceso. Solo actúa sobre pagos con metadata.funnel = 'electrodomesticos'.
//
// El Purchase server-side (Meta CAPI) NO se envía aquí: el webhook de
// menopausia ya lo manda para todos los pagos de la cuenta de Dodo con
// event_id = payment_id y el mismo pixel, así que repetirlo lo duplicaría.
export const POST: APIRoute = async ({ request }) => {
  const apiKey = env('DODO_PAYMENTS_API_KEY');
  const webhookKey = env('DODO_WEBHOOK_KEY_ELECTRODOMESTICOS');
  // Sin clave no se puede verificar: se responde 200 para que Dodo no reintente.
  if (!apiKey || !webhookKey) return new Response('ok', { status: 200 });

  const client = new DodoPayments({ bearerToken: apiKey, webhookKey, environment: getDodoEnvironment() });

  const raw = await request.text();
  const headers = {
    'webhook-id': request.headers.get('webhook-id') ?? '',
    'webhook-signature': request.headers.get('webhook-signature') ?? '',
    'webhook-timestamp': request.headers.get('webhook-timestamp') ?? '',
  };

  let event: any;
  try {
    event = (client as any).webhooks.unwrap(raw, { headers });
  } catch (err) {
    console.error('[electrodomesticos] webhook signature failed', err);
    return new Response('invalid signature', { status: 401 });
  }

  if (event?.type === 'payment.succeeded') {
    const d = event.data ?? {};
    if (d.metadata?.funnel === 'electrodomesticos') {
      const ids = paymentProductIds(d);
      const links: AccessLink[] = [];
      if (DODO_PRODUCT_MAIN && ids.includes(DODO_PRODUCT_MAIN)) links.push(...delivery.main);
      if (DODO_PRODUCT_BUMP && ids.includes(DODO_PRODUCT_BUMP)) links.push(...delivery.bump);
      if (DODO_PRODUCT_UPSELL && ids.includes(DODO_PRODUCT_UPSELL)) links.push(...delivery.upsell);
      const usable = links.filter((l) => l.url);
      if (usable.length === 0) {
        console.warn('[electrodomesticos] pago sin enlaces de entrega configurados', d.payment_id);
      } else {
        await sendAccessEmail(d.customer?.email, usable);
      }
    }
  }

  return new Response('ok', { status: 200 });
};
