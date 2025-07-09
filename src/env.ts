import { z } from "zod";

// Combina todas as variáveis de ambiente
export const envSchema = z.object({
  // Variáveis do servidor
  DATABASE_URL: z.string().url(),
  OPENAI_API_KEY: z.string(),
  STRIPE_SECRET_KEY: z.string(),
  STRIPE_WEBHOOK_SECRET: z.string(),
  RESEND_API_KEY: z.string(),
  NEXTAUTH_URL: z.string().url().optional(),
  NEXTAUTH_SECRET: z.string().optional(),

  // Variáveis do cliente
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string(),
  NEXT_PUBLIC_STRIPE_PRICE_ID: z.string(),
  NEXT_PUBLIC_DOMAIN: z.string(),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
});

// Função para validar apenas no servidor
function createEnv() {
  // Se estamos no cliente, retorna um objeto com valores padrão
  if (typeof window !== "undefined") {
    return {
      // Valores padrão para desenvolvimento no cliente
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_development",
      NEXT_PUBLIC_STRIPE_PRICE_ID:
        process.env.NEXT_PUBLIC_STRIPE_PRICE_ID || "price_development",
      NEXT_PUBLIC_DOMAIN:
        process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000",
      NEXT_PUBLIC_SUPABASE_URL:
        process.env.NEXT_PUBLIC_SUPABASE_URL ||
        "https://development.supabase.co",
      NEXT_PUBLIC_SUPABASE_ANON_KEY:
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "development_anon_key",
    } as any;
  }

  // No servidor, valida todas as variáveis apenas se não estamos em desenvolvimento
  if (process.env.NODE_ENV === "production") {
    return envSchema.parse(process.env);
  }

  // Em desenvolvimento, usa valores padrão para variáveis não definidas
  return {
    DATABASE_URL:
      process.env.DATABASE_URL ||
      "postgresql://user:password@localhost:5432/cora_dev",
    OPENAI_API_KEY: process.env.OPENAI_API_KEY || "sk-development-key",
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || "sk_test_development",
    STRIPE_WEBHOOK_SECRET:
      process.env.STRIPE_WEBHOOK_SECRET || "whsec_development",
    RESEND_API_KEY: process.env.RESEND_API_KEY || "re_development",
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || "http://localhost:3000",
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || "development_secret",
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_development",
    NEXT_PUBLIC_STRIPE_PRICE_ID:
      process.env.NEXT_PUBLIC_STRIPE_PRICE_ID || "price_development",
    NEXT_PUBLIC_DOMAIN:
      process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000",
    NEXT_PUBLIC_SUPABASE_URL:
      process.env.NEXT_PUBLIC_SUPABASE_URL || "https://development.supabase.co",
    NEXT_PUBLIC_SUPABASE_ANON_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "development_anon_key",
  } as any;
}

export const env = createEnv();
