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
    // Bloque 1 · Promesa
    headline: 'Tu plan de 28 días para sentirte más ligera, hecho para mujeres de {age}',
    genericHeadline: 'Tu plan de 28 días para sentirte más ligera en la menopausia',
    subhead:
      'Rutinas cortas y comidas sencillas que encajan en tu día, sin pasar hambre ni pisar el gimnasio.',
    profileIntro: 'Según tus respuestas:',
    benefits: [
      '15 minutos al día, en casa y sin equipo',
      'Comidas pensadas para esta etapa, sin dietas imposibles',
      'Pasos sencillos para notar menos hinchazón día a día',
    ],
    ctaMain: 'Quiero mi plan',
    trustInline: 'Pago seguro · Lo recibes en PDF al instante',

    // Bloque 2 · Problema + solución
    problemTitle: 'Si sientes que tu cuerpo ya no responde como antes, no es culpa tuya',
    problemBody: [
      'En la menopausia tus hormonas cambian las reglas: la rutina de siempre deja de funcionar y aparecen la hinchazón, el cansancio y las noches en vela.',
      'No necesitas más fuerza de voluntad. Necesitas un plan pensado para esta etapa, que se adapte a tu tiempo y a tu cuerpo de hoy.',
    ],
    solutionTitle: 'Un plan de 28 días que encaja en tu vida',
    solutionBody:
      'Solo 15 minutos al día, en casa, con comidas sencillas y las listas de la compra ya hechas. Lo abres en el móvil o lo imprimes, y empiezas hoy mismo.',
    includesTitle: 'Qué incluye tu plan',
    ebook: {
      name: 'Reto Abdomen Plano en 28 Días',
      blurb: 'La rutina guiada de 15 minutos al día, el plan de comidas y las listas de la compra, paso a paso.',
    },
    bonusesTitle: 'Y 4 extras de regalo',
    bonuses: [
      { name: '30 recetas antiinflamatorias', blurb: 'Platos fáciles y sabrosos para cocinar sin complicarte.' },
      { name: 'Tracker imprimible de 28 días', blurb: 'Una hoja para marcar cada día y ver tu avance de un vistazo.' },
      { name: 'Come fuera sin hincharte', blurb: 'Qué pedir en restaurantes y reuniones para seguir tu plan sin renunciar a nada.' },
      { name: 'Plan Rescate de 3 días', blurb: 'Un reinicio corto para los días en que te notas más hinchada.' },
    ],

    // Bloque 3 · Prueba honesta
    proofTitle: 'Comprar es seguro y sin riesgos',
    proofSecure:
      'Pago protegido y procesado por Dodo Payments. No guardamos los datos de tu tarjeta.',
    proofGuarantee: 'Garantía de {days} días: si no es para ti, te devolvemos el dinero.',
    proofDelivery: 'Entrega inmediata: recibes todo en tu email nada más pagar.',
    proofSupportPrefix: '¿Tienes dudas? Escríbenos a',

    // Bloque 4 · Oferta
    offerTitle: 'Todo tu plan, en un solo pago',
    getListTitle: 'Esto recibes hoy',
    getList: [
      'Reto Abdomen Plano en 28 Días',
      '30 recetas antiinflamatorias',
      'Tracker imprimible de 28 días',
      'Come fuera sin hincharte',
      'Plan Rescate de 3 días',
    ],
    priceLead: 'Hoy',
    priceNote: 'Pago único · Sin suscripción · Sin cargos ocultos',
    bumpLabel:
      'Añade Vuelve a Descansar Bien en 21 Días: un plan de 21 noches para dormir mejor. Solo {price}.',
    ctaOffer: 'Quiero mi plan',
    guaranteeBadge: 'Garantía de {days} días',
    paymentNote: 'Acceso inmediato por email tras el pago',
    totalTodayLabel: 'Total hoy',

    // Bloque 5 · FAQ + cierre
    faqTitle: 'Preguntas frecuentes',
    faq: [
      {
        q: '¿Qué recibo exactamente y en qué formato?',
        a: 'Recibes el plan completo de 28 días y los 4 extras en PDF: puedes leerlos en el móvil, la tablet o el ordenador, o imprimirlos si lo prefieres.',
      },
      {
        q: '¿Cuándo me llega?',
        a: 'Al instante. En cuanto se confirma el pago te enviamos todo a tu email, normalmente en menos de 5 minutos.',
      },
      {
        q: '¿Funciona en el celular?',
        a: 'Sí. Son archivos PDF que se abren en cualquier teléfono, tablet u ordenador, sin instalar nada.',
      },
      {
        q: '¿Necesito gimnasio o aparatos?',
        a: 'No. Los ejercicios se hacen en casa con tu propio cuerpo; como mucho una silla y una esterilla.',
      },
      {
        q: '¿Sirve para mi edad y mi etapa de la menopausia?',
        a: 'Sí. Está pensado para mujeres de 45 a 60 años, tengas o no la regla: premenopausia, menopausia o posmenopausia.',
      },
      {
        q: '¿Es una suscripción?',
        a: 'No. Es un pago único. No hay cuotas ni cargos recurrentes.',
      },
      {
        q: '¿Cómo se paga y en qué moneda?',
        a: 'Pagas con tarjeta de forma segura. El importe se muestra y se cobra en euros.',
      },
      {
        q: '¿Es seguro pagar?',
        a: 'Sí. El pago lo procesa Dodo Payments con conexión cifrada; nosotros no vemos ni guardamos los datos de tu tarjeta.',
      },
      {
        q: '¿Qué pasa si no me gusta?',
        a: 'Tienes {days} días de garantía. Si no es para ti, escríbenos y te devolvemos el dinero.',
      },
      {
        q: '¿Cómo imprimo el tracker?',
        a: 'Abre el PDF del tracker y pulsa imprimir desde el móvil o el ordenador. También puedes marcarlo en pantalla si prefieres no gastar papel.',
      },
      {
        q: '¿A quién escribo si no me llega?',
        a: 'Revisa primero las carpetas de spam y promociones. Si en unos minutos sigues sin verlo, responde al email de tu compra y te lo reenviamos enseguida.',
      },
    ],
    medicalNote:
      'Este plan es informativo y de estilo de vida: no sustituye la consulta médica. Si tienes alguna condición de salud, consulta a tu médico antes de empezar.',
    finalTitle: 'Empieza hoy tu plan de 28 días',
    ctaFinal: 'Quiero mi plan ahora',

    // Varios
    freeLabel: 'Incluido',
    stickyPrefix: 'Hoy',
    checkoutError: 'No pudimos abrir el pago. Inténtalo de nuevo en un momento.',
    footerDisclaimer:
      'Este programa es informativo y no sustituye el consejo de un profesional de la salud.',
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
