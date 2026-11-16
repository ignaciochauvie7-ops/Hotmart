/**
 * Versión CHECA de la landing (/electrodomesticos/cs/*): copia de
 * `electrodomesticos-it.ts` con los textos en checo y los productos de Dodo de Chequia.
 * Precios FIJOS en CZK (no se convierten desde EUR). Mismas imágenes (salvo hero y
 * pack, propias de /cs) y mismos eventos del pixel que /it/ (con currency CZK).
 * Todo lo editable vive aquí: precios, IDs de Dodo, fecha límite, reseñas y textos.
 * (Los PDF que se entregan tras el pago están en
 *  `electrodomesticos-cs-entrega.ts`, que solo se usa en el servidor.)
 *
 * En los textos se pueden usar estas marcas, que se sustituyen solas:
 *   {price} → precio principal · {bumpPrice} → order bump · {upsellPrice} → upsell
 *   {total} → principal + bump · {valueTotal} → valor total de la oferta (VALUE_TOTAL)
 */

// ── Precios ────────────────────────────────────────────────────────────────
export const CURRENCY = 'CZK';
// Valores del pixel (salen de aquí): Purchase 419 · 538 con el bump · 219 el upsell (CZK).
// OJO: el importe que se cobra lo fija el producto en Dodo (Localized Pricing en CZK);
// debe coincidir con estos precios.
export const PRICE_MAIN = 419;
export const PRICE_BUMP = 119;
// Precio anterior de la guía (sale tachado en el mini carrito).
export const PRICE_BUMP_WAS = 189;
// "Valor total" que se muestra en el cuadro de producto (sin tachar).
export const VALUE_TOTAL = 1390;
export const PRICE_UPSELL = 219;

// ── IDs de producto de Dodo Payments (no son secretos) ─────────────────────
// Vacío = el botón de compra aparece deshabilitado (con aviso en dev).
// Productos de Chequia: Localized Pricing por moneda en CZK (419 Kč · 119 Kč · 219 Kč).
export const DODO_PRODUCT_MAIN = 'pdt_0Ns5J5KmkMdFtUCqy6h5D';
// Bump: «Průvodce Náhradními Díly» · Upsell: «Spotřebiče Jako Nové».
export const DODO_PRODUCT_BUMP = 'pdt_0Ns5J5iL2rVfzNSlaU4Ah';
export const DODO_PRODUCT_UPSELL = 'pdt_0Ns5J67vYY3hrCWMTK8Bo';

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
    name: 'Jan',
    photo: 'testimonio-1.webp',
    text: 'O opravách jsem nevěděl vůbec nic. Začínal jsem od nuly a překvapilo mě, jak jasně je všechno vysvětlené. Doma jsem už bez technika vyřešil pár poruch.',
  },
  {
    name: 'Petra',
    photo: 'testimonio-2.webp',
    text: 'Ušetřila jsem spoustu peněz, když jsem sama opravila problém s pračkou. Dřív bych hned volala technika. Teď vím mnohem víc a jsem si mnohem jistější.',
  },
  {
    name: 'Tomáš',
    photo: 'testimonio-3.webp',
    text: 'Koupil jsem ho ze zvědavosti a teď pomáhám příbuzným a sousedům s drobnými poruchami. Nikdy by mě nenapadlo, že se něco takového naučím bez jakýchkoli zkušeností.',
  },
  {
    name: 'Jiří',
    photo: 'testimonio-4.webp',
    text: 'Nejlepší je, že je všechno vysvětlené krok za krokem a k začátku nemusíte vědět nic o elektřině ani opravách. Je mnohem praktičtější, než jsem čekal.',
  },
  {
    name: 'Lenka',
    photo: 'testimonio-5.webp',
    text: 'Už mě nebavilo platit za opravy věcí, kterým jsem ani nerozuměla. Teď poznám spoustu problémů a doma si poradím sama. Peníze, které se opravdu vyplatí.',
  },
  {
    name: 'Martin',
    photo: 'testimonio-6.webp',
    text: 'Chtěl jsem se naučit řemeslo, které mi přinese nějaký přivýdělek. Už začínám dělat drobné opravy pro přátele a známé a vidím, že to má velký potenciál.',
  },
];

// ── Medios de pago mostrados bajo el botón de compra ──────────────────────
// Deja solo los que estén activos en tu cuenta de Dodo para CZK.
// Los logos están en /public/electrodomesticos/pay/.
export const paymentMethods: { file: string; alt: string }[] = [
  { file: 'visa.svg', alt: 'Visa' },
  { file: 'mastercard.svg', alt: 'Mastercard' },
  { file: 'amex.svg', alt: 'American Express' },
  { file: 'apple-pay.svg', alt: 'Apple Pay' },
  { file: 'google-pay.svg', alt: 'Google Pay' },
];

// ── Rutas ──────────────────────────────────────────────────────────────────
export const BASE_PATH = '/electrodomesticos/cs';
// Mismas imágenes que /es/ e /it/ (hero y pack con sufijo -cs).
export const IMG_PATH = '/electrodomesticos';

// ── Textos ─────────────────────────────────────────────────────────────────
export const PRODUCT_NAME = 'Kompletní kurz opravy domácích spotřebičů';

export const texts = {
  meta: {
    title: 'Kompletní kurz opravy domácích spotřebičů',
    description: 'Nauč se opravovat své domácí spotřebiče od nuly za 30 dní. Kurz v PDF, krok za krokem.',
    upsellTitle: 'Tvoje objednávka je skoro hotová — Kurz opravy domácích spotřebičů',
    thanksTitle: 'Děkujeme! — Kurz opravy domácích spotřebičů',
    legalSuffix: 'Kurz opravy domácích spotřebičů',
  },

  // 1 · Promesa + imagen principal (hero-mockup-cs.webp)
  hero: {
    // El titular visible va dentro de hero-mockup-cs.webp; este texto es el h1 oculto y el alt.
    h1: 'Od nuly k expertovi na domácí spotřebiče za 30 dní',
    imageAlt: 'Od nuly k expertovi na domácí spotřebiče za 30 dní',
    // Franja de prueba social sobre la imagen. Usa solo cifras reales.
    // Fotos: perfil-1.webp … perfil-4.webp (96x96) en /public/electrodomesticos/.
    trust: 'Kurz už začalo přes 3 000 lidí',
    rating: '4,9',
    ratingAria: 'Hodnocení 4,9 z 5',
    avatars: 4,
  },

  // 2 · Esto es para ti si… (5 dolores)
  pains: {
    title: 'Je to pro tebe, pokud…',
    items: [
      'Platíš 1 500 Kč jen za to, že se technik přijde podívat',
      'Vyhazuješ spotřebiče, které šly opravit za pár minut',
      'Každá porucha tě stojí peníze, protože ani nevíš, kde začít',
      'Máš doma rozbitý spotřebič a bojíš se ho otevřít',
      'Nevíš, jestli se vyplatí ho opravit, nebo koupit nový',
    ],
  },

  // 3 · Antes y después (3 filas "Antes → Ahora")
  beforeAfter: {
    title: 'Před a po',
    beforeLabel: 'Před',
    afterLabel: 'Teď',
    rows: [
      { before: 'Platíš technikovi 1 500 Kč jen za to, že se podívá', after: 'Opravíš si to svépomocí za pár minut' },
      { before: 'Vyhodíš spotřebič a ani nevíš, co mu je', after: 'Pochopíš, co je špatně, a opravíš to' },
      { before: 'Každá porucha tě stojí peníze', after: 'Ušetříš pokaždé, když se něco rozbije' },
    ],
  },

  // 4 · Producto principal con sus bonus (un solo bloque).
  // Mockups: oferta-pack-cs.webp · bonus-1.webp … bonus-5.webp
  product: {
    name: PRODUCT_NAME,
    imageAlt: PRODUCT_NAME,
    // Precio anterior del curso (sale tachado junto al precio real).
    courseValue: 699,
    // Fila del producto principal en el cuadro (con el precio).
    rowName: 'Kompletní kurz (10 modulů)',
    // Título sobre la lista de bonus. Portadas en el mismo orden: bonus-1.webp … bonus-5.webp
    // `value` = precio que sale tachado en cada bonus.
    bonusTitle: 'Bonusy navíc zdarma!',
    bonus: [
      { title: 'Rychlý průvodce: co je tvému spotřebiči', value: 349 },
      { title: '10 poruch, které opravíš za méně než 10 minut', value: 229 },
      { title: 'Kdy opravovat a kdy koupit nový', value: 189 },
      { title: 'Nářadí, které potřebuješ, za méně než 1 200 Kč', value: 229 },
      { title: 'Bezpečnost: co zkontrolovat před otevřením jakéhokoli spotřebiče', value: 299 },
    ],
  },

  // 5-6 · Oferta, botón de compra y medios de pago (logos: `paymentMethods`)
  offer: {
    valueTotalLabel: 'Celková hodnota:',
    // Mini texto sobre el botón, siempre visible (se gire o no la ruleta).
    dealLabel: 'S tvou slevou 40 %:',
    countdownLabel: 'Nabídka končí za',
    // El botón abre el mini carrito (textos en `cart`).
    cta: 'Chci svůj kurz',
    secure: '100% bezpečný nákup',
    error: 'Platbu se nepodařilo otevřít. Zkus to znovu za pár sekund.',
    unavailable: 'Brzy k dispozici.',
    loading: 'Načítání',
  },

  // Ruleta de descuentos que se abre al entrar (solo la primera visita).
  // El PRIMER sector es el premio: la ruleta siempre termina ahí, después de
  // pasar muy despacio por el segundo. El precio que se cobra no cambia
  // (PRICE_MAIN): si cambias el 40%, revisa también `offer.dealLabel`.
  wheel: {
    title: 'Roztoč kolo a získej svou slevu',
    segments: ['40%', '5%', '20%', '10%', '25%', '15%'],
    spin: 'Roztočit',
    wonTitle: 'Vyhráváš slevu 40 %!',
    claim: 'Uplatnit',
    close: 'Zavřít',
  },

  // Mini carrito: se abre al pulsar el botón de compra. La guía (order bump) se
  // añade o se quita desde aquí; "Ir al checkout" lleva al pago de Dodo.
  cart: {
    label: 'Tvoje objednávka',
    close: 'Zavřít',
    mainName: 'Kurz opravy domácích spotřebičů',
    bumpName: 'Průvodce náhradními díly: kde koupit každý díl nejlevněji v Česku',
    totalLabel: 'Celkem',
    cta: 'Přejít k platbě',
  },

  // 7 · Garantía de 30 días (sello en SVG, sin imagen)
  guarantee: {
    days: 30,
    sealTop: 'ZÁRUKA',
    sealUnit: 'DNÍ',
    title: 'Záruka 30 dní',
    text: 'Pokud ti kurz nebude vyhovovat, vrátíme ti peníze.',
  },

  // 8 · Cómo lo vas a recibir
  delivery: {
    title: 'Jak ho získáš',
    steps: [
      'Bezpečně zaplatíš',
      'Hned si stáhneš svoje PDF',
      'Stáhneš si obsah a je tvůj navždy',
    ],
    // Sellos de confianza bajo los pasos (orden = SEAL_ICONS en Landing.tsx).
    seals: [
      'Okamžitý přístup',
      'Tvůj navždy',
      'Záruka 30 dní: pokud tě nepřesvědčí, vrátíme ti peníze',
    ],
  },

  // 9 · Prueba social (solo se muestra si `testimonials` tiene elementos)
  reviews: {
    title: 'Co říkají ti, kdo už kurz prošli',
  },

  // 10 · Preguntas frecuentes
  faq: {
    title: 'Časté otázky',
    items: [
      { q: 'Potřebuji zkušenosti?', a: 'Ne. Začíná se od nuly.' },
      { q: 'Jaké nářadí potřebuji?', a: 'Pár šroubováků, multimetr a nic moc dalšího.' },
      { q: 'V jakém formátu kurz dostanu?', a: 'V PDF, ke čtení na mobilu, tabletu nebo počítači.' },
      { q: 'Kdy ho dostanu?', a: 'Hned. Stáhneš si ho na stránce, jakmile zaplatíš.' },
      { q: 'Je na kurz záruka?', a: 'Ano, 30 dní. Pokud ti kurz nebude vyhovovat, vrátíme ti peníze.' },
    ],
  },

  // Footer
  footer: {
    privacy: 'Ochrana soukromí',
    terms: 'Podmínky',
    contact: 'Kontakt:',
  },

  // Upsell tras el pago (/gracias-oferta)
  upsell: {
    title: 'Počkej! Tvoje objednávka je skoro hotová',
    confirmed: 'Platba potvrzena. Než skončíš, podívej se na tohle:',
    product: 'Spotřebiče jako nové',
    subtitle: 'Zbav pračku, myčku, troubu a lednici zápachu, vodního kamene a mastnoty',
    // Imagen opcional: upsell.webp (1000x800). Si no existe, no se muestra nada.
    imageAlt: 'Spotřebiče jako nové',
    bullets: [
      'Pračka bez zápachu',
      'Myčka bez vodního kamene',
      'Trouba a lednice bez mastnoty',
    ],
    yes: 'Ano, přidat za {upsellPrice}',
    no: 'Ne, děkuji',
    under: 'Jednorázová platba {upsellPrice}. Otevře se samostatná bezpečná platba.',
    notPaidTitle: 'Tvou platbu se nepodařilo potvrdit',
    notPaidBody: 'Pokud už máš zaplaceno, obnov tuto stránku za pár sekund. Jinak to můžeš zkusit znovu.',
    notPaidBack: 'Zpět na nabídku',
  },

  // Gracias final (/gracias): un botón de descarga por cada PDF comprado.
  // (Los PDF y el texto de cada botón están en `electrodomesticos-cs-entrega.ts`.)
  thanks: {
    title: 'Děkujeme! Tady si stáhni svůj nákup',
    pendingTitle: 'Potvrzujeme tvou platbu…',
    notPaidTitle: 'Tvou platbu se nepodařilo potvrdit',
    notPaidBack: 'Zpět na nabídku',
  },

  // Páginas legales
  legal: {
    privacyTitle: 'Zásady ochrany osobních údajů',
    privacyBody: [
      'Tvoje údaje (jméno, e-mail a platební údaje) zpracováváme jen proto, abychom vyřídili tvůj nákup a zpřístupnili ti zakoupený kurz.',
      'Platba probíhá bezpečně přes Dodo Payments; údaje o tvé kartě neukládáme.',
      'Používáme cookies a měřicí pixely (včetně pixelu Meta), abychom věděli, jak fungují naše reklamy. Ve svém prohlížeči je můžeš zablokovat.',
      'O přístup ke svým údajům, jejich opravu nebo smazání můžeš požádat e-mailem.',
    ],
    termsTitle: 'Obchodní podmínky',
    termsBody: [
      'Nákupem souhlasíš s tím, že dostaneš digitální produkt (kurz a materiály v PDF), který si stáhneš na stránce hned po zaplacení.',
      'Kurz slouží ke vzdělávání. Vždy pracuj se spotřebičem odpojeným od elektřiny a dodržuj bezpečnostní pokyny. Zásahy do okruhu chladiva smí provádět jen certifikovaný technik. Každý odpovídá za opravy, které provádí.',
      'Případné výdělky závisí na tvém úsilí a na tom, kde žiješ; konkrétní finanční výsledky nezaručujeme.',
      'Nabízíme 30denní záruku vrácení peněz: pokud ti kurz nebude k užitku, vrátíme ti zaplacenou částku.',
      'Platba je jednorázová, bez předplatného a bez opakovaných plateb.',
    ],
    back: 'Zpět',
  },
};

// ── Helpers (no hace falta tocarlos) ───────────────────────────────────────
export function eur(n: number): string {
  // Importes en CZK, redondos sin decimales: 419 Kč · 1 390 Kč
  return new Intl.NumberFormat('cs-CZ', {
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
