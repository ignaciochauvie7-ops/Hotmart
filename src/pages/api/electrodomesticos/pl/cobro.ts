import type { APIRoute } from 'astro';
import {
  BASE_PATH,
  CURRENCY,
  DODO_PRODUCT_EXTRA_1,
  DODO_PRODUCT_EXTRA_2,
  DODO_PRODUCT_EXTRA_3,
  DODO_PRODUCT_UPSELL,
} from '../../../../config/electrodomesticos-pl';
import { getDodoClient } from '../../../../lib/menopausia/dodo';
import { chargeOneClick } from '../../../../lib/electrodomesticos/oneclick';

export const prerender = false;

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

// Cobro en un clic (tarjeta guardada) tras el pago principal.
// Body: { main: <payment_id principal>, items: ['upsell'] | ['extra1', 'extra3', …] }
export const POST: APIRoute = async ({ request }) => {
  let body: { main?: unknown; items?: unknown };
  try {
    body = await request.json();
  } catch {
    return json({ status: 'failed', error: 'bad_request' }, 400);
  }
  const client = getDodoClient();
  if (!client) return json({ status: 'failed', error: 'dodo_not_configured' }, 503);

  const result = await chargeOneClick(
    client,
    {
      funnel: 'electrodomesticos-pl',
      currency: CURRENCY,
      language: 'pl',
      basePath: BASE_PATH,
      products: {
        upsell: DODO_PRODUCT_UPSELL,
        extra1: DODO_PRODUCT_EXTRA_1,
        extra2: DODO_PRODUCT_EXTRA_2,
        extra3: DODO_PRODUCT_EXTRA_3,
      },
    },
    request.url,
    body.main,
    body.items,
  );
  return json(result, result.status === 'failed' ? 402 : 200);
};
