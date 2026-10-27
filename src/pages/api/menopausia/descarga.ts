import type { APIRoute } from 'astro';
import { readFile } from 'node:fs/promises';
import { verifyDownloadToken, filePath } from '../../../lib/menopausia/download';
import { getDodoClient, retrievePayment, paymentIsPaid, paymentProductIds } from '../../../lib/menopausia/dodo';
import { getProducts } from '../../../config/menopausia/products';
import { fileBelongs, driveDownloadUrl } from '../../../config/menopausia/files';

export const prerender = false;

const deny = (msg: string, status = 403) => new Response(msg, { status });

export const GET: APIRoute = async ({ url }) => {
  const token = url.searchParams.get('token') ?? '';
  const payload = verifyDownloadToken(token);
  if (!payload) return deny('Enlace inválido o expirado.', 410);

  const { pid, file, bucket, locale } = payload;
  if (!fileBelongs(locale, bucket, file)) return deny('Archivo no permitido.');

  // Verify the payment with Dodo before serving the file.
  const client = getDodoClient();
  if (client && pid) {
    const payment = await retrievePayment(client, pid);
    if (!paymentIsPaid(payment)) return deny('Pago no verificado.');
    const productId = getProducts(locale)[bucket];
    const ids = paymentProductIds(payment);
    if (ids.length > 0 && productId && !ids.includes(productId)) {
      return deny('El producto comprado no incluye este archivo.');
    }
  }
  // If Dodo isn't configured (local dev), the signed token alone authorizes.

  // Large mains (~29 MB) are hosted on Drive — redirect instead of buffering
  // (Vercel caps buffered function responses at 4.5 MB). Payment is already
  // verified above, so the redirect is only reached by a paying buyer.
  const drive = driveDownloadUrl(locale, file);
  if (drive) {
    return new Response(null, {
      status: 302,
      headers: { Location: drive, 'Cache-Control': 'private, no-store' },
    });
  }

  try {
    const buf = await readFile(filePath(locale, file));
    return new Response(new Uint8Array(buf), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="file.pdf"; filename*=UTF-8''${encodeURIComponent(file)}`,
        'Cache-Control': 'private, no-store',
      },
    });
  } catch {
    return deny('Archivo no encontrado.', 404);
  }
};
