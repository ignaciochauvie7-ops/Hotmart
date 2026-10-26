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
      title: 'Descobre o teu plano para desinchar a barriga na menopausa',
      cta: 'Começar o teste (1 minuto)',
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
    reserved: 'O teu desconto está reservado: {time}',
    headline: 'O teu plano para desinchar a barriga em 28 dias, para mulheres dos {age}',
    headlineEvent: '{base}, a tempo para {event}',
    eventPhrases: ['as tuas férias', 'o teu casamento ou celebração', 'o teu aniversário', ''],
    profileGoalPrefix: 'O teu objetivo',
    receiveTitle: 'O que recebes hoje',
    items: [
      { name: 'Desafio Barriga Lisa em 28 Dias: rotina de 15 min + plano de refeições + listas de compras', price: 67 },
      { name: 'Bónus 1: 30 receitas anti-inflamatórias', price: 19 },
      { name: 'Bónus 2: Registo para imprimir de 28 dias', price: 9 },
      { name: 'Bónus 3: Comer fora sem inchar', price: 12 },
      { name: 'Bónus 4: Plano Resgate de 3 dias', price: 12 },
    ],
    totalLabel: 'Valor total',
    totalValue: 119,
    todayLabel: 'Hoje',
    priceNow: 16.97,
    priceOld: 67,
    offLabel: '-75%',
    bumpLabel:
      'Sim, adiciona Volta a Descansar Bem em 21 Dias: plano de 21 noites para dormir sem interrupções e travar os afrontamentos. Só {price}',
    buy: 'Quero o meu plano agora',
    paySecure: 'Pagamento seguro',
    accessEmail: 'Acesso imediato por email',
    howTitle: 'Como funciona',
    howSteps: ['Pagas em segurança', 'Recebes tudo por email de imediato', 'Começas hoje mesmo'],
    guaranteeTitle: 'Garantia de 30 dias',
    guaranteeBody: 'Se não resultar para ti, devolvemos-te o dinheiro.',
    faqTitle: 'Perguntas frequentes',
    faq: [
      { q: 'Preciso de equipamento?', a: 'Não. Só uma parede, um tapete e uma cadeira.' },
      { q: 'Quanto tempo por dia?', a: '15 minutos por dia.' },
      { q: 'Como o recebo?', a: 'Em PDF por email, de imediato após o pagamento.' },
      { q: 'Resulta se já não tenho menstruação?', a: 'Sim. O plano foi pensado para todas as fases da menopausa.' },
      { q: 'É um pagamento único?', a: 'Sim, um único pagamento. Sem subscrições.' },
    ],
    footerDisclaimer:
      'Este programa é informativo e não substitui o aconselhamento de um profissional de saúde.',
    privacyLink: 'Privacidade',
    termsLink: 'Termos',
    genericHeadline: 'O teu plano para desinchar a barriga em 28 dias, para mulheres dos 45 aos 60 anos',
    checkoutError: 'Não foi possível abrir o pagamento. Tenta novamente dentro de momentos.',
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
      'Oferecemos uma garantia de devolução de 30 dias: se o produto não resultar para ti, devolvemos o valor pago.',
      'O pagamento é único, sem subscrições nem cobranças recorrentes.',
    ],
    backHome: 'Voltar',
  },
};
