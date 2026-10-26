import { getProducts, type MenoLocale, type ProductBucket } from '../../config/menopausia/products';
import { filesFor } from '../../config/menopausia/files';
import { downloadUrl } from './download';
import { paymentProductIds } from './dodo';

export interface DownloadLink {
  file: string;
  url: string;
}

/** Which buckets a payment covers, derived from its product cart. */
export function bucketsFromPayment(locale: MenoLocale, payment: any): ProductBucket[] {
  const ids = paymentProductIds(payment);
  const p = getProducts(locale);
  const out: ProductBucket[] = [];
  (['main', 'bump', 'upsell'] as ProductBucket[]).forEach((bucket) => {
    if (p[bucket] && ids.includes(p[bucket])) out.push(bucket);
  });
  return out;
}

/** Signed, 7-day download links for the given buckets of a payment. */
export function buildDownloads(locale: MenoLocale, paymentId: string, buckets: ProductBucket[]): DownloadLink[] {
  const links: DownloadLink[] = [];
  for (const bucket of buckets) {
    for (const file of filesFor(locale, bucket)) {
      links.push({ file, url: downloadUrl({ pid: paymentId, file, bucket, locale }) });
    }
  }
  return links;
}
