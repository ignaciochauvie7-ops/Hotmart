/**
 * Versión ALEMANA (/electrodomesticos/de) — entrega de los PDF (SOLO SERVIDOR:
 * no importar desde componentes React).
 *
 * Los PDF viven en /private/electrodomesticos/de (fuera de /public) y solo se sirven
 * desde /api/electrodomesticos/de/descarga, que comprueba el pago con Dodo.
 * Cada archivo pertenece a un producto de Dodo (`bucket`):
 *   main → DODO_PRODUCT_MAIN · bump → DODO_PRODUCT_BUMP · upsell → DODO_PRODUCT_UPSELL
 */
import {
  DODO_PRODUCT_BUMP,
  DODO_PRODUCT_EXTRA_1,
  DODO_PRODUCT_EXTRA_2,
  DODO_PRODUCT_EXTRA_3,
  DODO_PRODUCT_MAIN,
  DODO_PRODUCT_UPSELL,
} from './electrodomesticos-de';

export type Bucket = 'main' | 'bump' | 'upsell' | 'extra1' | 'extra2' | 'extra3';

export interface DeliveryFile {
  /** Identificador corto que viaja en la URL de descarga. */
  key: string;
  /** Nombre exacto del archivo en /private/electrodomesticos/de. */
  file: string;
  /** Texto del botón de descarga. */
  label: string;
  bucket: Bucket;
}

export const PRODUCT_BY_BUCKET: Record<Bucket, string> = {
  main: DODO_PRODUCT_MAIN,
  bump: DODO_PRODUCT_BUMP,
  upsell: DODO_PRODUCT_UPSELL,
  extra1: DODO_PRODUCT_EXTRA_1,
  extra2: DODO_PRODUCT_EXTRA_2,
  extra3: DODO_PRODUCT_EXTRA_3,
};

// El orden de esta lista es el orden de los botones en /gracias.
export const deliveryFiles: DeliveryFile[] = [
  { key: 'curso', bucket: 'main', file: 'Reparaturkurs-fuer-Haushaltsgeraete.pdf', label: 'Kurs herunterladen' },
  { key: 'bonus-1', bucket: 'main', file: 'Bonus-1-Schnellhilfe-was-ist-mit-deinem-Geraet-los.pdf', label: 'Bonus 1 herunterladen' },
  { key: 'bonus-2', bucket: 'main', file: 'Bonus-2-Die-10-Stoerungen-die-sich-in-unter-10-Minuten-beheben-lassen.pdf', label: 'Bonus 2 herunterladen' },
  { key: 'bonus-3', bucket: 'main', file: 'Bonus-3-Reparieren-oder-neu-kaufen.pdf', label: 'Bonus 3 herunterladen' },
  { key: 'bonus-4', bucket: 'main', file: 'Bonus-4-Das-Werkzeug-das-du-brauchst-fuer-unter-50-Euro.pdf', label: 'Bonus 4 herunterladen' },
  { key: 'bonus-5', bucket: 'main', file: 'Bonus-5-Sicherheit-was-du-vor-dem-Oeffnen-jedes-Geraets-pruefen-musst.pdf', label: 'Bonus 5 herunterladen' },
  { key: 'repuestos', bucket: 'bump', file: 'Ersatzteil-Ratgeber-wo-du-jedes-Teil-in-Deutschland-am-guenstigsten-kaufst.pdf', label: 'Ersatzteil-Ratgeber herunterladen' },
  { key: 'como-nuevos', bucket: 'upsell', file: 'Haushaltsgeraete-wie-neu.pdf', label: 'Haushaltsgeräte wie neu herunterladen' },
  { key: 'extra-1', bucket: 'extra1', file: 'Wartungskalender-fuer-12-Monate.pdf', label: 'Wartungskalender herunterladen' },
  { key: 'extra-2', bucket: 'extra2', file: 'Spar-bei-deiner-Stromrechnung.pdf', label: 'Spar bei deiner Stromrechnung herunterladen' },
  { key: 'extra-3', bucket: 'extra3', file: 'Das-Multimeter-in-15-Minuten.pdf', label: 'Das Multimeter in 15 Minuten herunterladen' },
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
  extra1: [],
  extra2: [],
  extra3: [],
};

export const emailTexts = {
  subject: 'Dein Zugang zum Reparaturkurs für Haushaltsgeräte',
  heading: 'Hier ist dein Zugang!',
  intro: 'Danke für deinen Kauf. Hier ist alles, was in deiner Bestellung enthalten ist:',
  note: 'Bewahre diese E-Mail auf, damit du jederzeit wieder auf die Inhalte zugreifen kannst. Bei Problemen antworte einfach auf diese Nachricht.',
};
