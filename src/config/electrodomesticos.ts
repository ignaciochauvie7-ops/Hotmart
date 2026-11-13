/**
 * Reparador PRO — configuración central de la landing /electrodomesticos/es/*.
 * Todo lo editable vive aquí: precios, IDs de Dodo, fecha límite, reseñas y textos.
 * (Los enlaces de acceso que se envían por email están en
 *  `electrodomesticos-entrega.ts`, que solo se usa en el servidor.)
 *
 * En los textos se pueden usar estas marcas, que se sustituyen solas:
 *   {price} → precio principal · {bumpPrice} → order bump · {upsellPrice} → upsell
 *   {total} → principal + bump · {valueTotal} → suma del valor de la oferta
 */

// ── Precios ────────────────────────────────────────────────────────────────
export const CURRENCY = 'EUR';
export const PRICE_MAIN = 19.9;
export const PRICE_BUMP = 7.9;
export const PRICE_UPSELL = 14.9;

// ── IDs de producto de Dodo Payments (no son secretos) ─────────────────────
// Vacío = el botón de compra aparece deshabilitado (con aviso en dev).
export const DODO_PRODUCT_MAIN = '';
export const DODO_PRODUCT_BUMP = '';
export const DODO_PRODUCT_UPSELL = '';

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
  name: string;
  text: string;
  photo?: string;
  location?: string;
}
export const testimonials: Testimonial[] = [];

// ── Medios de pago mostrados en "Compra 100% segura" ──────────────────────
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
export const texts = {
  meta: {
    title: 'Reparador PRO — Aprende a reparar electrodomésticos desde cero',
    description:
      'Curso en vídeo paso a paso para reparar los electrodomésticos de casa desde cero: diagnostica la avería, cambia la pieza y cobra el trabajo.',
    upsellTitle: 'Tu pedido está casi completo — Reparador PRO',
    thanksTitle: '¡Gracias! — Reparador PRO',
  },

  // 1 · Imagen con la promesa (hero-mockup.webp)
  hero: {
    h1: 'Repara electrodomésticos y cobra por cada arreglo',
    imageAlt: 'Curso Reparador PRO',
  },

  // 2 · Esto es para ti si… (máximo 4 dolores)
  pains: {
    title: 'Esto es para ti si…',
    items: [
      'El técnico te cobra 60 € solo por venir a mirar la lavadora',
      'Tiras electrodomésticos que se arreglaban con una pieza de 10 €',
      'Quieres un ingreso extra pero no sabes por dónde empezar',
      'Los vídeos de YouTube van a medias y nunca explican tu avería',
    ],
  },

  // 3 · Antes y después (4 filas)
  beforeAfter: {
    title: 'Antes y después',
    beforeLabel: 'Antes',
    afterLabel: 'Con Reparador PRO',
    rows: [
      { before: 'Pagas 60 € al técnico solo por venir', after: 'Arreglas tú la avería' },
      { before: 'Tiras el aparato por una pieza de 10 €', after: 'Le das una segunda vida con piezas baratas' },
      { before: 'No sabes cómo ganar un ingreso extra', after: 'Cobras por cada arreglo en tu barrio' },
      { before: 'Vídeos a medias que no explican tu avería', after: 'Paso a paso exacto, avería por avería' },
    ],
  },

  // 4 · Producto principal con sus bonos.
  // Miniaturas: modulo-1.webp … modulo-10.webp · Mockups: bonus-1.webp … bonus-5.webp
  // "Valor total" = courseValue + suma de `value` de cada bonus.
  product: {
    name: 'Reparador PRO',
    imageAlt: 'Pack Reparador PRO',
    courseValue: 79.9,
    modulesTitle: 'Los 10 módulos',
    modules: [
      'Seguridad y herramientas básicas',
      'Lavadoras',
      'Lavavajillas',
      'Secadoras',
      'Hornos',
      'Placas de inducción y vitrocerámica',
      'Microondas',
      'Frigoríficos',
      'Pequeños electrodomésticos',
      'Multímetro desde cero',
    ],
    bonusTitle: 'Los 5 bonus',
    bonusValueLabel: 'Valor:',
    bonus: [
      { title: 'Fichas de diagnóstico de averías', value: 14.9 },
      { title: 'Lista de precios para cobrar cada reparación', value: 9.9 },
      { title: 'Plantilla de presupuesto para WhatsApp', value: 7.9 },
      { title: 'Guía de herramientas por menos de 50 €', value: 9.9 },
      { title: 'Cómo conseguir tus primeros clientes', value: 12.9 },
    ],
  },

  // 5-6 · Oferta y botón de compra
  offer: {
    valueTotalLabel: 'Valor total:',
    launchLabel: 'Precio de lanzamiento:',
    countdownLabel: 'La oferta termina en',
    bump: 'Añade los Códigos de error de las 25 marcas por solo {bumpPrice}',
    // {total} = 19,90 € y sube solo si se marca el order bump.
    cta: 'Quiero mi Reparador PRO · {total}',
    error: 'No hemos podido abrir el pago. Inténtalo de nuevo en unos segundos.',
    unavailable: 'Disponible muy pronto.',
  },

  // 7 · Compra 100% segura (logos: `paymentMethods`)
  secure: {
    title: 'Compra 100% segura',
  },

  // 8 · Garantía de 30 días (garantia-30.webp)
  guarantee: {
    title: 'Garantía de 30 días',
    sealAlt: 'Garantía de 30 días',
    text: 'Si no estás conforme, te devolvemos el dinero.',
  },

  // 9 · Cómo lo vas a recibir
  delivery: {
    title: 'Cómo lo vas a recibir',
    steps: ['Pagas', 'Te llega el email en minutos', 'Accedes al curso'],
  },

  // 10 · Prueba social (solo se muestra si `testimonials` tiene elementos)
  reviews: {
    title: 'Lo que dicen quienes ya lo han hecho',
  },

  // 11 · Preguntas frecuentes
  faq: {
    title: 'Preguntas frecuentes',
    items: [
      { q: '¿Necesito experiencia?', a: 'No. Empiezas desde cero, con seguridad y herramientas básicas.' },
      { q: '¿Qué herramientas necesito?', a: 'Destornilladores, un multímetro y poco más. Te dejamos una guía de lo que necesitas por menos de 50 €.' },
      // Ajusta este texto según dónde alojes los vídeos:
      { q: '¿En qué formato llega?', a: 'Vídeos y PDF que puedes ver en el móvil, la tablet o el ordenador.' },
      { q: '¿Cuándo lo recibo?', a: 'Al instante. Cuando se confirma el pago, te llega todo por email, normalmente en menos de 5 minutos.' },
      { q: '¿Tiene garantía?', a: 'Sí. Tienes 30 días: si no estás conforme, te devolvemos el dinero.' },
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
    product: 'Pack Placas Electrónicas: diagnóstico y reparación de placas',
    imageAlt: 'Pack Placas Electrónicas',
    bullets: [
      'Las averías que más se cobran',
      'Cómo saber si la placa tiene arreglo',
      'Paso a paso con el multímetro',
    ],
    yes: 'Sí, lo quiero por {upsellPrice}',
    no: 'No, gracias',
    under: 'Pago único de {upsellPrice}. Se abre un pago seguro aparte.',
    notPaidTitle: 'No hemos podido confirmar tu pago',
    notPaidBody: 'Si ya has pagado, revisa tu email en unos minutos. Si no, puedes volver a intentarlo.',
    notPaidBack: 'Volver a la oferta',
  },

  // Gracias final (/gracias)
  thanks: {
    title: '¡Gracias! Tu pedido está confirmado',
    body: 'Revisa tu email (y la carpeta de spam). Te llega todo normalmente en menos de 5 minutos.',
    upsellPaid: 'También hemos añadido el Pack Placas Electrónicas a tu pedido.',
    upsellFailed: 'El pago del Pack Placas Electrónicas no se ha completado. Tu pedido principal sigue confirmado.',
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
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: CURRENCY }).format(n);
}

export const VALUE_TOTAL =
  Math.round((texts.product.courseValue + texts.product.bonus.reduce((s, b) => s + b.value, 0)) * 100) / 100;
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
