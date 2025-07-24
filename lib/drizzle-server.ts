// Este arquivo só deve ser usado no servidor (API routes, Server Components)
// Nunca importar no lado cliente!

import { db, profiles } from "../src/db";
import { eq } from "drizzle-orm";
import type { User } from "@supabase/supabase-js";
import { getFixedAvatarUrl } from "./avatar-utils";
import { withRetry } from "./db-wrapper";

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
export async function syncUserProfileWithDrizzle(user: User): Promise<{
  success: boolean;
  profile?: any;
  error?: string;
}> {
  try {
    // Preparar dados do perfil
    const profileData = {
      id: user.id,
      email: user.email!,
      fullName: user.user_metadata.full_name || user.user_metadata.name || null,
      avatarUrl: getFixedAvatarUrl(user.user_metadata.avatar_url),
      // Campos de anonimato com valores default
      nickname: null,
      customAvatarUrl: null,
      useCustomAvatar: false,
      profileCompleted: false,
      // Campos de tracking de primeiro login
      isFirstLogin: true,
      loginCount: 1,
      firstLoginAt: new Date(),
      lastLoginAt: new Date(),
      updatedAt: new Date(),
    };

    // Verificar se perfil já existe por ID com retry
    const existingProfileById = await withRetry(
      () => db.select().from(profiles).where(eq(profiles.id, user.id)).limit(1),
      `SELECT profile by ID: ${user.id}`
    );

    // Verificar se perfil já existe por email com retry
    const existingProfileByEmail = await withRetry(
      () =>
        db
          .select()
          .from(profiles)
          .where(eq(profiles.email, user.email!))
          .limit(1),
      `SELECT profile by email: ${user.email}`
    );

    let result;

    if (existingProfileById.length > 0) {
      // Perfil existe com o ID correto
      const currentProfile = existingProfileById[0];

      // Verificar se há mudanças reais antes de atualizar
      const hasChanges =
        currentProfile.email !== profileData.email ||
        currentProfile.fullName !== profileData.fullName ||
        currentProfile.avatarUrl !== profileData.avatarUrl;

      if (hasChanges) {
        // Atualizar perfil existente apenas se houver mudanças
        result = await withRetry(
          () =>
            db
              .update(profiles)
              .set({
                email: profileData.email,
                fullName: profileData.fullName,
                avatarUrl: profileData.avatarUrl,
                updatedAt: profileData.updatedAt,
              })
              .where(eq(profiles.id, user.id))
              .returning(),
          `UPDATE profile: ${user.id}`
        );

        console.log("✅ [Drizzle] Perfil atualizado:", result[0]);
      } else {
        // Nenhuma mudança, retornar perfil existente
        result = [currentProfile];
        console.log(
          "✅ [Drizzle] Perfil já está atualizado, nenhuma mudança necessária"
        );
      }
    } else if (existingProfileByEmail.length > 0) {
      // Perfil existe com email mas ID diferente - ATUALIZAR o ID
      const currentProfile = existingProfileByEmail[0];

      console.log(
        "⚠️ [Drizzle] Perfil encontrado por email com ID diferente:",
        {
          existingId: currentProfile.id,
          newId: user.id,
          email: user.email,
        }
      );

      result = await withRetry(
        () =>
          db
            .update(profiles)
            .set({
              id: user.id,
              fullName: profileData.fullName,
              avatarUrl: profileData.avatarUrl,
              updatedAt: profileData.updatedAt,
            })
            .where(eq(profiles.email, user.email!))
            .returning(),
        `UPDATE profile ID: ${currentProfile.id} -> ${user.id}`
      );

      console.log("✅ [Drizzle] ID do perfil atualizado:", result[0]);
    } else {
      // Perfil não existe, criar novo
      result = await withRetry(
        () => db.insert(profiles).values(profileData).returning(),
        `INSERT new profile: ${user.id}`
      );

      console.log("✅ [Drizzle] Novo perfil criado:", result[0]);
    }

    return { success: true, profile: result[0] };
  } catch (error) {
    console.error("❌ [Drizzle] Erro na sincronização:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

/**
 * Busca perfil por ID com retry logic
 */
export async function getProfileById(userId: string) {
  try {
    const result = await withRetry(
      () => db.select().from(profiles).where(eq(profiles.id, userId)).limit(1),
      `GET profile by ID: ${userId}`
    );

    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("❌ [Drizzle] Erro ao buscar perfil por ID:", error);
    return null;
  }
}

/**
 * Busca todos os perfis com retry logic
 */
export async function getAllProfiles() {
  try {
    return await withRetry(
      () => db.select().from(profiles),
      "GET all profiles"
    );
  } catch (error) {
    console.error("❌ [Drizzle] Erro ao buscar todos os perfis:", error);
    return [];
  }
}
