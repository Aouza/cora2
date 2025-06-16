import { NextRequest, NextResponse } from "next/server";
import { stripe } from "../../../../lib/stripe";
import { storeTempUserData } from "../../../../lib/temp-storage";

export async function POST(request: NextRequest) {
  try {
    const { priceId, userData } = await request.json();

    console.log("🔍 API Checkout - Dados recebidos:");
    console.log("📦 Price ID:", priceId);
    console.log("👤 User Data:", userData);
    console.log("🌐 Domain:", process.env.NEXT_PUBLIC_DOMAIN);

    // Verificar se variáveis essenciais estão configuradas
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY não configurada");
    }
    if (!process.env.NEXT_PUBLIC_DOMAIN) {
      throw new Error("NEXT_PUBLIC_DOMAIN não configurada");
    }
    if (!priceId) {
      throw new Error("Price ID não fornecido");
    }

    console.log("🔑 Criando sessão do Stripe...");

    // Criar sessão de checkout
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/pagamento`,
      customer_email: userData?.userEmail, // Pré-preenche email no checkout
      metadata: {
        product: "analise-emocional",
        // Armazenar dados essenciais para geração do relatório
        userName: userData?.userName || "",
        userEmail: userData?.userEmail || "",
        userBirthdate: userData?.userBirthdate || "",
        userGender: userData?.userGender || "",
        otherName: userData?.otherName || "",
        otherBirthdate: userData?.otherBirthdate || "",
        relationshipStatus: userData?.relationshipStatus || "complicado",
        hasReport: userData?.report ? "true" : "false",
      },
    });

    console.log("✅ Sessão do Stripe criada!");

    // Armazenar dados do usuário temporariamente usando o session ID (SEM o relatório)
    if (userData && session.id) {
      storeTempUserData(session.id, {
        userName: userData.userName,
        userEmail: userData.userEmail,
        userBirthdate: userData.userBirthdate,
        userGender: userData.userGender,
        otherName: userData.otherName,
        otherBirthdate: userData.otherBirthdate,
        relationshipStatus: userData.relationshipStatus,
        // report: não incluir - será gerado após pagamento
      });
      console.log(
        "💾 Dados armazenados temporariamente para session:",
        session.id
      );
    }

    console.log("✅ Sessão criada com sucesso!");
    console.log("🔗 URL da sessão:", session.url);
    console.log("🆔 Session ID:", session.id);

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("❌ Erro ao criar sessão de checkout:", error);
    console.error("❌ Erro específico:", error?.message);
    console.error("❌ Stack trace:", error?.stack);

    // Retornar erro mais específico
    return NextResponse.json(
      {
        error: "Erro ao criar sessão de checkout",
        details: error?.message || "Erro desconhecido",
        type: error?.type || "unknown_error",
      },
      { status: 500 }
    );
  }
}
