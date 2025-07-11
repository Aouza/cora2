import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface Eco {
  id: string;
  tipo: "🌱" | "🫂" | "💧";
  relatoId: string;
  createdAt: Date;
}

export const useEcos = () => {
  return useQuery({
    queryKey: ["ecos"],
    queryFn: async (): Promise<Eco[]> => {
      const response = await fetch("/api/ecos");
      if (!response.ok) {
        throw new Error("Erro ao buscar ecos");
      }
      return response.json();
    },
  });
};

export const useCreateEco = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      relatoId,
      tipo,
    }: {
      relatoId: string;
      tipo: string;
    }): Promise<Eco> => {
      const response = await fetch("/api/ecos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ relatoId, tipo }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erro ao criar eco");
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidar cache para refazer as queries
      queryClient.invalidateQueries({ queryKey: ["ecos"] });
      queryClient.invalidateQueries({ queryKey: ["relatos-com-ecos"] });
    },
  });
};
