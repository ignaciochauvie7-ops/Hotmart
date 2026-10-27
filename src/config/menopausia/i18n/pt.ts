import type { MenoDict } from './types';

// Português de Portugal (pt-PT). Tratamento por "tu", vocabulário europeu
// (afrontamentos, registo, telemóvel, ginásio). Nada de pt-BR.
export const pt: MenoDict = {
  htmlLang: 'pt-PT',
  numberLocale: 'pt-PT',

  meta: {
    quizTitle: 'Descobre o teu plano para desinchar a barriga na menopausa',
    quizDesc:
      'Teste de 1 minuto para criar o teu plano personalizado e desinchar a barriga na menopausa.',
    offerTitle: 'O teu plano Barriga Lisa em 28 Dias',
    offerDesc: 'O teu plano personalizado para desinchar a barriga em 28 dias.',
    graciasTitle: 'A tua encomenda quase pronta',
    listoTitle: 'Está tudo pronto',
    privacyTitle: 'Política de privacidade',
    termsTitle: 'Termos e condições',
  },

  common: {
    continue: 'Continuar',
    backAria: 'Voltar atrás',
    restartAria: 'Voltar ao início',
    startTest: 'Começar o teste (1 minuto)',
    seeMyPlan: 'Ver o meu plano',
    loading: 'A carregar…',
  },

  quiz: {
    cover: {
      badge: 'Teste de 1 minuto',
      title: 'Descobre o teu plano personalizado para desinchar a barriga',
      cta: 'Criar o meu plano',
      photoAlt: 'Mulher de cerca de 50 anos a sorrir',
    },
    age: {
      q: 'Quantos anos tens?',
      options: ['40-44', '45-49', '50-54', '55-59', '60+'],
    },
    period: {
      q: 'Ainda tens menstruação?',
      options: ['Sim, regular', 'Sim, mas irregular', 'Não, há mais de 12 meses'],
    },
    fatZone: {
      q: 'Onde acumulas mais gordura?',
      options: ['Barriga', 'Ancas e coxas', 'Braços', 'Corpo todo'],
    },
    reassure: {
      body:
        'Não estás sozinha. Muitas mulheres da tua idade sentem que fazem tudo igual e o corpo muda na mesma. Não é falta de força de vontade: foram as tuas hormonas que mudaram as regras.',
    },
    height: { q: 'Quanto medes?', unit: 'cm' },
    weight: { q: 'Quanto pesas agora?', unit: 'kg' },
    target: {
      q: 'Qual é o teu peso objetivo?',
      unit: 'kg',
      errLess: 'O teu objetivo tem de ser inferior ao teu peso atual.',
      errMax: 'Escolhe um objetivo até 25 kg abaixo do teu peso atual.',
    },
    loading1: {
      texts: ['A analisar o teu perfil…', 'A calcular o teu metabolismo…', 'A rever a tua fase hormonal…'],
    },
    symptoms: {
      q: 'Que sintomas notas?',
      options: [
        'Inchaço abdominal',
        'Afrontamentos',
        'Durmo mal',
        'Cansaço',
        'Alterações de humor',
        'Vontade de doces',
        'Retenção de líquidos',
      ],
    },
    goal: {
      q: 'Qual é o teu objetivo principal?',
      options: [
        'Ter a barriga lisa',
        'Perder peso',
        'Dormir melhor',
        'Ter mais energia',
        'Voltar a sentir-me bem com a minha roupa',
      ],
    },
    movement: {
      q: 'Quanto te mexes num dia normal?',
      options: [
        'Quase nada',
        'Caminho um pouco',
        'Faço exercício 1-2 vezes por semana',
        'Faço exercício 3 ou mais vezes',
      ],
    },
    time: {
      q: 'Quanto tempo por dia podes dedicar-te?',
      options: ['10 minutos', '15 minutos', '20 minutos ou mais'],
      after: 'Perfeito: o teu plano foi desenhado para 15 minutos por dia.',
    },
    lastGood: {
      q: 'Quando foi a última vez que te sentiste bem com o teu corpo?',
      options: ['Há menos de 1 ano', 'Há 1-3 anos', 'Há mais de 5 anos', 'Não me lembro'],
    },
    event: {
      q: 'Tens algum evento à vista?',
      options: ['Férias', 'Um casamento ou celebração', 'Aniversário', 'Nenhum, só me quero sentir bem'],
    },
    loading2: {
      rows: [
        'A analisar as tuas respostas',
        'A comparar com perfis parecidos com o teu',
      ],
    },
    result: {
      title: 'O teu plano Barriga Lisa em 28 Dias está pronto',
      labelAge: 'Idade',
      labelGoal: 'Objetivo principal',
      labelSymptoms: 'Sintomas principais',
      labelZone: 'Zona a trabalhar',
      labelImc: 'O teu IMC',
      imcNote: 'Apenas como referência, sem julgamentos.',
      chartBloating: 'Inchaço',
      chartEnergy: 'Energia',
      chartToday: 'Hoje',
      chartDay28: 'Dia 28',
      estimate:
        'Estimativa orientativa: entre {kg} a menos em 28 dias. Os resultados variam de pessoa para pessoa.',
      disclaimer: 'Estimativa orientativa. Os resultados variam de pessoa para pessoa.',
      cta: 'Ver o meu plano',
    },
  },

  offer: {
    headline: 'O teu plano de 28 dias para te sentires mais leve, para mulheres dos {age}',
    genericHeadline: 'O teu plano de 28 dias para te sentires mais leve na menopausa',
    ctaMain: 'Quero o meu plano',

    bonusesTitle: '4 extras incluídos',
    bonusNames: [
      '30 receitas anti-inflamatórias',
      'Registo de 28 dias',
      'Comer fora sem inchar',
      'Plano Resgate de 3 dias',
    ],
    freeTag: 'Grátis',

    priceNote: 'Pagamento único',
    perDay: '≈ {price} por dia',

    bumpName: 'Volta a Descansar Bem em 21 Dias',
    bumpBenefit: 'Um plano de 21 noites para dormir melhor.',
    bumpAdd: 'Adiciona por {price}',

    ctaOffer: 'Quero o meu plano',
    trust: 'Pagamento seguro Dodo · acesso imediato · garantia de {days} dias',

    social: {
      title: 'O que dizem outras mulheres',
      rating: '4,9',
      ratingAria: 'Avaliação média 4,9 de 5',
      trusted: '+27.000 mulheres já começaram o seu plano',
      items: [
        {
          quote: 'Em três semanas senti a barriga bem menos inchada. Finalmente fecho as calças.',
          author: 'Sandra, 53',
        },
        {
          quote: 'O melhor é que são só 15 minutos por dia. Com a minha rotina, foi a única coisa que consegui manter.',
          author: 'Cláudia, 50',
        },
        {
          quote: 'Há dois anos que me sentia inchada todas as tardes. As receitas mudaram a minha digestão.',
          author: 'Fátima, 57',
        },
        {
          quote: 'Não é uma dieta impossível. Como normalmente e mesmo assim a barriga baixou.',
          author: 'Rosa, 49',
        },
        {
          quote: 'Tenho mais energia e durmo melhor. Voltei a sentir-me eu.',
          author: 'Teresa, 58',
        },
        {
          quote: 'Achava que na minha idade já não havia nada a fazer. Ainda bem que experimentei.',
          author: 'Luísa, 61',
        },
      ],
    },

    faqTitle: 'Perguntas frequentes',
    faq: [
      {
        q: 'O que recebo e em que formato?',
        a: 'O plano de 28 dias e os 4 extras em PDF, para ler no telemóvel, no tablet ou no computador, ou imprimir.',
      },
      {
        q: 'Quando me chega?',
        a: 'De imediato. Assim que o pagamento é confirmado recebes tudo no teu email, normalmente em menos de 5 minutos.',
      },
      {
        q: 'É um pagamento único?',
        a: 'Sim. Um único pagamento, sem subscrição nem custos recorrentes.',
      },
      {
        q: 'É seguro pagar e em que moeda?',
        a: 'Pagas com cartão através da Dodo Payments com ligação cifrada; não guardamos os dados do teu cartão. O valor é cobrado em euros.',
      },
      {
        q: 'E se não gostar?',
        a: 'Tens {days} dias de garantia: se não for para ti, devolvemos-te o dinheiro. Este plano é informativo e não substitui a consulta médica.',
      },
    ],

    totalLabel: 'Total',
    checkoutError: 'Não foi possível abrir o pagamento. Tenta novamente dentro de momentos.',
    privacyLink: 'Privacidade',
    termsLink: 'Termos',
  },

  gracias: {
    verifying: 'A confirmar o teu pagamento…',
    notPaidTitle: 'Estamos a confirmar o teu pagamento',
    notPaidBody:
      'Se acabaste de pagar, pode demorar alguns segundos. Verifica o teu email; se não vires nada, escreve-nos.',
    upsellTag: 'Espera! A tua encomenda está quase pronta',
    upsellTitle: 'Adiciona Adeus Inchaço em 14 Dias',
    upsellBody: 'Plano anti-inflamatório de 14 dias para desinchar a barriga. Só hoje: {price}.',
    upsellIncludes: [
      'Ementas anti-inflamatórias de 14 dias',
      'Lista de alimentos que desincham',
      'Guia rápido para os dias de maior inchaço',
    ],
    upsellPriceLabel: 'Só hoje',
    yes: 'Sim, quero',
    no: 'Não, obrigada, quero só o meu plano',
  },

  listo: {
    title: 'Pronto!',
    body:
      'Verifica o teu email: enviámos todos os teus ficheiros. Se não os vires, vê no spam ou nas promoções.',
    upsellThanks: 'Obrigada! O teu extra também segue por email.',
  },

  downloads: {
    title: 'Descarrega os teus ficheiros',
    note: 'Os links expiram em 7 dias. Também tos enviámos por email.',
  },

  email: {
    subject: 'Os teus ficheiros já estão prontos',
    heading: 'Obrigada pela tua compra!',
    intro: 'Aqui tens as tuas transferências. Toca em cada ficheiro para o guardares:',
    expiryNote: 'Os links expiram em 7 dias.',
  },

  legal: {
    privacyHeading: 'Política de privacidade',
    privacyBody: [
      'Tratamos os teus dados (nome, email e dados de pagamento) apenas para processar a tua compra e enviar-te o produto que adquiriste.',
      'O pagamento é processado em segurança através da Dodo Payments; não guardamos os dados do teu cartão.',
      'Usamos cookies e píxeis de medição (incluindo Meta) para perceber o desempenho dos nossos anúncios. Podes bloqueá-los no teu navegador.',
      'Podes pedir o acesso, a correção ou a eliminação dos teus dados escrevendo-nos por email.',
    ],
    termsHeading: 'Termos e condições',
    termsBody: [
      'Ao comprar aceitas que vais receber um produto digital descarregável, com acesso imediato por email.',
      'O produto é informativo e não substitui o aconselhamento de um profissional de saúde. Consulta o teu médico antes de iniciar qualquer plano.',
      'Oferecemos uma garantia de devolução de 14 dias: se o produto não resultar para ti, devolvemos o valor pago.',
      'O pagamento é único, sem subscrições nem cobranças recorrentes.',
    ],
    backHome: 'Voltar',
  },
};
