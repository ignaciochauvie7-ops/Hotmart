/**
 * Versión ALEMANA (Alemania) de la landing (/electrodomesticos/de/*): copia de
 * `electrodomesticos-pl.ts` con los textos en alemán (duzen) y los productos de Dodo de Alemania.
 * Precios fijos en EUR (iguales a /it/). Mismas imágenes (salvo hero y pack, propias de /de)
 * y mismos eventos del pixel que /pl/ (con currency EUR).
 * Todo lo editable vive aquí: precios, IDs de Dodo, fecha límite, reseñas y textos.
 * (Los PDF que se entregan tras el pago están en
 *  `electrodomesticos-de-entrega.ts`, que solo se usa en el servidor.)
 *
 * En los textos se pueden usar estas marcas, que se sustituyen solas:
 *   {price} → precio principal · {bumpPrice} → order bump · {upsellPrice} → upsell
 *   {total} → principal + bump · {valueTotal} → valor total de la oferta (VALUE_TOTAL)
 */

// ── Precios ────────────────────────────────────────────────────────────────
export const CURRENCY = 'EUR';
// Valores del pixel (salen de aquí): Purchase 17,00 · 21,90 con el bump · 8,90 el upsell.
// OJO: el importe que se cobra lo fija el producto en Dodo; debe coincidir con estos precios.
export const PRICE_MAIN = 17;
export const PRICE_BUMP = 4.9;
// Precio anterior de la guía (sale tachado en el mini carrito).
export const PRICE_BUMP_WAS = 7.9;
export const PRICE_UPSELL = 8.9;

// ── IDs de producto de Dodo Payments (no son secretos) ─────────────────────
// Vacío = el botón de compra aparece deshabilitado (con aviso en dev).
// Productos de Alemania, precio fijo en EUR (17 € · 4,90 € · 8,90 €).
export const DODO_PRODUCT_MAIN = 'pdt_0NsENjlTziMBgmeVs4JFl';
// Bump: «Ersatzteil-Ratgeber» · Upsell: «Haushaltsgeräte wie neu».
export const DODO_PRODUCT_BUMP = 'pdt_0NsENjq1lEcupM9VP0KgP';
export const DODO_PRODUCT_UPSELL = 'pdt_0NsENjudMBeGpByPP3ZOt';

// ── Post compra (raspa y gana + 3 extras con cobro en 1 clic) ─────────────
// Recorrido tras el pago: raspa y gana (upsell) → 3 extras → /gracias.
// Se cobra a la tarjeta guardada (sin checkout): ver src/lib/electrodomesticos/oneclick.ts
// Precio «normal» tachado del upsell en el raspa y gana (se cobra PRICE_UPSELL).
export const PRICE_UPSELL_WAS = 17.9;
// 3 extras de la segunda pantalla (mismo orden que los PDF de entrega).
// IDs de Dodo: vacío = ese extra no se muestra ni se puede cobrar.
export const DODO_PRODUCT_EXTRA_1 = 'pdt_0NsFPb0P4AvLRfPUvjNSf';
export const DODO_PRODUCT_EXTRA_2 = 'pdt_0NsFPb4n28SzJ7ttXNRNP';
export const DODO_PRODUCT_EXTRA_3 = 'pdt_0NsFPb97yhnodoYEBkPvO';
// `was` = precio tachado · `price` = precio que se cobra (debe coincidir con Dodo).
// `cover` = portada en /public/electrodomesticos/.
export const EXTRAS: { name: string; benefit: string; cover: string; was: number; price: number }[] = [
  { name: 'Wartungskalender für 12 Monate', benefit: '10 Minuten im Monat und du sparst dir den Techniker.', cover: 'extra-1-de.webp', was: 7.9, price: 2.9 },
  { name: 'Spar bei deiner Stromrechnung', benefit: 'Zahl jeden Monat weniger Strom, ohne etwas zu kaufen.', cover: 'extra-2-de.webp', was: 8.9, price: 3.4 },
  { name: 'Das Multimeter in 15 Minuten', benefit: 'Finde das kaputte Teil, bevor du Geld für ein neues ausgibst.', cover: 'extra-3-de.webp', was: 9.9, price: 3.9 },
];
// Textos de las dos pantallas post compra.
export const postTexts = {
  scratchTitle: 'Rubbel und entdecke deinen Rabatt',
  scratchHint: 'HIER RUBBELN',
  off: '50 % RABATT',
  giftsTitle: 'Wähle ein Geschenk',
  giftAria: 'Geschenk öffnen',
  yes: 'ICH WILL ES!',
  no: 'Nein, danke',
  error: 'Die Zahlung konnte nicht abgeschlossen werden.',
  loading: 'Wird geladen',
};

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
// (las mismas que /pl/; solo cambian los nombres y los textos).
export const testimonials: Testimonial[] = [
  {
    name: 'Thomas',
    photo: 'testimonio-1.webp',
    text: "Früher habe ich jedes Mal, wenn meine Waschmaschine ein Problem hatte, am Ende einen Techniker bezahlt. Die letzte Reparatur hat mich fast 100 € gekostet. Im Kurs habe ich gelernt, den Fehler zu erkennen und ihn selbst zu beheben. Was ich für den Kurs bezahlt habe, hat sich schon mehrfach ausgezahlt.",
  },
  {
    name: 'Sabine',
    photo: 'testimonio-2.webp',
    text: "Meine Spülmaschine hat nicht mehr abgepumpt und ich dachte, ich müsste mir eine neue kaufen. Ich bin den Erklärungen im Kurs gefolgt, habe das Problem gefunden und es behoben, ohne jemanden anzurufen. Ich habe ordentlich Geld gespart und fühle mich jetzt viel sicherer.",
  },
  {
    name: 'Michael',
    photo: 'testimonio-3.webp',
    text: "Mein Kühlschrank hat immer schlechter gekühlt, und ein Techniker wollte über 150 € für Prüfung und Reparatur. Dank des Kurses habe ich gelernt zu prüfen, was kaputt sein könnte. Es hat mich überrascht, wie viel man ganz ohne Vorkenntnisse lernen kann.",
  },
  {
    name: 'Stefan',
    photo: 'testimonio-4.webp',
    text: "Mein Backofen hat ungleichmäßig geheizt, und ich habe die Reparatur monatelang aufgeschoben, weil ich Angst vor den Kosten hatte. Mit den Erklärungen aus dem Kurs habe ich das Problem gefunden und behoben. Das Beste ist, dass ich jetzt weiß, wie ich auch andere Störungen angehe.",
  },
  {
    name: 'Claudia',
    photo: 'testimonio-5.webp',
    text: "Ich habe kleine Haushaltsgeräte immer weggeworfen, weil ich dachte, eine Reparatur lohnt sich nicht. Inzwischen habe ich schon meine Kaffeemaschine und meinen Staubsauger repariert. Der Kurs hat mich viel weniger gekostet als eine einzige Reparatur, und ich bin begeistert.",
  },
  {
    name: 'Andreas',
    photo: 'testimonio-6.webp',
    text: "Angefangen habe ich mit kleinen Reparaturen zu Hause, und am Ende habe ich Familie und Nachbarn geholfen. Heute bezahlen mich einige dafür, dass ich mich um ihre Haushaltsgeräte kümmere, und ich habe jeden Monat ein zusätzliches Einkommen. Ich hätte nie gedacht, dass mir so ein Kurs so viel bringt.",
  },
];

// ── Medios de pago mostrados bajo el botón de compra ──────────────────────
// Deja solo los que estén activos en tu cuenta de Dodo para EUR.
// Los logos están en /public/electrodomesticos/pay/.
export const paymentMethods: { file: string; alt: string }[] = [
  { file: 'visa.svg', alt: 'Visa' },
  { file: 'mastercard.svg', alt: 'Mastercard' },
  { file: 'amex.svg', alt: 'American Express' },
  { file: 'apple-pay.svg', alt: 'Apple Pay' },
  { file: 'google-pay.svg', alt: 'Google Pay' },
];

// ── Rutas ──────────────────────────────────────────────────────────────────
export const BASE_PATH = '/electrodomesticos/de';
// Mismas imágenes que /pl/ (hero y pack con sufijo -de).
export const IMG_PATH = '/electrodomesticos';

// ── Textos ─────────────────────────────────────────────────────────────────
export const PRODUCT_NAME = 'Kompletter Reparaturkurs für Haushaltsgeräte';

export const texts = {
  meta: {
    title: 'Kompletter Reparaturkurs für Haushaltsgeräte',
    description: 'Lerne in 30 Tagen, deine Haushaltsgeräte selbst zu reparieren – ganz ohne Vorkenntnisse. Kurs als PDF, Schritt für Schritt.',
    upsellTitle: 'Deine Bestellung ist fast fertig — Reparaturkurs für Haushaltsgeräte',
    thanksTitle: 'Danke! — Reparaturkurs für Haushaltsgeräte',
    legalSuffix: 'Reparaturkurs für Haushaltsgeräte',
  },

  // 1 · Promesa + imagen principal (hero-mockup-de.webp)
  hero: {
    // El titular visible va dentro de hero-mockup-de.webp; este texto es el h1 oculto y el alt.
    h1: 'Vom Anfänger zum Haushaltsgeräte-Profi in 30 Tagen',
    imageAlt: 'Vom Anfänger zum Haushaltsgeräte-Profi in 30 Tagen',
    // Franja de prueba social sobre la imagen. Usa solo cifras reales.
    // Fotos: perfil-1.webp … perfil-4.webp (96x96) en /public/electrodomesticos/.
    trust: 'Über 3.000 Menschen haben den Kurs schon begonnen',
    rating: '4,9',
    ratingAria: 'Bewertung 4,9 von 5',
    avatars: 4,
  },

  // 2 · Esto es para ti si… (5 dolores)
  pains: {
    title: 'Das ist für dich, wenn…',
    items: [
      'Du 60 € zahlst, nur damit ein Techniker vorbeikommt und kurz draufschaut',
      'Du Geräte wegwirfst, die sich in wenigen Minuten hätten reparieren lassen',
      'Dich jede Panne Geld kostet, weil du nicht einmal weißt, wo du anfangen sollst',
      'Du ein kaputtes Gerät zu Hause hast und dich nicht traust, es aufzuschrauben',
      'Du nicht weißt, ob sich eine Reparatur lohnt oder ob du besser ein neues kaufst',
    ],
  },

  // 3 · Antes y después (3 filas "Antes → Ahora")
  beforeAfter: {
    title: 'Vorher und nachher',
    beforeLabel: 'Vorher',
    afterLabel: 'Jetzt',
    rows: [
      { before: 'Du zahlst dem Techniker 60 € nur fürs Draufschauen', after: 'Du reparierst es selbst in wenigen Minuten' },
      { before: 'Du wirfst das Gerät weg, ohne zu wissen, was ihm fehlt', after: 'Du verstehst, was kaputt ist, und reparierst es' },
      { before: 'Jede Panne kostet dich Geld', after: 'Du sparst jedes Mal, wenn etwas kaputtgeht' },
    ],
  },

  // 4 · Producto principal con sus bonus (un solo bloque).
  // Mockups: oferta-pack-de.webp · bonus-1.webp … bonus-5.webp
  product: {
    name: PRODUCT_NAME,
    imageAlt: PRODUCT_NAME,
    // Precio anterior del curso (sale tachado junto al precio real).
    courseValue: 29.9,
    // Fila del producto principal en el cuadro (con el precio).
    rowName: 'Kompletter Kurs (10 Module)',
    // Título sobre la lista de bonus. Portadas en el mismo orden: bonus-1.webp … bonus-5.webp
    // `value` = precio que sale tachado en cada bonus.
    bonusTitle: 'Zusätzliche Boni gratis dazu!',
    bonus: [
      { title: 'Schnellhilfe: Was ist mit deinem Gerät los?', value: 14.9 },
      { title: 'Die 10 Störungen, die sich in unter 10 Minuten beheben lassen', value: 9.9 },
      { title: 'Reparieren oder neu kaufen?', value: 7.9 },
      { title: 'Das Werkzeug, das du brauchst – für unter 50 €', value: 9.9 },
      { title: 'Sicherheit: Was du vor dem Öffnen jedes Geräts prüfen musst', value: 12.9 },
    ],
  },

  // 5-6 · Oferta, botón de compra y medios de pago (logos: `paymentMethods`)
  offer: {
    valueTotalLabel: 'Gesamtwert:',
    // Mini texto sobre el botón, siempre visible (se gire o no la ruleta).
    // Línea sobre el botón: «Nur heute sparst du X» (X = SAVINGS).
    savingsLabel: 'Nur heute sparst du',
    // Etiqueta junto al precio tachado de cada bonus.
    freeTag: 'HEUTE GRATIS',
    // Línea corta justo encima del botón de compra.
    trustLine: 'Sofortiger Zugang · einmalige Zahlung · 30 Tage Garantie',
    countdownLabel: 'Das Angebot endet in',
    // El botón abre el mini carrito (textos en `cart`).
    cta: 'Ich will meinen Kurs',
    secure: '100 % sicherer Kauf',
    error: 'Die Zahlung konnte nicht geöffnet werden. Versuch es in ein paar Sekunden noch einmal.',
    unavailable: 'Bald verfügbar.',
    loading: 'Wird geladen',
  },

  // Ruleta de descuentos que se abre al entrar (solo la primera visita).
  // El PRIMER sector es el premio: la ruleta siempre termina ahí, después de
  // pasar muy despacio por el segundo. El precio que se cobra no cambia
  // (PRICE_MAIN).
  wheel: {
    title: 'Dreh am Rad und hol dir deinen Rabatt',
    segments: ['40%', '5%', '20%', '10%', '25%', '15%'],
    spin: 'Drehen',
    wonTitle: 'Du gewinnst 40 % Rabatt!',
    claim: 'Einlösen',
    close: 'Schließen',
  },

  // Mini carrito: se abre al pulsar el botón de compra. La guía (order bump) se
  // añade o se quita desde aquí; "Ir al checkout" lleva al pago de Dodo.
  cart: {
    label: 'Deine Bestellung',
    close: 'Schließen',
    mainName: 'Reparaturkurs für Haushaltsgeräte',
    bumpName: 'Ersatzteil-Ratgeber: wo du jedes Teil in Deutschland am günstigsten kaufst',
    totalLabel: 'Gesamt',
    cta: 'Weiter zur Zahlung',
  },

  // 7 · Garantía de 30 días (sello en SVG, sin imagen)
  guarantee: {
    days: 30,
    sealTop: 'GARANTIE',
    sealUnit: 'TAGE',
    title: '30 Tage Garantie',
    text: 'Wenn dir der Kurs nicht gefällt, bekommst du dein Geld zurück.',
  },

  // 8 · Cómo lo vas a recibir
  delivery: {
    title: 'So bekommst du ihn',
    steps: [
      'Du bezahlst sicher',
      'Du lädst deine PDFs sofort herunter',
      'Du lädst die Inhalte herunter und sie gehören für immer dir',
    ],
    // Sellos de confianza bajo los pasos (orden = SEAL_ICONS en Landing.tsx).
    seals: [
      'Sofortiger Zugang',
      'Gehört für immer dir',
      '30 Tage Garantie: Wenn er dich nicht überzeugt, bekommst du dein Geld zurück',
    ],
  },

  // 9 · Prueba social (solo se muestra si `testimonials` tiene elementos)
  reviews: {
    title: 'Das sagen die, die ihn schon gemacht haben',
  },

  // 10 · Preguntas frecuentes
  faq: {
    title: 'Häufige Fragen',
    items: [
      { q: 'Brauche ich Erfahrung?', a: 'Nein. Du fängst bei null an.' },
      { q: 'Welches Werkzeug brauche ich?', a: 'Ein paar Schraubendreher, ein Multimeter und nicht viel mehr.' },
      { q: 'In welcher Form bekomme ich ihn?', a: 'Als PDF, zum Lesen auf deinem Handy, Tablet oder Computer.' },
      { q: 'Wann bekomme ich ihn?', a: 'Sofort. Du lädst ihn direkt nach der Zahlung auf der Seite herunter.' },
      { q: 'Gibt es eine Garantie?', a: 'Ja, 30 Tage. Wenn dir der Kurs nicht gefällt, bekommst du dein Geld zurück.' },
    ],
  },

  // Footer
  footer: {
    privacy: 'Datenschutz',
    terms: 'AGB',
    contact: 'Kontakt:',
  },

  // Upsell tras el pago (/gracias-oferta)
  upsell: {
    title: 'Warte! Deine Bestellung ist fast fertig',
    confirmed: 'Zahlung bestätigt. Bevor du fertig bist, schau dir das an:',
    product: 'Haushaltsgeräte wie neu',
    benefit: 'Deine Geräte halten Jahre länger – ohne Defekte durch Schmutz.',
    subtitle: 'Entferne schlechte Gerüche, Kalk und Fett aus Waschmaschine, Spülmaschine, Backofen und Kühlschrank',
    // Imagen opcional: upsell.webp (1000x800). Si no existe, no se muestra nada.
    imageAlt: 'Haushaltsgeräte wie neu',
    bullets: [
      'Waschmaschine ohne schlechte Gerüche',
      'Spülmaschine ohne Kalk',
      'Backofen und Kühlschrank ohne Fett',
    ],
    yes: 'Ja, für {upsellPrice} hinzufügen',
    no: 'Nein, danke',
    under: 'Einmalige Zahlung von {upsellPrice}. Es öffnet sich eine separate, sichere Zahlung.',
    notPaidTitle: 'Wir konnten deine Zahlung nicht bestätigen',
    notPaidBody: 'Wenn du schon bezahlt hast, lade diese Seite in ein paar Sekunden neu. Wenn nicht, kannst du es noch einmal versuchen.',
    notPaidBack: 'Zurück zum Angebot',
  },

  // Gracias final (/gracias): un botón de descarga por cada PDF comprado.
  // (Los PDF y el texto de cada botón están en `electrodomesticos-de-entrega.ts`.)
  thanks: {
    title: 'Danke! Hier kannst du deinen Kauf herunterladen',
    pendingTitle: 'Wir bestätigen deine Zahlung…',
    notPaidTitle: 'Wir konnten deine Zahlung nicht bestätigen',
    notPaidBack: 'Zurück zum Angebot',
  },

  // Páginas legales
  legal: {
    privacyTitle: 'Datenschutzerklärung',
    privacyBody: [
      'Wir verwenden deine Daten (Name, E-Mail und Zahlungsdaten) nur, um deinen Kauf abzuwickeln und dir Zugang zum gekauften Kurs zu geben.',
      'Die Zahlung wird sicher über Dodo Payments abgewickelt; wir speichern deine Kartendaten nicht.',
      'Wir verwenden Cookies und Messpixel (darunter den von Meta), um zu sehen, wie unsere Anzeigen funktionieren. Du kannst sie in deinem Browser blockieren.',
      'Du kannst per E-Mail Auskunft über deine Daten, deren Berichtigung oder Löschung verlangen.',
    ],
    termsTitle: 'Allgemeine Geschäftsbedingungen',
    termsBody: [
      'Mit dem Kauf stimmst du zu, ein digitales Produkt (Kurs und Inhalte als PDF) zu erhalten, das du direkt nach der Zahlung auf der Seite herunterlädst.',
      'Der Kurs dient der Weiterbildung. Arbeite immer mit vom Strom getrenntem Gerät und halte dich an die Sicherheitshinweise. Arbeiten am Kältemittelkreislauf darf nur ein zertifizierter Techniker durchführen. Jeder ist für die Reparaturen verantwortlich, die er selbst durchführt.',
      'Mögliche Einnahmen hängen von deinem Einsatz und deiner Region ab; wir garantieren keine bestimmten finanziellen Ergebnisse.',
      'Wir bieten eine 30-tägige Geld-zurück-Garantie: Wenn dir der Kurs nichts bringt, erstatten wir dir den bezahlten Betrag.',
      'Die Zahlung ist einmalig, ohne Abo und ohne wiederkehrende Kosten.',
    ],
    back: 'Zurück',
  },
};

// ── Helpers (no hace falta tocarlos) ───────────────────────────────────────
export function eur(n: number): string {
  // Importes redondos sin decimales: 17 € · 4,90 €
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: CURRENCY,
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
  }).format(n);
}

// "Valor total": precio tachado del curso + precios tachados de los bonus.
export const VALUE_TOTAL =
  Math.round((texts.product.courseValue + texts.product.bonus.reduce((a, b) => a + b.value, 0)) * 100) / 100;
// Ahorro que se muestra sobre el botón: valor total − precio final.
export const SAVINGS = Math.round((VALUE_TOTAL - PRICE_MAIN) * 100) / 100;

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
