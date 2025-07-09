# Resend Setup - Sistema de Email

## Visão Geral

Sistema de email integrado com Resend para envio de relatórios emocionais personalizados da plataforma Cora.Deep.

## Características Principais

- **Templates**: Emails HTML personalizados com design responsivo
- **Validação**: Email validado com **Zod** (migrado do Yup)
- **Integração**: API routes para envio automático
- **Personalização**: Conteúdo dinâmico baseado nos dados do usuário

## Dependências

```json
{
  "resend": "^3.2.0",
  "zod": "^3.23.8",
  "@hookform/resolvers": "^5.1.1"
}
```

## Configuração

### 1. Variáveis de Ambiente

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxx
```

### 2. Configuração da API

```typescript
// lib/resend.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export { resend };
```

## Schemas de Validação (Zod)

### Schema Principal para Relatórios

```typescript
import { z } from "zod";

export const emailReportSchema = z.object({
  name1: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(50, "Nome deve ter no máximo 50 caracteres"),

  email1: z
    .string()
    .email("Digite um email válido")
    .max(100, "Email muito longo"),

  reportType: z.enum(["basico", "profundo", "renascimento"]),

  content: z
    .string()
    .min(100, "Conteúdo muito curto")
    .max(10000, "Conteúdo muito longo"),
});

export type EmailReportData = z.infer<typeof emailReportSchema>;
```

### Validação de Formulário

```typescript
// hooks/useEmailForm.ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailReportSchema, EmailReportData } from "../schemas/email";

export const useEmailForm = () => {
  return useForm<EmailReportData>({
    resolver: zodResolver(emailReportSchema),
    mode: "onChange",
  });
};
```

## Templates de Email

### 1. Relatório Básico

```typescript
// lib/email-templates.ts
export const basicReportTemplate = (data: EmailReportData) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Seu Relatório Emocional - Cora.Deep</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
    
    <!-- Header -->
    <div style="padding: 40px 30px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">
        🌟 Cora.Deep
      </h1>
      <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">
        Seu relatório emocional está pronto
      </p>
    </div>

    <!-- Content -->
    <div style="background: white; padding: 40px 30px; margin: 0;">
      <h2 style="color: #1a202c; margin: 0 0 20px 0; font-size: 24px;">
        Olá, ${data.name1}! ✨
      </h2>
      
      <p style="color: #4a5568; line-height: 1.6; margin: 0 0 25px 0;">
        Sua análise emocional foi processada com carinho. Este relatório contém insights 
        personalizados sobre sua jornada emocional atual.
      </p>

      <div style="background: #f7fafc; padding: 25px; border-radius: 12px; margin: 25px 0;">
        <h3 style="color: #2d3748; margin: 0 0 15px 0;">📋 Resumo do Relatório</h3>
        <p style="color: #4a5568; margin: 0; line-height: 1.6;">
          ${data.content.substring(0, 200)}...
        </p>
      </div>

      <div style="text-align: center; margin: 35px 0;">
        <a href="#" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                           color: white; padding: 15px 30px; text-decoration: none; 
                           border-radius: 8px; font-weight: 600; display: inline-block;">
          📖 Ler Relatório Completo
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding: 30px; text-align: center; color: rgba(255,255,255,0.8);">
      <p style="margin: 0; font-size: 14px;">
        Com amor, equipe Cora.Deep 💜
      </p>
      <p style="margin: 10px 0 0 0; font-size: 12px;">
        Este email foi enviado porque você solicitou um relatório emocional.
      </p>
    </div>
  </div>
</body>
</html>
`;
```

## API Routes

### Endpoint para Envio

```typescript
// app/api/send-report/route.ts
import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import { emailReportSchema } from "@/db/form-schemas";
import { basicReportTemplate } from "@/lib/email-templates";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validação com Zod
    const validatedData = emailReportSchema.parse(body);

    const { data, error } = await resend.emails.send({
      from: "Cora.Deep <noreply@coradev.com>",
      to: [validatedData.email1],
      subject: `✨ Seu relatório emocional está pronto, ${validatedData.name1}`,
      html: basicReportTemplate(validatedData),
    });

    if (error) {
      console.error("Erro no Resend:", error);
      return NextResponse.json({ error: "Falha no envio" }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      messageId: data?.id,
      message: "Email enviado com sucesso!",
    });
  } catch (error) {
    console.error("Erro na API:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Dados inválidos",
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: "Erro interno do servidor",
      },
      { status: 500 }
    );
  }
}
```

## Uso no Frontend

```typescript
// components/EmailForm.tsx
import { useEmailForm } from '@/hooks/useEmailForm'

const EmailForm = () => {
  const { register, handleSubmit, formState: { errors } } = useEmailForm()

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/send-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        console.log('Email enviado:', result.messageId)
      }
    } catch (error) {
      console.error('Erro:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email1')}
        type="email"
        placeholder="seu@email.com"
      />
      {errors.email1 && <span>{errors.email1.message}</span>}

      <button type="submit">
        Enviar Relatório
      </button>
    </form>
  )
}
```

## Migração Yup → Zod

### Antes (Yup)

```typescript
import * as yup from "yup";

const schema = yup.object({
  email1: yup.string().email().required(),
  name1: yup.string().required(),
});
```

### Depois (Zod)

```typescript
import { z } from "zod";

const schema = z.object({
  email1: z.string().email("Email inválido"),
  name1: z.string().min(1, "Nome obrigatório"),
});
```

### Benefícios da Migração

1. **Type Safety**: Inferência automática de tipos
2. **Performance**: Zod é mais rápido que Yup
3. **Bundle Size**: Menor impacto no tamanho do bundle
4. **Ecosystem**: Melhor integração com TypeScript
5. **Validação de formato**: Email validado com Zod oferece mais precisão

## Troubleshooting

### Erro: "Invalid email format"

- **Causa**: Validação Zod mais rigorosa
- **Solução**: Verificar formato do email e domínio

### Erro: "Schema validation failed"

- **Causa**: Dados não conformes com schema Zod
- **Solução**: Verificar tipos e validações no schema

### Performance Issues

- **Solução**: Zod é mais performático, mas verificar se schemas são reutilizados

## Próximos Passos

1. Implementar templates avançados para outros tipos de relatório
2. Adicionar sistema de notificações por email
3. Implementar analytics de abertura de email
4. Criar sistema de templates dinâmicos

---

**Status**: ✅ Completo e migrado para Zod
**Última Atualização**: Dezembro 2024
