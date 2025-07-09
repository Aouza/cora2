import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { profiles } from "./auth";
import { tipoEcoEnum } from "./enums";

// ========== TABELAS DE RELATOS ==========

// Tabela de relatos (agora referencia profiles em vez de users)
export const relatos = pgTable("relatos", {
  id: uuid("id").primaryKey().defaultRandom(),
  texto: text("texto").notNull(),
  userId: uuid("user_id")
    .references(() => profiles.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Tabela de ecos (reações simbólicas)
export const ecos = pgTable("ecos", {
  id: uuid("id").primaryKey().defaultRandom(),
  relatoId: uuid("relato_id")
    .references(() => relatos.id, { onDelete: "cascade" })
    .notNull(),
  tipo: tipoEcoEnum("tipo").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ========== TYPES ==========

export type Relato = typeof relatos.$inferSelect;
export type NewRelato = typeof relatos.$inferInsert;

export type Eco = typeof ecos.$inferSelect;
export type NewEco = typeof ecos.$inferInsert;
