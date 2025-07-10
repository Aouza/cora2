"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Heart } from "lucide-react";

export default function AuthCallbackClient() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log("🔍 Processando callback do cliente...");

        // Verificar se há fragmentos na URL (tokens do Implicit Flow)
        const hashParams = new URLSearchParams(
          window.location.hash.substring(1)
        );
        const accessToken = hashParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token");

        if (accessToken) {
          console.log(
            "✅ Token encontrado na URL, processando Implicit Flow..."
          );

          // Limpar URL removendo os tokens
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );

          // Aguardar um pouco para o useAuth processar
          setTimeout(() => {
            if (!loading && user) {
              console.log("✅ Sessão criada com sucesso:", user.email);
              router.push("/dashboard");
            } else if (!loading && !user) {
              console.error("❌ Falha ao processar sessão");
              router.push("/login?error=session_failed");
            }
          }, 1000);

          return;
        }

        // Se não há tokens na URL, verificar se já há sessão
        if (!loading && user) {
          console.log("✅ Sessão já existente encontrada:", user.email);
          router.push("/dashboard");
          return;
        }

        // Se não está carregando e não há usuário, algo deu errado
        if (!loading && !user) {
          console.error("❌ Não foi possível processar callback do cliente");
          router.push("/login?error=client_callback_failed");
        }
      } catch (error) {
        console.error("❌ Erro no callback do cliente:", error);
        router.push("/login?error=client_callback_error");
      }
    };

    // Aguardar um pouco para garantir que a URL foi totalmente carregada
    const timer = setTimeout(handleAuthCallback, 100);

    return () => clearTimeout(timer);
  }, [router, user, loading]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center mb-8">
          <Heart className="w-16 h-16 text-violet-600 animate-pulse" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Processando seu login...
        </h1>

        <p className="text-gray-600 mb-8">
          Aguarde enquanto finalizamos sua autenticação
        </p>

        <div className="flex items-center justify-center space-x-2">
          <div className="w-3 h-3 bg-violet-600 rounded-full animate-bounce"></div>
          <div
            className="w-3 h-3 bg-violet-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-3 h-3 bg-violet-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
