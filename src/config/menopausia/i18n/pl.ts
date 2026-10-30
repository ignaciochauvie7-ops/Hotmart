import type { MenoDict } from './types';

// Polski. Zwrot nieformalny na "Ty" (wielka litera, jak w reklamie), formy
// żeńskie (czułaś, sama). Naturalny copywriting, nie dosłowne tłumaczenie.
export const pl: MenoDict = {
  htmlLang: 'pl',
  numberLocale: 'pl-PL',

  meta: {
    quizTitle: 'Poznaj swój plan na płaski brzuch w menopauzie',
    quizDesc:
      'Test w 1 minutę, który stworzy Twój spersonalizowany plan na płaski brzuch w menopauzie.',
    offerTitle: 'Twój plan Płaski Brzuch w 28 Dni',
    offerDesc: 'Twój spersonalizowany plan na płaski brzuch w 28 dni.',
    graciasTitle: 'Twoje zamówienie prawie gotowe',
    listoTitle: 'Wszystko gotowe',
    privacyTitle: 'Polityka prywatności',
    termsTitle: 'Regulamin',
  },

  common: {
    continue: 'Dalej',
    backAria: 'Wróć',
    restartAria: 'Zacznij od nowa',
    startTest: 'Zacznij test (1 minuta)',
    seeMyPlan: 'Zobacz mój plan',
    loading: 'Ładowanie…',
  },

  quiz: {
    cover: {
      badge: 'Test w 1 minutę',
      title: 'Dlaczego po 45. roku życia brzuch rośnie, choć jesz tak samo? Poznaj swój plan na 28 dni',
      subtitle: 'Odpowiedz na kilka krótkich pytań i dowiedz się, co może pomóc w Twojej sytuacji.',
      bullets: [
        '15 minut dziennie',
        'Bez siłowni i bez liczenia kalorii',
        'Plan na 28 dni dopasowany do Twoich odpowiedzi',
      ],
      cta: 'Zacznij test (1 min)',
      microcopy: '30-dniowa gwarancja zwrotu pieniędzy',
      photoAlt: 'Uśmiechnięta kobieta około pięćdziesiątki',
    },
    age: {
      q: 'Ile masz lat?',
      options: ['40-44', '45-49', '50-54', '55-59', '60+'],
    },
    period: {
      q: 'Czy nadal masz okres?',
      options: ['Tak, regularny', 'Tak, ale nieregularny', 'Nie, od ponad 12 miesięcy'],
    },
    fatZone: {
      q: 'Gdzie gromadzi się u Ciebie najwięcej tłuszczu?',
      options: ['Brzuch', 'Biodra i uda', 'Ramiona', 'Całe ciało'],
    },
    reassure: {
      body:
        'Nie jesteś sama. Wiele kobiet w Twoim wieku czuje, że robi wszystko tak samo, a ciało i tak się zmienia. To nie brak silnej woli — to hormony zmieniły zasady.',
    },
    height: { q: 'Ile masz wzrostu?', unit: 'cm' },
    weight: { q: 'Ile teraz ważysz?', unit: 'kg' },
    target: {
      q: 'Jaka jest Twoja waga docelowa?',
      unit: 'kg',
      errLess: 'Cel musi być niższy niż Twoja obecna waga.',
      errMax: 'Wybierz cel maksymalnie 25 kg poniżej obecnej wagi.',
    },
    loading1: {
      texts: ['Analizujemy Twój profil…', 'Obliczamy Twój metabolizm…', 'Sprawdzamy Twój etap hormonalny…'],
    },
    symptoms: {
      q: 'Jakie objawy u siebie zauważasz?',
      options: [
        'Wzdęcia brzucha',
        'Uderzenia gorąca',
        'Źle sypiam',
        'Zmęczenie',
        'Wahania nastroju',
        'Ochota na słodycze',
        'Zatrzymywanie wody',
        'Żadne z powyższych',
      ],
      noneIndex: 7,
    },
    goal: {
      q: 'Jaki jest Twój główny cel?',
      options: [
        'Spłaszczyć brzuch',
        'Schudnąć',
        'Lepiej spać',
        'Mieć więcej energii',
        'Znów dobrze czuć się w swoich ubraniach',
      ],
    },
    movement: {
      q: 'Ile się ruszasz w zwykły dzień?',
      options: [
        'Prawie wcale',
        'Trochę chodzę',
        'Ćwiczę 1-2 razy w tygodniu',
        'Ćwiczę 3 razy lub więcej',
      ],
    },
    time: {
      q: 'Ile czasu dziennie możesz sobie poświęcić?',
      options: ['10 minut', '15 minut', '20 minut lub więcej'],
      after: 'Świetnie: Twój plan jest zaprojektowany na 15 minut dziennie.',
    },
    lastGood: {
      q: 'Kiedy ostatnio czułaś się dobrze ze swoim ciałem?',
      options: ['Mniej niż rok temu', '1-3 lata temu', 'Ponad 5 lat temu', 'Nie pamiętam'],
    },
    event: {
      q: 'Masz w planach jakieś wydarzenie?',
      options: ['Wakacje', 'Ślub lub uroczystość', 'Urodziny', 'Nic, po prostu chcę czuć się dobrze'],
    },
    loading2: {
      rows: [
        'Analizujemy Twoje odpowiedzi',
        'Porównujemy z podobnymi do Ciebie profilami',
      ],
    },
    result: {
      title: 'Twój plan Płaski Brzuch w 28 Dni jest gotowy',
      labelAge: 'Wiek',
      labelGoal: 'Główny cel',
      labelSymptoms: 'Główne objawy',
      labelZone: 'Obszar do pracy',
      labelImc: 'Twoje BMI',
      imcNote: 'Tylko orientacyjnie, bez oceniania.',
      chartBloating: 'Wzdęcia',
      chartEnergy: 'Energia',
      chartToday: 'Dziś',
      chartDay28: 'Dzień 28',
      estimate:
        'Szacunkowo: od {kg} mniej w 28 dni. Wyniki różnią się u każdej osoby.',
      disclaimer: 'Szacunek orientacyjny. Wyniki różnią się u każdej osoby.',
      cta: 'Zobacz mój plan',
    },
  },

  offer: {
    headline: 'Twój 28-dniowy plan, byś poczuła się lżej — dla kobiet w wieku {age}',
    genericHeadline: 'Twój 28-dniowy plan, byś poczuła się lżej w menopauzie',
    ctaMain: 'Chcę swój plan',

    // ── Cuenta regresiva ──────────────────────────────────────────────
    countdownLabel: 'Dodatki gratis tylko do:',

    // ── Hero ──────────────────────────────────────────────────────────
    heroLabel: 'Twój plan jest gotowy na podstawie Twoich odpowiedzi',
    heroTitle: 'Wyzwanie na 28 dni: pożegnaj oponki i znów poczuj się sobą',
    heroChips: [
      'Koniec z oponkami i wzdętym brzuchem',
      'Ubrania znów dobrze leżą',
      'Więcej energii na cały dzień',
      'Znów poczuj się piękna i pewna siebie',
      'Śpij lepiej, budź się z ochotą',
    ],

    // ── Brzmi znajomo? ─────────────────────────────────────────────────
    soundsTitle: 'Brzmi znajomo?',
    soundsPains: [
      'Patrzysz w lustro, a ubrania już nie dopinają się jak kiedyś',
      'Zmęczenie, które nie mija nawet po przespanej nocy',
      'Unikasz zdjęć i spotkań przez to, jak wyglądasz',
      'Wzdęty brzuch nie znika, cokolwiek robisz',
    ],
    soundsResultsTitle: 'Z wyzwaniem',
    soundsResults: [
      'Znów wygodnie wkładasz ulubione ubrania',
      'Wstajesz z energią i mniejszym wzdęciem',
      'Czujesz się swobodnie na zdjęciach i spotkaniach',
      'Płaszczejący brzuch tydzień po tygodniu',
    ],

    // ── Cuadro "Qué incluye" (anclas en PLN, no se cobran) ─────────────
    valuePrefix: 'Wartość',
    mainValue: '129 zł',
    bonusValues: ['39 zł', '29 zł', '29 zł', '25 zł'],
    totalStruck: '251 zł',
    todayLabel: 'Dziś',

    // ── Cómo funciona ──────────────────────────────────────────────────
    howTitle: 'Jak to działa',
    howSteps: [
      'Kupujesz w 1 minutę',
      'Pliki pobierasz od razu po płatności',
      'Zaczynasz jeszcze dziś',
    ],

    // ── Carrito ────────────────────────────────────────────────────────
    cartTitle: 'Twoje zamówienie',
    cartClose: 'Zamknij',
    cartPlanNote: 'Wyzwanie na 28 dni + 4 dodatki gratis',
    cartExtrasTitle: 'Chcesz dodać coś jeszcze?',
    addLabel: 'Dodaj',
    cartCta: 'Przejdź do bezpiecznej płatności',
    onlyNow: 'tylko teraz',
    bumpCartDesc: 'Na nieprzespane noce i uderzenia gorąca, które nie dają spać',
    bumpStruck: '59 zł',
    upsellCartDesc: 'Szybka ulga w gazach i wzdęciu po jedzeniu: kluczowe napary i produkty. Idealne uzupełnienie wyzwania.',
    upsellStruck: '59 zł',
    bothExtrasSave: 'Weź oba: oszczędzasz 9 zł',

    includesTitle: 'Co zawiera Twój plan',
    mainName: 'Wyzwanie Płaski Brzuch w 28 Dni',
    mainSub: 'Rutyna i plan dzień po dniu, by zmniejszyć brzuch',
    bonusSubs: [
      'Łatwe posiłki, które zmniejszają stan zapalny',
      'Zapisuj postępy i utrzymaj regularność',
      'Co zamówić w restauracji, by nie mieć wzdęć',
      'Powrót do planu po odstępstwie',
    ],

    upsellName: 'Żegnaj Wzdęcie w 14 Dni',

    securePay: 'Płatność w 100% bezpieczna i chroniona',
    guaranteeTitle: 'Gwarancja {days} dni',
    guaranteeBody:
      'Wypróbuj bez ryzyka. Jeśli nie będziesz zadowolona, napisz do nas w ciągu {days} dni, a zwrócimy pieniądze.',
    guaranteeUnit: 'DNI',
    medicalDisclaimer: 'Ten plan ma charakter informacyjny i nie zastępuje konsultacji lekarskiej.',

    bonusesTitle: '4 dodatki w zestawie',
    bonusNames: [
      '30 przepisów przeciwzapalnych',
      'Tracker na 28 dni',
      'Jedz na mieście bez wzdęć',
      'Plan Ratunkowy na 3 dni',
    ],
    freeTag: 'Gratis',

    priceNote: 'Jednorazowa płatność',
    perDay: '≈ {price} dziennie',

    bumpName: 'Znów Dobrze Śpij w 21 Dni',
    bumpBenefit: 'Plan na 21 nocy, byś lepiej spała.',
    bumpAdd: 'Dodaj za {price}',

    ctaOffer: 'Chcę swój plan',
    trust: 'Bezpieczna płatność Dodo · natychmiastowy dostęp · gwarancja {days} dni',

    social: {
      title: 'Co mówią inne kobiety',
      rating: '4,9',
      ratingAria: 'Średnia ocena 4,9 na 5',
      trusted: '+18 000 kobiet już zaczęło swój plan',
      items: [
        {
          quote: 'Po trzech tygodniach brzuch jest wyraźnie mniej wzdęty. Spodnie wreszcie się dopinają.',
          author: 'Anna, 53',
        },
        {
          quote: 'Najlepsze jest to, że to tylko 15 minut dziennie. Przy moim grafiku to jedyne, co udało mi się utrzymać.',
          author: 'Katarzyna, 50',
        },
        {
          quote: 'Od dwóch lat każdego wieczoru czułam wzdęcia. Przepisy zmieniły moje trawienie.',
          author: 'Małgorzata, 57',
        },
        {
          quote: 'To nie jest niemożliwa dieta. Jem normalnie, a brzuch i tak zniknął.',
          author: 'Barbara, 49',
        },
        {
          quote: 'Mam więcej energii i lepiej śpię. Znów czuję się sobą.',
          author: 'Ewa, 58',
        },
        {
          quote: 'Myślałam, że w moim wieku nic już nie da się zrobić. Cieszę się, że spróbowałam.',
          author: 'Grażyna, 60',
        },
      ],
    },

    faqTitle: 'Najczęstsze pytania',
    faq: [
      {
        q: 'Co dostaję i w jakim formacie?',
        a: '28-dniowy plan i 4 dodatki w PDF — przeczytasz je w telefonie, na tablecie lub komputerze, albo wydrukujesz.',
      },
      {
        q: 'Kiedy to otrzymam?',
        a: 'Od razu. Gdy tylko płatność się potwierdzi, dostajesz wszystko na e-mail, zwykle w mniej niż 5 minut.',
      },
      {
        q: 'Czy to jednorazowa płatność?',
        a: 'Tak. Jedna płatność, bez subskrypcji i bez cyklicznych opłat.',
      },
      {
        q: 'Czy płatność jest bezpieczna i w jakiej walucie?',
        a: 'Płacisz kartą przez Dodo Payments po szyfrowanym połączeniu; nie przechowujemy danych Twojej karty. Kwota jest pobierana w złotych (zł).',
      },
      {
        q: 'A jeśli mi się nie spodoba?',
        a: 'Masz {days} dni gwarancji: jeśli to nie dla Ciebie, zwracamy pieniądze. Ten plan ma charakter informacyjny i nie zastępuje konsultacji lekarskiej.',
      },
    ],

    totalLabel: 'Razem',
    checkoutError: 'Nie udało się otworzyć płatności. Spróbuj ponownie za chwilę.',
    privacyLink: 'Prywatność',
    termsLink: 'Regulamin',
  },

  gracias: {
    verifying: 'Potwierdzamy Twoją płatność…',
    notPaidTitle: 'Potwierdzamy Twoją płatność',
    notPaidBody:
      'Jeśli właśnie zapłaciłaś, może to potrwać kilka sekund. Sprawdź e-mail; jeśli nic nie widzisz, napisz do nas.',
    upsellTag: 'Zaczekaj! Twoje zamówienie jest prawie gotowe',
    upsellTitle: 'Dodaj Żegnaj Wzdęcie w 14 Dni',
    upsellBody: 'Przeciwzapalny plan na 14 dni, który spłaszczy Twój brzuch. Tylko dziś: {price}.',
    upsellIncludes: [
      'Przeciwzapalne menu na 14 dni',
      'Lista produktów, które zmniejszają wzdęcia',
      'Szybki poradnik na dni z największymi wzdęciami',
    ],
    upsellPriceLabel: 'Tylko dziś',
    yes: 'Tak, chcę',
    no: 'Nie, dziękuję, chcę tylko swój plan',
  },

  listo: {
    title: 'Gotowe!',
    body:
      'Sprawdź e-mail: wysłaliśmy wszystkie Twoje pliki. Jeśli ich nie widzisz, zajrzyj do spamu lub ofert.',
    upsellThanks: 'Dziękujemy! Twój dodatek też jest już w drodze na e-mail.',
  },

  downloads: {
    title: 'Pobierz swoje pliki',
    note: 'Linki wygasają po 7 dniach. Wysłaliśmy je też na e-mail.',
  },

  email: {
    subject: 'Twoje pliki są już gotowe',
    heading: 'Dziękujemy za zakup!',
    intro: 'Oto Twoje pliki do pobrania. Kliknij każdy, aby go zapisać:',
    expiryNote: 'Linki wygasają po 7 dniach.',
  },

  legal: {
    privacyHeading: 'Polityka prywatności',
    privacyBody: [
      'Przetwarzamy Twoje dane (imię, e-mail i dane płatności) wyłącznie po to, by zrealizować zakup i wysłać Ci zamówiony produkt.',
      'Płatność jest realizowana bezpiecznie przez Dodo Payments; nie przechowujemy danych Twojej karty.',
      'Używamy plików cookie i pikseli pomiarowych (w tym Meta), by rozumieć skuteczność naszych reklam. Możesz je zablokować w swojej przeglądarce.',
      'Możesz poprosić o dostęp do danych, ich poprawienie lub usunięcie, pisząc do nas e-mailem.',
    ],
    termsHeading: 'Regulamin',
    termsBody: [
      'Kupując, akceptujesz, że otrzymasz cyfrowy produkt do pobrania, z natychmiastowym dostępem e-mailem.',
      'Produkt ma charakter informacyjny i nie zastępuje porady specjalisty zdrowia. Przed rozpoczęciem jakiegokolwiek planu skonsultuj się z lekarzem.',
      'Dajemy 14-dniową gwarancję zwrotu: jeśli produkt Ci nie pomoże, zwracamy zapłaconą kwotę.',
      'Płatność jest jednorazowa, bez subskrypcji i cyklicznych obciążeń.',
    ],
    backHome: 'Wróć',
  },
};
