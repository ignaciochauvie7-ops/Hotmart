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
      badge: 'Test de 1 minuto',
      title: 'Descubre tu plan personalizado para desinflamar el abdomen',
      cta: 'Crear mi plan',
      photoAlt: 'Mujer de unos 50 años sonriendo',
    },
    age: {
      q: '¿Cuántos años tienes?',
      options: ['40-44', '45-49', '50-54', '55-59', '60 o más'],
    },
    period: {
      q: '¿Todavía tienes la regla?',
      options: ['Sí, regular', 'Sí, pero irregular', 'No, ya no', 'No estoy segura'],
    },
    fatZone: {
      q: '¿Dónde acumulas más grasa?',
      options: ['Abdomen', 'Caderas y muslos', 'Brazos', 'Espalda', 'Por todo el cuerpo'],
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
        'Sofocos',
        'Hinchazón',
        'Insomnio',
        'Cansancio',
        'Cambios de humor',
        'Antojos',
        'Niebla mental',
        'Ninguno',
      ],
      noneIndex: 7,
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
      q: '¿Cuánto te mueves?',
      options: [
        'Casi nada',
        'Camino a veces',
        '1-2 veces por semana',
        '3 o más veces por semana',
      ],
    },
    time: {
      q: '¿Cuánto tiempo al día puedes dedicarte?',
      options: ['10 minutos', '15 minutos', '20 minutos o más'],
      after: 'Perfecto: tu plan está diseñado para 15 minutos al día.',
    },
    lastGood: {
      q: '¿Cuándo te sentiste bien con tu cuerpo por última vez?',
      options: ['Hace menos de 1 año', 'Hace 1-3 años', 'Hace más de 3 años', 'No lo recuerdo'],
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
    headline: 'Tu plan de 28 días para sentirte más ligera, para mujeres de {age}',
    genericHeadline: 'Tu plan de 28 días para sentirte más ligera en la menopausia',
    ctaMain: 'Quiero mi plan',

    bonusesTitle: '4 extras incluidos',
    bonusNames: [
      '30 recetas antiinflamatorias',
      'Tracker de 28 días',
      'Come fuera sin hincharte',
      'Plan Rescate de 3 días',
    ],
    freeTag: 'Gratis',

    priceNote: 'Pago único',
    perDay: '≈ {price} al día',

    bumpName: 'Vuelve a Descansar Bien en 21 Días',
    bumpBenefit: 'Un plan de 21 noches para dormir mejor.',
    bumpAdd: 'Añádelo por {price}',

    ctaOffer: 'Quiero mi plan',
    trust: 'Pago seguro Dodo · acceso inmediato · garantía de {days} días',

    faqTitle: 'Preguntas frecuentes',
    faq: [
      {
        q: '¿Qué recibo y en qué formato?',
        a: 'El plan de 28 días y los 4 extras en PDF, para leer en el móvil, la tablet o el ordenador, o imprimir.',
      },
      {
        q: '¿Cuándo me llega?',
        a: 'Al instante. En cuanto se confirma el pago recibes todo en tu email, normalmente en menos de 5 minutos.',
      },
      {
        q: '¿Es un pago único?',
        a: 'Sí. Un solo pago, sin suscripción ni cargos recurrentes.',
      },
      {
        q: '¿Es seguro pagar y en qué moneda?',
        a: 'Pagas con tarjeta a través de Dodo Payments con conexión cifrada; no guardamos los datos de tu tarjeta. El importe se cobra en euros.',
      },
      {
        q: '¿Y si no me gusta?',
        a: 'Tienes {days} días de garantía: si no es para ti, te devolvemos el dinero. Este plan es informativo y no sustituye la consulta médica.',
      },
    ],

    totalLabel: 'Total',
    checkoutError: 'No pudimos abrir el pago. Inténtalo de nuevo en un momento.',
    privacyLink: 'Privacidad',
    termsLink: 'Términos',
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
      'Ofrecemos una garantía de devolución de 14 días: si el producto no te sirve, te devolvemos el importe pagado.',
      'El pago es único, sin suscripciones ni cargos recurrentes.',
    ],
    backHome: 'Volver',
  },
};
