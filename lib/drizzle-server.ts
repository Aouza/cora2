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
      updatedAt: new Date(),
    };

    // Verificar se perfil já existe
    const existingProfile = await db
      .select()
      .from(profiles)
      .where(eq(profiles.id, user.id))
      .limit(1);

    let result;

    if (existingProfile.length > 0) {
      const currentProfile = existingProfile[0];

      // Verificar se há mudanças reais antes de atualizar
      const hasChanges =
        currentProfile.email !== profileData.email ||
        currentProfile.fullName !== profileData.fullName ||
        currentProfile.avatarUrl !== profileData.avatarUrl;

      if (hasChanges) {
        // Atualizar perfil existente apenas se houver mudanças
        result = await db
          .update(profiles)
          .set({
            email: profileData.email,
            fullName: profileData.fullName,
            avatarUrl: profileData.avatarUrl,
            updatedAt: profileData.updatedAt,
          })
          .where(eq(profiles.id, user.id))
          .returning();

        console.log("✅ [Drizzle] Perfil atualizado:", result[0]);
      } else {
        // Nenhuma mudança, retornar perfil existente
        result = [currentProfile];
        console.log(
          "✅ [Drizzle] Perfil já está atualizado, nenhuma mudança necessária"
        );
      }
    } else {
      // Criar novo perfil
      result = await db.insert(profiles).values(profileData).returning();

      console.log("✅ [Drizzle] Novo perfil criado:", result[0]);
    }

    return {
      success: true,
      profile: result[0],
    };
  } catch (error) {
    console.error("❌ [Drizzle] Erro na sincronização:", error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

/**
 * Busca perfil por ID via Drizzle
 * ⚠️ USO APENAS NO SERVIDOR
 */
export async function getProfileById(userId: string) {
  try {
    const profile = await db
      .select()
      .from(profiles)
      .where(eq(profiles.id, userId))
      .limit(1);

    return profile[0] || null;
  } catch (error) {
    console.error("❌ [Drizzle] Erro ao buscar perfil:", error);
    return null;
  }
}

/**
 * Lista todos os perfis (para admin)
 * ⚠️ USO APENAS NO SERVIDOR
 */
export async function getAllProfiles() {
  try {
    return await db.select().from(profiles);
  } catch (error) {
    console.error("❌ [Drizzle] Erro ao listar perfis:", error);
    return [];
  }
}
