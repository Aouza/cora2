import { useQuery } from "@tanstack/react-query";
import { useRelatos } from "./useRelatos";
import { useEcos } from "./useEcos";

export interface RelatoComEcos {
  id: string;
  texto: string;
  userId: string;
  createdAt: Date;
  timeAgo: string;
  reactions: {
    florescer: number;
    abraco: number;
    entendo: number;
  };
}

const formatTimeAgo = (date: Date) => {
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  );

  if (diffInHours < 1) {
    return "Agora mesmo";
  } else if (diffInHours < 24) {
    return `${diffInHours}h atrás`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d atrás`;
  }
};

export const useRelatosComEcos = () => {
  const {
    data: relatos,
    isLoading: relatosLoading,
    error: relatosError,
  } = useRelatos();
  const { data: ecos, isLoading: ecosLoading, error: ecosError } = useEcos();

  return useQuery({
    queryKey: ["relatos-com-ecos", relatos, ecos],
    queryFn: (): RelatoComEcos[] => {
      if (!relatos || !ecos) return [];

      return relatos.map((relato) => {
        const relatoEcos = ecos.filter((eco) => eco.relatoId === relato.id);

        const reactions = {
          florescer: relatoEcos.filter((eco) => eco.tipo === "florescer")
            .length,
          abraco: relatoEcos.filter((eco) => eco.tipo === "abraco").length,
          entendo: relatoEcos.filter((eco) => eco.tipo === "entendo").length,
        };

        return {
          ...relato,
          timeAgo: formatTimeAgo(new Date(relato.createdAt)),
          reactions,
        };
      });
    },
    enabled: !!relatos && !!ecos,
  });
};
