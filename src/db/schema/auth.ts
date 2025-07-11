import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";

// ========== TABELAS DE AUTENTICAÇÃO ==========

// Tabela de perfis (sync com Supabase Auth)
export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey(), // Referencia auth.users(id) do Supabase
  email: varchar("email", { length: 255 }).notNull().unique(),
  fullName: text("full_name"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tabela de usuários (mantida para compatibilidade com dados existentes)
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ========== TYPES ==========

export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
