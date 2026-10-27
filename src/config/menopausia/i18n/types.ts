export interface ValueItem {
  name: string;
  price: number; // EUR, struck-through on the offer
}

export interface FaqItem {
  q: string;
  a: string;
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
    symptoms: { q: string; options: string[] };
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
    // ── Bloque 1 · Promesa ──────────────────────────────────────────────
    /** {age} → franja de edad del quiz. */
    headline: string;
    /** Titular sin personalizar (entrada directa, sin respuestas). */
    genericHeadline: string;
    subhead: string;
    /** Línea sobre los chips del perfil, p. ej. "Según tus respuestas:". */
    profileIntro: string;
    /** 3 beneficios cortos. */
    benefits: string[];
    ctaMain: string;
    /** Línea de confianza bajo el CTA (pago seguro · PDF al instante). */
    trustInline: string;

    // ── Bloque 2 · Problema + solución ──────────────────────────────────
    problemTitle: string;
    problemBody: string[];
    solutionTitle: string;
    solutionBody: string;
    includesTitle: string;
    ebook: { name: string; blurb: string };
    bonusesTitle: string;
    bonuses: { name: string; blurb: string }[];

    // ── Bloque 3 · Prueba honesta ───────────────────────────────────────
    proofTitle: string;
    proofSecure: string;
    /** {days} → días de garantía. */
    proofGuarantee: string;
    proofDelivery: string;
    /** Prefijo antes del email de soporte (solo si SUPPORT_EMAIL existe). */
    proofSupportPrefix: string;

    // ── Bloque 4 · Oferta ───────────────────────────────────────────────
    offerTitle: string;
    getListTitle: string;
    getList: string[];
    priceLead: string;
    priceNote: string;
    /** {price} → precio del bump en moneda local. */
    bumpLabel: string;
    ctaOffer: string;
    /** {days} → días de garantía. */
    guaranteeBadge: string;
    paymentNote: string;
    /** "Total hoy" cuando el bump está marcado. */
    totalTodayLabel: string;

    // ── Bloque 5 · FAQ + cierre ─────────────────────────────────────────
    faqTitle: string;
    /** La respuesta de la garantía admite el token {days}. */
    faq: FaqItem[];
    medicalNote: string;
    finalTitle: string;
    ctaFinal: string;

    // ── Varios ──────────────────────────────────────────────────────────
    freeLabel: string;
    stickyPrefix: string;
    checkoutError: string;
    footerDisclaimer: string;
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
