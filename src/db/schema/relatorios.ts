import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { profiles } from "./auth";
import { tipoRelatorioEnum } from "./enums";

// ========== TABELAS DE RELATÓRIOS ==========

// Tabela de relatórios (agora referencia profiles)
export const relatorios = pgTable("relatorios", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => profiles.id, { onDelete: "cascade" })
    .notNull(),
  conteudo: text("conteudo").notNull(),
  tipo: tipoRelatorioEnum("tipo").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ========== TYPES ==========

export type Relatorio = typeof relatorios.$inferSelect;
export type NewRelatorio = typeof relatorios.$inferInsert;
