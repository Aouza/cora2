import { useQuery } from "@tanstack/react-query";
import { useRelatos } from "./useRelatos";
import { useEcos } from "./useEcos";
import { useUsuarios } from "./useUsuarios";

export interface Estatisticas {
  totalUsuarios: number;
  totalRelatos: number;
  totalEcos: number;
  relatosRecentes: number;
  ecosPorTipo: {
    florescer: number;
    abraco: number;
    entendo: number;
  };
}

export const useEstatisticas = () => {
  const { data: relatos } = useRelatos();
  const { data: ecos } = useEcos();
  const { data: usuarios } = useUsuarios();

  return useQuery({
    queryKey: ["estatisticas", relatos, ecos, usuarios],
    queryFn: (): Estatisticas => {
      if (!relatos || !ecos || !usuarios) {
        return {
          totalUsuarios: 0,
          totalRelatos: 0,
          totalEcos: 0,
          relatosRecentes: 0,
          ecosPorTipo: {
            florescer: 0,
            abraco: 0,
            entendo: 0,
          },
        };
      }

      // Relatos dos últimos 7 dias
      const seteDiasAtras = new Date();
      seteDiasAtras.setDate(seteDiasAtras.getDate() - 7);

      const relatosRecentes = relatos.filter(
        (relato) => new Date(relato.createdAt) > seteDiasAtras
      ).length;

      const ecosPorTipo = {
        florescer: ecos.filter((eco) => eco.tipo === "🌱").length,
        abraco: ecos.filter((eco) => eco.tipo === "🫂").length,
        entendo: ecos.filter((eco) => eco.tipo === "💧").length,
      };

      return {
        totalUsuarios: usuarios.length,
        totalRelatos: relatos.length,
        totalEcos: ecos.length,
        relatosRecentes,
        ecosPorTipo,
      };
    },
    enabled: !!relatos && !!ecos && !!usuarios,
  });
};
