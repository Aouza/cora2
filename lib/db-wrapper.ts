import { db, client, checkDatabaseHealth } from "../src/db";

// Configurações de retry para Vercel serverless
const RETRY_CONFIG = {
  maxRetries: 5, // Aumentado para 5 tentativas
  baseDelay: 500, // Reduzido para 500ms
  maxDelay: 10000, // Aumentado para 10 segundos
  backoffMultiplier: 1.5, // Backoff mais suave
};

// Cache para health check
let lastHealthCheck = 0;
const HEALTH_CHECK_CACHE_DURATION = 30000; // 30 segundos

// Estado global de saúde do banco
let databaseHealthStatus = {
  isHealthy: true,
  lastCheck: 0,
  consecutiveFailures: 0,
  maxConsecutiveFailures: 3,
};

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

// Função para verificar se o erro é de conexão - MAIS AGRESSIVA
function isConnectionError(error: any): boolean {
  // Para DrizzleQueryError, verificar se tem causa de conexão
  if (
    error?.name === "DrizzleQueryError" ||
    error?.constructor?.name === "DrizzleQueryError"
  ) {
    // Se tem causa, verificar se é erro de conexão
    if (error?.cause) {
      const cause = error.cause;

      // Verificar códigos de erro de conexão
      if (
        cause?.code === "ETIMEDOUT" ||
        cause?.code === "CONNECT_TIMEOUT" ||
        cause?.code === "ECONNREFUSED" ||
        cause?.code === "ENOTFOUND"
      ) {
        return true;
      }

      // Verificar mensagens de erro de conexão
      if (typeof cause?.message === "string") {
        const causeMessage = cause.message.toLowerCase();
        if (
          causeMessage.includes("timeout") ||
          causeMessage.includes("connection") ||
          causeMessage.includes("connect") ||
          causeMessage.includes("network")
        ) {
          return true;
        }
      }
    }

    // Se não tem causa mas é DrizzleQueryError, verificar se tem informações de conexão
    if (error?.message && typeof error.message === "string") {
      const errorMessage = error.message.toLowerCase();
      if (
        errorMessage.includes("timeout") ||
        errorMessage.includes("connection") ||
        errorMessage.includes("connect")
      ) {
        return true;
      }
    }
  }

  // Erros de timeout diretos
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

  return false;
}

// Função para verificar saúde do banco com cache e estado global
async function checkHealthWithCache(): Promise<boolean> {
  const now = Date.now();

  // Se o último check foi há menos de 30 segundos, usar cache
  if (now - lastHealthCheck < HEALTH_CHECK_CACHE_DURATION) {
    return databaseHealthStatus.isHealthy;
  }

  try {
    const isHealthy = await checkDatabaseHealth();
    lastHealthCheck = now;

    // Atualizar estado global
    if (isHealthy) {
      databaseHealthStatus.consecutiveFailures = 0;
      databaseHealthStatus.isHealthy = true;
    } else {
      databaseHealthStatus.consecutiveFailures++;
      if (
        databaseHealthStatus.consecutiveFailures >=
        databaseHealthStatus.maxConsecutiveFailures
      ) {
        databaseHealthStatus.isHealthy = false;
      }
    }

    databaseHealthStatus.lastCheck = now;
    return databaseHealthStatus.isHealthy;
  } catch (error) {
    console.error("❌ [DB] Health check failed:", error);

    // Atualizar estado global
    databaseHealthStatus.consecutiveFailures++;
    if (
      databaseHealthStatus.consecutiveFailures >=
      databaseHealthStatus.maxConsecutiveFailures
    ) {
      databaseHealthStatus.isHealthy = false;
    }

    lastHealthCheck = now;
    return databaseHealthStatus.isHealthy;
  }
}

// Função para tentar reconectar ao banco
async function attemptReconnection(): Promise<boolean> {
  try {
    console.log("🔄 [DB] Attempting to reconnect to database...");

    // Tentar fechar conexões existentes
    try {
      await client.end();
    } catch (e) {
      // Ignorar erros ao fechar
    }

    // Aguardar um pouco
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Tentar nova conexão
    const isHealthy = await checkDatabaseHealth();

    if (isHealthy) {
      console.log("✅ [DB] Reconnection successful");
      databaseHealthStatus.isHealthy = true;
      databaseHealthStatus.consecutiveFailures = 0;
      return true;
    } else {
      console.log("❌ [DB] Reconnection failed");
      return false;
    }
  } catch (error) {
    console.error("❌ [DB] Reconnection error:", error);
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
            `⚠️ [DB] Database health check failed, attempting reconnection for: ${operationName}`
          );

          // Tentar reconectar
          const reconnected = await attemptReconnection();
          if (!reconnected) {
            console.error(
              `❌ [DB] Failed to reconnect, proceeding with operation: ${operationName}`
            );
          }
        }
      }

      return await operation();
    } catch (error) {
      lastError = error;

      // Verificar se é erro de conexão
      const shouldRetry = isConnectionError(error);

      // Log detalhado para debugging
      console.log(`🔍 [DB] Error analysis for ${operationName}:`, {
        attempt: attempt + 1,
        errorName: (error as any)?.name,
        errorCode: (error as any)?.code,
        causeCode: (error as any)?.cause?.code,
        causeMessage: (error as any)?.cause?.message,
        shouldRetry,
        isDrizzleError: (error as any)?.name === "DrizzleQueryError",
        hasCause: !!(error as any)?.cause,
      });

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
