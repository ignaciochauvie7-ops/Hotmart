import type { APIRoute } from 'astro';
import { previewKey } from '../../../../lib/electrodomesticos/preview';
import { readFile } from 'node:fs/promises';
import { PRODUCT_BY_BUCKET } from '../../../../config/electrodomesticos-fr-entrega';
import { getDodoClient, paymentProductIds, retrievePayment } from '../../../../lib/menopausia/dodo';
import { fileByKey, filePath, grantsAccess, isPaymentId } from '../../../../lib/electrodomesticos/fr/entrega';

export const prerender = false;

const deny = (msg: string, status = 403) =>
  new Response(msg, { status, headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'private, no-store' } });

// Descarga de un PDF comprado: /api/electrodomesticos/descarga?p=<payment_id>&f=<key>
// Antes de servir el archivo se consulta el pago en Dodo: tiene que estar
// confirmado, ser de este embudo e incluir el producto al que pertenece el PDF.
export const GET: APIRoute = async ({ url }) => {
  const paymentId = url.searchParams.get('p') ?? '';
  const file = fileByKey(url.searchParams.get('f') ?? '');
  if (!file) return deny('Fichier introuvable.', 404);

  // Vista previa privada: con la clave correcta se sirve el PDF sin consultar a Dodo.
  const preview = previewKey(url.searchParams.get('preview'));
  const client = preview ? null : getDodoClient();
  if (preview) {
    /* acceso de vista previa */
  } else if (client) {
    if (!isPaymentId(paymentId)) return deny('Paiement non vérifié.');
    const payment = await retrievePayment(client, paymentId);
    if (!grantsAccess(payment)) return deny('Paiement non vérifié.');
    const productId = PRODUCT_BY_BUCKET[file.bucket];
    if (!productId || !paymentProductIds(payment).includes(productId)) {
      return deny('Ton achat ne comprend pas ce fichier.');
    }
  } else if (!import.meta.env.DEV) {
    // Sin Dodo configurado no se puede comprobar la compra: no se entrega nada.
    return deny('Paiement non vérifié.');
  }

  try {
    const buf = await readFile(filePath(file));
    return new Response(new Uint8Array(buf), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${file.file}"`,
        'Cache-Control': 'private, no-store',
        'X-Robots-Tag': 'noindex',
      },
    });
  } catch (err) {
    console.error('[electrodomesticos] PDF no encontrado', file.file, err);
    return deny('Fichier introuvable.', 404);
  }
};
