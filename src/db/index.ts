import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { env } from "../env";

// Configuração da conexão otimizada para Vercel serverless
const connectionString = env.DATABASE_URL;

// Configurações específicas para ambiente serverless
const isVercel = process.env.VERCEL === "1";
const isProduction = process.env.NODE_ENV === "production";

const postgresConfig = {
  // Configurações básicas
  prepare: false, // Desabilitar prepare para evitar problemas de cache
  max: isVercel ? 1 : 10, // Pool menor no Vercel
  idle_timeout: 20, // 20 segundos de idle timeout
  connect_timeout: 10, // 10 segundos de timeout de conexão

  // Configurações específicas para Vercel
  ...(isVercel && {
    max: 1, // Pool de 1 conexão no Vercel
    idle_timeout: 10, // Timeout menor no Vercel
    connect_timeout: 15, // Timeout de conexão maior no Vercel
    ssl: "require" as const, // Forçar SSL
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

// Função para verificar saúde da conexão
export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    await client`SELECT 1`;
    return true;
  } catch (error) {
    console.error("❌ [DB] Health check failed:", error);
    return false;
  }
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
