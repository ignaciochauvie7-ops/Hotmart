/**
 * Versión FRANCESA (Francia) de la landing (/electrodomesticos/fr/*): copia de
 * `electrodomesticos-pl.ts` con los textos en francés (tuteo) y los productos de Dodo de Francia.
 * Precios fijos en EUR (iguales a /it/). Mismas imágenes (salvo hero y pack, propias de /fr)
 * y mismos eventos del pixel que /pl/ (con currency EUR).
 * Todo lo editable vive aquí: precios, IDs de Dodo, fecha límite, reseñas y textos.
 * (Los PDF que se entregan tras el pago están en
 *  `electrodomesticos-fr-entrega.ts`, que solo se usa en el servidor.)
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
// Productos de Francia, precio fijo en EUR (17 € · 4,90 € · 8,90 €).
export const DODO_PRODUCT_MAIN = 'pdt_0NsENjYH5HrLSjF5erHJk';
// Bump: «Guide des pièces» · Upsell: «Électroménager comme neuf».
export const DODO_PRODUCT_BUMP = 'pdt_0NsENjcqNMs9ByxlV2yZR';
export const DODO_PRODUCT_UPSELL = 'pdt_0NsENjhF6TaUJjSaKasRq';

// ── Post compra (raspa y gana + 3 extras con cobro en 1 clic) ─────────────
// Recorrido tras el pago: raspa y gana (upsell) → 3 extras → /gracias.
// Se cobra a la tarjeta guardada (sin checkout): ver src/lib/electrodomesticos/oneclick.ts
// Precio «normal» tachado del upsell en el raspa y gana (se cobra PRICE_UPSELL).
export const PRICE_UPSELL_WAS = 17.9;
// 3 extras de la segunda pantalla (mismo orden que los PDF de entrega).
// IDs de Dodo: vacío = ese extra no se muestra ni se puede cobrar.
export const DODO_PRODUCT_EXTRA_1 = 'pdt_0NsFPam5NxGAdogk554XS';
export const DODO_PRODUCT_EXTRA_2 = 'pdt_0NsFPaqGUp7938JZ0IsRY';
export const DODO_PRODUCT_EXTRA_3 = 'pdt_0NsFPavdhOqmDgu1okbBk';
// `was` = precio tachado · `price` = precio que se cobra (debe coincidir con Dodo).
// `cover` = portada en /public/electrodomesticos/.
export const EXTRAS: { name: string; cover: string; was: number; price: number }[] = [
  { name: 'Calendrier d’entretien sur 12 mois', cover: 'extra-1-fr.webp', was: 7.9, price: 2.9 },
  { name: 'Économise sur ta facture d’électricité', cover: 'extra-2-fr.webp', was: 8.9, price: 3.4 },
  { name: 'Le multimètre en 15 minutes', cover: 'extra-3-fr.webp', was: 9.9, price: 3.9 },
];
// Textos de las dos pantallas post compra.
export const postTexts = {
  scratchTitle: 'Gratte et découvre ta réduction',
  scratchHint: 'GRATTE ICI',
  off: '50 % DE RÉDUCTION',
  giftsTitle: 'Choisis un cadeau',
  giftAria: 'Ouvrir le cadeau',
  yes: 'JE LE VEUX !',
  no: 'Non, merci',
  error: 'Le paiement n’a pas pu être effectué.',
  loading: 'Chargement',
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
    name: 'Laurent',
    photo: 'testimonio-1.webp',
    text: "Avant, chaque fois que ma machine à laver tombait en panne, je finissais par payer un réparateur. La dernière réparation m’avait coûté presque 100 €. Avec le cours, j’ai appris à identifier la panne et à la réparer moi-même. J’ai déjà récupéré plusieurs fois ce que j’ai payé pour le cours.",
  },
  {
    name: 'Isabelle',
    photo: 'testimonio-2.webp',
    text: "Mon lave-vaisselle ne vidangeait plus et je pensais devoir en racheter un neuf. J’ai suivi les explications du cours, j’ai trouvé le problème et je l’ai réparé sans faire appel à personne. J’ai économisé pas mal d’argent et maintenant je me sens beaucoup plus sûre de moi.",
  },
  {
    name: 'Nicolas',
    photo: 'testimonio-3.webp',
    text: "Mon frigo refroidissait de moins en moins et un réparateur m’avait fait un devis de plus de 150 € pour le vérifier et le réparer. Grâce au cours, j’ai appris à vérifier ce qui pouvait clocher. J’ai été surpris de tout ce qu’on peut apprendre sans aucune expérience.",
  },
  {
    name: 'Philippe',
    photo: 'testimonio-4.webp',
    text: "Mon four chauffait de façon irrégulière et je repoussais la réparation depuis des mois par peur de la facture. Grâce aux explications du cours, j’ai trouvé le problème et je l’ai réparé. Le mieux, c’est que maintenant je sais comment m’y prendre avec d’autres pannes.",
  },
  {
    name: 'Nathalie',
    photo: 'testimonio-5.webp',
    text: "Je jetais toujours mes petits appareils parce que je pensais que les réparer ne valait pas le coup. J’ai déjà réparé ma machine à café et mon aspirateur. Le cours m’a coûté bien moins cher qu’une seule réparation et j’en suis ravie.",
  },
  {
    name: 'Sébastien',
    photo: 'testimonio-6.webp',
    text: "J’ai commencé par de petites réparations à la maison et j’ai fini par aider ma famille et mes voisins. Aujourd’hui, certains me paient pour m’occuper de leur électroménager et j’ai un revenu en plus chaque mois. Je n’aurais jamais cru qu’un cours comme celui-ci me servirait autant.",
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
export const BASE_PATH = '/electrodomesticos/fr';
// Mismas imágenes que /pl/ (hero y pack con sufijo -fr).
export const IMG_PATH = '/electrodomesticos';

// ── Textos ─────────────────────────────────────────────────────────────────
export const PRODUCT_NAME = 'Cours Complet de Réparation d’Électroménager';

export const texts = {
  meta: {
    title: 'Cours Complet de Réparation d’Électroménager',
    description: 'Apprends à réparer ton électroménager en partant de zéro, en 30 jours. Cours en PDF, étape par étape.',
    upsellTitle: 'Ta commande est presque prête — Cours de Réparation d’Électroménager',
    thanksTitle: 'Merci ! — Cours de Réparation d’Électroménager',
    legalSuffix: 'Cours de Réparation d’Électroménager',
  },

  // 1 · Promesa + imagen principal (hero-mockup-fr.webp)
  hero: {
    // El titular visible va dentro de hero-mockup-fr.webp; este texto es el h1 oculto y el alt.
    h1: 'De zéro à expert en électroménager en 30 jours',
    imageAlt: 'De zéro à expert en électroménager en 30 jours',
    // Franja de prueba social sobre la imagen. Usa solo cifras reales.
    // Fotos: perfil-1.webp … perfil-4.webp (96x96) en /public/electrodomesticos/.
    trust: 'Plus de 3 000 personnes ont déjà commencé le cours',
    rating: '4,9',
    ratingAria: 'Note de 4,9 sur 5',
    avatars: 4,
  },

  // 2 · Esto es para ti si… (5 dolores)
  pains: {
    title: 'C’est pour toi si…',
    items: [
      'Tu paies 60 € rien que pour qu’un réparateur vienne jeter un œil',
      'Tu jettes des appareils qui auraient pu être réparés en quelques minutes',
      'Chaque panne te coûte de l’argent parce que tu ne sais même pas par où commencer',
      'Tu as un appareil en panne chez toi et tu as peur de l’ouvrir',
      'Tu ne sais pas s’il vaut mieux le réparer ou en acheter un neuf',
    ],
  },

  // 3 · Antes y después (3 filas "Antes → Ahora")
  beforeAfter: {
    title: 'Avant et après',
    beforeLabel: 'Avant',
    afterLabel: 'Maintenant',
    rows: [
      { before: 'Tu paies 60 € au réparateur juste pour un coup d’œil', after: 'Tu le répares toi-même en quelques minutes' },
      { before: 'Tu jettes l’appareil sans savoir ce qu’il a', after: 'Tu comprends ce qui ne va pas et tu le répares' },
      { before: 'Chaque panne te coûte de l’argent', after: 'Tu économises à chaque fois que quelque chose tombe en panne' },
    ],
  },

  // 4 · Producto principal con sus bonus (un solo bloque).
  // Mockups: oferta-pack-fr.webp · bonus-1.webp … bonus-5.webp
  product: {
    name: PRODUCT_NAME,
    imageAlt: PRODUCT_NAME,
    // Precio anterior del curso (sale tachado junto al precio real).
    courseValue: 29.9,
    // Fila del producto principal en el cuadro (con el precio).
    rowName: 'Cours complet (10 modules)',
    // Título sobre la lista de bonus. Portadas en el mismo orden: bonus-1.webp … bonus-5.webp
    // `value` = precio que sale tachado en cada bonus.
    bonusTitle: 'Des bonus offerts en cadeau !',
    bonus: [
      { title: 'Guide rapide : ce qui ne va pas avec ton appareil', value: 14.9 },
      { title: 'Les 10 pannes qui se réparent en moins de 10 minutes', value: 9.9 },
      { title: 'Quand réparer et quand en acheter un neuf', value: 7.9 },
      { title: 'Les outils qu’il te faut pour moins de 50 €', value: 9.9 },
      { title: 'Sécurité : quoi vérifier avant d’ouvrir n’importe quel appareil', value: 12.9 },
    ],
  },

  // 5-6 · Oferta, botón de compra y medios de pago (logos: `paymentMethods`)
  offer: {
    valueTotalLabel: 'Valeur totale :',
    // Mini texto sobre el botón, siempre visible (se gire o no la ruleta).
    // Línea sobre el botón: «Aujourd’hui seulement, tu économises X» (X = SAVINGS).
    savingsLabel: 'Aujourd’hui seulement, tu économises',
    // Etiqueta junto al precio tachado de cada bonus.
    freeTag: 'OFFERT AUJOURD’HUI',
    // Línea corta justo encima del botón de compra.
    trustLine: 'Accès immédiat · paiement unique · garantie de 30 jours',
    countdownLabel: 'L’offre se termine dans',
    // El botón abre el mini carrito (textos en `cart`).
    cta: 'Je veux mon cours',
    secure: 'Achat 100 % sécurisé',
    error: 'Impossible d’ouvrir le paiement. Réessaie dans quelques secondes.',
    unavailable: 'Bientôt disponible.',
    loading: 'Chargement',
  },

  // Ruleta de descuentos que se abre al entrar (solo la primera visita).
  // El PRIMER sector es el premio: la ruleta siempre termina ahí, después de
  // pasar muy despacio por el segundo. El precio que se cobra no cambia
  // (PRICE_MAIN).
  wheel: {
    title: 'Fais tourner la roue et obtiens ta réduction',
    segments: ['40%', '5%', '20%', '10%', '25%', '15%'],
    spin: 'Tourner',
    wonTitle: 'Tu gagnes 40 % de réduction !',
    claim: 'J’en profite',
    close: 'Fermer',
  },

  // Mini carrito: se abre al pulsar el botón de compra. La guía (order bump) se
  // añade o se quita desde aquí; "Ir al checkout" lleva al pago de Dodo.
  cart: {
    label: 'Ta commande',
    close: 'Fermer',
    mainName: 'Cours de Réparation d’Électroménager',
    bumpName: 'Guide des pièces : où acheter chaque pièce moins cher en France',
    totalLabel: 'Total',
    cta: 'Passer au paiement',
  },

  // 7 · Garantía de 30 días (sello en SVG, sin imagen)
  guarantee: {
    days: 30,
    sealTop: 'GARANTIE',
    sealUnit: 'JOURS',
    title: 'Garantie de 30 jours',
    text: 'Si le cours ne te plaît pas, on te rembourse.',
  },

  // 8 · Cómo lo vas a recibir
  delivery: {
    title: 'Comment tu le reçois',
    steps: [
      'Tu paies en toute sécurité',
      'Tu télécharges tes PDF tout de suite',
      'Tu télécharges le contenu et il est à toi pour toujours',
    ],
    // Sellos de confianza bajo los pasos (orden = SEAL_ICONS en Landing.tsx).
    seals: [
      'Accès immédiat',
      'À toi pour toujours',
      'Garantie de 30 jours : si tu n’es pas convaincu, on te rembourse',
    ],
  },

  // 9 · Prueba social (solo se muestra si `testimonials` tiene elementos)
  reviews: {
    title: 'Ce qu’en disent ceux qui l’ont déjà suivi',
  },

  // 10 · Preguntas frecuentes
  faq: {
    title: 'Questions fréquentes',
    items: [
      { q: 'J’ai besoin d’expérience ?', a: 'Non. Tu pars de zéro.' },
      { q: 'De quels outils ai-je besoin ?', a: 'Quelques tournevis, un multimètre et pas grand-chose de plus.' },
      { q: 'Sous quelle forme je le reçois ?', a: 'En PDF, à lire sur ton téléphone, ta tablette ou ton ordinateur.' },
      { q: 'Quand est-ce que je le reçois ?', a: 'Tout de suite. Tu le télécharges sur la page juste après le paiement.' },
      { q: 'Y a-t-il une garantie ?', a: 'Oui, 30 jours. Si le cours ne te plaît pas, on te rembourse.' },
    ],
  },

  // Footer
  footer: {
    privacy: 'Confidentialité',
    terms: 'Conditions',
    contact: 'Contact :',
  },

  // Upsell tras el pago (/gracias-oferta)
  upsell: {
    title: 'Attends ! Ta commande est presque prête',
    confirmed: 'Paiement confirmé. Avant de terminer, regarde ceci :',
    product: 'Électroménager comme neuf',
    subtitle: 'Élimine les mauvaises odeurs, le calcaire et la graisse de ton lave-linge, ton lave-vaisselle, ton four et ton frigo',
    // Imagen opcional: upsell.webp (1000x800). Si no existe, no se muestra nada.
    imageAlt: 'Électroménager comme neuf',
    bullets: [
      'Un lave-linge sans mauvaises odeurs',
      'Un lave-vaisselle sans calcaire',
      'Un four et un frigo sans graisse',
    ],
    yes: 'Oui, ajoute-le pour {upsellPrice}',
    no: 'Non merci',
    under: 'Paiement unique de {upsellPrice}. Un paiement séparé et sécurisé va s’ouvrir.',
    notPaidTitle: 'Nous n’avons pas pu confirmer ton paiement',
    notPaidBody: 'Si tu as déjà payé, actualise cette page dans quelques secondes. Sinon, tu peux réessayer.',
    notPaidBack: 'Retour à l’offre',
  },

  // Gracias final (/gracias): un botón de descarga por cada PDF comprado.
  // (Los PDF y el texto de cada botón están en `electrodomesticos-fr-entrega.ts`.)
  thanks: {
    title: 'Merci ! Télécharge ton achat ici',
    pendingTitle: 'Nous confirmons ton paiement…',
    notPaidTitle: 'Nous n’avons pas pu confirmer ton paiement',
    notPaidBack: 'Retour à l’offre',
  },

  // Páginas legales
  legal: {
    privacyTitle: 'Politique de confidentialité',
    privacyBody: [
      'Nous utilisons tes données (nom, e-mail et données de paiement) uniquement pour traiter ton achat et te donner accès au cours acheté.',
      'Le paiement est traité de manière sécurisée par Dodo Payments ; nous ne conservons pas les données de ta carte.',
      'Nous utilisons des cookies et des pixels de mesure (dont celui de Meta) pour connaître les performances de nos publicités. Tu peux les bloquer depuis ton navigateur.',
      'Tu peux demander l’accès à tes données, leur rectification ou leur suppression en nous écrivant par e-mail.',
    ],
    termsTitle: 'Conditions générales',
    termsBody: [
      'En achetant, tu acceptes de recevoir un produit numérique (cours et contenus en PDF) que tu télécharges sur la page juste après le paiement.',
      'Le cours a un but éducatif. Travaille toujours sur un appareil débranché et respecte les consignes de sécurité. Les interventions sur le circuit de gaz réfrigérant doivent être réalisées par un technicien certifié. Chacun est responsable des réparations qu’il effectue.',
      'Les éventuels revenus dépendent de ton implication et de ta région ; nous ne garantissons aucun résultat financier précis.',
      'Nous offrons une garantie satisfait ou remboursé de 30 jours : si le cours ne t’est pas utile, nous te remboursons le montant payé.',
      'Le paiement est unique, sans abonnement ni frais récurrents.',
    ],
    back: 'Retour',
  },
};

// ── Helpers (no hace falta tocarlos) ───────────────────────────────────────
export function eur(n: number): string {
  // Importes redondos sin decimales: 17 € · 4,90 €
  return new Intl.NumberFormat('fr-FR', {
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
