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
      title: 'Odkryj swój spersonalizowany plan na płaski brzuch bez wzdęć',
      cta: 'Stwórz mój plan',
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
      ],
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
    // Blok 1 · Obietnica
    headline: 'Twój 28-dniowy plan, byś poczuła się lżej — dla kobiet w wieku {age}',
    genericHeadline: 'Twój 28-dniowy plan, byś poczuła się lżej w menopauzie',
    subhead:
      'Krótkie ćwiczenia i proste posiłki, które zmieszczą się w Twoim dniu — bez głodówek i bez siłowni.',
    profileIntro: 'Na podstawie Twoich odpowiedzi:',
    benefits: [
      '15 minut dziennie, w domu i bez sprzętu',
      'Posiłki pomyślane na ten etap, bez niemożliwych diet',
      'Proste kroki, by dzień po dniu czuć mniej wzdęć',
    ],
    ctaMain: 'Chcę swój plan',
    trustInline: 'Bezpieczna płatność · Dostajesz PDF od razu',

    // Blok 2 · Problem + rozwiązanie
    problemTitle: 'Jeśli czujesz, że ciało nie reaguje jak kiedyś — to nie Twoja wina',
    problemBody: [
      'W menopauzie hormony zmieniają zasady: ta sama rutyna przestaje działać, a pojawiają się wzdęcia, zmęczenie i nieprzespane noce.',
      'Nie potrzebujesz więcej silnej woli. Potrzebujesz planu pomyślanego na ten etap, który dopasuje się do Twojego czasu i Twojego dzisiejszego ciała.',
    ],
    solutionTitle: '28-dniowy plan, który pasuje do Twojego życia',
    solutionBody:
      'Tylko 15 minut dziennie, w domu, z prostymi posiłkami i gotowymi listami zakupów. Otwierasz w telefonie albo drukujesz i zaczynasz już dziś.',
    includesTitle: 'Co zawiera Twój plan',
    ebook: {
      name: 'Wyzwanie Płaski Brzuch w 28 Dni',
      blurb: 'Prowadzona 15-minutowa rutyna, plan posiłków i listy zakupów — krok po kroku.',
    },
    bonusesTitle: 'I 4 dodatki w prezencie',
    bonuses: [
      { name: '30 przepisów przeciwzapalnych', blurb: 'Łatwe i smaczne dania, które przygotujesz bez kombinowania.' },
      { name: 'Tracker do druku na 28 dni', blurb: 'Kartka, na której zaznaczasz każdy dzień i jednym rzutem oka widzisz postęp.' },
      { name: 'Jedz na mieście bez wzdęć', blurb: 'Co zamawiać w restauracji i na spotkaniach, by trzymać się planu i niczego sobie nie odmawiać.' },
      { name: 'Plan Ratunkowy na 3 dni', blurb: 'Krótki reset na dni, gdy czujesz się bardziej wzdęta.' },
    ],

    // Blok 3 · Uczciwy dowód
    proofTitle: 'Zakup jest bezpieczny i bez ryzyka',
    proofSecure:
      'Płatność chroniona i obsługiwana przez Dodo Payments. Nie przechowujemy danych Twojej karty.',
    proofGuarantee: 'Gwarancja {days} dni: jeśli to nie dla Ciebie, zwracamy pieniądze.',
    proofDelivery: 'Natychmiastowa dostawa: wszystko dostajesz na e-mail zaraz po płatności.',
    proofSupportPrefix: 'Masz pytania? Napisz do nas na',

    // Blok 4 · Oferta
    offerTitle: 'Cały Twój plan w jednej płatności',
    getListTitle: 'To dostajesz dziś',
    getList: [
      'Wyzwanie Płaski Brzuch w 28 Dni',
      '30 przepisów przeciwzapalnych',
      'Tracker do druku na 28 dni',
      'Jedz na mieście bez wzdęć',
      'Plan Ratunkowy na 3 dni',
    ],
    priceLead: 'Dziś',
    priceNote: 'Jednorazowa płatność · Bez subskrypcji · Bez ukrytych opłat',
    bumpLabel:
      'Dodaj Znów Dobrze Śpij w 21 Dni: plan na 21 nocy, by lepiej spać. Tylko {price}.',
    ctaOffer: 'Chcę swój plan',
    guaranteeBadge: 'Gwarancja {days} dni',
    paymentNote: 'Natychmiastowy dostęp e-mailem po płatności',
    totalTodayLabel: 'Razem dziś',

    // Blok 5 · FAQ + domknięcie
    faqTitle: 'Najczęstsze pytania',
    faq: [
      {
        q: 'Co dokładnie dostaję i w jakim formacie?',
        a: 'Dostajesz pełny 28-dniowy plan i 4 dodatki w PDF: przeczytasz je w telefonie, na tablecie lub komputerze, albo wydrukujesz, jeśli wolisz.',
      },
      {
        q: 'Kiedy to otrzymam?',
        a: 'Od razu. Gdy tylko płatność się potwierdzi, wysyłamy wszystko na Twój e-mail, zwykle w mniej niż 5 minut.',
      },
      {
        q: 'Czy działa na telefonie?',
        a: 'Tak. To pliki PDF, które otworzysz na każdym telefonie, tablecie i komputerze, bez instalowania niczego.',
      },
      {
        q: 'Czy potrzebuję siłowni albo sprzętu?',
        a: 'Nie. Ćwiczenia robisz w domu z własnym ciałem; co najwyżej przyda się krzesło i mata.',
      },
      {
        q: 'Czy nadaje się na mój wiek i etap menopauzy?',
        a: 'Tak. Jest pomyślany dla kobiet w wieku 45-60 lat, niezależnie od tego, czy masz jeszcze okres — w premenopauzie, menopauzie czy po niej.',
      },
      {
        q: 'Czy to subskrypcja?',
        a: 'Nie. To jednorazowa płatność. Bez rat i bez cyklicznych opłat.',
      },
      {
        q: 'Jak się płaci i w jakiej walucie?',
        a: 'Płacisz kartą w bezpieczny sposób. Kwota jest pokazywana i pobierana w złotych (zł).',
      },
      {
        q: 'Czy płatność jest bezpieczna?',
        a: 'Tak. Płatność obsługuje Dodo Payments przez szyfrowane połączenie; my nie widzimy ani nie przechowujemy danych Twojej karty.',
      },
      {
        q: 'Co, jeśli mi się nie spodoba?',
        a: 'Masz {days} dni gwarancji. Jeśli to nie dla Ciebie, napisz do nas, a zwrócimy pieniądze.',
      },
      {
        q: 'Jak wydrukować tracker?',
        a: 'Otwórz PDF trackera i wybierz drukowanie w telefonie lub na komputerze. Możesz też zaznaczać go na ekranie, jeśli wolisz nie zużywać papieru.',
      },
      {
        q: 'Do kogo napisać, jeśli nic nie dostanę?',
        a: 'Najpierw sprawdź spam i oferty. Jeśli po kilku minutach nadal nic nie widzisz, odpisz na e-mail z zakupu, a wyślemy wszystko ponownie.',
      },
    ],
    medicalNote:
      'Ten plan ma charakter informacyjny i dotyczy stylu życia: nie zastępuje konsultacji lekarskiej. Jeśli masz jakąkolwiek chorobę, przed rozpoczęciem skonsultuj się z lekarzem.',
    finalTitle: 'Zacznij swój 28-dniowy plan już dziś',
    ctaFinal: 'Chcę swój plan teraz',

    // Różne
    freeLabel: 'W zestawie',
    stickyPrefix: 'Dziś',
    checkoutError: 'Nie udało się otworzyć płatności. Spróbuj ponownie za chwilę.',
    footerDisclaimer:
      'Ten program ma charakter informacyjny i nie zastępuje porady specjalisty zdrowia.',
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
