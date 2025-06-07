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

    // Prompt simbólico e emocional
    const prompt = `Considere os seguintes dados:\n\nNome 1: ${safe(
      name1
    )}, Data de nascimento 1: ${safe(birthdate1)}\nNome 2: ${safe(
      name2
    )}, Data de nascimento 2: ${safe(
      birthdate2
    )}\nSexo de quem solicita: ${safe(gender1)}\nSituação atual: ${safe(
      relationshipStatus
    )}.\n\nGere um relatório emocional, simbólico e profundo sobre a conexão entre essas duas pessoas, focando em insights, potenciais, desafios e conselhos. Use uma linguagem envolvente, personalizada e que gere identificação emocional.`;

    // Chamada à OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Você é um especialista em relacionamentos, com linguagem simbólica, emocional e envolvente.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 600,
      temperature: 0.85,
    });

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
