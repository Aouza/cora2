import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface RelatoEmocional {
  id: string;
  texto: string;
  userId: string;
  createdAt: Date;
}

export const useRelatos = () => {
  return useQuery({
    queryKey: ["relatos"],
    queryFn: async (): Promise<RelatoEmocional[]> => {
      const response = await fetch("/api/relatos");
      if (!response.ok) {
        throw new Error("Erro ao buscar relatos");
      }
      return response.json();
    },
  });
};

export const useCreateRelato = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (texto: string): Promise<RelatoEmocional> => {
      const response = await fetch("/api/relatos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ texto }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erro ao criar relato");
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidar cache para refazer as queries
      queryClient.invalidateQueries({ queryKey: ["relatos"] });
      queryClient.invalidateQueries({ queryKey: ["relatos-com-ecos"] });
    },
  });
};
