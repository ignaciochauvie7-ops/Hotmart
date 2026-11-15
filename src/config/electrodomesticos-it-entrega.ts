/**
 * Versión ITALIANA (/electrodomesticos/it) — entrega de los PDF (SOLO SERVIDOR:
 * no importar desde componentes React).
 *
 * Los PDF viven en /private/electrodomesticos/it (fuera de /public) y solo se sirven
 * desde /api/electrodomesticos/it/descarga, que comprueba el pago con Dodo.
 * Cada archivo pertenece a un producto de Dodo (`bucket`):
 *   main → DODO_PRODUCT_MAIN · bump → DODO_PRODUCT_BUMP · upsell → DODO_PRODUCT_UPSELL
 */
import { DODO_PRODUCT_BUMP, DODO_PRODUCT_MAIN, DODO_PRODUCT_UPSELL } from './electrodomesticos-it';

export type Bucket = 'main' | 'bump' | 'upsell';

export interface DeliveryFile {
  /** Identificador corto que viaja en la URL de descarga. */
  key: string;
  /** Nombre exacto del archivo en /private/electrodomesticos/it. */
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
  { key: 'curso', bucket: 'main', file: 'Corso-di-Riparazione-di-Elettrodomestici.pdf', label: 'Scarica il corso' },
  { key: 'bonus-1', bucket: 'main', file: 'Bonus-1-Guida-rapida-cosa-succede-al-tuo-apparecchio.pdf', label: 'Scarica il Bonus 1' },
  { key: 'bonus-2', bucket: 'main', file: 'Bonus-2-I-10-guasti-che-si-riparano-in-meno-di-10-minuti.pdf', label: 'Scarica il Bonus 2' },
  { key: 'bonus-3', bucket: 'main', file: 'Bonus-3-Quando-riparare-e-quando-comprarne-uno-nuovo.pdf', label: 'Scarica il Bonus 3' },
  { key: 'bonus-4', bucket: 'main', file: 'Bonus-4-Attrezzi-che-ti-servono-per-meno-di-50-euro.pdf', label: 'Scarica il Bonus 4' },
  { key: 'bonus-5', bucket: 'main', file: 'Bonus-5-Sicurezza-cosa-controllare-prima-di-aprire-qualsiasi-apparecchio.pdf', label: 'Scarica il Bonus 5' },
  { key: 'repuestos', bucket: 'bump', file: 'Guida-ai-ricambi-dove-comprare-ogni-pezzo-al-prezzo-piu-basso-in-Italia.pdf', label: 'Scarica la Guida ai pezzi di ricambio' },
  { key: 'como-nuevos', bucket: 'upsell', file: 'Elettrodomestici-come-nuovi.pdf', label: 'Scarica Elettrodomestici come nuovi' },
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
  subject: 'Il tuo accesso al Corso di Riparazione Elettrodomestici',
  heading: 'Ecco il tuo accesso!',
  intro: 'Grazie per il tuo acquisto. Ecco tutto quello che hai acquistato:',
  note: 'Conserva questa email per accedere di nuovo quando vuoi. Per qualsiasi problema, rispondi a questo messaggio.',
};
