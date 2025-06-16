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
    <title>Seu Relatório de Análise Emocional - Cora</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background: white; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 28px; font-weight: bold; }
        .header p { color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px; }
        .content { padding: 40px 30px; }
        .greeting { font-size: 18px; color: #1e293b; margin-bottom: 20px; }
        .report-section { background: #f8fafc; border-radius: 12px; padding: 30px; margin: 30px 0; border-left: 4px solid #667eea; }
        .report-content { color: #374151; line-height: 1.8; font-size: 16px; white-space: pre-line; }
        .cta-section { text-align: center; margin: 40px 0; }
        .cta-button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; }
        .footer { background: #1e293b; color: #94a3b8; padding: 30px 20px; text-align: center; font-size: 14px; }
        .footer a { color: #667eea; text-decoration: none; }
        .divider { height: 1px; background: #e2e8f0; margin: 30px 0; }
        .highlight-box { background: #f0f4ff; border: 1px solid #c7d2fe; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .emoji { font-size: 24px; margin-right: 8px; }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1><span class="emoji">✨</span> Cora - Análise Emocional</h1>
            <p>Sua análise personalizada está pronta!</p>
        </div>

        <!-- Content -->
        <div class="content">
            <div class="greeting">
                Olá, <strong>${customerName}</strong>! 👋
            </div>

            <p>Sua análise emocional sobre o relacionamento com <strong>${partnerName}</strong> foi concluída com sucesso!</p>

            <div class="highlight-box">
                <p><span class="emoji">🎯</span> <strong>O que você encontrará neste relatório:</strong></p>
                <ul style="color: #4b5563; line-height: 1.6;">
                    <li>Análise detalhada dos padrões emocionais</li>
                    <li>Insights sobre a dinâmica do relacionamento</li>
                    <li>Recomendações personalizadas</li>
                    <li>Pontos de atenção e oportunidades</li>
                </ul>
            </div>

            <!-- Report Section -->
            <div class="report-section">
                <h2 style="color: #1e293b; margin-bottom: 20px;"><span class="emoji">📊</span> Seu Relatório Completo</h2>
                <div class="report-content">${report}</div>
            </div>

            <div class="divider"></div>

            <div class="highlight-box">
                <p><span class="emoji">💡</span> <strong>Dica importante:</strong></p>
                <p style="color: #4b5563; margin: 0;">Salve este email! Você pode consultar sua análise sempre que precisar de clareza sobre seus sentimentos e relacionamento.</p>
            </div>

            <div class="cta-section">
                <p style="color: #6b7280; margin-bottom: 20px;">Gostou da sua análise? Compartilhe com quem você confia!</p>
                <a href="https://cora-analise.com" class="cta-button">
                    <span class="emoji">🌟</span> Fazer Nova Análise
                </a>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p><strong>Cora - Análise Emocional</strong></p>
            <p>Ajudando você a entender melhor seus sentimentos e relacionamentos.</p>
            <div style="margin-top: 20px;">
                <a href="mailto:suporte@cora-analise.com">Suporte</a> | 
                <a href="#">Política de Privacidade</a> | 
                <a href="#">Termos de Uso</a>
            </div>
            <p style="margin-top: 20px; font-size: 12px; opacity: 0.8;">
                Este email foi enviado porque você solicitou uma análise emocional em nosso site.
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

Sua análise emocional sobre o relacionamento com ${partnerName} foi concluída com sucesso!

=== SEU RELATÓRIO COMPLETO ===

${report}

=== IMPORTANTE ===

Salve este email! Você pode consultar sua análise sempre que precisar de clareza sobre seus sentimentos e relacionamento.

---
Cora - Análise Emocional
Ajudando você a entender melhor seus sentimentos e relacionamentos.

Suporte: suporte@cora-analise.com
Site: https://cora-analise.com
`;
