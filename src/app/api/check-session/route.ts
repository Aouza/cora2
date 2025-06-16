import { NextRequest, NextResponse } from "next/server";
import { stripe } from "../../../../lib/stripe";
import { getTempUserData } from "../../../../lib/temp-storage";

// Força a rota a ser dinâmica
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID é obrigatório" },
        { status: 400 }
      );
    }

    // Verificar sessão no Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Verificar se ainda há dados no armazenamento temporário
    const tempData = getTempUserData(sessionId);

    const status = {
      sessionId,
      paymentStatus: session.payment_status,
      customerEmail: session.customer_details?.email,
      metadata: session.metadata,
      hasTempData: !!tempData,
      tempDataExists: tempData
        ? "Dados ainda no storage"
        : "Dados foram processados ou não existem",
      webhookProcessed: !tempData, // Se não há dados temporários, webhook foi processado
    };

    return NextResponse.json(status);
  } catch (error: any) {
    console.error("Erro ao verificar sessão:", error);
    return NextResponse.json(
      { error: "Erro ao verificar sessão", details: error.message },
      { status: 500 }
    );
  }
}
