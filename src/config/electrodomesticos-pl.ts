/**
 * Versión POLACA de la landing (/electrodomesticos/pl/*): copia de
 * `electrodomesticos-it.ts` con los textos en polaco y los productos de Dodo de Polonia.
 * Precios FIJOS en PLN (no se convierten desde EUR). Mismas imágenes (salvo hero y
 * pack, propias de /pl) y mismos eventos del pixel que /it/ (con currency PLN).
 * Todo lo editable vive aquí: precios, IDs de Dodo, fecha límite, reseñas y textos.
 * (Los PDF que se entregan tras el pago están en
 *  `electrodomesticos-pl-entrega.ts`, que solo se usa en el servidor.)
 *
 * En los textos se pueden usar estas marcas, que se sustituyen solas:
 *   {price} → precio principal · {bumpPrice} → order bump · {upsellPrice} → upsell
 *   {total} → principal + bump · {valueTotal} → valor total de la oferta (VALUE_TOTAL)
 */

// ── Precios ────────────────────────────────────────────────────────────────
export const CURRENCY = 'PLN';
// Valores del pixel (salen de aquí): Purchase 72 · 93 con el bump · 39 el upsell (PLN).
// OJO: el importe que se cobra lo fija el producto en Dodo (Localized Pricing en PLN);
// debe coincidir con estos precios.
export const PRICE_MAIN = 72;
export const PRICE_BUMP = 21;
// Precio anterior de la guía (sale tachado en el mini carrito).
export const PRICE_BUMP_WAS = 35;
// "Valor total" que se muestra en el cuadro de producto (sin tachar).
export const VALUE_TOTAL = 240;
export const PRICE_UPSELL = 39;

// ── IDs de producto de Dodo Payments (no son secretos) ─────────────────────
// Vacío = el botón de compra aparece deshabilitado (con aviso en dev).
// Productos de Polonia: Localized Pricing por moneda en PLN (72 zł · 21 zł · 39 zł).
export const DODO_PRODUCT_MAIN = 'pdt_0Ns5J4AdZXfvqFGfFiCyW';
// Bump: «Przewodnik po Częściach Zamiennych» · Upsell: «AGD Jak Nowe».
export const DODO_PRODUCT_BUMP = 'pdt_0Ns5J4Vk3aqFHspAdVfbL';
export const DODO_PRODUCT_UPSELL = 'pdt_0Ns5J4s9M5Y8eVpBMh1pW';

// ── Fecha límite REAL de la oferta (ISO 8601) ──────────────────────────────
// Ej.: '2026-12-01T23:59:59+01:00'. Vacía = el contador no se muestra.
// Al llegar a cero el contador se oculta; no se reinicia.
export const OFFER_DEADLINE = '';

// ── Contacto ───────────────────────────────────────────────────────────────
// Email de soporte (footer, garantía y páginas legales). Vacío = no se muestra.
export const SUPPORT_EMAIL = '';

// ── Reseñas ────────────────────────────────────────────────────────────────
// Vacío = la sección de reseñas no se renderiza. Solo reseñas reales.
// `photo` es un archivo dentro de /public/electrodomesticos/ (ej. 'resena-1.webp').
export interface Testimonial {
  /** Nombre visible (ej. 'Carmen, 52'). Vacío = la tarjeta sale sin nombre. */
  name?: string;
  text: string;
  photo?: string;
  location?: string;
}
// Fotos: testimonio-1.webp … testimonio-6.webp (96x96) en /public/electrodomesticos/
// (las mismas que /es/ e /it/; solo cambian los nombres y los textos).
export const testimonials: Testimonial[] = [
  {
    name: 'Krzysztof',
    photo: 'testimonio-1.webp',
    text: 'Nie miałem pojęcia o naprawach. Zacząłem od zera i zaskoczyło mnie, jak jasno wszystko jest wyjaśnione. Naprawiłem już w domu kilka usterek bez wzywania fachowca.',
  },
  {
    name: 'Anna',
    photo: 'testimonio-2.webp',
    text: 'Zaoszczędziłam sporo pieniędzy, sama naprawiając usterkę pralki. Wcześniej od razu zadzwoniłabym po fachowca. Teraz wiem dużo więcej i czuję się o wiele pewniej.',
  },
  {
    name: 'Tomasz',
    photo: 'testimonio-3.webp',
    text: 'Kupiłem go z ciekawości, a teraz pomagam rodzinie i sąsiadom przy drobnych usterkach. Nigdy nie myślałem, że nauczę się czegoś takiego bez żadnego doświadczenia.',
  },
  {
    name: 'Marek',
    photo: 'testimonio-4.webp',
    text: 'Najlepsze jest to, że wszystko jest wyjaśnione krok po kroku i żeby zacząć, nie trzeba nic wiedzieć o elektryce ani naprawach. Kurs jest o wiele bardziej praktyczny, niż się spodziewałem.',
  },
  {
    name: 'Katarzyna',
    photo: 'testimonio-5.webp',
    text: 'Miałam dość płacenia za naprawy rzeczy, których nawet nie rozumiałam. Teraz potrafię rozpoznać wiele usterek i w domu radzę sobie sama. To naprawdę dobrze wydane pieniądze.',
  },
  {
    name: 'Paweł',
    photo: 'testimonio-6.webp',
    text: 'Chciałem nauczyć się fachu, który da mi dodatkowy dochód. Zaczynam już robić drobne naprawy dla znajomych i widzę, że to ma duży potencjał.',
  },
];

// ── Medios de pago mostrados bajo el botón de compra ──────────────────────
// Deja solo los que estén activos en tu cuenta de Dodo para PLN.
// Los logos están en /public/electrodomesticos/pay/.
export const paymentMethods: { file: string; alt: string }[] = [
  { file: 'visa.svg', alt: 'Visa' },
  { file: 'mastercard.svg', alt: 'Mastercard' },
  { file: 'amex.svg', alt: 'American Express' },
  { file: 'apple-pay.svg', alt: 'Apple Pay' },
  { file: 'google-pay.svg', alt: 'Google Pay' },
];

// ── Rutas ──────────────────────────────────────────────────────────────────
export const BASE_PATH = '/electrodomesticos/pl';
// Mismas imágenes que /es/ e /it/ (hero y pack con sufijo -pl).
export const IMG_PATH = '/electrodomesticos';

// ── Textos ─────────────────────────────────────────────────────────────────
export const PRODUCT_NAME = 'Kompletny Kurs Naprawy Sprzętu AGD';

export const texts = {
  meta: {
    title: 'Kompletny Kurs Naprawy Sprzętu AGD',
    description: 'Naucz się naprawiać swój sprzęt AGD od zera w 30 dni. Kurs w PDF, krok po kroku.',
    upsellTitle: 'Twoje zamówienie jest prawie gotowe — Kurs Naprawy Sprzętu AGD',
    thanksTitle: 'Dziękujemy! — Kurs Naprawy Sprzętu AGD',
    legalSuffix: 'Kurs Naprawy Sprzętu AGD',
  },

  // 1 · Promesa + imagen principal (hero-mockup-pl.webp)
  hero: {
    // El titular visible va dentro de hero-mockup-pl.webp; este texto es el h1 oculto y el alt.
    h1: 'Od zera do eksperta od sprzętu AGD w 30 dni',
    imageAlt: 'Od zera do eksperta od sprzętu AGD w 30 dni',
    // Franja de prueba social sobre la imagen. Usa solo cifras reales.
    // Fotos: perfil-1.webp … perfil-4.webp (96x96) en /public/electrodomesticos/.
    trust: 'Ponad 3000 osób już zaczęło kurs',
    rating: '4,9',
    ratingAria: 'Ocena 4,9 na 5',
    avatars: 4,
  },

  // 2 · Esto es para ti si… (5 dolores)
  pains: {
    title: 'To dla Ciebie, jeśli…',
    items: [
      'Płacisz 200 zł tylko za to, żeby fachowiec przyszedł i rzucił okiem',
      'Wyrzucasz sprzęt, który dało się naprawić w kilka minut',
      'Każda awaria kosztuje Cię pieniądze, bo nawet nie wiesz, od czego zacząć',
      'Masz w domu zepsute urządzenie i boisz się je otworzyć',
      'Nie wiesz, czy opłaca się je naprawić, czy kupić nowe',
    ],
  },

  // 3 · Antes y después (3 filas "Antes → Ahora")
  beforeAfter: {
    title: 'Przed i po',
    beforeLabel: 'Przed',
    afterLabel: 'Teraz',
    rows: [
      { before: 'Płacisz fachowcowi 200 zł tylko za rzut oka', after: 'Naprawiasz to sam w kilka minut' },
      { before: 'Wyrzucasz urządzenie, nie wiedząc, co mu jest', after: 'Rozumiesz, co nie działa, i to naprawiasz' },
      { before: 'Każda awaria kosztuje Cię pieniądze', after: 'Oszczędzasz za każdym razem, gdy coś się zepsuje' },
    ],
  },

  // 4 · Producto principal con sus bonus (un solo bloque).
  // Mockups: oferta-pack-pl.webp · bonus-1.webp … bonus-5.webp
  product: {
    name: PRODUCT_NAME,
    imageAlt: PRODUCT_NAME,
    // Precio anterior del curso (sale tachado junto al precio real).
    courseValue: 120,
    // Fila del producto principal en el cuadro (con el precio).
    rowName: 'Pełny kurs (10 modułów)',
    // Título sobre la lista de bonus. Portadas en el mismo orden: bonus-1.webp … bonus-5.webp
    // `value` = precio que sale tachado en cada bonus.
    bonusTitle: 'Dodatkowe bonusy w prezencie!',
    bonus: [
      { title: 'Szybki przewodnik: co dolega Twojemu urządzeniu', value: 59 },
      { title: '10 usterek, które naprawisz w mniej niż 10 minut', value: 39 },
      { title: 'Kiedy naprawiać, a kiedy kupić nowe', value: 29 },
      { title: 'Narzędzia, których potrzebujesz, za mniej niż 200 zł', value: 39 },
      { title: 'Bezpieczeństwo: co sprawdzić przed otwarciem dowolnego urządzenia', value: 49 },
    ],
  },

  // 5-6 · Oferta, botón de compra y medios de pago (logos: `paymentMethods`)
  offer: {
    valueTotalLabel: 'Łączna wartość:',
    // Mini texto sobre el botón, siempre visible (se gire o no la ruleta).
    dealLabel: 'Z Twoim rabatem 40%:',
    countdownLabel: 'Oferta kończy się za',
    // El botón abre el mini carrito (textos en `cart`).
    cta: 'Chcę mój kurs',
    secure: 'W 100% bezpieczny zakup',
    error: 'Nie udało się otworzyć płatności. Spróbuj ponownie za kilka sekund.',
    unavailable: 'Wkrótce dostępne.',
    loading: 'Ładowanie',
  },

  // Ruleta de descuentos que se abre al entrar (solo la primera visita).
  // El PRIMER sector es el premio: la ruleta siempre termina ahí, después de
  // pasar muy despacio por el segundo. El precio que se cobra no cambia
  // (PRICE_MAIN): si cambias el 40%, revisa también `offer.dealLabel`.
  wheel: {
    title: 'Zakręć kołem i odbierz swój rabat',
    segments: ['40%', '5%', '20%', '10%', '25%', '15%'],
    spin: 'Zakręć',
    wonTitle: 'Wygrywasz rabat 40%!',
    claim: 'Odbierz',
    close: 'Zamknij',
  },

  // Mini carrito: se abre al pulsar el botón de compra. La guía (order bump) se
  // añade o se quita desde aquí; "Ir al checkout" lleva al pago de Dodo.
  cart: {
    label: 'Twoje zamówienie',
    close: 'Zamknij',
    mainName: 'Kurs Naprawy Sprzętu AGD',
    bumpName: 'Przewodnik po częściach zamiennych: gdzie kupić każdą część najtaniej w Polsce',
    totalLabel: 'Razem',
    cta: 'Przejdź do płatności',
  },

  // 7 · Garantía de 30 días (sello en SVG, sin imagen)
  guarantee: {
    days: 30,
    sealTop: 'GWARANCJA',
    sealUnit: 'DNI',
    title: 'Gwarancja 30 dni',
    text: 'Jeśli kurs Ci się nie spodoba, zwrócimy Ci pieniądze.',
  },

  // 8 · Cómo lo vas a recibir
  delivery: {
    title: 'Jak go otrzymasz',
    steps: [
      'Płacisz bezpiecznie',
      'Od razu pobierasz swoje pliki PDF',
      'Pobierasz materiały i są Twoje na zawsze',
    ],
    // Sellos de confianza bajo los pasos (orden = SEAL_ICONS en Landing.tsx).
    seals: [
      'Natychmiastowy dostęp',
      'Twój na zawsze',
      'Gwarancja 30 dni: jeśli Cię nie przekona, zwrócimy Ci pieniądze',
    ],
  },

  // 9 · Prueba social (solo se muestra si `testimonials` tiene elementos)
  reviews: {
    title: 'Co mówią ci, którzy już go przeszli',
  },

  // 10 · Preguntas frecuentes
  faq: {
    title: 'Najczęstsze pytania',
    items: [
      { q: 'Czy potrzebuję doświadczenia?', a: 'Nie. Zaczynasz od zera.' },
      { q: 'Jakich narzędzi potrzebuję?', a: 'Kilku śrubokrętów, multimetru i niewiele więcej.' },
      { q: 'W jakiej formie go dostanę?', a: 'W PDF, do czytania na telefonie, tablecie lub komputerze.' },
      { q: 'Kiedy go otrzymam?', a: 'Od razu. Pobierasz go ze strony zaraz po zapłacie.' },
      { q: 'Czy jest gwarancja?', a: 'Tak, 30 dni. Jeśli kurs Ci się nie spodoba, zwrócimy Ci pieniądze.' },
    ],
  },

  // Footer
  footer: {
    privacy: 'Prywatność',
    terms: 'Regulamin',
    contact: 'Kontakt:',
  },

  // Upsell tras el pago (/gracias-oferta)
  upsell: {
    title: 'Zaczekaj! Twoje zamówienie jest prawie gotowe',
    confirmed: 'Płatność potwierdzona. Zanim skończysz, zobacz to:',
    product: 'AGD jak nowe',
    subtitle: 'Usuń nieprzyjemne zapachy, kamień i tłuszcz z pralki, zmywarki, piekarnika i lodówki',
    // Imagen opcional: upsell.webp (1000x800). Si no existe, no se muestra nada.
    imageAlt: 'AGD jak nowe',
    bullets: [
      'Pralka bez nieprzyjemnych zapachów',
      'Zmywarka bez kamienia',
      'Piekarnik i lodówka bez tłuszczu',
    ],
    yes: 'Tak, dodaj za {upsellPrice}',
    no: 'Nie, dziękuję',
    under: 'Jednorazowa płatność {upsellPrice}. Otworzy się osobna, bezpieczna płatność.',
    notPaidTitle: 'Nie udało się potwierdzić Twojej płatności',
    notPaidBody: 'Jeśli płatność została już wykonana, odśwież tę stronę za kilka sekund. Jeśli nie, możesz spróbować ponownie.',
    notPaidBack: 'Wróć do oferty',
  },

  // Gracias final (/gracias): un botón de descarga por cada PDF comprado.
  // (Los PDF y el texto de cada botón están en `electrodomesticos-pl-entrega.ts`.)
  thanks: {
    title: 'Dziękujemy! Pobierz tutaj swój zakup',
    pendingTitle: 'Potwierdzamy Twoją płatność…',
    notPaidTitle: 'Nie udało się potwierdzić Twojej płatności',
    notPaidBack: 'Wróć do oferty',
  },

  // Páginas legales
  legal: {
    privacyTitle: 'Polityka prywatności',
    privacyBody: [
      'Przetwarzamy Twoje dane (imię, e-mail i dane płatności) wyłącznie w celu realizacji zakupu i zapewnienia Ci dostępu do kupionego kursu.',
      'Płatność jest obsługiwana bezpiecznie przez Dodo Payments; nie przechowujemy danych Twojej karty.',
      'Używamy plików cookie i pikseli pomiarowych (w tym Meta), aby sprawdzać skuteczność naszych reklam. Możesz je zablokować w swojej przeglądarce.',
      'Możesz poprosić o dostęp do swoich danych, ich poprawienie lub usunięcie, pisząc do nas e-mailem.',
    ],
    termsTitle: 'Regulamin',
    termsBody: [
      'Dokonując zakupu, zgadzasz się na otrzymanie produktu cyfrowego (kursu i materiałów w PDF), który pobierasz ze strony zaraz po płatności.',
      'Kurs ma charakter edukacyjny. Zawsze pracuj przy urządzeniu odłączonym od prądu i stosuj się do zasad bezpieczeństwa. Prace przy obiegu czynnika chłodniczego może wykonywać wyłącznie certyfikowany technik. Każdy odpowiada za naprawy, które wykonuje.',
      'Ewentualne zarobki zależą od Twojego zaangażowania i okolicy; nie gwarantujemy konkretnych wyników finansowych.',
      'Oferujemy 30-dniową gwarancję zwrotu pieniędzy: jeśli kurs okaże się dla Ciebie nieprzydatny, zwrócimy Ci zapłaconą kwotę.',
      'Płatność jest jednorazowa, bez subskrypcji i cyklicznych opłat.',
    ],
    back: 'Wstecz',
  },
};

// ── Helpers (no hace falta tocarlos) ───────────────────────────────────────
export function eur(n: number): string {
  // Importes en PLN, redondos sin decimales: 72 zł · 120 zł
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: CURRENCY,
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
  }).format(n);
}

export const PRICE_WITH_BUMP = Math.round((PRICE_MAIN + PRICE_BUMP) * 100) / 100;

/** Sustituye {price}, {bumpPrice}, {upsellPrice}, {total} y {valueTotal}. */
export function fill(s: string, total: number = PRICE_MAIN): string {
  return s
    .replaceAll('{price}', eur(PRICE_MAIN))
    .replaceAll('{bumpPrice}', eur(PRICE_BUMP))
    .replaceAll('{upsellPrice}', eur(PRICE_UPSELL))
    .replaceAll('{total}', eur(total))
    .replaceAll('{valueTotal}', eur(VALUE_TOTAL));
}
