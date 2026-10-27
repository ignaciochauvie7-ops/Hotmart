export interface ValueItem {
  name: string;
  price: number; // EUR, struck-through on the offer
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface Testimonial {
  /** Cita de la clienta. */
  quote: string;
  /** Nombre + edad, p. ej. "María José, 54". */
  author: string;
}

export interface MenoDict {
  /** BCP-47 tag used for <html lang> and Intl number formatting. */
  htmlLang: string;
  numberLocale: string;

  meta: {
    quizTitle: string;
    quizDesc: string;
    offerTitle: string;
    offerDesc: string;
    graciasTitle: string;
    listoTitle: string;
    privacyTitle: string;
    termsTitle: string;
  };

  common: {
    continue: string;
    backAria: string;
    restartAria: string;
    startTest: string;
    seeMyPlan: string;
    loading: string;
  };

  quiz: {
    cover: { badge: string; title: string; cta: string; photoAlt: string };
    age: { q: string; options: string[] };
    period: { q: string; options: string[] };
    fatZone: { q: string; options: string[] };
    reassure: { body: string };
    height: { q: string; unit: string };
    weight: { q: string; unit: string };
    target: {
      q: string;
      unit: string;
      errLess: string;
      errMax: string;
    };
    loading1: { texts: string[] };
    /** Multi-select. `noneIndex` (optional) marks the one exclusive "none of
     *  these" option — picking it clears the rest, picking any other clears it.
     *  Omit when there is no such option (then every option combines freely). */
    symptoms: { q: string; options: string[]; noneIndex?: number };
    goal: { q: string; options: string[] };
    movement: { q: string; options: string[] };
    time: { q: string; options: string[]; after: string };
    lastGood: { q: string; options: string[] };
    event: { q: string; options: string[] };
    loading2: { rows: string[] };
    result: {
      title: string;
      labelAge: string;
      labelGoal: string;
      labelSymptoms: string;
      labelZone: string;
      labelImc: string;
      imcNote: string;
      chartBloating: string;
      chartEnergy: string;
      chartToday: string;
      chartDay28: string;
      /** {kg} replaced with "1–3" style range. */
      estimate: string;
      disclaimer: string;
      cta: string;
    };
  };

  offer: {
    // ── 1 · Titular + portada principal + CTA ───────────────────────────
    /** {age} → franja de edad del quiz. */
    headline: string;
    /** Titular sin personalizar (entrada directa, sin respuestas). */
    genericHeadline: string;
    ctaMain: string;

    // ── Solo `es` · landing reordenada (campos opcionales) ──────────────
    /** Promesa fuerte bajo el titular. */
    promise?: string;
    /** Encabezado de la lista de beneficios del producto principal. */
    mainBenefitsTitle?: string;
    /** Beneficios del producto principal (una línea cada uno). */
    mainBenefits?: string[];
    /** Encabezado de la sección "dolores que resuelve". */
    painsTitle?: string;
    /** Dolores que resuelve (sofocos, peso/abdomen, sueño, ánimo…). */
    pains?: string[];
    /** Encabezado del bloque de compra. */
    buyTitle?: string;
    /** Extra 2 (upsell) en la landing — nombre junto al checkbox. */
    upsellName?: string;
    upsellBenefit?: string;
    /** {price} → precio del upsell. */
    upsellAdd?: string;
    /** Línea de pago seguro junto al botón. */
    securePay?: string;
    /** Título de la garantía. */
    guaranteeTitle?: string;
    /** {days} → días de garantía. Cuerpo de la garantía. */
    guaranteeBody?: string;

    // ── 2 · Cuadrícula de bonus ─────────────────────────────────────────
    bonusesTitle: string;
    /** 4 nombres cortos, una línea cada uno (orden = bonus1..bonus4). */
    bonusNames: string[];
    /** Etiqueta de regalo bajo cada bonus. */
    freeTag: string;

    // ── 3 · Caja de precio ──────────────────────────────────────────────
    priceNote: string;
    /** {price} → precio por día ya formateado. Único comparativo permitido. */
    perDay: string;

    // ── 4 · Bump ────────────────────────────────────────────────────────
    bumpName: string;
    bumpBenefit: string;
    /** {price} → precio del bump. Texto junto al checkbox. */
    bumpAdd: string;

    // ── 5 · CTA + confianza ─────────────────────────────────────────────
    ctaOffer: string;
    /** {days} → días de garantía. "Pago seguro Dodo · acceso inmediato · …". */
    trust: string;

    // ── 6 · Prueba social · reseñas ─────────────────────────────────────
    social: {
      /** Encabezado de la sección. */
      title: string;
      /** Nota media formateada, p. ej. "4,9". */
      rating: string;
      /** Texto accesible de la valoración. */
      ratingAria: string;
      /** Línea de confianza, p. ej. "+24.000 mujeres ya empezaron su plan". */
      trusted: string;
      /** 6 testimonios (orden = foto t1..t6). */
      items: Testimonial[];
    };

    // ── 7 · FAQ ─────────────────────────────────────────────────────────
    faqTitle: string;
    /** Respuestas admiten el token {days}. */
    faq: FaqItem[];

    // ── Varios ──────────────────────────────────────────────────────────
    /** Prefijo del total en CTA/barra fija. */
    totalLabel: string;
    checkoutError: string;
    privacyLink: string;
    termsLink: string;
  };

  gracias: {
    verifying: string;
    notPaidTitle: string;
    notPaidBody: string;
    upsellTag: string;
    upsellTitle: string;
    upsellBody: string;
    upsellIncludes: string[];
    upsellPriceLabel: string;
    yes: string;
    no: string;
  };

  listo: {
    title: string;
    body: string;
    upsellThanks: string;
  };

  downloads: {
    title: string;
    note: string;
  };

  email: {
    subject: string;
    heading: string;
    intro: string;
    expiryNote: string;
  };

  legal: {
    privacyHeading: string;
    privacyBody: string[];
    termsHeading: string;
    termsBody: string[];
    backHome: string;
  };
}
