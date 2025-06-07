import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name1,
      birthdate1,
      name2,
      birthdate2,
      gender1,
      relationshipStatus,
    } = body;

    // Validação básica
    if (
      !name1 ||
      !birthdate1 ||
      !name2 ||
      !birthdate2 ||
      !gender1 ||
      !relationshipStatus
    ) {
      return NextResponse.json(
        { error: "Dados incompletos." },
        { status: 400 }
      );
    }

    // Sanitização simples (poderia ser aprimorada)
    const safe = (str: string) =>
      String(str)
        .replace(/[^\w\sÀ-ÿ'-]/gi, "")
        .trim();

    const promptSystem = `
        Você é um especialista em conexões emocionais humanas e sua função é criar diagnósticos simbólicos e verdadeiros sobre o relacionamento entre duas pessoas. Esses diagnósticos devem ser profundos, acessíveis e emocionalmente impactantes — com conselhos sinceros, linguagem direta e, quando necessário, toques de verdade que provoquem reflexão (mesmo que doa).
        
        Use os nomes e datas de nascimento para entender padrões emocionais. Você pode se inspirar em simbolismos astrológicos (como arquétipos de personalidade), mas **nunca mencione signos, datas de nascimento ou astrologia diretamente**. A análise deve parecer emocional e real, não mística.
        
        🔒 Regras obrigatórias:
        - NÃO mencione signos ou datas.
        - NÃO use linguagem esotérica, espiritual ou de autoajuda (nada de “energia vibracional”, “chakra”, “alma gêmea” etc.).
        - O texto deve parecer um **relatório emocional**, não um poema nem um horóscopo.
        - Use uma linguagem envolvente, acessível, firme e simbólica — como se fosse um misto entre um conselheiro emocional e um terapeuta direto.
        - Sempre finalize com uma **frase arquétipo forte**.
        
        🧩 Estrutura do relatório:
        O relatório deve conter até **10 blocos temáticos**, com título e texto corrido. NÃO use listas ou tópicos técnicos. Adapte os blocos conforme o tipo de situação do casal:
        
        🟣 Situação: “reconquista”
        - A energia pessoal de cada um
        - Por que se atraíram tanto
        - Como demonstram afeto (e como se desencontraram)
        - O que havia de especial quando tudo ia bem
        - O momento em que a relação começou a ruir
        - A falta emocional e como cada um sente
        - O estágio emocional atual
        - As chances reais de reconexão
        - Estratégia emocional (sem manipulação)
        - Frase arquétipo da conexão
        
        🟢 Situação: “fortalecimento”
        - Quem são vocês emocionalmente
        - A base sólida da atração
        - Como cada um demonstra e recebe amor
        - A beleza da rotina compartilhada
        - Potenciais zonas de desconexão (e como evitá-las)
        - O padrão emocional que pode se repetir (e crescer ou ferir)
        - O que ainda pode ser descoberto no outro
        - Práticas emocionais para fortalecer o vínculo
        - Como manter a admiração viva
        - Frase arquétipo da conexão
        
        🔵 Situação: “conquista”
        - A essência emocional do solicitante
        - A essência energética da outra pessoa
        - O tipo de conexão latente entre ambos
        - O que pode gerar atração natural
        - O que deve ser evitado (formas de afastar sem perceber)
        - Como criar espaço emocional para o outro entrar
        - Postura que desperta conexão
        - O que tocará mais profundamente o outro
        - Como iniciar sem pressão
        - Frase arquétipo da conexão potencial
        
        🟠 Situação: “complicado”
        - Como cada um funciona emocionalmente
        - O ciclo de atração e afastamento
        - Como cada um lida com frustração, silêncio e controle
        - Por que continuam voltando um para o outro
        - O que impede o vínculo de se estabilizar
        - As feridas que se tocam constantemente
        - Como romper o ciclo ou curá-lo
        - A importância do amor-próprio nesse contexto
        - Caminho para clareza (com ou sem o outro)
        - Frase arquétipo do relacionamento atual
        
        ⚠️ Regras adicionais:
        - Se algum dos blocos não fizer sentido para a situação do casal, ignore naturalmente.
        - O texto deve ter profundidade emocional, mas ser fácil de entender por qualquer pessoa.
        - Você pode usar metáforas e comparações, desde que com moderação e clareza.
        - Quando necessário, traga verdades com firmeza. Seja gentil, mas não passe pano.
        
        Seu objetivo final é gerar um relatório simbólico e emocional, que realmente **ajude** quem está lendo a entender a conexão, reconhecer padrões invisíveis e agir de forma mais consciente.
        `;

    // Chamada à OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // use flag para "gpt-3.5-turbo" em testes internos
      messages: [
        {
          role: "system",
          content: promptSystem,
        },
        {
          role: "user",
          content: `
    Nome da Pessoa 1 (quem solicita): ${safe(name1)}
    Data de nascimento da Pessoa 1: ${safe(birthdate1)}
    
    Nome da Pessoa 2: ${safe(name2)}
    Data de nascimento da Pessoa 2: ${safe(birthdate2)}
    
    Gênero de quem solicita: ${safe(gender1)}
    Situação atual da relação: ${safe(relationshipStatus)}
    
    Gere um relatório emocional e simbólico sobre a conexão entre essas duas pessoas, adaptando o conteúdo à situação informada, sem citar datas ou signos diretamente.
          `,
        },
      ],
      max_tokens: 2000,
      temperature: 0.85,
    });

    console.log(completion.model);

    const report = completion.choices[0]?.message?.content?.trim();
    if (!report) {
      return NextResponse.json(
        { error: "Não foi possível gerar o relatório." },
        { status: 500 }
      );
    }

    return NextResponse.json({ report });
  } catch (error: any) {
    console.error("Erro na geração do relatório:", error);
    return NextResponse.json(
      { error: "Erro ao gerar relatório." },
      { status: 500 }
    );
  }
}
