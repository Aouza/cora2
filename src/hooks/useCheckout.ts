import { useState } from "react";

interface UseCheckoutReturn {
  isLoading: boolean;
  createCheckoutSession: (priceId: string, userData?: any) => Promise<void>;
}

export const useCheckout = (): UseCheckoutReturn => {
  const [isLoading, setIsLoading] = useState(false);

  const createCheckoutSession = async (priceId: string, userData?: any) => {
    setIsLoading(true);
    console.log("🔄 Hook: Criando checkout session...");

    try {
      console.log("📡 Fazendo requisição para /api/checkout");
      console.log("📦 Payload:", { priceId, userData });

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId, userData }),
      });

      console.log("📨 Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ API Error Details:", errorData);
        throw new Error(
          `API Error: ${response.status} - ${errorData.details || errorData.error}`
        );
      }

      const result = await response.json();
      console.log("📋 Response data:", result);

      if (result.url) {
        console.log("🔗 Redirecionando para:", result.url);
        window.location.href = result.url;
      } else {
        console.error("❌ URL do checkout não encontrada na resposta");
        throw new Error("URL do checkout não foi retornada");
      }
    } catch (error) {
      console.error("❌ Erro ao criar sessão de checkout:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      alert(
        `❌ Erro ao processar pagamento:\n\n${errorMessage}\n\nVerifique o console para mais detalhes.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    createCheckoutSession,
  };
};
