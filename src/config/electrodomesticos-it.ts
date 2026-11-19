/**
 * Versión ITALIANA de la landing (/electrodomesticos/it/*): copia de `electrodomesticos.ts`
 * con los textos en italiano y los productos de Dodo de Italia. Mismos precios,
 * mismas imágenes y mismos eventos del pixel que /es/.
 * Todo lo editable vive aquí: precios, IDs de Dodo, fecha límite, reseñas y textos.
 * (Los PDF que se entregan tras el pago están en
 *  `electrodomesticos-it-entrega.ts`, que solo se usa en el servidor.)
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
export const DODO_PRODUCT_MAIN = 'pdt_0Ns260syX4fKMKDgTVy6i';
// Bump: «Guida ai Pezzi di Ricambio» · Upsell: «Elettrodomestici Come Nuovi».
export const DODO_PRODUCT_BUMP = 'pdt_0Ns268IJTa37frP9FjBVh';
export const DODO_PRODUCT_UPSELL = 'pdt_0Ns26FzMBhEbToU6GWJq5';

// ── Post compra (raspa y gana + 3 extras con cobro en 1 clic) ─────────────
// Recorrido tras el pago: raspa y gana (upsell) → 3 extras → /gracias.
// Se cobra a la tarjeta guardada (sin checkout): ver src/lib/electrodomesticos/oneclick.ts
// Precio «normal» tachado del upsell en el raspa y gana (se cobra PRICE_UPSELL).
export const PRICE_UPSELL_WAS = 17.9;
// 3 extras de la segunda pantalla (mismo orden que los PDF de entrega).
// IDs de Dodo: vacío = ese extra no se muestra ni se puede cobrar.
export const DODO_PRODUCT_EXTRA_1 = 'pdt_0NsFPaYVnzBOOdW8CPFFJ';
export const DODO_PRODUCT_EXTRA_2 = 'pdt_0NsFPackiOylLtuK0tYOV';
export const DODO_PRODUCT_EXTRA_3 = 'pdt_0NsFPahvlp4BavDUh0bTX';
// `was` = precio tachado · `price` = precio que se cobra (debe coincidir con Dodo).
// `cover` = portada en /public/electrodomesticos/.
export const EXTRAS: { name: string; benefit: string; cover: string; was: number; price: number }[] = [
  { name: 'Calendario di manutenzione in 12 mesi', benefit: '10 minuti al mese e niente più chiamate al tecnico.', cover: 'extra-1-it.webp', was: 7.9, price: 2.9 },
  { name: 'Risparmia sulla bolletta della luce', benefit: 'Paghi meno luce ogni mese, senza comprare nulla.', cover: 'extra-2-it.webp', was: 8.9, price: 3.4 },
  { name: 'Il multimetro in 15 minuti', benefit: 'Scopri quale pezzo è rotto prima di comprarne uno nuovo.', cover: 'extra-3-it.webp', was: 9.9, price: 3.9 },
];
// Textos de las dos pantallas post compra.
export const postTexts = {
  scratchTitle: 'Gratta e scopri il tuo sconto',
  scratchHint: 'GRATTA QUI',
  off: '50% DI SCONTO',
  giftsTitle: 'Scegli un regalo',
  giftAria: 'Apri il regalo',
  yes: 'LO VOGLIO!',
  no: 'No, grazie',
  error: 'Non siamo riusciti a completare il pagamento.',
  loading: 'Caricamento',
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
// (las mismas que /es/; solo cambian los nombres y los textos).
export const testimonials: Testimonial[] = [
  {
    name: 'Giuseppe',
    photo: 'testimonio-1.webp',
    text: "Prima, ogni volta che la lavatrice aveva un problema, finivo per pagare il tecnico. L'ultima riparazione mi era costata quasi 100 €. Con il corso ho imparato a individuare il guasto e a risolverlo da solo. Ho già recuperato più volte quello che ho pagato per il corso.",
  },
  {
    name: 'Maria',
    photo: 'testimonio-2.webp',
    text: "La mia lavastoviglie non scaricava più l'acqua e pensavo di doverne comprare una nuova. Ho seguito le spiegazioni del corso, ho trovato il problema e sono riuscita a risolverlo senza chiamare nessuno. Ho risparmiato parecchi soldi e ora ho molta più fiducia in me stessa.",
  },
  {
    name: 'Francesco',
    photo: 'testimonio-3.webp',
    text: "Il mio frigorifero raffreddava sempre meno e un tecnico mi aveva fatto un preventivo di oltre 150 € per controllarlo e ripararlo. Grazie al corso ho imparato a verificare cosa poteva non funzionare. Mi ha sorpreso quanto si possa imparare senza alcuna esperienza.",
  },
  {
    name: 'Antonio',
    photo: 'testimonio-4.webp',
    text: "Il mio forno scaldava in modo irregolare e da mesi rimandavo la riparazione per quanto poteva costare. Con le spiegazioni del corso sono riuscito a individuare il problema e a sistemarlo. La cosa migliore è che ora so come affrontare altri guasti.",
  },
  {
    name: 'Laura',
    photo: 'testimonio-5.webp',
    text: "Finivo sempre per buttare i piccoli elettrodomestici perché pensavo che ripararli non ne valesse la pena. Ho già risolto un problema della mia macchina del caffè e uno dell'aspirapolvere. Il corso mi è costato molto meno di una sola riparazione e sono entusiasta.",
  },
  {
    name: 'Davide',
    photo: 'testimonio-6.webp',
    text: "Ho iniziato con piccole riparazioni in casa e ho finito per aiutare parenti e vicini. Ora alcune persone mi pagano per dare una mano con i loro elettrodomestici e ogni mese ho un'entrata extra. Non avrei mai pensato che un corso così potesse essermi tanto utile.",
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
export const BASE_PATH = '/electrodomesticos/it';
// Mismas imágenes que /es/.
export const IMG_PATH = '/electrodomesticos';

// ── Textos ─────────────────────────────────────────────────────────────────
export const PRODUCT_NAME = 'Corso Completo di Riparazione Elettrodomestici';

export const texts = {
  meta: {
    title: 'Corso Completo di Riparazione Elettrodomestici',
    description: 'Impara a riparare i tuoi elettrodomestici da zero in 30 giorni. Corso in PDF, passo dopo passo.',
    upsellTitle: 'Il tuo ordine è quasi completo — Corso di Riparazione Elettrodomestici',
    thanksTitle: 'Grazie! — Corso di Riparazione Elettrodomestici',
    legalSuffix: 'Corso di Riparazione Elettrodomestici',
  },

  // 1 · Promesa + imagen principal (hero-mockup-it.webp)
  hero: {
    // El titular visible va dentro de hero-mockup-it.webp; este texto es el h1 oculto y el alt.
    h1: 'Da zero a esperto di elettrodomestici in 30 giorni',
    imageAlt: 'Da zero a esperto di elettrodomestici in 30 giorni',
    // Franja de prueba social sobre la imagen. Usa solo cifras reales.
    // Fotos: perfil-1.webp … perfil-4.webp (96x96) en /public/electrodomesticos/.
    trust: 'Oltre 3.000 persone hanno già iniziato il corso',
    rating: '4,9',
    ratingAria: 'Valutazione 4,9 su 5',
    avatars: 4,
  },

  // 2 · Esto es para ti si… (5 dolores)
  pains: {
    title: 'Fa per te se…',
    items: [
      'Paghi 60 € solo perché il tecnico venga a dare un’occhiata',
      'Butti via elettrodomestici che si sistemavano in pochi minuti',
      'Ogni guasto ti costa soldi perché non sai nemmeno da dove cominciare',
      'Hai un apparecchio rotto in casa e non hai il coraggio di aprirlo',
      'Non sai se ti conviene ripararlo o comprarne uno nuovo',
    ],
  },

  // 3 · Antes y después (3 filas "Antes → Ahora")
  beforeAfter: {
    title: 'Prima e dopo',
    beforeLabel: 'Prima',
    afterLabel: 'Adesso',
    rows: [
      { before: 'Paghi 60 € al tecnico solo per un’occhiata', after: 'Lo ripari da solo in pochi minuti' },
      { before: 'Butti l’apparecchio senza sapere cos’ha', after: 'Capisci cosa non va e lo ripari' },
      { before: 'Ogni guasto ti costa soldi', after: 'Risparmi ogni volta che qualcosa si rompe' },
    ],
  },

  // 4 · Producto principal con sus bonus (un solo bloque).
  // Mockups: oferta-pack-it.webp · bonus-1.webp … bonus-5.webp
  product: {
    name: PRODUCT_NAME,
    imageAlt: PRODUCT_NAME,
    // Precio anterior del curso (sale tachado junto al precio real).
    courseValue: 29.9,
    // Fila del producto principal en el cuadro (con el precio).
    rowName: 'Corso completo (10 moduli)',
    // Título sobre la lista de bonus. Portadas en el mismo orden: bonus-1.webp … bonus-5.webp
    // `value` = precio que sale tachado en cada bonus.
    bonusTitle: 'Bonus extra in regalo!',
    bonus: [
      { title: 'Guida rapida: cos’ha il tuo apparecchio', value: 14.9 },
      { title: 'I 10 guasti che si riparano in meno di 10 minuti', value: 9.9 },
      { title: 'Quando ripararlo e quando comprarne uno nuovo', value: 7.9 },
      { title: 'Gli attrezzi che ti servono con meno di 50 €', value: 9.9 },
      { title: 'Sicurezza: cosa controllare prima di aprire qualsiasi apparecchio', value: 12.9 },
    ],
  },

  // 5-6 · Oferta, botón de compra y medios de pago (logos: `paymentMethods`)
  offer: {
    valueTotalLabel: 'Valore totale:',
    // Mini texto sobre el botón, siempre visible (se gire o no la ruleta).
    // Línea sobre el botón: «Solo per oggi risparmi X» (X = SAVINGS).
    savingsLabel: 'Solo per oggi risparmi',
    // Etiqueta junto al precio tachado de cada bonus.
    freeTag: 'OGGI IN REGALO',
    // Línea corta justo encima del botón de compra.
    trustLine: 'Accesso immediato · pagamento unico · garanzia di 30 giorni',
    countdownLabel: 'L’offerta scade tra',
    // El botón abre el mini carrito (textos en `cart`).
    cta: 'Voglio il mio corso',
    secure: 'Acquisto sicuro al 100%',
    error: 'Non siamo riusciti ad aprire il pagamento. Riprova tra qualche secondo.',
    unavailable: 'Disponibile a breve.',
    loading: 'Caricamento',
  },

  // Ruleta de descuentos que se abre al entrar (solo la primera visita).
  // El PRIMER sector es el premio: la ruleta siempre termina ahí, después de
  // pasar muy despacio por el segundo. El precio que se cobra no cambia
  // (PRICE_MAIN).
  wheel: {
    title: 'Gira la ruota e ottieni il tuo sconto',
    segments: ['40%', '5%', '20%', '10%', '25%', '15%'],
    spin: 'Gira',
    wonTitle: 'Hai vinto uno sconto del 40%!',
    claim: 'Riscatta',
    close: 'Chiudi',
  },

  // Mini carrito: se abre al pulsar el botón de compra. La guía (order bump) se
  // añade o se quita desde aquí; "Ir al checkout" lleva al pago de Dodo.
  cart: {
    label: 'Il tuo ordine',
    close: 'Chiudi',
    mainName: 'Corso di Riparazione Elettrodomestici',
    bumpName: 'Guida ai pezzi di ricambio: dove comprare ogni pezzo al prezzo più basso in Italia',
    totalLabel: 'Totale',
    cta: 'Vai al checkout',
  },

  // 7 · Garantía de 30 días (sello en SVG, sin imagen)
  guarantee: {
    days: 30,
    sealTop: 'GARANZIA',
    sealUnit: 'GIORNI',
    title: 'Garanzia di 30 giorni',
    text: 'Se non sei soddisfatto, ti restituiamo i soldi.',
  },

  // 8 · Cómo lo vas a recibir
  delivery: {
    title: 'Come lo riceverai',
    steps: [
      'Paghi in modo sicuro',
      'Scarichi subito i tuoi PDF',
      'Scarichi il contenuto ed è tuo per sempre',
    ],
    // Sellos de confianza bajo los pasos (orden = SEAL_ICONS en Landing.tsx).
    seals: [
      'Accesso immediato',
      'Tuo per sempre',
      'Garanzia di 30 giorni: se non ti convince, ti restituiamo i soldi',
    ],
  },

  // 9 · Prueba social (solo se muestra si `testimonials` tiene elementos)
  reviews: {
    title: 'Cosa dice chi l’ha già fatto',
  },

  // 10 · Preguntas frecuentes
  faq: {
    title: 'Domande frequenti',
    items: [
      { q: 'Serve esperienza?', a: 'No. Si parte da zero.' },
      { q: 'Che attrezzi mi servono?', a: 'Qualche cacciavite, un multimetro e poco altro.' },
      { q: 'In che formato arriva?', a: 'In PDF, da leggere sul telefono, sul tablet o sul computer.' },
      { q: 'Quando lo ricevo?', a: 'Subito. Lo scarichi dalla pagina appena hai pagato.' },
      { q: 'C’è una garanzia?', a: 'Sì, 30 giorni. Se non sei soddisfatto, ti restituiamo i soldi.' },
    ],
  },

  // Footer
  footer: {
    privacy: 'Privacy',
    terms: 'Termini',
    contact: 'Contatto:',
  },

  // Upsell tras el pago (/gracias-oferta)
  upsell: {
    title: 'Aspetta! Il tuo ordine è quasi completo',
    confirmed: 'Pagamento confermato. Prima di finire, guarda qui:',
    product: 'Elettrodomestici come nuovi',
    benefit: 'Durano anni in più, senza guasti per lo sporco.',
    subtitle: 'Elimina cattivi odori, calcare e grasso da lavatrice, lavastoviglie, forno e frigorifero',
    // Imagen opcional: upsell.webp (1000x800). Si no existe, no se muestra nada.
    imageAlt: 'Elettrodomestici come nuovi',
    bullets: [
      'Lavatrice senza cattivi odori',
      'Lavastoviglie senza calcare',
      'Forno e frigorifero senza grasso',
    ],
    yes: 'Sì, aggiungilo a {upsellPrice}',
    no: 'No, grazie',
    under: 'Pagamento unico di {upsellPrice}. Si apre un pagamento sicuro a parte.',
    notPaidTitle: 'Non siamo riusciti a confermare il tuo pagamento',
    notPaidBody: 'Se hai già pagato, ricarica questa pagina tra qualche secondo. Altrimenti, puoi riprovare.',
    notPaidBack: 'Torna all’offerta',
  },

  // Gracias final (/gracias): un botón de descarga por cada PDF comprado.
  // (Los PDF y el texto de cada botón están en `electrodomesticos-it-entrega.ts`.)
  thanks: {
    title: 'Grazie! Scarica qui il tuo acquisto',
    pendingTitle: 'Stiamo confermando il tuo pagamento…',
    notPaidTitle: 'Non siamo riusciti a confermare il tuo pagamento',
    notPaidBack: 'Torna all’offerta',
  },

  // Páginas legales
  legal: {
    privacyTitle: 'Informativa sulla privacy',
    privacyBody: [
      'Trattiamo i tuoi dati (nome, email e dati di pagamento) al solo scopo di elaborare il tuo acquisto e darti accesso al corso che hai acquistato.',
      'Il pagamento viene elaborato in modo sicuro tramite Dodo Payments; non conserviamo i dati della tua carta.',
      'Usiamo cookie e pixel di misurazione (incluso Meta) per capire il rendimento dei nostri annunci. Puoi bloccarli dal tuo browser.',
      'Puoi chiedere l’accesso, la rettifica o la cancellazione dei tuoi dati scrivendoci via email.',
    ],
    termsTitle: 'Termini e condizioni',
    termsBody: [
      'Con l’acquisto accetti di ricevere un prodotto digitale (corso e materiale in PDF) che scarichi dalla pagina subito dopo il pagamento.',
      'Il corso ha scopo formativo. Lavora sempre con l’apparecchio scollegato dalla corrente e segui le indicazioni di sicurezza. Gli interventi sul circuito del gas refrigerante possono essere eseguiti solo da un tecnico certificato. Ognuno è responsabile delle riparazioni che esegue.',
      'I guadagni che potrai ottenere dipendono dal tuo impegno e dalla tua zona; non garantiamo risultati economici specifici.',
      'Offriamo una garanzia di rimborso di 30 giorni: se il corso non ti è utile, ti restituiamo l’importo pagato.',
      'Il pagamento è unico, senza abbonamenti né addebiti ricorrenti.',
    ],
    back: 'Indietro',
  },
};

// ── Helpers (no hace falta tocarlos) ───────────────────────────────────────
export function eur(n: number): string {
  // Importes redondos sin decimales: 17 € · 4,90 €
  return new Intl.NumberFormat('it-IT', {
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
