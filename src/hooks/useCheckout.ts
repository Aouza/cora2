import { useState } from "react";

interface UseCheckoutReturn {
  isLoading: boolean;
  createCheckoutSession: (priceId: string) => Promise<void>;
}

export const useCheckout = (): UseCheckoutReturn => {
  const [isLoading, setIsLoading] = useState(false);

  const createCheckoutSession = async (priceId: string) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId }),
      });

      const { url } = await response.json();

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Erro ao criar sessão de checkout:", error);
      alert("Erro ao processar pagamento. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    createCheckoutSession,
  };
};
