import { env } from "../env";

export const DATABASE_CONFIG = {
  // Só executa seeds em desenvolvimento
  ENABLE_SEEDS: env.NODE_ENV === "development",

  // Configurações de dados iniciais
  INITIAL_DATA: {
    ENABLE_SAMPLE_POSTS: env.NODE_ENV === "development",
    ENABLE_SAMPLE_CONTENT: env.NODE_ENV === "development",
    ENABLE_SAMPLE_ANALYSIS: env.NODE_ENV === "development",
  },

  // Configurações de produção
  PRODUCTION: {
    EMPTY_STATE_ENABLED: env.NODE_ENV === "production",
    REQUIRE_REAL_DATA: env.NODE_ENV === "production",
  },
} as const;

export function shouldRunSeeds(): boolean {
  return DATABASE_CONFIG.ENABLE_SEEDS;
}

export function shouldShowEmptyState(): boolean {
  return DATABASE_CONFIG.PRODUCTION.EMPTY_STATE_ENABLED;
}

export function isProductionEnvironment(): boolean {
  return env.NODE_ENV === "production";
}
