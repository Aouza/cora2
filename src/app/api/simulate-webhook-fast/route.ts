import { NextRequest, NextResponse } from "next/server";
import { processPayment } from "../../../../lib/process-payment";

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID é obrigatório" },
        { status: 400 }
      );
    }

    // Usar função unificada para processar o pagamento
    const result = await processPayment(sessionId);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message || "Relatório reenviado com sucesso!",
        emailSent: true,
        emailId: result.emailId,
        recipient: result.recipient,
        reportGenerated: true,
      });
    } else {
      console.error("Erro no reenvio manual:", result);
      return NextResponse.json(
        {
          success: false,
          error: result.error,
          details: result.details,
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Erro na simulação do webhook:", error);
    return NextResponse.json(
      { error: "Erro na simulação do webhook", details: error.message },
      { status: 500 }
    );
  }
}
