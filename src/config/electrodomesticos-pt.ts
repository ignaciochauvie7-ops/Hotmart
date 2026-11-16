/**
 * Versión PORTUGUESA (Portugal, pt-PT) de la landing (/electrodomesticos/pt/*): copia de
 * `electrodomesticos-it.ts` con los textos en portugués y los productos de Dodo de Portugal.
 * Precios fijos en EUR. Mismas imágenes (salvo hero y pack, propias de /pt) y mismos
 * eventos del pixel que /it/.
 * Todo lo editable vive aquí: precios, IDs de Dodo, fecha límite, reseñas y textos.
 * (Los PDF que se entregan tras el pago están en
 *  `electrodomesticos-pt-entrega.ts`, que solo se usa en el servidor.)
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
// "Valor total" que se muestra en el cuadro de producto (sin tachar).
export const VALUE_TOTAL = 59;
export const PRICE_UPSELL = 8.9;

// ── IDs de producto de Dodo Payments (no son secretos) ─────────────────────
// Vacío = el botón de compra aparece deshabilitado (con aviso en dev).
// Productos de Portugal, precio base en EUR (17 € · 4,90 € · 8,90 €).
export const DODO_PRODUCT_MAIN = 'pdt_0Ns5J3X96ZJiEIAgy9zrX';
// Bump: «Guia de Peças de Substituição» · Upsell: «Eletrodomésticos Como Novos».
export const DODO_PRODUCT_BUMP = 'pdt_0Ns5J3l4chcKUz7akqRkx';
export const DODO_PRODUCT_UPSELL = 'pdt_0Ns5J3y4gl8WDhOkM9yi0';

// ── Fecha límite REAL de la oferta (ISO 8601) ──────────────────────────────
// Ej.: '2026-12-01T23:59:59+00:00'. Vacía = el contador no se muestra.
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
    name: 'João',
    photo: 'testimonio-1.webp',
    text: 'Não sabia nada de reparações. Comecei do zero e surpreendeu-me como as explicações são claras. Já resolvi um par de avarias em casa sem chamar o técnico.',
  },
  {
    name: 'Maria',
    photo: 'testimonio-2.webp',
    text: 'Poupei bastante dinheiro ao resolver sozinha um problema na máquina de lavar roupa. Antes teria chamado logo um técnico. Agora sei muito mais e sinto-me muito mais segura.',
  },
  {
    name: 'Francisco',
    photo: 'testimonio-3.webp',
    text: 'Comprei-o por curiosidade e agora ajudo familiares e vizinhos com pequenas avarias. Nunca pensei que conseguisse aprender algo assim sem qualquer experiência.',
  },
  {
    name: 'António',
    photo: 'testimonio-4.webp',
    text: 'O melhor é que está tudo explicado passo a passo e não é preciso saber nada de eletricidade nem de reparações para começar. É muito mais prático do que esperava.',
  },
  {
    name: 'Ana',
    photo: 'testimonio-5.webp',
    text: 'Estava farta de pagar reparações de coisas que nem percebia. Agora sei identificar muitos problemas e em casa desenrasco-me sozinha. Um investimento que vale mesmo a pena.',
  },
  {
    name: 'Rui',
    photo: 'testimonio-6.webp',
    text: 'Queria aprender um ofício que me desse um rendimento extra. Já estou a começar a fazer pequenas reparações para amigos e conhecidos e vejo que tem um grande potencial.',
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
export const BASE_PATH = '/electrodomesticos/pt';
// Mismas imágenes que /es/ e /it/ (hero y pack con sufijo -pt).
export const IMG_PATH = '/electrodomesticos';

// ── Textos ─────────────────────────────────────────────────────────────────
export const PRODUCT_NAME = 'Curso Completo de Reparação de Eletrodomésticos';

export const texts = {
  meta: {
    title: 'Curso Completo de Reparação de Eletrodomésticos',
    description: 'Aprende a reparar os teus eletrodomésticos do zero em 30 dias. Curso em PDF, passo a passo.',
    upsellTitle: 'A tua encomenda está quase completa — Curso de Reparação de Eletrodomésticos',
    thanksTitle: 'Obrigado! — Curso de Reparação de Eletrodomésticos',
    legalSuffix: 'Curso de Reparação de Eletrodomésticos',
  },

  // 1 · Promesa + imagen principal (hero-mockup-pt.webp)
  hero: {
    // El titular visible va dentro de hero-mockup-pt.webp; este texto es el h1 oculto y el alt.
    h1: 'De zero a especialista em eletrodomésticos em 30 dias',
    imageAlt: 'De zero a especialista em eletrodomésticos em 30 dias',
    // Franja de prueba social sobre la imagen. Usa solo cifras reales.
    // Fotos: perfil-1.webp … perfil-4.webp (96x96) en /public/electrodomesticos/.
    trust: 'Mais de 3000 pessoas já começaram o curso',
    rating: '4,9',
    ratingAria: 'Avaliação de 4,9 em 5',
    avatars: 4,
  },

  // 2 · Esto es para ti si… (5 dolores)
  pains: {
    title: 'É para ti se…',
    items: [
      'Pagas 60 € só para o técnico vir dar uma vista de olhos',
      'Deitas fora eletrodomésticos que se arranjavam em poucos minutos',
      'Cada avaria custa-te dinheiro porque nem sabes por onde começar',
      'Tens um aparelho avariado em casa e não te atreves a abri-lo',
      'Não sabes se compensa repará-lo ou comprar um novo',
    ],
  },

  // 3 · Antes y después (3 filas "Antes → Ahora")
  beforeAfter: {
    title: 'Antes e depois',
    beforeLabel: 'Antes',
    afterLabel: 'Agora',
    rows: [
      { before: 'Pagas 60 € ao técnico só por uma vista de olhos', after: 'Reparas tu mesmo em poucos minutos' },
      { before: 'Deitas fora o aparelho sem saber o que tem', after: 'Percebes o que se passa e reparas' },
      { before: 'Cada avaria custa-te dinheiro', after: 'Poupas sempre que algo se avaria' },
    ],
  },

  // 4 · Producto principal con sus bonus (un solo bloque).
  // Mockups: oferta-pack-pt.webp · bonus-1.webp … bonus-5.webp
  product: {
    name: PRODUCT_NAME,
    imageAlt: PRODUCT_NAME,
    // Precio anterior del curso (sale tachado junto al precio real).
    courseValue: 29.9,
    // Fila del producto principal en el cuadro (con el precio).
    rowName: 'Curso completo (10 módulos)',
    // Título sobre la lista de bonus. Portadas en el mismo orden: bonus-1.webp … bonus-5.webp
    // `value` = precio que sale tachado en cada bonus.
    bonusTitle: 'Bónus extra de oferta!',
    bonus: [
      { title: 'Guia rápido: o que tem o teu aparelho', value: 14.9 },
      { title: 'As 10 avarias que se reparam em menos de 10 minutos', value: 9.9 },
      { title: 'Quando reparar e quando comprar um novo', value: 7.9 },
      { title: 'As ferramentas de que precisas por menos de 50 €', value: 9.9 },
      { title: 'Segurança: o que verificar antes de abrir qualquer aparelho', value: 12.9 },
    ],
  },

  // 5-6 · Oferta, botón de compra y medios de pago (logos: `paymentMethods`)
  offer: {
    valueTotalLabel: 'Valor total:',
    // Mini texto sobre el botón, siempre visible (se gire o no la ruleta).
    dealLabel: 'Com o teu desconto de 40%:',
    countdownLabel: 'A oferta termina em',
    // El botón abre el mini carrito (textos en `cart`).
    cta: 'Quero o meu curso',
    secure: 'Compra 100% segura',
    error: 'Não foi possível abrir o pagamento. Tenta novamente daqui a uns segundos.',
    unavailable: 'Disponível em breve.',
    loading: 'A carregar',
  },

  // Ruleta de descuentos que se abre al entrar (solo la primera visita).
  // El PRIMER sector es el premio: la ruleta siempre termina ahí, después de
  // pasar muy despacio por el segundo. El precio que se cobra no cambia
  // (PRICE_MAIN): si cambias el 40%, revisa también `offer.dealLabel`.
  wheel: {
    title: 'Gira a roleta e ganha o teu desconto',
    segments: ['40%', '5%', '20%', '10%', '25%', '15%'],
    spin: 'Girar',
    wonTitle: 'Ganhaste um desconto de 40%!',
    claim: 'Resgatar',
    close: 'Fechar',
  },

  // Mini carrito: se abre al pulsar el botón de compra. La guía (order bump) se
  // añade o se quita desde aquí; "Ir al checkout" lleva al pago de Dodo.
  cart: {
    label: 'A tua encomenda',
    close: 'Fechar',
    mainName: 'Curso de Reparação de Eletrodomésticos',
    bumpName: 'Guia de peças de substituição: onde comprar cada peça ao preço mais baixo em Portugal',
    totalLabel: 'Total',
    cta: 'Ir para o checkout',
  },

  // 7 · Garantía de 30 días (sello en SVG, sin imagen)
  guarantee: {
    days: 30,
    sealTop: 'GARANTIA',
    sealUnit: 'DIAS',
    title: 'Garantia de 30 dias',
    text: 'Se não ficares satisfeito, devolvemos-te o dinheiro.',
  },

  // 8 · Cómo lo vas a recibir
  delivery: {
    title: 'Como o vais receber',
    steps: [
      'Pagas de forma segura',
      'Descarregas logo os teus PDF',
      'Descarregas o conteúdo e é teu para sempre',
    ],
    // Sellos de confianza bajo los pasos (orden = SEAL_ICONS en Landing.tsx).
    seals: [
      'Acesso imediato',
      'Teu para sempre',
      'Garantia de 30 dias: se não te convencer, devolvemos-te o dinheiro',
    ],
  },

  // 9 · Prueba social (solo se muestra si `testimonials` tiene elementos)
  reviews: {
    title: 'O que dizem os que já o fizeram',
  },

  // 10 · Preguntas frecuentes
  faq: {
    title: 'Perguntas frequentes',
    items: [
      { q: 'Preciso de experiência?', a: 'Não. Começa-se do zero.' },
      { q: 'De que ferramentas preciso?', a: 'Umas chaves de fendas, um multímetro e pouco mais.' },
      { q: 'Em que formato chega?', a: 'Em PDF, para ler no telemóvel, no tablet ou no computador.' },
      { q: 'Quando o recebo?', a: 'De imediato. Descarregas na página assim que pagares.' },
      { q: 'Tem garantia?', a: 'Sim, 30 dias. Se não ficares satisfeito, devolvemos-te o dinheiro.' },
    ],
  },

  // Footer
  footer: {
    privacy: 'Privacidade',
    terms: 'Termos',
    contact: 'Contacto:',
  },

  // Upsell tras el pago (/gracias-oferta)
  upsell: {
    title: 'Espera! A tua encomenda está quase completa',
    confirmed: 'Pagamento confirmado. Antes de terminar, vê isto:',
    product: 'Eletrodomésticos como novos',
    subtitle: 'Elimina maus cheiros, calcário e gordura da máquina de lavar roupa, da máquina de lavar loiça, do forno e do frigorífico',
    // Imagen opcional: upsell.webp (1000x800). Si no existe, no se muestra nada.
    imageAlt: 'Eletrodomésticos como novos',
    bullets: [
      'Máquina de lavar roupa sem maus cheiros',
      'Máquina de lavar loiça sem calcário',
      'Forno e frigorífico sem gordura',
    ],
    yes: 'Sim, adiciona por {upsellPrice}',
    no: 'Não, obrigado',
    under: 'Pagamento único de {upsellPrice}. Abre-se um pagamento seguro à parte.',
    notPaidTitle: 'Não foi possível confirmar o teu pagamento',
    notPaidBody: 'Se já pagaste, recarrega esta página daqui a uns segundos. Caso contrário, podes tentar novamente.',
    notPaidBack: 'Voltar à oferta',
  },

  // Gracias final (/gracias): un botón de descarga por cada PDF comprado.
  // (Los PDF y el texto de cada botón están en `electrodomesticos-pt-entrega.ts`.)
  thanks: {
    title: 'Obrigado! Descarrega aqui a tua compra',
    pendingTitle: 'Estamos a confirmar o teu pagamento…',
    notPaidTitle: 'Não foi possível confirmar o teu pagamento',
    notPaidBack: 'Voltar à oferta',
  },

  // Páginas legales
  legal: {
    privacyTitle: 'Política de privacidade',
    privacyBody: [
      'Tratamos os teus dados (nome, email e dados de pagamento) apenas para processar a tua compra e dar-te acesso ao curso que compraste.',
      'O pagamento é processado de forma segura através da Dodo Payments; não guardamos os dados do teu cartão.',
      'Usamos cookies e píxeis de medição (incluindo o da Meta) para perceber o desempenho dos nossos anúncios. Podes bloqueá-los no teu navegador.',
      'Podes pedir o acesso, a retificação ou a eliminação dos teus dados escrevendo-nos por email.',
    ],
    termsTitle: 'Termos e condições',
    termsBody: [
      'Ao comprar, aceitas receber um produto digital (curso e material em PDF) que descarregas na página logo após o pagamento.',
      'O curso tem fins formativos. Trabalha sempre com o aparelho desligado da corrente e segue as indicações de segurança. As intervenções no circuito do gás refrigerante só podem ser feitas por um técnico certificado. Cada pessoa é responsável pelas reparações que faz.',
      'Os ganhos que possas obter dependem do teu esforço e da tua zona; não garantimos resultados económicos concretos.',
      'Oferecemos uma garantia de reembolso de 30 dias: se o curso não te for útil, devolvemos-te o valor pago.',
      'O pagamento é único, sem subscrições nem cobranças recorrentes.',
    ],
    back: 'Voltar',
  },
};

// ── Helpers (no hace falta tocarlos) ───────────────────────────────────────
export function eur(n: number): string {
  // Importes redondos sin decimales: 17 € · 4,90 €
  return new Intl.NumberFormat('pt-PT', {
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
