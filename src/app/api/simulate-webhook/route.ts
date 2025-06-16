import { NextRequest, NextResponse } from "next/server";
import {
  getTempUserData,
  deleteTempUserData,
} from "../../../../lib/temp-storage";

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID é obrigatório" },
        { status: 400 }
      );
    }

    console.log("🧪 Simulando webhook para session:", sessionId);

    // Recuperar dados do usuário do armazenamento temporário
    const userData = getTempUserData(sessionId);

    if (userData && userData.report) {
      try {
        console.log("📧 Enviando email para:", userData.userEmail);

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
              report: userData.report,
            }),
          }
        );

        const emailResult = await emailResponse.json();

        if (emailResponse.ok) {
          console.log("✅ Email enviado com sucesso para:", userData.userEmail);
          console.log("📬 Email ID:", emailResult.emailId);

          // Limpar dados temporários após sucesso
          deleteTempUserData(sessionId);

          return NextResponse.json({
            success: true,
            message: "Webhook simulado com sucesso!",
            emailSent: true,
            emailId: emailResult.emailId,
            recipient: userData.userEmail,
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
        console.error("❌ Erro ao processar webhook simulado:", error);
        return NextResponse.json(
          {
            success: false,
            error: "Erro ao processar webhook",
            details: error.message,
          },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Dados do usuário não encontrados no armazenamento temporário",
          sessionId,
          hasUserData: !!userData,
        },
        { status: 404 }
      );
    }
  } catch (error: any) {
    console.error("❌ Erro na simulação do webhook:", error);
    return NextResponse.json(
      { error: "Erro na simulação do webhook", details: error.message },
      { status: 500 }
    );
  }
}
