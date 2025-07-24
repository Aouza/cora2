import { db, client, checkDatabaseHealth } from "../src/db";

// Configurações de retry para Vercel serverless
const RETRY_CONFIG = {
  maxRetries: 3,
  baseDelay: 1000, // 1 segundo
  maxDelay: 5000, // 5 segundos
  backoffMultiplier: 2,
};

// Cache para health check
let lastHealthCheck = 0;
const HEALTH_CHECK_CACHE_DURATION = 30000; // 30 segundos

// Função para calcular delay exponencial
function calculateDelay(attempt: number): number {
  const delay =
    RETRY_CONFIG.baseDelay * Math.pow(RETRY_CONFIG.backoffMultiplier, attempt);
  return Math.min(delay, RETRY_CONFIG.maxDelay);
}

// Função para verificar se o erro é de timeout
function isTimeoutError(error: any): boolean {
  // Verificar códigos de erro diretos
  if (error?.code === "ETIMEDOUT" || error?.code === "CONNECT_TIMEOUT") {
    return true;
  }

  // Verificar mensagens de erro
  const errorMessage = error?.message || "";
  if (typeof errorMessage === "string") {
    return (
      errorMessage.includes("timeout") ||
      errorMessage.includes("ETIMEDOUT") ||
      errorMessage.includes("CONNECT_TIMEOUT")
    );
  }

  // Verificar causa do erro (para DrizzleQueryError)
  if (error?.cause) {
    const cause = error.cause;
    if (cause?.code === "ETIMEDOUT" || cause?.code === "CONNECT_TIMEOUT") {
      return true;
    }
    if (typeof cause?.message === "string") {
      return (
        cause.message.includes("timeout") ||
        cause.message.includes("ETIMEDOUT") ||
        cause.message.includes("CONNECT_TIMEOUT")
      );
    }
  }

  return false;
}

// Função para verificar se o erro é de conexão
function isConnectionError(error: any): boolean {
  // Erros de timeout
  if (isTimeoutError(error)) {
    return true;
  }

  // Erros de conexão diretos
  if (error?.code === "ECONNREFUSED" || error?.code === "ENOTFOUND") {
    return true;
  }

  // Verificar mensagens de erro
  const errorMessage = error?.message || "";
  if (typeof errorMessage === "string") {
    return (
      errorMessage.includes("connection") ||
      errorMessage.includes("connect") ||
      errorMessage.includes("network")
    );
  }

  // Verificar causa do erro (para DrizzleQueryError)
  if (error?.cause) {
    const cause = error.cause;
    if (cause?.code === "ECONNREFUSED" || cause?.code === "ENOTFOUND") {
      return true;
    }
    if (typeof cause?.message === "string") {
      return (
        cause.message.includes("connection") ||
        cause.message.includes("connect") ||
        cause.message.includes("network")
      );
    }
  }

  // Para DrizzleQueryError, verificar se é um erro de conexão
  if (
    error?.name === "DrizzleQueryError" ||
    error?.constructor?.name === "DrizzleQueryError"
  ) {
    // Se tem causa com ETIMEDOUT, é erro de conexão
    if (error?.cause && isTimeoutError(error)) {
      return true;
    }
  }

  return false;
}

// Função para verificar saúde do banco com cache
async function checkHealthWithCache(): Promise<boolean> {
  const now = Date.now();

  // Se o último check foi há menos de 30 segundos, usar cache
  if (now - lastHealthCheck < HEALTH_CHECK_CACHE_DURATION) {
    return true; // Assumir que está saudável se check recente
  }

  try {
    const isHealthy = await checkDatabaseHealth();
    lastHealthCheck = now;
    return isHealthy;
  } catch (error) {
    console.error("❌ [DB] Health check failed:", error);
    return false;
  }
}

// Wrapper genérico com retry logic e health check
export async function withRetry<T>(
  operation: () => Promise<T>,
  operationName: string = "database operation"
): Promise<T> {
  let lastError: any;

  for (let attempt = 0; attempt <= RETRY_CONFIG.maxRetries; attempt++) {
    try {
      // Verificar saúde do banco antes da operação (apenas na primeira tentativa)
      if (attempt === 0) {
        const isHealthy = await checkHealthWithCache();
        if (!isHealthy) {
          console.warn(
            `⚠️ [DB] Database health check failed, proceeding anyway for: ${operationName}`
          );
        }
      }

      return await operation();
    } catch (error) {
      lastError = error;

      // Verificar se é erro de conexão
      const shouldRetry = isConnectionError(error);

      if (!shouldRetry) {
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
