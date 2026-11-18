/**
 * Versión POLACA (/electrodomesticos/pl) — entrega de los PDF (SOLO SERVIDOR:
 * no importar desde componentes React).
 *
 * Los PDF viven en /private/electrodomesticos/pl (fuera de /public) y solo se sirven
 * desde /api/electrodomesticos/pl/descarga, que comprueba el pago con Dodo.
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
} from './electrodomesticos-pl';

export type Bucket = 'main' | 'bump' | 'upsell' | 'extra1' | 'extra2' | 'extra3';

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
  extra1: DODO_PRODUCT_EXTRA_1,
  extra2: DODO_PRODUCT_EXTRA_2,
  extra3: DODO_PRODUCT_EXTRA_3,
};

// El orden de esta lista es el orden de los botones en /gracias.
export const deliveryFiles: DeliveryFile[] = [
  { key: 'curso', bucket: 'main', file: 'Kurs-naprawy-sprzetu-AGD.pdf', label: 'Pobierz kurs' },
  { key: 'bonus-1', bucket: 'main', file: 'Bonus-1-Szybki-przewodnik-co-dolega-twojemu-urzadzeniu.pdf', label: 'Pobierz Bonus 1' },
  { key: 'bonus-2', bucket: 'main', file: 'Bonus-2-10-usterek-ktore-naprawisz-w-mniej-niz-10-minut.pdf', label: 'Pobierz Bonus 2' },
  { key: 'bonus-3', bucket: 'main', file: 'Bonus-3-Kiedy-naprawiac-a-kiedy-kupic-nowy.pdf', label: 'Pobierz Bonus 3' },
  { key: 'bonus-4', bucket: 'main', file: 'Bonus-4-Narzedzia-ktorych-potrzebujesz-za-mniej-niz-200-zl.pdf', label: 'Pobierz Bonus 4' },
  { key: 'bonus-5', bucket: 'main', file: 'Bonus-5-Bezpieczenstwo-co-sprawdzic-przed-otwarciem-dowolnego-urzadzenia.pdf', label: 'Pobierz Bonus 5' },
  { key: 'repuestos', bucket: 'bump', file: 'Przewodnik-po-czesciach-gdzie-kupic-kazda-czesc-najtaniej-w-Polsce.pdf', label: 'Pobierz Przewodnik po częściach zamiennych' },
  { key: 'como-nuevos', bucket: 'upsell', file: 'Sprzet-AGD-jak-nowy.pdf', label: 'Pobierz AGD jak nowe' },
  { key: 'extra-1', bucket: 'extra1', file: 'Kalendarz-konserwacji-na-12-miesiecy.pdf', label: 'Pobierz Kalendarz konserwacji' },
  { key: 'extra-2', bucket: 'extra2', file: 'Oszczedzaj-na-rachunku-za-prad.pdf', label: 'Pobierz Oszczędzaj na rachunku za prąd' },
  { key: 'extra-3', bucket: 'extra3', file: 'Multimetr-w-15-minut.pdf', label: 'Pobierz Multimetr w 15 minut' },
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
  subject: 'Twój dostęp do Kursu Naprawy Sprzętu AGD',
  heading: 'Oto Twój dostęp!',
  intro: 'Dziękujemy za zakup. Oto wszystko, co znajduje się w Twoim zamówieniu:',
  note: 'Zachowaj tego e-maila, aby w każdej chwili wrócić do materiałów. W razie problemów odpowiedz na tę wiadomość.',
};
