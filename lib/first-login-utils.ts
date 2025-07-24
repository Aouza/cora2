import { db, profiles } from "../src/db";
import { eq } from "drizzle-orm";
import { withRetry } from "./db-wrapper";

/**
 * Detecta se é o primeiro login do usuário
 */
export async function detectFirstLogin(userId: string): Promise<{
  isFirstLogin: boolean;
  reason: string;
  profile?: any;
}> {
  try {
    const profile = await withRetry(
      () => db.select().from(profiles).where(eq(profiles.id, userId)).limit(1),
      `Detect first login for user: ${userId}`
    );

    if (profile.length === 0) {
      return {
        isFirstLogin: true,
        reason: "Perfil não encontrado",
      };
    }

    const userProfile = profile[0];
    const isFirstLogin = userProfile.isFirstLogin ?? true; // Garantir que seja boolean

    return {
      isFirstLogin,
      reason: isFirstLogin
        ? "Primeiro login detectado"
        : "Usuário já logou antes",
      profile: userProfile,
    };
  } catch (error) {
    console.error("❌ [First Login] Erro ao detectar primeiro login:", error);
    return {
      isFirstLogin: true,
      reason: "Erro ao verificar perfil",
    };
  }
}

/**
 * Atualiza o tracking de login do usuário
 */
export async function updateLoginTracking(userId: string): Promise<{
  success: boolean;
  isFirstLogin: boolean;
  loginCount: number;
}> {
  try {
    const profile = await withRetry(
      () => db.select().from(profiles).where(eq(profiles.id, userId)).limit(1),
      `Update login tracking for user: ${userId}`
    );

    if (profile.length === 0) {
      return {
        success: false,
        isFirstLogin: true,
        loginCount: 1,
      };
    }

    const userProfile = profile[0];
    const isFirstLogin = userProfile.isFirstLogin ?? true; // Garantir que seja boolean
    const newLoginCount = (userProfile.loginCount || 0) + 1;

    const updateData: any = {
      isFirstLogin: false,
      loginCount: newLoginCount,
      lastLoginAt: new Date(),
      updatedAt: new Date(),
    };

    if (isFirstLogin) {
      updateData.firstLoginAt = new Date();
    }

    await withRetry(
      () => db.update(profiles).set(updateData).where(eq(profiles.id, userId)),
      `Update login tracking data for user: ${userId}`
    );

    return {
      success: true,
      isFirstLogin,
      loginCount: newLoginCount,
    };
  } catch (error) {
    console.error(
      "❌ [First Login] Erro ao atualizar tracking de login:",
      error
    );
    return {
      success: false,
      isFirstLogin: true,
      loginCount: 1,
    };
  }
}

/**
 * Marca o perfil como completado (após setup)
 * ⚠️ USO APENAS NO SERVIDOR
 */
export async function markProfileCompleted(userId: string): Promise<{
  success: boolean;
}> {
  try {
    await db
      .update(profiles)
      .set({
        profileCompleted: true,
        isFirstLogin: false,
        updatedAt: new Date(),
      })
      .where(eq(profiles.id, userId));

    return { success: true };
  } catch (error) {
    console.error(
      "❌ [First Login] Erro ao marcar perfil como completado:",
      error
    );
    return { success: false };
  }
}
