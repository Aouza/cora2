// Dados estruturados para seeds do Cora.Deep

export const seedConfig = {
  profiles: {
    count: 10,
    data: {
      emails: [
        "ana.silva@email.com",
        "carlos.santos@email.com",
        "maria.oliveira@email.com",
        "joao.pereira@email.com",
        "lucia.costa@email.com",
        "pedro.almeida@email.com",
        "julia.ferreira@email.com",
        "rafael.lima@email.com",
        "camila.rodrigues@email.com",
        "fernando.martins@email.com",
      ],
      names: [
        "Ana Silva",
        "Carlos Santos",
        "Maria Oliveira",
        "João Pereira",
        "Lúcia Costa",
        "Pedro Almeida",
        "Julia Ferreira",
        "Rafael Lima",
        "Camila Rodrigues",
        "Fernando Martins",
      ],
    },
  },

  relatos: {
    count: 25,
    data: {
      textos: [
        "Hoje foi um dia difícil. Sinto que estou carregando o peso do mundo nos ombros.",
        "Às vezes me pergunto se as coisas vão melhorar. Preciso de esperança.",
        "Estou tentando encontrar forças para continuar. Cada dia é uma luta.",
        "Sinto-me perdido(a) em meio a tantas emoções conflitantes.",
        "Hoje consegui sorrir genuinamente pela primeira vez em semanas.",
        "A ansiedade tem sido minha companheira constante ultimamente.",
        "Preciso falar sobre isso, mas não sei por onde começar.",
        "Sinto que ninguém realmente me entende.",
        "Estou aprendendo a ser mais gentil comigo mesmo(a).",
        "Alguns dias são mais difíceis que outros, e tudo bem.",
        "Estou buscando ajuda profissional e isso me dá esperança.",
        "Sinto-me sobrecarregado(a) com as responsabilidades.",
        "Hoje foi um pequeno passo, mas ainda assim um progresso.",
        "A solidão às vezes é ensurdecedora.",
        "Estou tentando encontrar beleza nas pequenas coisas.",
        "Sinto que estou em uma montanha-russa emocional.",
        "Hoje chorei, mas também ri. Acho que isso é progresso.",
        "Estou aprendendo que não preciso ser forte o tempo todo.",
        "A terapia tem me ajudado a entender melhor meus sentimentos.",
        "Sinto-me grato(a) por ter pessoas que se importam comigo.",
        "Hoje foi um dia melhor. Pequenas vitórias também contam.",
        "Estou trabalhando para aceitar minhas imperfeições.",
        "A meditação tem me trazido alguns momentos de paz.",
        "Sinto que estou lentamente me reconectando comigo mesmo(a).",
        "Hoje consegui pedir ajuda, e isso foi um grande passo.",
      ],
    },
  },

  ecos: {
    count: 100,
    data: {
      tipos: ["florescer", "abraco", "entendo"],
    },
  },

  relatorios: {
    count: 5,
    data: {
      conteudos: [
        {
          tipo: "semanal",
          sentimento_dominante: "ansiedade",
          progresso: "estável",
        },
        {
          tipo: "mensal",
          sentimento_dominante: "melancolia",
          progresso: "melhorando",
        },
        {
          tipo: "semanal",
          sentimento_dominante: "esperança",
          progresso: "positivo",
        },
        {
          tipo: "mensal",
          sentimento_dominante: "confusão",
          progresso: "estável",
        },
        {
          tipo: "semanal",
          sentimento_dominante: "gratidão",
          progresso: "muito_positivo",
        },
      ],
    },
  },
};
