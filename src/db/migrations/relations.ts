import { relations } from "drizzle-orm/relations";
import { profiles, relatos, relatorios, ecos } from "./schema";

export const relatosRelations = relations(relatos, ({one, many}) => ({
	profile: one(profiles, {
		fields: [relatos.userId],
		references: [profiles.id]
	}),
	ecos: many(ecos),
}));

export const profilesRelations = relations(profiles, ({many}) => ({
	relatos: many(relatos),
	relatorios: many(relatorios),
}));

export const relatoriosRelations = relations(relatorios, ({one}) => ({
	profile: one(profiles, {
		fields: [relatorios.userId],
		references: [profiles.id]
	}),
}));

export const ecosRelations = relations(ecos, ({one}) => ({
	relato: one(relatos, {
		fields: [ecos.relatoId],
		references: [relatos.id]
	}),
}));