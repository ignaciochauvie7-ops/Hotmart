import type { APIRoute } from 'astro';
import { getProducts } from '../../../config/menopausia/products';
import { isLocale } from '../../../config/menopausia/i18n';
import { createCheckout, getDodoClient, siteUrl } from '../../../lib/menopausia/dodo';

export const prerender = false;

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });

export const POST: APIRoute = async ({ request }) => {
  let body: { locale?: string; email?: string; fbp?: string; fbc?: string };
  try {
    body = await request.json();
  } catch {
    return json({ error: 'bad_request' }, 400);
  }

  const { locale, email, fbp, fbc } = body;
  if (!isLocale(locale)) return json({ error: 'bad_locale' }, 400);

  const products = getProducts(locale);
  if (!products.upsell) return json({ error: 'products_not_configured' }, 503);

  const client = getDodoClient();
  if (!client) return json({ error: 'dodo_not_configured' }, 503);

  const metadata: Record<string, string> = { funnel: 'menopausia', kind: 'upsell' };
  if (fbp) metadata.fbp = fbp;
  if (fbc) metadata.fbc = fbc;

  try {
    const session = await createCheckout(client, {
      productCart: [{ product_id: products.upsell, quantity: 1 }],
      returnUrl: `${siteUrl(request.url)}/menopausia/${locale}/listo?upsell=1`,
      customerEmail: email,
      metadata,
      locale,
    });
    return json({ checkout_url: session.checkout_url, session_id: session.session_id });
  } catch (err) {
    console.error('[menopausia] upsell error', err);
    return json({ error: 'checkout_failed' }, 502);
  }
};
