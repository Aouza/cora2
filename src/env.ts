import { z } from "zod";
import { config } from "dotenv";

// Carrega o .env.local no ambiente de desenvolvimento
if (process.env.NODE_ENV !== "production") {
  config({ path: ".env.local" });
}

// Esquema de validação com zod
const envSchema = z.object({
  // Variáveis do servidor
  DATABASE_URL: z.string().url(),
  OPENAI_API_KEY: z.string(),
  STRIPE_SECRET_KEY: z.string(),
  STRIPE_WEBHOOK_SECRET: z.string(),
  RESEND_API_KEY: z.string(),
  NEXTAUTH_URL: z.string().url().optional(),
  NEXTAUTH_SECRET: z.string().optional(),

  // Variáveis do cliente (prefixo NEXT_PUBLIC)
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string(),
  NEXT_PUBLIC_STRIPE_PRICE_ID: z.string(),
  NEXT_PUBLIC_DOMAIN: z.string(),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
});

// Faz a validação e lança erro se algo estiver mal definido
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Erro nas variáveis de ambiente:");
  console.table(parsed.error.flatten().fieldErrors);
  throw new Error("Corrija as variáveis de ambiente no .env.local");
}

export const env = parsed.data;
