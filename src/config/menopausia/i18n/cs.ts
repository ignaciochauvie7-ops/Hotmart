import type { MenoDict } from './types';

// Čeština. Neformální tykání ("ty"), ženské tvary (cítila ses, sama).
// Přirozený copywriting, ne doslovný překlad. Název produktu: "Ploché břicho
// v menopauze".
export const cs: MenoDict = {
  htmlLang: 'cs',
  numberLocale: 'cs-CZ',

  meta: {
    quizTitle: 'Zjisti svůj plán na ploché břicho v menopauze',
    quizDesc:
      'Test na 1 minutu, který ti vytvoří plán na ploché břicho v menopauze na míru.',
    offerTitle: 'Tvůj plán Ploché břicho v menopauze',
    offerDesc: 'Tvůj plán na ploché břicho v menopauze na míru.',
    graciasTitle: 'Tvoje objednávka je skoro hotová',
    listoTitle: 'Vše je připraveno',
    privacyTitle: 'Zásady ochrany osobních údajů',
    termsTitle: 'Obchodní podmínky',
  },

  common: {
    continue: 'Pokračovat',
    backAria: 'Zpět',
    restartAria: 'Začít znovu',
    startTest: 'Spustit test (1 minuta)',
    seeMyPlan: 'Zobrazit můj plán',
    loading: 'Načítání…',
  },

  quiz: {
    cover: {
      badge: 'Test na 1 minutu',
      title: 'Objev svůj plán na ploché břicho bez nadýmání na míru',
      cta: 'Vytvořit můj plán',
      photoAlt: 'Usměvavá žena kolem padesátky',
    },
    age: {
      q: 'Kolik ti je let?',
      options: ['40-44', '45-49', '50-54', '55-59', '60+'],
    },
    period: {
      q: 'Máš ještě menstruaci?',
      options: ['Ano, pravidelnou', 'Ano, ale nepravidelnou', 'Ne, už přes 12 měsíců'],
    },
    fatZone: {
      q: 'Kde se ti hromadí nejvíc tuku?',
      options: ['Břicho', 'Boky a stehna', 'Paže', 'Celé tělo'],
    },
    reassure: {
      body:
        'Nejsi v tom sama. Spousta žen v tvém věku má pocit, že dělá všechno stejně jako dřív, a tělo se přesto mění. Není to nedostatek vůle — hormony změnily pravidla.',
    },
    height: { q: 'Kolik měříš?', unit: 'cm' },
    weight: { q: 'Kolik teď vážíš?', unit: 'kg' },
    target: {
      q: 'Jaká je tvoje cílová váha?',
      unit: 'kg',
      errLess: 'Cíl musí být nižší než tvoje současná váha.',
      errMax: 'Zvol cíl maximálně 25 kg pod současnou váhou.',
    },
    loading1: {
      texts: ['Analyzujeme tvůj profil…', 'Počítáme tvůj metabolismus…', 'Zjišťujeme tvoji hormonální fázi…'],
    },
    symptoms: {
      q: 'Jaké příznaky u sebe pozoruješ?',
      options: [
        'Nadýmání břicha',
        'Návaly horka',
        'Špatně spím',
        'Únava',
        'Výkyvy nálad',
        'Chutě na sladké',
        'Zadržování vody',
        'Žádné z uvedených',
      ],
      noneIndex: 7,
    },
    goal: {
      q: 'Jaký je tvůj hlavní cíl?',
      options: [
        'Zploštit břicho',
        'Zhubnout',
        'Lépe spát',
        'Mít víc energie',
        'Zase se cítit dobře ve svém oblečení',
      ],
    },
    movement: {
      q: 'Kolik se běžně za den hýbeš?',
      options: [
        'Skoro vůbec',
        'Trochu chodím',
        'Cvičím 1-2× týdně',
        'Cvičím 3× nebo víc',
      ],
    },
    time: {
      q: 'Kolik času si denně můžeš vyhradit?',
      options: ['10 minut', '15 minut', '20 minut nebo víc'],
      after: 'Skvělé: tvůj plán je navržený na 15 minut denně.',
    },
    lastGood: {
      q: 'Kdy ses naposledy cítila dobře ve svém těle?',
      options: ['Před méně než rokem', 'Před 1-3 lety', 'Před více než 5 lety', 'Nepamatuju si'],
    },
    event: {
      q: 'Máš v plánu nějakou událost?',
      options: ['Dovolenou', 'Svatbu nebo oslavu', 'Narozeniny', 'Nic, prostě se chci cítit dobře'],
    },
    loading2: {
      rows: [
        'Analyzujeme tvoje odpovědi',
        'Porovnáváme s podobnými profily',
      ],
    },
    result: {
      title: 'Tvůj plán Ploché břicho v menopauze je připravený',
      labelAge: 'Věk',
      labelGoal: 'Hlavní cíl',
      labelSymptoms: 'Hlavní příznaky',
      labelZone: 'Oblast k práci',
      labelImc: 'Tvoje BMI',
      imcNote: 'Jen orientačně, bez souzení.',
      chartBloating: 'Nadýmání',
      chartEnergy: 'Energie',
      chartToday: 'Dnes',
      chartDay28: '28. den',
      estimate:
        'Odhadem: od {kg} méně za 28 dní. Výsledky se u každého liší.',
      disclaimer: 'Orientační odhad. Výsledky se u každého liší.',
      cta: 'Zobrazit můj plán',
    },
  },

  offer: {
    headline: 'Tvůj 28denní plán, aby ses cítila lehčí — pro ženy ve věku {age}',
    genericHeadline: 'Tvůj 28denní plán, aby ses cítila lehčí v menopauze',
    ctaMain: 'Chci svůj plán',

    // ── Cuenta regresiva ──────────────────────────────────────────────
    countdownLabel: 'Dárky zdarma jen do:',

    // ── Hero ──────────────────────────────────────────────────────────
    heroLabel: 'Tvůj plán je připravený podle tvých odpovědí',
    heroTitle: '28denní výzva: rozluč se s faldíky a zase buď sama sebou',
    heroChips: [
      'Konec s faldíky a nafouklým břichem',
      'Oblečení ti zase dobře padne',
      'Víc energie na celý den',
      'Zase se cítit krásná a sebejistá',
      'Spi líp, probouzej se s chutí',
    ],

    // ── Zní ti to povědomě? ────────────────────────────────────────────
    soundsTitle: 'Zní ti to povědomě?',
    soundsPains: [
      'Podíváš se do zrcadla a oblečení už nedopne jako dřív',
      'Únava, která nezmizí ani po prospané noci',
      'Vyhýbáš se fotkám a akcím kvůli tomu, jak vypadáš',
      'Nafouklé břicho nezmizí, ať děláš, co děláš',
    ],
    soundsResultsTitle: 'S výzvou',
    soundsResults: [
      'Zase si pohodlně oblékneš své oblíbené kousky',
      'Vstáváš s energií a menším nadýmáním',
      'Cítíš se dobře na fotkách i mezi lidmi',
      'Plošší břicho týden po týdnu',
    ],

    // ── Cuadro "Qué incluye" (anclas en CZK, no se cobran) ─────────────
    valuePrefix: 'Hodnota',
    mainValue: '699 Kč',
    bonusValues: ['229 Kč', '149 Kč', '149 Kč', '119 Kč'],
    totalStruck: '1 345 Kč',
    todayLabel: 'Dnes',

    // ── Cómo funciona ──────────────────────────────────────────────────
    howTitle: 'Jak to funguje',
    howSteps: [
      'Koupíš během 1 minuty',
      'Všechno ti hned přijde na e-mail',
      'Začínáš ještě dnes',
    ],

    // ── Carrito ────────────────────────────────────────────────────────
    cartTitle: 'Tvá objednávka',
    cartClose: 'Zavřít',
    cartPlanNote: '28denní výzva + 4 bonusy zdarma',
    cartExtrasTitle: 'Chceš přidat ještě něco?',
    addLabel: 'Přidat',
    cartCta: 'Přejít k bezpečné platbě',
    onlyNow: 'jen teď',
    bumpCartDesc: 'Na probdělé noci a návaly horka, které nedají spát',
    bumpStruck: '349 Kč',
    upsellCartDesc: 'Rychlá úleva od plynů a nadýmání po jídle: klíčové nálevy a potraviny. Ideální doplněk výzvy.',
    upsellStruck: '369 Kč',

    includesTitle: 'Co tvůj plán obsahuje',
    mainName: 'Výzva Ploché Břicho za 28 Dní',
    mainSub: 'Rutina a plán den po dni, aby se zmenšilo břicho',
    bonusSubs: [
      'Snadná jídla, která snižují záněty',
      'Zaznamenávej pokrok a udrž si pravidelnost',
      'Co si objednat v restauraci bez nadýmání',
      'Návrat k plánu po prohřešku',
    ],

    upsellName: 'Sbohem nadýmání za 14 dní',

    securePay: 'Platba 100% bezpečná a chráněná',
    guaranteeTitle: 'Záruka {days} dní',
    guaranteeBody:
      'Vyzkoušej to bez rizika. Pokud nebudeš spokojená, napiš nám do {days} dní a vrátíme ti peníze.',
    guaranteeUnit: 'DNÍ',
    medicalDisclaimer: 'Tento plán má informativní charakter a nenahrazuje lékařskou konzultaci.',

    bonusesTitle: '4 bonusy v balíčku',
    bonusNames: [
      '30 protizánětlivých receptů',
      'Tracker na 28 dní',
      'Jez venku bez nadýmání',
      'Záchranný plán na 3 dny',
    ],
    freeTag: 'Zdarma',

    priceNote: 'Jednorázová platba',
    perDay: '≈ {price} denně',

    bumpName: 'Zase dobře spi za 21 dní',
    bumpBenefit: 'Plán na 21 nocí, aby ses líp vyspala.',
    bumpAdd: 'Přidat za {price}',

    ctaOffer: 'Chci svůj plán',
    trust: 'Bezpečná platba Dodo · okamžitý přístup · záruka {days} dní',

    social: {
      title: 'Co říkají jiné ženy',
      rating: '4,9',
      ratingAria: 'Průměrné hodnocení 4,9 z 5',
      trusted: '+11 000 žen už začalo se svým plánem',
      items: [
        {
          quote: 'Po třech týdnech je břicho výrazně méně nafouklé. Kalhoty mi konečně zapnou.',
          author: 'Jana, 54',
        },
        {
          quote: 'Nejlepší je, že je to jen 15 minut denně. Při mém rozvrhu je to jediné, co jsem zvládla udržet.',
          author: 'Petra, 50',
        },
        {
          quote: 'Dva roky jsem se každý večer cítila nafouklá. Recepty mi změnily trávení.',
          author: 'Hana, 56',
        },
        {
          quote: 'Není to nemožná dieta. Jím normálně a břicho přesto zmizelo.',
          author: 'Lenka, 49',
        },
        {
          quote: 'Mám víc energie a lépe spím. Zase se cítím jako já.',
          author: 'Alena, 58',
        },
        {
          quote: 'Myslela jsem, že v mém věku se už nedá nic dělat. Jsem ráda, že jsem to zkusila.',
          author: 'Marie, 61',
        },
      ],
    },

    faqTitle: 'Časté dotazy',
    faq: [
      {
        q: 'Co dostanu a v jakém formátu?',
        a: '28denní plán a 4 bonusy v PDF — přečteš si je v mobilu, na tabletu nebo počítači, nebo si je vytiskneš.',
      },
      {
        q: 'Kdy to dostanu?',
        a: 'Hned. Jakmile se platba potvrdí, dostaneš všechno na e-mail, obvykle do 5 minut.',
      },
      {
        q: 'Je to jednorázová platba?',
        a: 'Ano. Jedna platba, žádné předplatné ani opakované poplatky.',
      },
      {
        q: 'Je platba bezpečná a v jaké měně?',
        a: 'Platíš kartou přes Dodo Payments po šifrovaném spojení; údaje o tvé kartě neukládáme. Částka se strhne v korunách (Kč).',
      },
      {
        q: 'A co když mi to nesedne?',
        a: 'Máš {days}denní záruku: pokud to není pro tebe, vrátíme ti peníze. Tento plán má informativní charakter a nenahrazuje lékařskou konzultaci.',
      },
    ],

    totalLabel: 'Celkem',
    checkoutError: 'Platbu se nepodařilo otevřít. Zkus to prosím za chvíli znovu.',
    privacyLink: 'Soukromí',
    termsLink: 'Podmínky',
  },

  gracias: {
    verifying: 'Potvrzujeme tvoji platbu…',
    notPaidTitle: 'Potvrzujeme tvoji platbu',
    notPaidBody:
      'Pokud jsi právě zaplatila, může to pár vteřin trvat. Zkontroluj e-mail; pokud nic nevidíš, napiš nám.',
    upsellTag: 'Počkej! Tvoje objednávka je skoro hotová',
    upsellTitle: 'Přidej Sbohem nadýmání za 14 dní',
    upsellBody: 'Protizánětlivý plán na 14 dní, který ti zploští břicho. Jen dnes: {price}.',
    upsellIncludes: [
      'Protizánětlivé menu na 14 dní',
      'Seznam potravin, které snižují nadýmání',
      'Rychlý návod na dny s největším nadýmáním',
    ],
    upsellPriceLabel: 'Jen dnes',
    yes: 'Ano, chci to',
    no: 'Ne, děkuji, chci jen svůj plán',
  },

  listo: {
    title: 'Hotovo!',
    body:
      'Zkontroluj e-mail: poslali jsme ti všechny soubory. Pokud je nevidíš, mrkni do spamu nebo do nabídek.',
    upsellThanks: 'Děkujeme! Tvůj bonus už je taky na cestě na e-mail.',
  },

  downloads: {
    title: 'Stáhni si své soubory',
    note: 'Odkazy vyprší za 7 dní. Poslali jsme ti je i na e-mail.',
  },

  email: {
    subject: 'Tvoje soubory jsou připravené',
    heading: 'Děkujeme za nákup!',
    intro: 'Tady jsou tvé soubory ke stažení. Klikni na každý a ulož si ho:',
    expiryNote: 'Odkazy vyprší za 7 dní.',
  },

  legal: {
    privacyHeading: 'Zásady ochrany osobních údajů',
    privacyBody: [
      'Tvoje údaje (jméno, e-mail a platební údaje) zpracováváme výhradně proto, abychom dokončili nákup a poslali ti objednaný produkt.',
      'Platbu bezpečně zpracovává Dodo Payments; údaje o tvé kartě neukládáme.',
      'Používáme soubory cookie a měřicí pixely (včetně Meta), abychom rozuměli účinnosti naší reklamy. Můžeš je zablokovat ve svém prohlížeči.',
      'Můžeš e-mailem požádat o přístup ke svým údajům, jejich opravu nebo smazání.',
    ],
    termsHeading: 'Obchodní podmínky',
    termsBody: [
      'Nákupem souhlasíš, že dostaneš digitální produkt ke stažení s okamžitým přístupem e-mailem.',
      'Produkt má informativní charakter a nenahrazuje radu odborníka na zdraví. Před zahájením jakéhokoli plánu se poraď s lékařem.',
      'Dáváme 14denní záruku vrácení peněz: pokud ti produkt nepomůže, vrátíme zaplacenou částku.',
      'Platba je jednorázová, bez předplatného a opakovaných plateb.',
    ],
    backHome: 'Zpět',
  },
};
