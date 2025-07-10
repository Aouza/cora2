import { useQuery } from "@tanstack/react-query";

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
