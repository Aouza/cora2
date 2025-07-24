import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
  integer,
} from "drizzle-orm/pg-core";

// ========== TABELAS DE AUTENTICAÇÃO ==========

// Tabela de perfis (sync com Supabase Auth)
export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey(), // Referencia auth.users(id) do Supabase
  email: varchar("email", { length: 255 }).notNull().unique(),
  fullName: text("full_name"),
  avatarUrl: text("avatar_url"),
  // Campos de anonimato
  nickname: varchar("nickname", { length: 50 }),
  customAvatarUrl: text("custom_avatar_url"),
  useCustomAvatar: boolean("use_custom_avatar").default(false),
  profileCompleted: boolean("profile_completed").default(false),
  // Campos de tracking de primeiro login
  isFirstLogin: boolean("is_first_login").default(true),
  loginCount: integer("login_count").default(1),
  firstLoginAt: timestamp("first_login_at").defaultNow(),
  lastLoginAt: timestamp("last_login_at").defaultNow(),
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
