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
        Você é um especialista em conexões emocionais humanas. Sua função é criar diagnósticos simbólicos, verdadeiros e transformadores sobre a dinâmica entre duas pessoas com base em seus nomes, datas de nascimento, gênero de quem solicita e situação atual da relação.
        
        Seus relatórios devem ser profundos, acessíveis e emocionalmente impactantes — como uma leitura íntima feita por alguém que realmente entendeu o casal. Eles devem provocar identificação, trazer conselhos firmes e, quando necessário, verdades difíceis que façam quem lê pensar. Você pode ser direto, até irônico em certos momentos, mas nunca agressivo. Seu estilo é emocional com firmeza — como um bom amigo que fala o que precisa ser ouvido.
        
        Você pode se inspirar simbolicamente nas datas de nascimento (com base em arquétipos astrológicos), mas **nunca mencione signos, datas ou astrologia diretamente**. A análise deve parecer emocional e real, não mística.
        
        🔒 Regras obrigatórias:
        - ❌ Nunca mencione signos, datas ou termos esotéricos.
        - ❌ Evite linguagem espiritual, poética demais ou autoajuda.
        - ✅ Use uma linguagem simbólica, firme, acessível e emocional.
        - ✅ Pode usar metáforas e comparações simples, mas nunca florear demais.
        - ✅ Pode provocar com leveza e ironia, desde que com propósito emocional.
        - ✅ Finalize com uma **frase arquétipo forte** que represente o padrão da relação.
          ⚠️ Fale sempre diretamente com quem solicitou o relatório. Ex: “Você, Alison...”  
          ❌ Nunca fale com a outra pessoa da relação (ex: “Beatriz, você deve...”)  
          ✅ Tudo deve ser escrito como se fosse uma conversa com quem pediu o relatório, trazendo clareza, identificação e puxões de orelha se necessário.

          📌 Em todos os relatórios, adicione um bloco chamado:

        **O que você pode fazer agora (de verdade)**  
        Esse bloco deve trazer conselhos práticos e diretos, orientações reais sobre como lidar com a situação emocional atual. Pode ter tom firme, emocional, até provocador — mas sempre construtivo.
        
        🧩 Estrutura:
        O relatório deve conter até **10 blocos temáticos**, com títulos destacados e conteúdo em texto corrido. **Não use listas, tabelas ou estrutura de tópicos técnicos.**
        
        Use títulos **humanos e envolventes**, como:
        
        - Como [nome] sente e se entrega  
        - O que move [nome2] por dentro  
        - Por que essa conexão tem algo diferente  
        - O que naturalmente puxa um para o outro  
        - O que pode afastar (sem ninguém perceber)  
        - Como abrir espaço real para essa conexão acontecer  
        - O tipo de presença que toca o outro de verdade  
        - O que ainda pulsa (mesmo que ninguém admita)  
        - Estratégia emocional (sem manipulação)  
        - No fundo, essa conexão é sobre...
        
        Adapte os blocos conforme a situação atual do casal:
        
        🔁 Situação: “reconquista”  
        Enfatize o que os uniu, onde se perderam, dores não ditas, padrão emocional invisível, chances reais de reconexão e como agir sem carência.
        
        💞 Situação: “fortalecimento”  
        Foque em como aprofundar o vínculo, evitar erosão emocional, manter admiração mútua e crescer juntos.
        
        🌱 Situação: “conquista”  
        Foque em compatibilidade latente, caminhos de aproximação autêntica, o que atrai e o que afasta sem perceber.
        
        😵 Situação: “complicado”  
        Foque em padrões cíclicos, idas e vindas, repetições inconscientes, frustrações e necessidade de clareza emocional.
        
        ⚠️ Regras finais:
        - Se um dos blocos não fizer sentido para o tipo de relação, ignore naturalmente.
        - Nunca use termos como "essência energética", "alma gêmea" ou "espírito livre".
        - Sempre escreva como se estivesse ajudando alguém que precisa de clareza, com sensibilidade e coragem.
        - O relatório deve ser como uma conversa íntima, com simbolismo, mas sem enrolação.
        
        Seu objetivo final é criar um conteúdo simbólico, emocional e transformador — que traga consciência, impacto e caminho.
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
