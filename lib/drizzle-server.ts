// Este arquivo só deve ser usado no servidor (API routes, Server Components)
// Nunca importar no lado cliente!

import { db, profiles } from "../src/db";
import { eq } from "drizzle-orm";
import type { User } from "@supabase/supabase-js";
import { getFixedAvatarUrl } from "./avatar-utils";

export interface ProfileData {
  id: string;
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Sincroniza perfil do usuário Supabase Auth com tabela profiles via Drizzle
 * ⚠️ USO APENAS NO SERVIDOR - API routes, Server Components
 */
export async function syncUserProfileWithDrizzle(user: User) {
  try {
    // Verificar se já existe um perfil com este ID
    const existingProfileById = await db
      .select()
      .from(profiles)
      .where(eq(profiles.id, user.id))
      .limit(1);

    // Verificar se já existe um perfil com este email
    const existingProfileByEmail = await db
      .select()
      .from(profiles)
      .where(eq(profiles.email, user.email!))
      .limit(1);

    let result;

    if (existingProfileById.length > 0) {
      // Perfil existe com este ID, atualizar
      result = await db
        .update(profiles)
        .set({
          email: user.email!,
          fullName:
            user.user_metadata?.full_name || user.user_metadata?.name || null,
          avatarUrl: getFixedAvatarUrl(user.user_metadata?.avatar_url),
          updatedAt: new Date(),
        })
        .where(eq(profiles.id, user.id))
        .returning();
    } else if (existingProfileByEmail.length > 0) {
      // Perfil existe com este email mas ID diferente, atualizar o ID
      result = await db
        .update(profiles)
        .set({
          id: user.id,
          fullName:
            user.user_metadata?.full_name || user.user_metadata?.name || null,
          avatarUrl: getFixedAvatarUrl(user.user_metadata?.avatar_url),
          updatedAt: new Date(),
        })
        .where(eq(profiles.email, user.email!))
        .returning();
    } else {
      // Perfil não existe, criar novo
      result = await db
        .insert(profiles)
        .values({
          id: user.id,
          email: user.email!,
          fullName:
            user.user_metadata?.full_name || user.user_metadata?.name || null,
          avatarUrl: getFixedAvatarUrl(user.user_metadata?.avatar_url),
          nickname: null,
          customAvatarUrl: null,
          useCustomAvatar: false,
          profileCompleted: false,
          isFirstLogin: true,
          loginCount: 1,
          firstLoginAt: new Date(),
          lastLoginAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();
    }

    return result[0];
  } catch (error) {
    console.error("❌ [Drizzle] Erro na sincronização:", error);
    throw error;
  }
}

/**
 * Busca perfil por ID
 */
export async function getProfileById(userId: string) {
  try {
    const result = await db
      .select()
      .from(profiles)
      .where(eq(profiles.id, userId))
      .limit(1);

    return result[0] || null;
  } catch (error) {
    console.error("❌ [Drizzle] Erro ao buscar perfil:", error);
    throw error;
  }
}

/**
 * Busca todos os perfis
 */
export async function getAllProfiles() {
  try {
    const result = await db.select().from(profiles).orderBy(profiles.createdAt);

    return result;
  } catch (error) {
    console.error("❌ [Drizzle] Erro ao buscar todos os perfis:", error);
    throw error;
  }
}
