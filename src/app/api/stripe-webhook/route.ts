import { NextRequest, NextResponse } from "next/server";
import { stripe } from "../../../../lib/stripe";
import { headers } from "next/headers";
import { processPayment } from "../../../../lib/process-payment";
import { env } from "@/env";

const webhookSecret = env.STRIPE_WEBHOOK_SECRET!;

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

      // Verificar se já processamos este evento específico
      const eventId = event.id;
      const processedKey = `processed_${eventId}`;

      // Simples verificação em memória (para desenvolvimento)
      if ((global as any)[processedKey]) {
        console.log("Evento já processado, ignorando:", eventId);
        return NextResponse.json({
          received: true,
          skipped: "already_processed",
        });
      }

      // Marcar como processado
      (global as any)[processedKey] = true;

      // Usar função unificada para processar o pagamento
      const result = await processPayment(session.id);

      if (result.success) {
        console.log("Pagamento processado automaticamente:", {
          sessionId: session.id,
          recipient: result.recipient,
          emailId: result.emailId,
        });
      } else {
        console.error("Erro no processamento automático:", {
          sessionId: session.id,
          error: result.error,
          details: result.details,
        });
      }

      // Sempre retornar sucesso para o Stripe, mesmo em caso de erro interno
      return NextResponse.json({
        received: true,
        processed: result.success,
        error: result.success ? undefined : result.error,
      });
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
