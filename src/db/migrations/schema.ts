import { pgTable, unique, uuid, varchar, timestamp, foreignKey, text, boolean, integer, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const tipoEco = pgEnum("tipo_eco", ['🌱', '🫂', '💧'])
export const tipoRelatorio = pgEnum("tipo_relatorio", ['basico', 'profundo', 'renascimento'])


export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	email: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("users_email_unique").on(table.email),
]);

export const relatos = pgTable("relatos", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	texto: text().notNull(),
	userId: uuid("user_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [profiles.id],
			name: "relatos_user_id_profiles_id_fk"
		}).onDelete("cascade"),
]);

export const relatorios = pgTable("relatorios", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	conteudo: text().notNull(),
	tipo: tipoRelatorio().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [profiles.id],
			name: "relatorios_user_id_profiles_id_fk"
		}).onDelete("cascade"),
]);

export const ecos = pgTable("ecos", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	relatoId: uuid("relato_id").notNull(),
	tipo: tipoEco().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.relatoId],
			foreignColumns: [relatos.id],
			name: "ecos_relato_id_relatos_id_fk"
		}).onDelete("cascade"),
]);

export const profiles = pgTable("profiles", {
	id: uuid().primaryKey().notNull(),
	email: varchar({ length: 255 }).notNull(),
	fullName: text("full_name"),
	avatarUrl: text("avatar_url"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	nickname: varchar({ length: 50 }),
	customAvatarUrl: text("custom_avatar_url"),
	useCustomAvatar: boolean("use_custom_avatar").default(false),
	profileCompleted: boolean("profile_completed").default(false),
	isFirstLogin: boolean("is_first_login").default(true),
	loginCount: integer("login_count").default(1),
	firstLoginAt: timestamp("first_login_at", { mode: 'string' }).defaultNow(),
	lastLoginAt: timestamp("last_login_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	unique("profiles_email_unique").on(table.email),
]);
