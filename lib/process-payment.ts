import { stripe } from "./stripe";
import { getTempUserData, deleteTempUserData } from "./temp-storage";
import { generateReport, UserData } from "./generate-report";

export interface PaymentProcessResult {
  success: boolean;
  message?: string;
  recipient?: string;
  emailId?: string;
  error?: string;
  details?: string;
}

export async function processPayment(
  sessionId: string
): Promise<PaymentProcessResult> {
  try {
    // Buscar dados da sessão no Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return {
        success: false,
        error: "Pagamento não foi confirmado",
        details: `Status: ${session.payment_status}`,
      };
    }

    // Primeiro, tentar dados do temp-storage
    let userData = getTempUserData(sessionId);
    let usingFallback = false;

    // Se não encontrou, usar metadata como fallback
    if (!userData) {
      const metadata = session.metadata;
      if (!metadata || !metadata.userEmail || !metadata.userName) {
        return {
          success: false,
          error: "Dados do usuário não encontrados",
          details: "Nem temp-storage nem metadata disponíveis",
        };
      }

      userData = {
        userName: metadata.userName,
        userEmail: metadata.userEmail,
        userBirthdate: metadata.userBirthdate || "",
        userGender: metadata.userGender || "",
        otherName: metadata.otherName,
        otherBirthdate: metadata.otherBirthdate || "",
        relationshipStatus: metadata.relationshipStatus || "complicado",
      };
      usingFallback = true;
    }

    // Gerar relatório usando função direta (sem HTTP)
    const userDataForReport: UserData = {
      userName: userData.userName,
      userEmail: userData.userEmail,
      userBirthdate: userData.userBirthdate || "",
      userGender: userData.userGender || "",
      otherName: userData.otherName,
      otherBirthdate: userData.otherBirthdate || "",
      relationshipStatus: userData.relationshipStatus || "complicado",
    };

    const report = await generateReport(userDataForReport);

    console.log("report", { report });

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

    console.log("emailResult", { emailResult });

    if (!emailResponse.ok) {
      return {
        success: false,
        error: "Erro ao enviar email",
        details: emailResult.error,
      };
    }

    // Limpar dados temporários apenas se não usou fallback
    if (!usingFallback) {
      deleteTempUserData(sessionId);
    }

    return {
      success: true,
      message: "Relatório processado e enviado com sucesso",
      recipient: userData.userEmail,
      emailId: emailResult.emailId,
    };
  } catch (error: any) {
    console.error("Erro no processamento de pagamento:", error);
    return {
      success: false,
      error: "Erro interno no processamento",
      details: error.message,
    };
  }
}
