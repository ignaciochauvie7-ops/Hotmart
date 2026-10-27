import type { APIRoute } from 'astro';
import { getProducts } from '../../../config/menopausia/products';
import { isLocale } from '../../../config/menopausia/i18n';
import { createCheckout, getDodoClient, siteUrl } from '../../../lib/menopausia/dodo';

export const prerender = false;

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });

export const POST: APIRoute = async ({ request }) => {
  let body: { locale?: string; bump?: boolean; upsell?: boolean; fbp?: string; fbc?: string };
  try {
    body = await request.json();
  } catch {
    return json({ error: 'bad_request' }, 400);
  }

  const { locale, bump, upsell, fbp, fbc } = body;
  if (!isLocale(locale)) return json({ error: 'bad_locale' }, 400);

  const products = getProducts(locale);
  if (!products.main) return json({ error: 'products_not_configured' }, 503);

  const client = getDodoClient();
  if (!client) return json({ error: 'dodo_not_configured' }, 503);

  const cart = [{ product_id: products.main, quantity: 1 }];
  if (bump && products.bump) cart.push({ product_id: products.bump, quantity: 1 });
  if (upsell && products.upsell) cart.push({ product_id: products.upsell, quantity: 1 });

  const metadata: Record<string, string> = {
    funnel: 'menopausia',
    bump: String(!!bump),
    upsell: String(!!upsell),
  };
  if (fbp) metadata.fbp = fbp;
  if (fbc) metadata.fbc = fbc;

  try {
    const session = await createCheckout(client, {
      productCart: cart,
      returnUrl: `${siteUrl(request.url)}/menopausia/${locale}/gracias`,
      metadata,
      locale,
    });
    return json({ checkout_url: session.checkout_url, session_id: session.session_id });
  } catch (err) {
    console.error('[menopausia] checkout error', err);
    return json({ error: 'checkout_failed' }, 502);
  }
};
