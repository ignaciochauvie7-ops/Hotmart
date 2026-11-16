/**
 * Versión POLACA (/electrodomesticos/pl) — entrega de los PDF (SOLO SERVIDOR:
 * no importar desde componentes React).
 *
 * Los PDF viven en /private/electrodomesticos/pl (fuera de /public) y solo se sirven
 * desde /api/electrodomesticos/pl/descarga, que comprueba el pago con Dodo.
 * PENDIENTE: subir los PDF traducidos a /private/electrodomesticos/pl con estos nombres.
 * Cada archivo pertenece a un producto de Dodo (`bucket`):
 *   main → DODO_PRODUCT_MAIN · bump → DODO_PRODUCT_BUMP · upsell → DODO_PRODUCT_UPSELL
 */
import { DODO_PRODUCT_BUMP, DODO_PRODUCT_MAIN, DODO_PRODUCT_UPSELL } from './electrodomesticos-pl';

export type Bucket = 'main' | 'bump' | 'upsell';

export interface DeliveryFile {
  /** Identificador corto que viaja en la URL de descarga. */
  key: string;
  /** Nombre exacto del archivo en /private/electrodomesticos/pl. */
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
  { key: 'curso', bucket: 'main', file: 'Kurs-Naprawy-Sprzetu-AGD.pdf', label: 'Pobierz kurs' },
  { key: 'bonus-1', bucket: 'main', file: 'Bonus-1-Szybki-przewodnik-co-dolega-Twojemu-urzadzeniu.pdf', label: 'Pobierz Bonus 1' },
  { key: 'bonus-2', bucket: 'main', file: 'Bonus-2-10-usterek-ktore-naprawisz-w-mniej-niz-10-minut.pdf', label: 'Pobierz Bonus 2' },
  { key: 'bonus-3', bucket: 'main', file: 'Bonus-3-Kiedy-naprawiac-a-kiedy-kupic-nowe.pdf', label: 'Pobierz Bonus 3' },
  { key: 'bonus-4', bucket: 'main', file: 'Bonus-4-Narzedzia-ktorych-potrzebujesz-za-mniej-niz-200-zl.pdf', label: 'Pobierz Bonus 4' },
  { key: 'bonus-5', bucket: 'main', file: 'Bonus-5-Bezpieczenstwo-co-sprawdzic-przed-otwarciem-urzadzenia.pdf', label: 'Pobierz Bonus 5' },
  { key: 'repuestos', bucket: 'bump', file: 'Przewodnik-po-czesciach-zamiennych-gdzie-kupic-najtaniej-w-Polsce.pdf', label: 'Pobierz Przewodnik po częściach zamiennych' },
  { key: 'como-nuevos', bucket: 'upsell', file: 'AGD-jak-nowe.pdf', label: 'Pobierz AGD jak nowe' },
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
  subject: 'Twój dostęp do Kursu Naprawy Sprzętu AGD',
  heading: 'Oto Twój dostęp!',
  intro: 'Dziękujemy za zakup. Oto wszystko, co znajduje się w Twoim zamówieniu:',
  note: 'Zachowaj tego e-maila, aby w każdej chwili wrócić do materiałów. W razie problemów odpowiedz na tę wiadomość.',
};
