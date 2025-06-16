import { NextRequest, NextResponse } from "next/server";
import { stripe } from "../../../../lib/stripe";
import { headers } from "next/headers";
import {
  getTempUserData,
  deleteTempUserData,
} from "../../../../lib/temp-storage";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = headers().get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "No signature found" },
        { status: 400 }
      );
    }

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Processar apenas eventos de checkout completado
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Recuperar dados do usuário do armazenamento temporário
      const userData = getTempUserData(session.id);

      if (userData) {
        try {
          // GERAR RELATÓRIO AQUI (após pagamento confirmado)
          const promptSystem = `
          Você é um especialista em conexões emocionais humanas. Sua função é criar análises simbólicas, verdadeiras e transformadoras sobre a dinâmica entre duas pessoas com base em seus nomes e informações fornecidas.
          
          Crie uma análise emocional completa sobre a conexão entre ${userData.userName} e ${userData.otherName}.
          
          A análise deve ter:
          - Introdução personalizada
          - 5-8 blocos temáticos com insights profundos
          - Linguagem acessível e emocional
          - Conselhos práticos
          - Considerações sobre o status do relacionamento: ${userData.relationshipStatus}
          
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
                content: `Gere uma análise emocional completa sobre ${userData.userName} e ${userData.otherName}. Status do relacionamento: ${userData.relationshipStatus}`,
              },
            ],
          });

          const report = response.choices[0].message.content;

          if (!report) {
            throw new Error("Falha ao gerar relatório");
          }

          // Enviar email com o relatório
          const emailResponse = await fetch(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api/send-report`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: userData.userEmail,
                customerName: userData.userName,
                partnerName: userData.otherName,
                report: report,
              }),
            }
          );

          const emailResult = await emailResponse.json();

          if (emailResponse.ok) {
            // Limpar dados temporários após sucesso
            deleteTempUserData(session.id);
          } else {
            console.error("Erro ao enviar email:", emailResult.error);
          }
        } catch (error) {
          console.error("Erro ao processar webhook:", error);
        }
      } else {
        // Fallback: tentar usar metadata do Stripe
        const metadata = session.metadata;
        if (metadata && metadata.userEmail && metadata.userName) {
          try {
            // Gerar relatório usando metadata
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

            if (report) {
              // Enviar email
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
            }
          } catch (error) {
            console.error("Erro no fallback:", error);
          }
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
