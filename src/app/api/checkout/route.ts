import { NextRequest, NextResponse } from "next/server";
import { stripe } from "../../../../lib/stripe";
import { storeTempUserData } from "../../../../lib/temp-storage";
import { env } from "../../../../src/env";

export async function POST(request: NextRequest) {
  try {
    const { priceId, userData } = await request.json();

    // Verificar se variáveis essenciais estão configuradas
    if (!env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY não configurada");
    }
    if (!env.NEXT_PUBLIC_DOMAIN) {
      throw new Error("NEXT_PUBLIC_DOMAIN não configurada");
    }
    if (!priceId) {
      throw new Error("Price ID não fornecido");
    }

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
      success_url: `${env.NEXT_PUBLIC_DOMAIN}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.NEXT_PUBLIC_DOMAIN}/pagamento`,
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
    }

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Erro ao criar sessão de checkout:", error?.message);

    return NextResponse.json(
      {
        error: "Erro ao criar sessão de checkout",
        details: error?.message || "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}
