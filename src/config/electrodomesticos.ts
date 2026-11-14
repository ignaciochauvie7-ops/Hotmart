/**
 * Curso Completo de Reparación de Electrodomésticos — configuración central de la landing /electrodomesticos/es/*.
 * Todo lo editable vive aquí: precios, IDs de Dodo, fecha límite, reseñas y textos.
 * (Los PDF que se entregan tras el pago están en
 *  `electrodomesticos-entrega.ts`, que solo se usa en el servidor.)
 *
 * En los textos se pueden usar estas marcas, que se sustituyen solas:
 *   {price} → precio principal · {bumpPrice} → order bump · {upsellPrice} → upsell
 *   {total} → principal + bump · {valueTotal} → valor total de la oferta (VALUE_TOTAL)
 */

// ── Precios ────────────────────────────────────────────────────────────────
export const CURRENCY = 'EUR';
// Valores del pixel (salen de aquí): Purchase 17,00 · 21,90 con el bump · 14,90 el upsell.
// OJO: el importe que se cobra lo fija el producto en Dodo; debe coincidir con estos precios.
export const PRICE_MAIN = 17;
export const PRICE_BUMP = 4.9;
// Precio anterior de la guía (sale tachado en el mini carrito).
export const PRICE_BUMP_WAS = 7.9;
// "Valor total" que se muestra en el cuadro de producto (sin tachar).
export const VALUE_TOTAL = 59;
export const PRICE_UPSELL = 14.9;

// ── IDs de producto de Dodo Payments (no son secretos) ─────────────────────
// Vacío = el botón de compra aparece deshabilitado (con aviso en dev).
export const DODO_PRODUCT_MAIN = 'pdt_0NrsQO9wpJHCUTud1DV7k';
// Bump: «Guía de repuestos» · Upsell: «Electrodomésticos como nuevos».
export const DODO_PRODUCT_BUMP = 'pdt_0NrsZExNafX66jPGWBAK5';
export const DODO_PRODUCT_UPSELL = 'pdt_0NrsZsSPP53ENnL1o4IKb';

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
// Fotos: testimonio-1.webp … testimonio-6.webp (96x96) en /public/electrodomesticos/.
export const testimonials: Testimonial[] = [
  {
    name: 'José Manuel',
    photo: 'testimonio-1.webp',
    text: 'No tenía ni idea de reparar electrodomésticos. Empecé desde cero y me sorprendió lo fácil que es entender las explicaciones. Ya he conseguido solucionar un par de averías en casa sin llamar al técnico.',
  },
  {
    name: 'María',
    photo: 'testimonio-2.webp',
    text: 'Me ahorré bastante dinero al poder solucionar yo misma un problema con la lavadora. Antes habría llamado directamente a un técnico. Ahora tengo muchos más conocimientos y confianza.',
  },
  {
    name: 'Francisco',
    photo: 'testimonio-3.webp',
    text: 'Lo compré por curiosidad y terminé ayudando a familiares y vecinos con pequeñas averías. Nunca imaginé que podría aprender algo así sin tener experiencia previa.',
  },
  {
    name: 'Antonio',
    photo: 'testimonio-4.webp',
    text: 'Lo mejor es que está explicado paso a paso y no necesitas saber nada de electricidad ni reparaciones para empezar. Es muchísimo más práctico de lo que esperaba.',
  },
  {
    name: 'Laura',
    photo: 'testimonio-5.webp',
    text: 'Estaba cansada de pagar reparaciones por cosas que ni siquiera entendía. Ahora sé identificar muchos problemas y tengo más independencia en casa. Una inversión que merece la pena.',
  },
  {
    name: 'David',
    photo: 'testimonio-6.webp',
    text: 'Mi intención era aprender un oficio que pudiera darme ingresos extra. Ya estoy empezando a hacer pequeñas reparaciones para conocidos y veo que tiene mucho potencial.',
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
export const BASE_PATH = '/electrodomesticos/es';
export const IMG_PATH = '/electrodomesticos';

// ── Textos ─────────────────────────────────────────────────────────────────
export const PRODUCT_NAME = 'Curso Completo de Reparación de Electrodomésticos';

export const texts = {
  meta: {
    title: 'Curso Completo de Reparación de Electrodomésticos',
    description: 'Aprende a reparar tus electrodomésticos desde cero en 30 días. Curso en vídeo, paso a paso.',
    upsellTitle: 'Tu pedido está casi completo — Curso de Reparación de Electrodomésticos',
    thanksTitle: '¡Gracias! — Curso de Reparación de Electrodomésticos',
    legalSuffix: 'Curso de Reparación de Electrodomésticos',
  },

  // 1 · Promesa + imagen principal (hero-mockup.webp)
  hero: {
    // El titular visible va dentro de hero-mockup.webp; este texto es el h1 oculto y el alt.
    h1: 'De 0 a experto en electrodomésticos en 30 días',
    imageAlt: 'De 0 a experto en electrodomésticos en 30 días',
    // Franja de prueba social sobre la imagen. Usa solo cifras reales.
    // Fotos: perfil-1.webp … perfil-4.webp (96x96) en /public/electrodomesticos/.
    trust: '+3.000 personas ya han empezado el curso',
    rating: '4,9',
    ratingAria: 'Valoración 4,9 de 5',
    avatars: 4,
  },

  // 2 · Esto es para ti si… (5 dolores)
  pains: {
    title: 'Esto es para ti si…',
    items: [
      'Pagas 60 € solo para que el técnico venga a mirar',
      'Tiras electrodomésticos que se arreglaban en minutos',
      'Cada avería te cuesta dinero porque no sabes ni por dónde empezar',
      'Tienes un aparato roto en casa y no te atreves a abrirlo',
      'No sabes si te compensa arreglarlo o comprar uno nuevo',
    ],
  },

  // 3 · Antes y después (3 filas "Antes → Ahora")
  beforeAfter: {
    title: 'Antes y después',
    beforeLabel: 'Antes',
    afterLabel: 'Ahora',
    rows: [
      { before: 'Pagas 60 € al técnico solo por mirar', after: 'Lo arreglas tú en minutos' },
      { before: 'Tiras el aparato sin saber qué le pasa', after: 'Sabes qué falla y lo arreglas' },
      { before: 'Cada avería te cuesta dinero', after: 'Ahorras cada vez que algo falla' },
    ],
  },

  // 4 · Producto principal con sus bonus (un solo bloque).
  // Mockups: oferta-pack.webp · bonus-1.webp … bonus-5.webp
  product: {
    name: PRODUCT_NAME,
    imageAlt: PRODUCT_NAME,
    // Precio anterior del curso (sale tachado junto al precio real).
    courseValue: 29.9,
    // Fila del producto principal en el cuadro (con el precio).
    rowName: 'Curso completo (10 módulos)',
    // Título sobre la lista de bonus. Portadas en el mismo orden: bonus-1.webp … bonus-5.webp
    // `value` = precio que sale tachado en cada bonus.
    bonusTitle: '¡Bonus extra de regalo!',
    bonus: [
      { title: 'Guía rápida: qué le pasa a tu aparato', value: 14.9 },
      { title: 'Las 10 averías que se arreglan en menos de 10 minutos', value: 9.9 },
      { title: 'Cuándo arreglar y cuándo comprar uno nuevo', value: 7.9 },
      { title: 'Herramientas que necesitas por menos de 50 €', value: 9.9 },
      { title: 'Seguridad: qué revisar antes de abrir cualquier aparato', value: 12.9 },
    ],
  },

  // 5-6 · Oferta, botón de compra y medios de pago (logos: `paymentMethods`)
  offer: {
    valueTotalLabel: 'Valor total:',
    // Mini texto sobre el botón, siempre visible (se gire o no la ruleta).
    dealLabel: 'Con tu 40% de descuento:',
    countdownLabel: 'La oferta termina en',
    // El botón abre el mini carrito (textos en `cart`).
    cta: 'Quiero mi curso',
    secure: 'Compra 100% segura',
    error: 'No hemos podido abrir el pago. Inténtalo de nuevo en unos segundos.',
    unavailable: 'Disponible muy pronto.',
  },

  // Ruleta de descuentos que se abre al entrar (solo la primera visita).
  // El PRIMER sector es el premio: la ruleta siempre termina ahí, después de
  // pasar muy despacio por el segundo. El precio que se cobra no cambia
  // (PRICE_MAIN): si cambias el 40%, revisa también `offer.dealLabel`.
  wheel: {
    title: 'Gira la ruleta y llévate tu descuento',
    segments: ['40%', '5%', '20%', '10%', '25%', '15%'],
    spin: 'Girar',
    wonTitle: '¡Ganaste un 40% de descuento!',
    claim: 'Reclamar',
    close: 'Cerrar',
  },

  // Mini carrito: se abre al pulsar el botón de compra. La guía (order bump) se
  // añade o se quita desde aquí; "Ir al checkout" lleva al pago de Dodo.
  cart: {
    label: 'Tu pedido',
    close: 'Cerrar',
    mainName: 'Curso de Reparación de Electrodomésticos',
    bumpName: 'Guía de repuestos: dónde comprar cada pieza más barata en España',
    totalLabel: 'Total',
    cta: 'Ir al checkout',
  },

  // 7 · Garantía de 30 días (sello en SVG, sin imagen)
  guarantee: {
    days: 30,
    sealTop: 'GARANTÍA',
    sealUnit: 'DÍAS',
    title: 'Garantía de 30 días',
    text: 'Si no estás conforme, te devolvemos el dinero.',
  },

  // 8 · Cómo lo vas a recibir
  delivery: {
    title: 'Cómo lo vas a recibir',
    steps: [
      'Pagas de forma segura',
      'Recibes el email al instante',
      'Descargas el contenido y es tuyo para siempre',
    ],
    // Sellos de confianza bajo los pasos (orden = SEAL_ICONS en Landing.tsx).
    seals: [
      'Acceso inmediato',
      'Tuyo de por vida',
      'Garantía de 30 días: si no te convence, te devolvemos tu dinero',
    ],
  },

  // 9 · Prueba social (solo se muestra si `testimonials` tiene elementos)
  reviews: {
    title: 'Lo que dicen quienes ya lo han hecho',
  },

  // 10 · Preguntas frecuentes
  faq: {
    title: 'Preguntas frecuentes',
    items: [
      { q: '¿Necesito experiencia?', a: 'No. Empiezas desde cero.' },
      { q: '¿Qué herramientas necesito?', a: 'Destornilladores, un multímetro y poco más.' },
      // Ajusta este texto según dónde alojes los vídeos:
      { q: '¿En qué formato llega?', a: 'Vídeos y PDF para ver en el móvil, la tablet o el ordenador.' },
      { q: '¿Cuándo lo recibo?', a: 'Al instante, por email.' },
      { q: '¿Tiene garantía?', a: 'Sí, 30 días. Si no estás conforme, te devolvemos el dinero.' },
    ],
  },

  // Footer
  footer: {
    privacy: 'Privacidad',
    terms: 'Términos',
    contact: 'Contacto:',
  },

  // Upsell tras el pago (/gracias-oferta)
  upsell: {
    title: '¡Espera! Tu pedido está casi completo',
    confirmed: 'Pago confirmado. Antes de terminar, mira esto:',
    product: 'Electrodomésticos como nuevos',
    subtitle: 'Quita malos olores, cal y grasa de tu lavadora, lavavajillas, horno y frigorífico',
    // Imagen opcional: upsell.webp (1000x800). Si no existe, no se muestra nada.
    imageAlt: 'Electrodomésticos como nuevos',
    bullets: [
      'Lavadora sin malos olores',
      'Lavavajillas sin cal',
      'Horno y frigorífico sin grasa',
    ],
    yes: 'Sí, añadirlo por {upsellPrice}',
    no: 'No, gracias',
    under: 'Pago único de {upsellPrice}. Se abre un pago seguro aparte.',
    notPaidTitle: 'No hemos podido confirmar tu pago',
    notPaidBody: 'Si ya has pagado, revisa tu email en unos minutos. Si no, puedes volver a intentarlo.',
    notPaidBack: 'Volver a la oferta',
  },

  // Gracias final (/gracias): un botón de descarga por cada PDF comprado.
  // (Los PDF y el texto de cada botón están en `electrodomesticos-entrega.ts`.)
  thanks: {
    title: '¡Gracias! Descarga aquí tu compra',
    pendingTitle: 'Estamos confirmando tu pago…',
    notPaidTitle: 'No hemos podido confirmar tu pago',
    notPaidBack: 'Volver a la oferta',
  },

  // Páginas legales
  legal: {
    privacyTitle: 'Política de privacidad',
    privacyBody: [
      'Tratamos tus datos (nombre, email y datos de pago) con el único fin de procesar tu compra y enviarte el acceso al curso que has adquirido.',
      'El pago se procesa de forma segura a través de Dodo Payments; no almacenamos los datos de tu tarjeta.',
      'Usamos cookies y píxeles de medición (incluido Meta) para entender el rendimiento de nuestros anuncios. Puedes bloquearlos desde tu navegador.',
      'Puedes solicitar el acceso, la corrección o la eliminación de tus datos escribiéndonos por email.',
    ],
    termsTitle: 'Términos y condiciones',
    termsBody: [
      'Al comprar aceptas que recibirás un producto digital (curso en vídeo y material en PDF) de acceso inmediato por email.',
      'El curso es formativo. Trabaja siempre con el aparato desconectado de la corriente y sigue las indicaciones de seguridad. Las intervenciones en el circuito de gas refrigerante solo puede hacerlas un técnico certificado. Cada persona es responsable de las reparaciones que realiza.',
      'Los ingresos que consigas dependen de tu dedicación y de tu zona; no garantizamos resultados económicos concretos.',
      'Ofrecemos una garantía de devolución de 30 días: si el curso no te sirve, te devolvemos el importe pagado.',
      'El pago es único, sin suscripciones ni cargos recurrentes.',
    ],
    back: 'Volver',
  },
};

// ── Helpers (no hace falta tocarlos) ───────────────────────────────────────
export function eur(n: number): string {
  // Importes redondos sin decimales: 17 € · 4,90 €
  return new Intl.NumberFormat('es-ES', {
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
