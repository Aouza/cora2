import { db, profiles } from "../src/db";
import { eq } from "drizzle-orm";

export async function detectFirstLogin(userId: string): Promise<boolean> {
  try {
    const profile = await db
      .select()
      .from(profiles)
      .where(eq(profiles.id, userId))
      .limit(1);

    if (profile.length === 0) {
      return true; // Se não existe perfil, é primeiro login
    }

    const userProfile = profile[0];

    // Verificar se é realmente o primeiro login
    const isFirstLogin = userProfile.isFirstLogin ?? true;

    return isFirstLogin;
  } catch (error) {
    console.error("❌ [First Login] Erro ao detectar primeiro login:", error);
    return true; // Em caso de erro, assumir que é primeiro login
  }
}

export async function updateLoginTracking(userId: string): Promise<void> {
  try {
    const profile = await db
      .select()
      .from(profiles)
      .where(eq(profiles.id, userId))
      .limit(1);

    if (profile.length === 0) {
      console.warn(
        "⚠️ [First Login] Perfil não encontrado para atualizar tracking"
      );
      return;
    }

    const userProfile = profile[0];
    const isFirstLogin = userProfile.isFirstLogin ?? true;
    const currentLoginCount = userProfile.loginCount || 0;

    await db
      .update(profiles)
      .set({
        isFirstLogin: false, // Sempre marcar como não é mais primeiro login
        loginCount: currentLoginCount + 1,
        lastLoginAt: new Date(),
        ...(isFirstLogin && {
          firstLoginAt: new Date(), // Só atualizar se realmente for o primeiro
        }),
      })
      .where(eq(profiles.id, userId));

    console.log(`✅ [First Login] Tracking atualizado para usuário ${userId}`);
  } catch (error) {
    console.error("❌ [First Login] Erro ao atualizar tracking:", error);
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
