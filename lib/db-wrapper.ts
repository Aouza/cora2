import { db } from "../src/db";

// Configurações de retry para Vercel serverless
const RETRY_CONFIG = {
  maxRetries: 3,
  baseDelay: 1000, // 1 segundo
  maxDelay: 5000, // 5 segundos
  backoffMultiplier: 2,
};

// Função para calcular delay exponencial
function calculateDelay(attempt: number): number {
  const delay =
    RETRY_CONFIG.baseDelay * Math.pow(RETRY_CONFIG.backoffMultiplier, attempt);
  return Math.min(delay, RETRY_CONFIG.maxDelay);
}

// Função para verificar se o erro é de timeout
function isTimeoutError(error: any): boolean {
  return (
    error?.code === "ETIMEDOUT" ||
    error?.code === "CONNECT_TIMEOUT" ||
    (typeof error?.message === "string" && error.message.includes("timeout")) ||
    (typeof error?.message === "string" &&
      error.message.includes("ETIMEDOUT")) ||
    (typeof error?.message === "string" &&
      error.message.includes("CONNECT_TIMEOUT"))
  );
}

// Função para verificar se o erro é de conexão
function isConnectionError(error: any): boolean {
  return (
    isTimeoutError(error) ||
    error?.code === "ECONNREFUSED" ||
    error?.code === "ENOTFOUND" ||
    (typeof error?.message === "string" && error.message.includes("connection"))
  );
}

// Wrapper genérico com retry logic
export async function withRetry<T>(
  operation: () => Promise<T>,
  operationName: string = "database operation"
): Promise<T> {
  let lastError: any;

  for (let attempt = 0; attempt <= RETRY_CONFIG.maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      // Se não é erro de conexão, não tentar novamente
      if (!isConnectionError(error)) {
        console.error(
          `❌ [DB] ${operationName} failed (non-retryable):`,
          error
        );
        throw error;
      }

      // Se é a última tentativa, lançar o erro
      if (attempt === RETRY_CONFIG.maxRetries) {
        console.error(
          `❌ [DB] ${operationName} failed after ${RETRY_CONFIG.maxRetries + 1} attempts:`,
          error
        );
        throw error;
      }

      // Calcular delay para próxima tentativa
      const delay = calculateDelay(attempt);
      const errorMessage =
        error && typeof error === "object" && "message" in error
          ? error.message
          : String(error);

      console.warn(
        `⚠️ [DB] ${operationName} failed (attempt ${attempt + 1}/${RETRY_CONFIG.maxRetries + 1}), retrying in ${delay}ms:`,
        errorMessage
      );

      // Aguardar antes da próxima tentativa
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

// Wrapper específico para operações do Drizzle
export const dbWithRetry = {
  select: (table: any) => ({
    from: (fromTable: any) => ({
      where: (condition: any) => ({
        limit: async (limit: number) => {
          return withRetry(
            () => db.select().from(fromTable).where(condition).limit(limit),
            `SELECT from ${fromTable.name}`
          );
        },
        execute: async () => {
          return withRetry(
            () => db.select().from(fromTable).where(condition),
            `SELECT from ${fromTable.name}`
          );
        },
      }),
      execute: async () => {
        return withRetry(
          () => db.select().from(fromTable),
          `SELECT from ${fromTable.name}`
        );
      },
    }),
  }),

  insert: (table: any) => ({
    values: (values: any) => ({
      returning: async () => {
        return withRetry(
          () => db.insert(table).values(values).returning(),
          `INSERT into ${table.name}`
        );
      },
    }),
  }),

  update: (table: any) => ({
    set: (values: any) => ({
      where: (condition: any) => ({
        returning: async () => {
          return withRetry(
            () => db.update(table).set(values).where(condition).returning(),
            `UPDATE ${table.name}`
          );
        },
      }),
    }),
  }),

  delete: (table: any) => ({
    where: (condition: any) => ({
      returning: async () => {
        return withRetry(
          () => db.delete(table).where(condition).returning(),
          `DELETE from ${table.name}`
        );
      },
    }),
  }),
};
