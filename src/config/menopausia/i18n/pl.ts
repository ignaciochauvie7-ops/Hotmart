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
    startTest: 'Zacznij test (1 minuta)',
    seeMyPlan: 'Zobacz mój plan',
    loading: 'Ładowanie…',
  },

  quiz: {
    cover: {
      title: 'Poznaj swój plan na płaski brzuch w menopauzie',
      cta: 'Zacznij test (1 minuta)',
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
        'Tworzymy Twój spersonalizowany plan',
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
    reserved: 'Twoja zniżka jest zarezerwowana: {time}',
    headline: 'Twój plan na płaski brzuch w 28 dni, dla kobiet w wieku {age}',
    headlineEvent: '{base} — zdążysz na {event}',
    eventPhrases: ['swoje wakacje', 'swój ślub lub uroczystość', 'swoje urodziny', ''],
    profileGoalPrefix: 'Twój cel',
    receiveTitle: 'Co dostajesz dzisiaj',
    items: [
      { name: 'Wyzwanie Płaski Brzuch w 28 Dni: 15-minutowa rutyna + plan posiłków + listy zakupów', price: 67 },
      { name: 'Bonus 1: 30 przepisów przeciwzapalnych', price: 19 },
      { name: 'Bonus 2: Tracker do druku na 28 dni', price: 9 },
      { name: 'Bonus 3: Jedz na mieście bez wzdęć', price: 12 },
      { name: 'Bonus 4: Plan Ratunkowy na 3 dni', price: 12 },
    ],
    totalLabel: 'Wartość całkowita',
    totalValue: 119,
    todayLabel: 'Dziś',
    priceNow: 16.97,
    priceOld: 67,
    offLabel: '-75%',
    bumpLabel:
      'Tak, dodaj Znów Dobrze Śpij w 21 Dni: plan na 21 nocy, by spać bez przerw i ograniczyć uderzenia gorąca. Tylko {price}',
    buy: 'Chcę swój plan teraz',
    paySecure: 'Bezpieczna płatność',
    accessEmail: 'Natychmiastowy dostęp e-mailem',
    howTitle: 'Jak to działa',
    howSteps: ['Płacisz bezpiecznie', 'Od razu dostajesz wszystko e-mailem', 'Zaczynasz już dziś'],
    guaranteeTitle: 'Gwarancja 30 dni',
    guaranteeBody: 'Jeśli plan Ci nie pomoże, zwracamy pieniądze.',
    faqTitle: 'Najczęstsze pytania',
    faq: [
      { q: 'Czy potrzebuję sprzętu?', a: 'Nie. Wystarczy ściana, mata i krzesło.' },
      { q: 'Ile czasu dziennie?', a: '15 minut dziennie.' },
      { q: 'Jak to otrzymam?', a: 'W PDF na e-mail, od razu po płatności.' },
      { q: 'Czy zadziała, jeśli nie mam już okresu?', a: 'Tak. Plan jest pomyślany na wszystkie etapy menopauzy.' },
      { q: 'Czy to jednorazowa płatność?', a: 'Tak, jedna płatność. Bez subskrypcji.' },
    ],
    footerDisclaimer:
      'Ten program ma charakter informacyjny i nie zastępuje porady specjalisty zdrowia.',
    privacyLink: 'Prywatność',
    termsLink: 'Regulamin',
    genericHeadline: 'Twój plan na płaski brzuch w 28 dni, dla kobiet w wieku 45-60 lat',
    checkoutError: 'Nie udało się otworzyć płatności. Spróbuj ponownie za chwilę.',
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
      'Dajemy 30-dniową gwarancję zwrotu: jeśli produkt Ci nie pomoże, zwracamy zapłaconą kwotę.',
      'Płatność jest jednorazowa, bez subskrypcji i cyklicznych obciążeń.',
    ],
    backHome: 'Wróć',
  },
};
