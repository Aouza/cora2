import { useState } from "react";

interface UseCheckoutReturn {
  isLoading: boolean;
  createCheckoutSession: (priceId: string, userData?: any) => Promise<void>;
}

export const useCheckout = (): UseCheckoutReturn => {
  const [isLoading, setIsLoading] = useState(false);

  const createCheckoutSession = async (priceId: string, userData?: any) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId, userData }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Erro no pagamento: ${errorData.details || errorData.error}`
        );
      }

      const result = await response.json();

      if (result.url) {
        window.location.href = result.url;
      } else {
        throw new Error("Erro na configuração do pagamento");
      }
    } catch (error) {
      console.error("Erro no checkout:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      alert(`Erro ao processar pagamento: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    createCheckoutSession,
  };
};
