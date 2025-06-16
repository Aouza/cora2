import { NextRequest, NextResponse } from "next/server";
import { resend } from "../../../../lib/resend";
import {
  createReportEmailHTML,
  createReportEmailText,
} from "../../../../lib/email-templates";

export async function POST(request: NextRequest) {
  try {
    const { email, customerName, partnerName, report } = await request.json();

    if (!email || !customerName || !partnerName || !report) {
      return NextResponse.json(
        { error: "Dados obrigatórios faltando" },
        { status: 400 }
      );
    }

    // Enviar email com o relatório
    const { data, error } = await resend.emails.send({
      from: "Cora Deep <onboarding@resend.dev>", // Você precisa configurar seu domínio no Resend
      to: [email], // Usar o email que vem da requisição
      subject: `✨ Seu Relatório de Análise Emocional está pronto, ${customerName}!`,
      html: createReportEmailHTML(customerName, partnerName, report),
      text: createReportEmailText(customerName, partnerName, report),
    });

    if (error) {
      console.error("Erro ao enviar email:", error);
      return NextResponse.json(
        { error: "Erro ao enviar email", details: error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Relatório enviado com sucesso!",
      emailId: data?.id,
      recipient: email,
    });
  } catch (error) {
    console.error("Erro no envio do relatório:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
