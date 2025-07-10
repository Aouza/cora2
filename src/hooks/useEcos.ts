import { useQuery } from "@tanstack/react-query";

export interface Eco {
  id: string;
  tipo: "florescer" | "abraco" | "entendo";
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
