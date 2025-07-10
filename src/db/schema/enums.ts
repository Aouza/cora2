import { pgEnum } from "drizzle-orm/pg-core";

// Enum para tipos de eco
export const tipoEcoEnum = pgEnum("tipo_eco", ["🌱", "🫂", "💧"]);

// Enum para tipos de relatório
export const tipoRelatorioEnum = pgEnum("tipo_relatorio", [
  "basico",
  "profundo",
  "renascimento",
]);
