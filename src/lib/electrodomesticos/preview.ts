import { createHash, timingSafeEqual } from 'node:crypto';

/**
 * Vista previa privada del post compra (SOLO SERVIDOR).
 *
 *   /electrodomesticos/<pais>/gracias-oferta?preview=<POSTCOMPRA_PREVIEW_KEY>
 *
 * Con la clave correcta se ve el recorrido igual que un cliente real, sin pago:
 * los "cobros" se simulan en el navegador (nunca se llama a Dodo) y /gracias
 * muestra los PDF elegidos. Sin clave, o con una incorrecta, todo funciona como
 * siempre. Si la variable no existe o es corta, la vista previa queda apagada.
 */
const MIN_LENGTH = 32;

function configuredKey(): string {
  return String(import.meta.env.POSTCOMPRA_PREVIEW_KEY || process.env.POSTCOMPRA_PREVIEW_KEY || '').trim();
}

const digest = (s: string) => createHash('sha256').update(s).digest();

/** Devuelve la clave si es válida (para propagarla por el recorrido), si no ''. */
export function previewKey(candidate: string | null | undefined): string {
  const key = configuredKey();
  if (key.length < MIN_LENGTH || !candidate) return '';
  return timingSafeEqual(digest(candidate), digest(key)) ? candidate : '';
}

export const PREVIEW_ITEMS = ['upsell', 'extra1', 'extra2', 'extra3'] as const;

/** Productos elegidos en la vista previa (?items=upsell,extra2), sin repetir. */
export function previewItems(raw: string | null): string[] {
  const set = new Set((raw ?? '').split(','));
  return PREVIEW_ITEMS.filter((i) => set.has(i));
}
