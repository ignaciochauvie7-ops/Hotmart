import type { APIRoute } from 'astro';
import { getDodoClient, siteUrl, paymentProductIds } from '../../../lib/menopausia/dodo';
import { sendPurchaseCapi } from '../../../lib/menopausia/meta-capi';
import { bucketsFromPayment, buildDownloads } from '../../../lib/menopausia/order';
import { absolutize, sendDownloadEmail } from '../../../lib/menopausia/email';
import { findProduct, type MenoLocale } from '../../../config/menopausia/products';
import { isLocale } from '../../../config/menopausia/i18n';

export const prerender = false;

// Verifies the Dodo webhook signature, forwards a server-side Purchase to the
// Meta Conversions API (event_id = payment_id for dedup), and emails the buyer
// their download links (we deliver the files, Dodo does not).
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

    // Resolve locale: metadata first, then infer from the purchased products.
    let locale: MenoLocale | undefined = isLocale(d.metadata?.locale) ? d.metadata.locale : undefined;
    if (!locale) {
      const ids = paymentProductIds(d);
      for (const id of ids) {
        const found = findProduct(id);
        if (found) { locale = found.locale; break; }
      }
    }

    if (paymentId) {
      // Meta CAPI Purchase (deduped with the browser Pixel by event_id).
      await sendPurchaseCapi({
        eventId: paymentId,
        value: typeof amount === 'number' ? amount / 100 : 0,
        currency: d.currency ?? 'EUR',
        email: d.customer?.email,
        fbp: d.metadata?.fbp,
        fbc: d.metadata?.fbc,
        eventSourceUrl: siteUrl(request.url),
      });

      // Email the download links.
      if (locale) {
        const buckets = bucketsFromPayment(locale, d);
        const links = buildDownloads(locale, paymentId, buckets);
        if (links.length > 0) {
          await sendDownloadEmail(locale, d.customer?.email, absolutize(siteUrl(request.url), links));
        }
      }
    }
  }

  return new Response('ok', { status: 200 });
};
