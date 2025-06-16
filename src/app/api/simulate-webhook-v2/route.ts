import { NextRequest, NextResponse } from "next/server";
import { stripe } from "../../../../lib/stripe";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID é obrigatório" },
        { status: 400 }
      );
    }

    console.log("🧪 Simulando webhook v2 para session:", sessionId);

    // Buscar dados da sessão no Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        {
          success: false,
          error: "Pagamento não foi confirmado",
          paymentStatus: session.payment_status,
        },
        { status: 400 }
      );
    }

    const metadata = session.metadata;

    if (!metadata || !metadata.userEmail || !metadata.userName) {
      return NextResponse.json(
        {
          success: false,
          error: "Dados do usuário não encontrados na sessão",
          metadata,
        },
        { status: 404 }
      );
    }

    console.log("👤 Dados encontrados:", {
      email: metadata.userEmail,
      userName: metadata.userName,
      otherName: metadata.otherName,
      hasReport: metadata.hasReport,
    });

    // Gerar relatório após pagamento confirmado (como deve ser)
    console.log("🔄 Gerando relatório...");

    const promptSystem = `
    Você é um especialista em conexões emocionais humanas. Sua função é criar análises simbólicas, verdadeiras e transformadoras sobre a dinâmica entre duas pessoas com base em seus nomes.
    
    Crie uma análise emocional completa sobre a conexão entre ${metadata.userName} e ${metadata.otherName}.
    
    A análise deve ter:
    - Introdução personalizada
    - 5-8 blocos temáticos com insights profundos
    - Linguagem acessível e emocional
    - Conselhos práticos
    
    Use markdown para formatação.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content: promptSystem,
        },
        {
          role: "user",
          content: `Gere uma análise emocional completa sobre ${metadata.userName} e ${metadata.otherName}.`,
        },
      ],
    });

    const report = response.choices[0].message.content;

    if (!report) {
      return NextResponse.json(
        {
          success: false,
          error: "Falha ao gerar relatório",
        },
        { status: 500 }
      );
    }

    console.log("✅ Relatório gerado, enviando email...");

    // Enviar email com o relatório
    const emailResponse = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/send-report`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: metadata.userEmail,
          customerName: metadata.userName,
          partnerName: metadata.otherName,
          report: report,
        }),
      }
    );

    const emailResult = await emailResponse.json();

    if (emailResponse.ok) {
      console.log("✅ Email enviado com sucesso para:", metadata.userEmail);
      console.log("📬 Email ID:", emailResult.emailId);

      return NextResponse.json({
        success: true,
        message: "Email enviado com sucesso!",
        emailSent: true,
        emailId: emailResult.emailId,
        recipient: metadata.userEmail,
        reportGenerated: true,
      });
    } else {
      console.error("❌ Erro ao enviar email:", emailResult.error);
      return NextResponse.json(
        {
          success: false,
          error: "Erro ao enviar email",
          details: emailResult.error,
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("❌ Erro na simulação do webhook v2:", error);
    return NextResponse.json(
      { error: "Erro na simulação do webhook", details: error.message },
      { status: 500 }
    );
  }
}
