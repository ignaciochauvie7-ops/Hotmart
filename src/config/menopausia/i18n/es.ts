import type { MenoDict } from './types';

export const es: MenoDict = {
  htmlLang: 'es',
  numberLocale: 'es-ES',

  meta: {
    quizTitle: 'Descubre tu plan para desinflamar el abdomen en la menopausia',
    quizDesc:
      'Test de 1 minuto para crear tu plan personalizado y desinflamar el abdomen en la menopausia.',
    offerTitle: 'Tu plan Abdomen Plano en 28 Días',
    offerDesc: 'Tu plan personalizado para desinflamar el abdomen en 28 días.',
    graciasTitle: 'Tu pedido casi listo',
    listoTitle: 'Todo listo',
    privacyTitle: 'Política de privacidad',
    termsTitle: 'Términos y condiciones',
  },

  common: {
    continue: 'Continuar',
    backAria: 'Volver atrás',
    restartAria: 'Volver al inicio',
    startTest: 'Empezar test (1 minuto)',
    seeMyPlan: 'Ver mi plan',
    loading: 'Cargando…',
  },

  quiz: {
    cover: {
      title: 'Descubre tu plan para desinflamar el abdomen en la menopausia',
      cta: 'Empezar test (1 minuto)',
      photoAlt: 'Mujer de unos 50 años sonriendo',
    },
    age: {
      q: '¿Cuántos años tienes?',
      options: ['40-44', '45-49', '50-54', '55-59', '60+'],
    },
    period: {
      q: '¿Todavía tienes la regla?',
      options: ['Sí, regular', 'Sí, pero irregular', 'No, hace más de 12 meses'],
    },
    fatZone: {
      q: '¿Dónde acumulas más grasa?',
      options: ['Abdomen', 'Caderas y muslos', 'Brazos', 'Todo el cuerpo'],
    },
    reassure: {
      body:
        'No estás sola. Muchas mujeres de tu edad sienten que hacen todo igual y su cuerpo cambia igual. No es falta de voluntad: tus hormonas cambiaron las reglas.',
    },
    height: { q: '¿Cuánto mides?', unit: 'cm' },
    weight: { q: '¿Cuánto pesas ahora?', unit: 'kg' },
    target: {
      q: '¿Cuál es tu peso objetivo?',
      unit: 'kg',
      errLess: 'Tu objetivo debe ser menor que tu peso actual.',
      errMax: 'Elige un objetivo de hasta 25 kg menos que tu peso actual.',
    },
    loading1: {
      texts: ['Analizando tu perfil…', 'Calculando tu metabolismo…', 'Revisando tu etapa hormonal…'],
    },
    symptoms: {
      q: '¿Qué síntomas notas?',
      options: [
        'Hinchazón abdominal',
        'Sofocos',
        'Duermo mal',
        'Cansancio',
        'Cambios de ánimo',
        'Antojos de dulce',
        'Retención de líquidos',
      ],
    },
    goal: {
      q: '¿Cuál es tu objetivo principal?',
      options: [
        'Aplanar mi abdomen',
        'Bajar de peso',
        'Dormir mejor',
        'Tener más energía',
        'Volver a sentirme bien con mi ropa',
      ],
    },
    movement: {
      q: '¿Cuánto te mueves en un día normal?',
      options: [
        'Casi nada',
        'Camino un poco',
        'Hago ejercicio 1-2 veces por semana',
        'Hago ejercicio 3 o más veces',
      ],
    },
    time: {
      q: '¿Cuánto tiempo al día puedes dedicarte?',
      options: ['10 minutos', '15 minutos', '20 minutos o más'],
      after: 'Perfecto: tu plan está diseñado para 15 minutos al día.',
    },
    lastGood: {
      q: '¿Cuándo te sentiste bien con tu cuerpo por última vez?',
      options: ['Hace menos de 1 año', 'Hace 1-3 años', 'Hace más de 5 años', 'No lo recuerdo'],
    },
    event: {
      q: '¿Tienes algún evento próximo?',
      options: ['Vacaciones', 'Una boda o celebración', 'Cumpleaños', 'Ninguno, solo quiero sentirme bien'],
    },
    loading2: {
      rows: [
        'Analizando tus respuestas',
        'Comparando con perfiles similares al tuyo',
      ],
    },
    result: {
      title: 'Tu plan Abdomen Plano en 28 Días está listo',
      labelAge: 'Edad',
      labelGoal: 'Objetivo principal',
      labelSymptoms: 'Síntomas principales',
      labelZone: 'Zona a trabajar',
      labelImc: 'Tu IMC',
      imcNote: 'Solo como referencia, sin juicios.',
      chartBloating: 'Hinchazón',
      chartEnergy: 'Energía',
      chartToday: 'Hoy',
      chartDay28: 'Día 28',
      estimate:
        'Estimación orientativa: entre {kg} menos en 28 días. Los resultados varían en cada persona.',
      disclaimer: 'Estimación orientativa. Los resultados varían en cada persona.',
      cta: 'Ver mi plan',
    },
  },

  offer: {
    reserved: 'Tu descuento está reservado: {time}',
    headline: 'Tu plan para desinflamar el abdomen en 28 días, para mujeres de {age}',
    headlineEvent: '{base}, a tiempo para {event}',
    eventPhrases: ['tus vacaciones', 'tu boda o celebración', 'tu cumpleaños', ''],
    profileGoalPrefix: 'Tu objetivo',
    receiveTitle: 'Lo que recibes hoy',
    items: [
      { name: 'Reto Abdomen Plano en 28 Días: rutina de 15 min + plan de comidas + listas de compras', price: 67 },
      { name: 'Bonus 1: 30 recetas antiinflamatorias', price: 19 },
      { name: 'Bonus 2: Tracker imprimible de 28 días', price: 9 },
      { name: 'Bonus 3: Come fuera sin hincharte', price: 12 },
      { name: 'Bonus 4: Plan Rescate de 3 días', price: 12 },
    ],
    totalLabel: 'Valor total',
    totalValue: 119,
    todayLabel: 'Hoy',
    priceNow: 16.97,
    priceOld: 67,
    offLabel: '-75%',
    bumpLabel:
      'Sí, agrega Vuelve a Descansar Bien en 21 Días: plan de 21 noches para dormir de corrido y frenar los sofocos. Solo {price}',
    buy: 'Quiero mi plan ahora',
    paySecure: 'Pago seguro',
    accessEmail: 'Acceso inmediato por email',
    howTitle: 'Cómo funciona',
    howSteps: ['Pagas de forma segura', 'Recibes todo por email al instante', 'Empiezas hoy mismo'],
    guaranteeTitle: 'Garantía de 30 días',
    guaranteeBody: 'Si no te sirve, te devolvemos el dinero.',
    faqTitle: 'Preguntas frecuentes',
    faq: [
      { q: '¿Necesito equipo?', a: 'No. Solo una pared, una esterilla y una silla.' },
      { q: '¿Cuánto tiempo al día?', a: '15 minutos al día.' },
      { q: '¿Cómo lo recibo?', a: 'En PDF por email, al instante tras el pago.' },
      { q: '¿Sirve si ya no tengo la regla?', a: 'Sí. El plan está pensado para todas las etapas de la menopausia.' },
      { q: '¿Es un pago único?', a: 'Sí, un único pago. Sin suscripciones.' },
    ],
    footerDisclaimer:
      'Este programa es informativo y no sustituye el consejo de un profesional de la salud.',
    privacyLink: 'Privacidad',
    termsLink: 'Términos',
    genericHeadline: 'Tu plan para desinflamar el abdomen en 28 días, para mujeres de 45 a 60 años',
    checkoutError: 'No pudimos abrir el pago. Inténtalo de nuevo en un momento.',
  },

  gracias: {
    verifying: 'Confirmando tu pago…',
    notPaidTitle: 'Estamos confirmando tu pago',
    notPaidBody:
      'Si acabas de pagar, puede tardar unos segundos. Revisa tu email; si no ves nada, escríbenos.',
    upsellTag: '¡Espera! Tu pedido está casi listo',
    upsellTitle: 'Agrega Adiós Hinchazón en 14 Días',
    upsellBody: 'Plan antiinflamatorio de 14 días para deshinchar tu abdomen. Solo hoy: {price}.',
    upsellIncludes: [
      'Menús antiinflamatorios de 14 días',
      'Lista de alimentos que desinflaman',
      'Guía rápida para los días de más hinchazón',
    ],
    upsellPriceLabel: 'Solo hoy',
    yes: 'Sí, lo quiero',
    no: 'No, gracias, quiero solo mi plan',
  },

  listo: {
    title: '¡Listo!',
    body:
      'Revisa tu email: te enviamos todos tus archivos. Si no lo ves, mira en spam o promociones.',
    upsellThanks: '¡Gracias! Tu extra también va en camino a tu email.',
  },

  downloads: {
    title: 'Descarga tus archivos',
    note: 'Los enlaces caducan en 7 días. También te los enviamos por email.',
  },

  email: {
    subject: 'Tus archivos ya están listos',
    heading: '¡Gracias por tu compra!',
    intro: 'Aquí tienes tus descargas. Toca cada archivo para guardarlo:',
    expiryNote: 'Los enlaces caducan en 7 días.',
  },

  legal: {
    privacyHeading: 'Política de privacidad',
    privacyBody: [
      'Tratamos tus datos (nombre, email y datos de pago) con el único fin de procesar tu compra y enviarte el producto que adquiriste.',
      'El pago se procesa de forma segura a través de Dodo Payments; no almacenamos los datos de tu tarjeta.',
      'Usamos cookies y píxeles de medición (incluido Meta) para entender el rendimiento de nuestros anuncios. Puedes bloquearlos desde tu navegador.',
      'Puedes solicitar el acceso, la corrección o la eliminación de tus datos escribiéndonos por email.',
    ],
    termsHeading: 'Términos y condiciones',
    termsBody: [
      'Al comprar aceptas que recibirás un producto digital descargable de acceso inmediato por email.',
      'El producto es informativo y no sustituye el consejo de un profesional de la salud. Consulta a tu médico antes de empezar cualquier plan.',
      'Ofrecemos una garantía de devolución de 30 días: si el producto no te sirve, te devolvemos el importe pagado.',
      'El pago es único, sin suscripciones ni cargos recurrentes.',
    ],
    backHome: 'Volver',
  },
};
