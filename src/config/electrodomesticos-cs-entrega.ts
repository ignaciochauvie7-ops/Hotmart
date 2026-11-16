/**
 * Versión CHECA (/electrodomesticos/cs) — entrega de los PDF (SOLO SERVIDOR:
 * no importar desde componentes React).
 *
 * Los PDF viven en /private/electrodomesticos/cs (fuera de /public) y solo se sirven
 * desde /api/electrodomesticos/cs/descarga, que comprueba el pago con Dodo.
 * PENDIENTE: subir los PDF traducidos a /private/electrodomesticos/cs con estos nombres.
 * Cada archivo pertenece a un producto de Dodo (`bucket`):
 *   main → DODO_PRODUCT_MAIN · bump → DODO_PRODUCT_BUMP · upsell → DODO_PRODUCT_UPSELL
 */
import { DODO_PRODUCT_BUMP, DODO_PRODUCT_MAIN, DODO_PRODUCT_UPSELL } from './electrodomesticos-cs';

export type Bucket = 'main' | 'bump' | 'upsell';

export interface DeliveryFile {
  /** Identificador corto que viaja en la URL de descarga. */
  key: string;
  /** Nombre exacto del archivo en /private/electrodomesticos/cs. */
  file: string;
  /** Texto del botón de descarga. */
  label: string;
  bucket: Bucket;
}

export const PRODUCT_BY_BUCKET: Record<Bucket, string> = {
  main: DODO_PRODUCT_MAIN,
  bump: DODO_PRODUCT_BUMP,
  upsell: DODO_PRODUCT_UPSELL,
};

// El orden de esta lista es el orden de los botones en /gracias.
export const deliveryFiles: DeliveryFile[] = [
  { key: 'curso', bucket: 'main', file: 'Kurz-opravy-domacich-spotrebicu.pdf', label: 'Stáhnout kurz' },
  { key: 'bonus-1', bucket: 'main', file: 'Bonus-1-Rychly-pruvodce-co-je-tvemu-spotrebici.pdf', label: 'Stáhnout Bonus 1' },
  { key: 'bonus-2', bucket: 'main', file: 'Bonus-2-10-poruch-ktere-opravis-za-mene-nez-10-minut.pdf', label: 'Stáhnout Bonus 2' },
  { key: 'bonus-3', bucket: 'main', file: 'Bonus-3-Kdy-opravovat-a-kdy-koupit-novy.pdf', label: 'Stáhnout Bonus 3' },
  { key: 'bonus-4', bucket: 'main', file: 'Bonus-4-Naradi-ktere-potrebujes-za-mene-nez-1200-Kc.pdf', label: 'Stáhnout Bonus 4' },
  { key: 'bonus-5', bucket: 'main', file: 'Bonus-5-Bezpecnost-co-zkontrolovat-pred-otevrenim-spotrebice.pdf', label: 'Stáhnout Bonus 5' },
  { key: 'repuestos', bucket: 'bump', file: 'Pruvodce-nahradnimi-dily-kde-koupit-kazdy-dil-nejlevneji-v-Cesku.pdf', label: 'Stáhnout Průvodce náhradními díly' },
  { key: 'como-nuevos', bucket: 'upsell', file: 'Spotrebice-jako-nove.pdf', label: 'Stáhnout Spotřebiče jako nové' },
];

// ── Email de acceso (opcional) ─────────────────────────────────────────────
// El webhook de Dodo solo envía email si aquí hay enlaces. Vacío = no se envía
// nada: la entrega se hace en la página /gracias.
export interface AccessLink {
  label: string;
  url: string;
}

export const delivery: Record<Bucket, AccessLink[]> = {
  main: [],
  bump: [],
  upsell: [],
};

export const emailTexts = {
  subject: 'Tvůj přístup ke Kurzu opravy domácích spotřebičů',
  heading: 'Tady je tvůj přístup!',
  intro: 'Děkujeme za nákup. Tady je všechno z tvé objednávky:',
  note: 'Tento e-mail si uschovej, ať se můžeš kdykoli vrátit. Pokud nastane jakýkoli problém, odpověz na tuto zprávu.',
};
