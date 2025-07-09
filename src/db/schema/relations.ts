import { relations } from "drizzle-orm";
import { profiles, users } from "./auth";
import { relatos, ecos } from "./relatos";
import { relatorios } from "./relatorios";

// ========== RELACIONAMENTOS ==========

// Relações dos perfis
export const profilesRelations = relations(profiles, ({ many }) => ({
  relatos: many(relatos),
  relatorios: many(relatorios),
}));

// Relações dos usuários (legacy)
export const usersRelations = relations(users, ({ many }) => ({
  // Relações vazias para compatibilidade
}));

export const relatosRelations = relations(relatos, ({ one, many }) => ({
  user: one(profiles, {
    fields: [relatos.userId],
    references: [profiles.id],
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
  user: one(profiles, {
    fields: [relatorios.userId],
    references: [profiles.id],
  }),
}));
