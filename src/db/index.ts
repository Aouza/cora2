import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { env } from "../env";

// Configuração da conexão otimizada para Vercel serverless
const connectionString = env.DATABASE_URL;

// Configurações específicas para ambiente serverless
const isVercel = process.env.VERCEL === "1";
const isProduction = process.env.NODE_ENV === "production";

// Verificar se estamos usando connection pooling (porta 6543)
const isUsingPooling =
  connectionString.includes("pooler.supabase.com") ||
  connectionString.includes(":6543");

const postgresConfig = {
  // Configurações básicas
  prepare: false, // Desabilitar prepare para evitar problemas de cache
  max: isVercel ? 1 : 10, // Pool menor no Vercel
  idle_timeout: 20, // 20 segundos de idle timeout
  connect_timeout: 30, // 30 segundos de timeout de conexão

  // Configurações específicas para Vercel
  ...(isVercel && {
    max: 1, // Pool de 1 conexão no Vercel
    idle_timeout: 10, // Timeout menor no Vercel
    connect_timeout: 35, // Timeout de conexão maior no Vercel
    connection: {
      application_name: "cora2-vercel",
      // Configurações específicas para Supabase
      options: isUsingPooling
        ? "-c statement_timeout=30000 -c idle_in_transaction_session_timeout=30000"
        : "-c statement_timeout=60000 -c idle_in_transaction_session_timeout=60000",
    },
  }),

  // Configurações específicas para connection pooling
  ...(isUsingPooling && {
    ssl: "require" as const, // Usar 'require' em vez de objeto para PgBouncer
    connection: {
      application_name: "cora2-vercel-pooler",
      // Timeouts mais curtos para connection pooling
      options:
        "-c statement_timeout=30000 -c idle_in_transaction_session_timeout=30000",
    },
  }),

  // Configurações de retry
  onnotice: () => {}, // Silenciar notices
  onparameter: () => {}, // Silenciar parameter warnings

  // Configurações de debug (apenas em desenvolvimento)
  ...(process.env.NODE_ENV === "development" && {
    debug: (connection: any, query: any, params: any) => {
      console.log("🔍 [DB] Query:", query);
      console.log("🔍 [DB] Params:", params);
    },
  }),
};

// Criar cliente postgres com configurações otimizadas
const client = postgres(connectionString, postgresConfig);

// Instância do Drizzle
export const db = drizzle(client, {
  schema,
  casing: "snake_case",
  // Configurações adicionais do Drizzle
  logger: process.env.NODE_ENV === "development",
});

// Export do client para casos especiais
export { client };

// Export dos schemas para facilitar imports
export * from "./schema";

// Função para verificar saúde da conexão com retry
export async function checkDatabaseHealth(): Promise<boolean> {
  const maxRetries = 2; // Reduzido para 2 tentativas

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      await client`SELECT 1`;
      return true;
    } catch (error) {
      console.error(
        `❌ [DB] Health check attempt ${attempt + 1} failed:`,
        error
      );

      if (attempt === maxRetries - 1) {
        return false;
      }

      // Aguardar antes da próxima tentativa (reduzido)
      await new Promise((resolve) => setTimeout(resolve, 500 * (attempt + 1)));
    }
  }

  return false;
}

// Função para fechar conexões (útil para cleanup)
export async function closeDatabase(): Promise<void> {
  try {
    await client.end();
    console.log("✅ [DB] Database connections closed");
  } catch (error) {
    console.error("❌ [DB] Error closing database:", error);
  }
}

// Função para obter informações da conexão
export function getConnectionInfo() {
  return {
    isVercel,
    isProduction,
    isUsingPooling,
    connectionString: connectionString ? "configured" : "missing",
    hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    port: isUsingPooling ? "6543 (Pooler)" : "5432 (Direct)",
  };
}
