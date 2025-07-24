import { db, profiles } from "../src/db";
import { eq } from "drizzle-orm";

/**
 * Detecta se é o primeiro login do usuário
 * ⚠️ USO APENAS NO SERVIDOR
 */
export async function detectFirstLogin(userId: string): Promise<{
  isFirstLogin: boolean;
  profile?: any;
  reason: string;
}> {
  try {
    const profile = await db
      .select()
      .from(profiles)
      .where(eq(profiles.id, userId))
      .limit(1);

    if (profile.length === 0) {
      return {
        isFirstLogin: true,
        reason: "Perfil não existe - primeiro login",
      };
    }

    const userProfile = profile[0];

    // Verificar múltiplos critérios
    const checks = {
      isFirstLoginFlag: userProfile.isFirstLogin === true,
      profileNotCompleted: userProfile.profileCompleted === false,
      noNickname: !userProfile.nickname || userProfile.nickname.trim() === "",
      loginCountOne: userProfile.loginCount === 1,
      sameTimestamps:
        userProfile.createdAt.getTime() === userProfile.updatedAt.getTime(),
    };

    // Se qualquer critério indica primeiro login
    const isFirstLogin = Object.values(checks).some((check) => check);

    return {
      isFirstLogin,
      profile: userProfile,
      reason: isFirstLogin
        ? `Primeiro login detectado: ${Object.entries(checks)
            .filter(([_, value]) => value)
            .map(([key]) => key)
            .join(", ")}`
        : "Usuário já possui conta ativa",
    };
  } catch (error) {
    console.error("❌ [First Login] Erro ao detectar primeiro login:", error);
    return {
      isFirstLogin: true,
      reason: "Erro na verificação - assumindo primeiro login",
    };
  }
}

/**
 * Atualiza o tracking de login do usuário
 * ⚠️ USO APENAS NO SERVIDOR
 */
export async function updateLoginTracking(userId: string): Promise<{
  success: boolean;
  isFirstLogin: boolean;
  loginCount: number;
}> {
  try {
    const profile = await db
      .select()
      .from(profiles)
      .where(eq(profiles.id, userId))
      .limit(1);

    if (profile.length === 0) {
      return {
        success: false,
        isFirstLogin: true,
        loginCount: 1,
      };
    }

    const userProfile = profile[0];
    const isFirstLogin = userProfile.isFirstLogin;
    const newLoginCount = (userProfile.loginCount || 0) + 1;

    // Atualizar tracking de login
    const updateData: any = {
      isFirstLogin: false, // Sempre false após primeiro login
      loginCount: newLoginCount,
      lastLoginAt: new Date(),
      updatedAt: new Date(),
    };

    // Se é primeiro login, atualizar firstLoginAt
    if (isFirstLogin) {
      updateData.firstLoginAt = new Date();
    }

    await db.update(profiles).set(updateData).where(eq(profiles.id, userId));

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
