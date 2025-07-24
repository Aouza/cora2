import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { env } from "../env";

// Configuração simples e limpa
const connectionString = env.DATABASE_URL;

const postgresConfig = {
  prepare: false,
  max: 10,
  idle_timeout: 20,
  connect_timeout: 30,
  ssl: "require" as const,

  // Debug apenas em desenvolvimento
  ...(process.env.NODE_ENV === "development" && {
    debug: (connection: any, query: any, params: any) => {
      console.log("🔍 [DB] Query:", query);
      console.log("🔍 [DB] Params:", params);
    },
  }),
};

// Cliente postgres
const client = postgres(connectionString, postgresConfig);

// Instância do Drizzle
export const db = drizzle(client, {
  schema,
  casing: "snake_case",
  logger: process.env.NODE_ENV === "development",
});

// Export do client
export { client };

// Export dos schemas
export * from "./schema";
