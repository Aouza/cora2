import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";

interface Profile {
  id: string;
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
  nickname: string | null;
  customAvatarUrl: string | null;
  useCustomAvatar: boolean;
  profileCompleted: boolean;
  isFirstLogin: boolean;
  loginCount: number;
  firstLoginAt: string;
  lastLoginAt: string;
  createdAt: string;
  updatedAt: string;
}

export function useProfile() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async (): Promise<Profile | null> => {
      if (!user?.id) return null;

      const response = await fetch("/api/profiles/me");
      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }
      return response.json();
    },
    enabled: !!user?.id,
    staleTime: 30 * 1000, // 30 seconds (reduzido de 5 minutos)
    gcTime: 2 * 60 * 1000, // 2 minutes (reduzido de 10 minutos)
  });
}

export function useDisplayName() {
  const { user } = useAuth();
  const { data: profile } = useProfile();

  // Prioridade: nickname personalizado > nome do Google > email
  if (profile && profile.nickname) {
    return profile.nickname;
  }

  if (user?.user_metadata?.full_name || user?.user_metadata?.name) {
    return user.user_metadata.full_name || user.user_metadata.name;
  }

  if (user?.email) {
    return user.email.split("@")[0];
  }

  return "Usuário";
}

// Versão simplificada que não depende do React Query
export function getDisplayName(user: any): string {
  if (!user) return "Usuário";

  // Por enquanto, usar dados do Google até implementar busca do perfil
  if (user.user_metadata?.full_name || user.user_metadata?.name) {
    return user.user_metadata.full_name || user.user_metadata.name;
  }

  if (user.email) {
    return user.email.split("@")[0];
  }

  return "Usuário";
}
