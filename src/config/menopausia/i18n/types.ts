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
    /** {time} → mm:ss */
    reserved: string;
    /** {age} → age range label. */
    headline: string;
    /** appended to headline when an event was chosen. {event} filled. */
    headlineEvent: string;
    /** phrase per event option index (aligned to quiz.event.options); empty = no addon. */
    eventPhrases: string[];
    profileGoalPrefix: string;
    /** 3 short benefit lines shown under the pack image. */
    benefits: string[];
    receiveTitle: string;
    items: ValueItem[];
    /** Label shown in place of a price on the bonus rows (e.g. "GRATIS"). */
    freeLabel: string;
    totalLabel: string;
    totalValue: number;
    todayLabel: string;
    priceNow: number;
    priceOld: number;
    offLabel: string;
    bumpLabel: string;
    buy: string;
    paySecure: string;
    accessEmail: string;
    howTitle: string;
    howSteps: string[];
    guaranteeTitle: string;
    guaranteeBody: string;
    faqTitle: string;
    faq: FaqItem[];
    footerDisclaimer: string;
    privacyLink: string;
    termsLink: string;
    genericHeadline: string;
    checkoutError: string;
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
