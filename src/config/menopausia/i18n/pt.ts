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
    // Bloco 1 · Promessa
    headline: 'O teu plano de 28 dias para te sentires mais leve, feito para mulheres dos {age}',
    genericHeadline: 'O teu plano de 28 dias para te sentires mais leve na menopausa',
    subhead:
      'Rotinas curtas e refeições simples que encaixam no teu dia, sem passar fome nem ir ao ginásio.',
    profileIntro: 'De acordo com as tuas respostas:',
    benefits: [
      '15 minutos por dia, em casa e sem equipamento',
      'Refeições pensadas para esta fase, sem dietas impossíveis',
      'Passos simples para sentir menos inchaço dia após dia',
    ],
    ctaMain: 'Quero o meu plano',
    trustInline: 'Pagamento seguro · Recebe-lo em PDF de imediato',

    // Bloco 2 · Problema + solução
    problemTitle: 'Se sentes que o teu corpo já não responde como antes, a culpa não é tua',
    problemBody: [
      'Na menopausa as hormonas mudam as regras: a rotina de sempre deixa de funcionar e surgem o inchaço, o cansaço e as noites sem dormir.',
      'Não precisas de mais força de vontade. Precisas de um plano pensado para esta fase, que se adapte ao teu tempo e ao teu corpo de hoje.',
    ],
    solutionTitle: 'Um plano de 28 dias que encaixa na tua vida',
    solutionBody:
      'Só 15 minutos por dia, em casa, com refeições simples e as listas de compras já feitas. Abres no telemóvel ou imprimes e começas hoje mesmo.',
    includesTitle: 'O que inclui o teu plano',
    ebook: {
      name: 'Desafio Barriga Lisa em 28 Dias',
      blurb: 'A rotina guiada de 15 minutos por dia, o plano de refeições e as listas de compras, passo a passo.',
    },
    bonusesTitle: 'E 4 extras de oferta',
    bonuses: [
      { name: '30 receitas anti-inflamatórias', blurb: 'Pratos fáceis e saborosos para cozinhar sem complicações.' },
      { name: 'Registo para imprimir de 28 dias', blurb: 'Uma folha para marcar cada dia e ver o teu progresso de relance.' },
      { name: 'Comer fora sem inchar', blurb: 'O que pedir em restaurantes e encontros para seguir o teu plano sem abdicar de nada.' },
      { name: 'Plano Resgate de 3 dias', blurb: 'Um reinício curto para os dias em que te sentes mais inchada.' },
    ],

    // Bloco 3 · Prova honesta
    proofTitle: 'Comprar é seguro e sem riscos',
    proofSecure:
      'Pagamento protegido e processado pela Dodo Payments. Não guardamos os dados do teu cartão.',
    proofGuarantee: 'Garantia de {days} dias: se não for para ti, devolvemos-te o dinheiro.',
    proofDelivery: 'Entrega imediata: recebes tudo no teu email assim que pagas.',
    proofSupportPrefix: 'Tens dúvidas? Escreve-nos para',

    // Bloco 4 · Oferta
    offerTitle: 'Todo o teu plano, num único pagamento',
    getListTitle: 'Isto recebes hoje',
    getList: [
      'Desafio Barriga Lisa em 28 Dias',
      '30 receitas anti-inflamatórias',
      'Registo para imprimir de 28 dias',
      'Comer fora sem inchar',
      'Plano Resgate de 3 dias',
    ],
    priceLead: 'Hoje',
    priceNote: 'Pagamento único · Sem subscrição · Sem custos ocultos',
    bumpLabel:
      'Adiciona Volta a Descansar Bem em 21 Dias: um plano de 21 noites para dormir melhor. Só {price}.',
    ctaOffer: 'Quero o meu plano',
    guaranteeBadge: 'Garantia de {days} dias',
    paymentNote: 'Acesso imediato por email após o pagamento',
    totalTodayLabel: 'Total hoje',

    // Bloco 5 · FAQ + fecho
    faqTitle: 'Perguntas frequentes',
    faq: [
      {
        q: 'O que recebo exatamente e em que formato?',
        a: 'Recebes o plano completo de 28 dias e os 4 extras em PDF: podes lê-los no telemóvel, no tablet ou no computador, ou imprimi-los se preferires.',
      },
      {
        q: 'Quando me chega?',
        a: 'De imediato. Assim que o pagamento é confirmado enviamos tudo para o teu email, normalmente em menos de 5 minutos.',
      },
      {
        q: 'Funciona no telemóvel?',
        a: 'Sim. São ficheiros PDF que abrem em qualquer telemóvel, tablet ou computador, sem instalar nada.',
      },
      {
        q: 'Preciso de ginásio ou aparelhos?',
        a: 'Não. Os exercícios fazem-se em casa com o teu próprio corpo; quando muito uma cadeira e um tapete.',
      },
      {
        q: 'Serve para a minha idade e a minha fase da menopausa?',
        a: 'Sim. Foi pensado para mulheres dos 45 aos 60 anos, tenhas ou não menstruação: pré-menopausa, menopausa ou pós-menopausa.',
      },
      {
        q: 'É uma subscrição?',
        a: 'Não. É um pagamento único. Não há mensalidades nem custos recorrentes.',
      },
      {
        q: 'Como se paga e em que moeda?',
        a: 'Pagas com cartão de forma segura. O valor é mostrado e cobrado em euros.',
      },
      {
        q: 'É seguro pagar?',
        a: 'Sim. O pagamento é processado pela Dodo Payments com ligação cifrada; nós não vemos nem guardamos os dados do teu cartão.',
      },
      {
        q: 'E se não gostar?',
        a: 'Tens {days} dias de garantia. Se não for para ti, escreve-nos e devolvemos-te o dinheiro.',
      },
      {
        q: 'Como imprimo o registo?',
        a: 'Abre o PDF do registo e carrega em imprimir no telemóvel ou no computador. Também o podes marcar no ecrã se preferires não gastar papel.',
      },
      {
        q: 'A quem escrevo se não me chegar?',
        a: 'Verifica primeiro as pastas de spam e promoções. Se ao fim de alguns minutos continuares sem o ver, responde ao email da tua compra e reenviamos-to.',
      },
    ],
    medicalNote:
      'Este plano é informativo e de estilo de vida: não substitui a consulta médica. Se tens alguma condição de saúde, consulta o teu médico antes de começar.',
    finalTitle: 'Começa hoje o teu plano de 28 dias',
    ctaFinal: 'Quero o meu plano agora',

    // Vários
    freeLabel: 'Incluído',
    stickyPrefix: 'Hoje',
    checkoutError: 'Não foi possível abrir o pagamento. Tenta novamente dentro de momentos.',
    footerDisclaimer:
      'Este programa é informativo e não substitui o aconselhamento de um profissional de saúde.',
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
