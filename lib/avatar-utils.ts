import type { User } from "@supabase/supabase-js";

// ========== TYPES ==========

export interface UserDisplayInfo {
  name: string;
  initials: string;
  avatarUrl: string | null;
  email: string | null;
}

// ========== AVATAR URL UTILITIES ==========

/**
 * Corrige URLs de avatar do Google que podem ter parâmetros conflitantes
 * Problema: URLs como "...=s96-c?s=64" (dois parâmetros ?)
 * Solução: Limpar e aplicar tamanho correto
 */
export function getFixedAvatarUrl(
  avatarUrl: string | null | undefined,
  size: number = 64
): string | null {
  if (!avatarUrl) return null;

  try {
    // Se é URL do Google Photos, aplicar correções específicas
    if (avatarUrl.includes("googleusercontent.com")) {
      // Remover parâmetros de tamanho conflitantes
      const baseUrl =
        avatarUrl.split("=s")[0] +
        "=s" +
        avatarUrl.split("=s")[1]?.split("?")[0]?.split("&")[0];

      // Aplicar novo tamanho (retina-ready)
      return `${baseUrl.split("=s")[0]}=s${size * 2}-c`;
    }

    // Para outras URLs, retornar como está
    return avatarUrl;
  } catch (error) {
    console.warn("Erro ao processar avatar URL:", error);
    return avatarUrl;
  }
}

/**
 * Gera iniciais inteligentes baseadas no nome do usuário
 * Prioridade: full_name > name > email
 */
export function generateUserInitials(user: User | null): string {
  if (!user) return "U";

  // Tentar extrair do user_metadata
  const fullName = user.user_metadata?.full_name || user.user_metadata?.name;
  const email = user.email;

  if (fullName) {
    // Se tem nome completo, pegar primeira letra de cada palavra
    const words = fullName.trim().split(/\s+/);
    if (words.length >= 2) {
      return (words[0][0] + words[words.length - 1][0]).toUpperCase();
    }
    // Se só tem uma palavra, pegar primeiras duas letras
    if (words[0].length >= 2) {
      return words[0].substring(0, 2).toUpperCase();
    }
    return words[0][0].toUpperCase();
  }

  if (email) {
    // Se só tem email, pegar as duas primeiras letras antes do @
    const emailPrefix = email.split("@")[0];
    if (emailPrefix.length >= 2) {
      return emailPrefix.substring(0, 2).toUpperCase();
    }
    return emailPrefix[0].toUpperCase();
  }

  return "U";
}

/**
 * Extrai o nome de exibição do usuário
 * Prioridade: full_name > name > email (sem domínio)
 */
export function getUserDisplayName(user: User | null): string {
  if (!user) return "Usuário";

  const fullName = user.user_metadata?.full_name || user.user_metadata?.name;
  if (fullName) return fullName;

  if (user.email) {
    // Retornar parte antes do @ como nome
    return user.email.split("@")[0];
  }

  return "Usuário";
}

/**
 * Extrai todas as informações de exibição do usuário
 */
export function getUserDisplayInfo(user: User | null): UserDisplayInfo {
  return {
    name: getUserDisplayName(user),
    initials: generateUserInitials(user),
    avatarUrl: getFixedAvatarUrl(user?.user_metadata?.avatar_url),
    email: user?.email || null,
  };
}

// ========== DEBUGGING UTILITIES ==========

/**
 * Debug completo dos dados do usuário (usar apenas em desenvolvimento)
 */
export function debugUserData(user: User | null, context: string = "") {
  if (process.env.NODE_ENV !== "development") return;

  console.group(`🔍 Debug User Data ${context ? `(${context})` : ""}`);

  if (!user) {
    console.log("❌ User is null");
    console.groupEnd();
    return;
  }

  console.log("📧 Email:", user.email);
  console.log("🏷️ User ID:", user.id);
  console.log("📊 User Metadata:", user.user_metadata);

  const displayInfo = getUserDisplayInfo(user);
  console.log("👤 Display Info:", displayInfo);

  // Test avatar URL
  const originalAvatar = user.user_metadata?.avatar_url;
  const fixedAvatar = getFixedAvatarUrl(originalAvatar);

  if (originalAvatar !== fixedAvatar) {
    console.log("🔧 Avatar URL Fixed:");
    console.log("   Original:", originalAvatar);
    console.log("   Fixed:", fixedAvatar);
  } else {
    console.log("✅ Avatar URL:", originalAvatar);
  }

  console.groupEnd();
}

// ========== VALIDATION UTILITIES ==========

/**
 * Verifica se uma URL de avatar é válida e acessível
 */
export function isValidAvatarUrl(url: string | null | undefined): boolean {
  if (!url) return false;

  try {
    const parsed = new URL(url);
    return ["http:", "https:"].includes(parsed.protocol);
  } catch {
    return false;
  }
}

/**
 * Determina se deve tentar mostrar avatar ou ir direto para iniciais
 */
export function shouldShowAvatar(user: User | null): boolean {
  if (!user) return false;

  const avatarUrl = user.user_metadata?.avatar_url;
  return isValidAvatarUrl(avatarUrl);
}
