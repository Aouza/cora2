import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Enum para tipos de eco
export const tipoEcoEnum = pgEnum("tipo_eco", ["🌱", "🫂", "💧"]);

// Enum para tipos de relatório
export const tipoRelatorioEnum = pgEnum("tipo_relatorio", [
  "basico",
  "profundo",
  "renascimento",
]);

// Tabela de usuários
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tabela de relatos
export const relatos = pgTable("relatos", {
  id: uuid("id").primaryKey().defaultRandom(),
  texto: text("texto").notNull(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
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

// Tabela de relatórios
export const relatorios = pgTable("relatorios", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  conteudo: text("conteudo").notNull(),
  tipo: tipoRelatorioEnum("tipo").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Definindo relações
export const usersRelations = relations(users, ({ many }) => ({
  relatos: many(relatos),
  relatorios: many(relatorios),
}));

export const relatosRelations = relations(relatos, ({ one, many }) => ({
  user: one(users, {
    fields: [relatos.userId],
    references: [users.id],
  }),
  ecos: many(ecos),
}));

export const ecosRelations = relations(ecos, ({ one }) => ({
  relato: one(relatos, {
    fields: [ecos.relatoId],
    references: [relatos.id],
  }),
}));

export const relatoriosRelations = relations(relatorios, ({ one }) => ({
  user: one(users, {
    fields: [relatorios.userId],
    references: [users.id],
  }),
}));

// Types inferidos para TypeScript
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Relato = typeof relatos.$inferSelect;
export type NewRelato = typeof relatos.$inferInsert;

export type Eco = typeof ecos.$inferSelect;
export type NewEco = typeof ecos.$inferInsert;

export type Relatorio = typeof relatorios.$inferSelect;
export type NewRelatorio = typeof relatorios.$inferInsert;
