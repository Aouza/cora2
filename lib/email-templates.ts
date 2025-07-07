import { marked } from "marked";

// Configuração do Marked para emails
marked.setOptions({
  breaks: true, // Converte quebras de linha em <br>
  gfm: true, // GitHub Flavored Markdown
});

// Função para processar Markdown e aplicar estilos específicos para email
function processMarkdownReport(markdownText: string): string {
  // Converte Markdown para HTML
  let htmlContent = marked(markdownText) as string;

  // Aplica estilos específicos para títulos h2 (seções do relatório)
  htmlContent = htmlContent.replace(
    /<h2>/g,
    '<h2 style="color: #1e293b; font-size: 18px; font-weight: 700; margin: 32px 0 16px 0; line-height: 1.4;">'
  );

  // Aplica estilos para parágrafos
  htmlContent = htmlContent.replace(
    /<p>/g,
    '<p style="margin: 16px 0; line-height: 1.6;">'
  );

  // Aplica estilos especiais para blockquotes (frase arquétipo)
  htmlContent = htmlContent.replace(
    /<blockquote>/g,
    '<blockquote style="text-align: center; font-style: italic; font-size: 18px; color: #4338ca; margin: 32px 0; padding: 24px; background: linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%); border-radius: 12px; border-left: 4px solid #667eea; border: none;">'
  );

  htmlContent = htmlContent.replace(/<\/blockquote>/g, "</blockquote>");

  return htmlContent;
}

export const createReportEmailHTML = (
  customerName: string,
  partnerName: string,
  report: string
) => `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sua Análise Simbólica de Término - Cora.Deep</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07); }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; }
        .header h1 { color: #1e293b; margin: 0; font-size: 28px; font-weight: bold; }
        .header p { color: #374151; margin: 10px 0 0 0; font-size: 16px; font-weight: 500; }
        .content { padding: 40px 30px; }
        .greeting { font-size: 18px; color: #1e293b; margin-bottom: 20px; }
        .report-section { background: #f8fafc; border-radius: 12px; padding: 30px; margin: 30px 0; border-left: 4px solid #667eea; }
        .report-content { color: #374151; line-height: 1.8; font-size: 16px; }
        .cta-section { text-align: center; margin: 40px 0; }
        .cta-button { display: inline-block; background: #f8fafc; color: #1e293b !important; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; border: 2px solid #667eea; }
        .footer { background: #f8fafc; color: #1e293b; padding: 30px 20px; text-align: center; font-size: 14px; }
        .footer a { color: #4338ca; text-decoration: none; }
        .divider { height: 1px; background: #e2e8f0; margin: 30px 0; }
        .highlight-box { background: #f0f4ff; border: 1px solid #c7d2fe; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .emoji { font-size: 24px; margin-right: 8px; }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1><span class="emoji">✨</span> Cora.Deep - Clareza Emocional</h1>
            <p>Sua análise simbólica de término está pronta!</p>
        </div>

        <!-- Content -->
        <div class="content">
            <div class="greeting">
                Olá, <strong>${customerName}</strong>! 👋
            </div>

            <p>Sua análise simbólica sobre o término com <strong>${partnerName}</strong> foi concluída com sucesso!</p>

            <div class="highlight-box">
                <p><span class="emoji">🎯</span> <strong>O que você encontrará neste relatório:</strong></p>
                <ul style="color: #4b5563; line-height: 1.6;">
                    <li>Diagnóstico emocional do término</li>
                    <li>Padrões emocionais e sabotagens inconscientes</li>
                    <li>Recomendações práticas para reconstrução</li>
                    <li>Prognóstico emocional e linha do tempo</li>
                    <li>Carta de cura personalizada</li>
                </ul>
            </div>

            <!-- Report Section -->
            <div class="report-section">
                <h2 style="color: #1e293b; margin-bottom: 20px;"><span class="emoji">📊</span> Seu Relatório Completo</h2>
                <div class="report-content">${processMarkdownReport(report)}</div>
            </div>

            <div class="divider"></div>

            <div class="highlight-box">
                <p><span class="emoji">💡</span> <strong>Dica importante:</strong></p>
                <p style="color: #4b5563; margin: 0;">Salve este email! Você pode consultar sua análise sempre que precisar de clareza sobre o término e sua reconstrução emocional.</p>
            </div>

            <div class="cta-section">
                <p style="color: #6b7280; margin-bottom: 20px;">Precisa de mais clareza? Faça uma nova análise quando estiver pronto!</p>
                <a href="https://www.coradeep.com.br" class="cta-button" style="color: #1e293b !important;">
                    <span class="emoji">🔥</span> Nova Análise Cora.Deep
                </a>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p><strong>Cora.Deep - Clareza Emocional</strong></p>
            <p>Transformando términos em pontos de virada através de clareza simbólica.</p>
            <div style="margin-top: 20px;">
                <a href="https://www.coradeep.com.br">Site</a> | 
                <a href="#">Política de Privacidade</a> | 
                <a href="#">Termos de Uso</a>
            </div>
            <p style="margin-top: 20px; font-size: 12px; opacity: 0.8;">
                Este email foi enviado de noreply@coradeep.com.br porque você solicitou uma análise simbólica de término em nosso site.
            </p>
        </div>
    </div>
</body>
</html>
`;

export const createReportEmailText = (
  customerName: string,
  partnerName: string,
  report: string
) => `
Olá, ${customerName}! 

Sua análise simbólica sobre o término com ${partnerName} foi concluída com sucesso!

=== SEU RELATÓRIO COMPLETO ===

${report}

=== IMPORTANTE ===

Salve este email! Você pode consultar sua análise sempre que precisar de clareza sobre o término e sua reconstrução emocional.

---
Cora.Deep - Clareza Emocional
Transformando términos em pontos de virada através de clareza simbólica.

Site: https://www.coradeep.com.br
Contato: noreply@coradeep.com.br
`;
