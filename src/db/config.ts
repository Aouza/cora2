import { env } from "../env";

export const DATABASE_CONFIG = {
  // Só executa seeds em desenvolvimento
  ENABLE_SEEDS: process.env.NODE_ENV === "development",

  // Configurações de dados iniciais
  INITIAL_DATA: {
    ENABLE_SAMPLE_POSTS: process.env.NODE_ENV === "development",
    ENABLE_SAMPLE_CONTENT: process.env.NODE_ENV === "development",
    ENABLE_SAMPLE_ANALYSIS: process.env.NODE_ENV === "development",
  },

  // Configurações de produção
  PRODUCTION: {
    EMPTY_STATE_ENABLED: process.env.NODE_ENV === "production",
    REQUIRE_REAL_DATA: process.env.NODE_ENV === "production",
  },
} as const;

export function shouldRunSeeds(): boolean {
  return DATABASE_CONFIG.ENABLE_SEEDS;
}

export function shouldShowEmptyState(): boolean {
  return DATABASE_CONFIG.PRODUCTION.EMPTY_STATE_ENABLED;
}

export function isProductionEnvironment(): boolean {
  return process.env.NODE_ENV === "production";
}
