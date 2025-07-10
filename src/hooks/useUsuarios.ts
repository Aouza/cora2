import { useQuery } from "@tanstack/react-query";

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  avatarUrl: string | null;
  createdAt: Date;
}

export const useUsuarios = () => {
  return useQuery({
    queryKey: ["usuarios"],
    queryFn: async (): Promise<Usuario[]> => {
      const response = await fetch("/api/usuarios");
      if (!response.ok) {
        throw new Error("Erro ao buscar usuários");
      }
      return response.json();
    },
  });
};
