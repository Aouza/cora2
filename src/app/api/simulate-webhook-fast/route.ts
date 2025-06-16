import { NextRequest, NextResponse } from "next/server";
import { stripe } from "../../../../lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID é obrigatório" },
        { status: 400 }
      );
    }

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

    // Gerar relatório através da API /api/relatorio

    const reportResponse = await fetch(
      new URL("/api/relatorio", request.url).toString(),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: metadata.userName,
          userEmail: metadata.userEmail,
          userBirthdate: metadata.userBirthdate || "",
          userGender: metadata.userGender || "",
          otherName: metadata.otherName,
          otherBirthdate: metadata.otherBirthdate || "",
          relationshipStatus: metadata.relationshipStatus || "complicado",
        }),
      }
    );

    if (!reportResponse.ok) {
      const reportError = await reportResponse.json();
      console.error("Erro ao gerar relatório:", reportError);
      return NextResponse.json(
        {
          success: false,
          error: "Erro ao gerar relatório",
          details: reportError.error,
        },
        { status: 500 }
      );
    }

    const reportResult = await reportResponse.json();
    const report = reportResult.analysis;

    if (!report) {
      return NextResponse.json(
        {
          success: false,
          error: "Relatório não foi gerado",
        },
        { status: 500 }
      );
    }

    // Enviar email com o relatório
    const emailResponse = await fetch(
      new URL("/api/send-report", request.url).toString(),
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
      return NextResponse.json({
        success: true,
        message: "Relatório enviado com sucesso!",
        emailSent: true,
        emailId: emailResult.emailId,
        recipient: metadata.userEmail,
        reportGenerated: true,
      });
    } else {
      console.error("Erro ao enviar email:", emailResult.error);
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
    console.error("Erro na simulação do webhook:", error);
    return NextResponse.json(
      { error: "Erro na simulação do webhook", details: error.message },
      { status: 500 }
    );
  }
}
