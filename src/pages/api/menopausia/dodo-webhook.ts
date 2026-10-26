import type { APIRoute } from 'astro';
import { getDodoClient } from '../../../lib/menopausia/dodo';
import { sendPurchaseCapi } from '../../../lib/menopausia/meta-capi';

export const prerender = false;

// Verifies the Dodo webhook signature, then forwards a server-side Purchase to
// the Meta Conversions API (same event_id = payment_id for dedup with the Pixel).
export const POST: APIRoute = async ({ request }) => {
  const client = getDodoClient();
  // Without the webhook key we can't verify — acknowledge so Dodo stops retrying.
  if (!client) return new Response('ok', { status: 200 });

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
    console.error('[menopausia] webhook signature failed', err);
    return new Response('invalid signature', { status: 401 });
  }

  if (event?.type === 'payment.succeeded') {
    const d = event.data ?? {};
    const paymentId: string | undefined = d.payment_id;
    const amount: number | undefined = d.total_amount; // minor units
    if (paymentId) {
      await sendPurchaseCapi({
        eventId: paymentId,
        value: typeof amount === 'number' ? amount / 100 : 0,
        currency: d.currency ?? 'EUR',
        email: d.customer?.email,
        fbp: d.metadata?.fbp,
        fbc: d.metadata?.fbc,
      });
    }
  }

  return new Response('ok', { status: 200 });
};
