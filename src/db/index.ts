import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { env } from "../env";

// Configuração da conexão
const connectionString = env.DATABASE_URL;

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(connectionString, { prepare: false });

// Instância do Drizzle
export const db = drizzle(client, { schema, casing: "snake_case" });

// Export do client para casos especiais
export { client };

// Export dos schemas para facilitar imports
export * from "./schema";
