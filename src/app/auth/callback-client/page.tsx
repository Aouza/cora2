"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "../../../../lib/supabase";
import { Heart } from "lucide-react";

export default function AuthCallback() {
  const router = useRouter();
  const params = useSearchParams();
  const { user, loading } = useAuth();

  /**
   * 1.  Se a URL contém ?code=XYZ, trocamos por sessão.
   * 2.  Quando `useAuth` terminar de carregar, decidimos:
   *     - Sessão OK → verificar se é primeiro login
   *     - Sem sessão  → /login?error=...
   */
  useEffect(() => {
    // (1) troca código por sessão apenas uma vez
    const code = params.get("code");
    if (code) {
      supabase.auth
        .exchangeCodeForSession(code)
        .catch(() => router.replace("/login?error=oauth_callback"));

      return; // aguardamos `useAuth` atualizar user/loading
    }

    // (2) redirecionamento final baseado no status do perfil
    if (!loading && user) {
      checkFirstLoginAndRedirect();
    } else if (!loading && !user) {
      router.replace("/login?error=no_session");
    }
  }, [params, user, loading, router]);

  const checkFirstLoginAndRedirect = async () => {
    try {
      // Primeiro, garantir que o perfil existe e atualizar tracking
      const syncResponse = await fetch("/api/profiles/sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!syncResponse.ok) {
        console.error("Erro ao sincronizar perfil:", syncResponse.status);
        // Se não conseguir criar o perfil, redireciona para profile-setup
        router.replace("/profile-setup");
        return;
      }

      // Verificar se é primeiro login via API
      const firstLoginResponse = await fetch("/api/profiles/first-login-check");

      if (!firstLoginResponse.ok) {
        // Se não conseguir verificar, redireciona para profile-setup
        router.replace("/profile-setup");
        return;
      }

      const { isFirstLogin, reason } = await firstLoginResponse.json();

      console.log("🔍 [Callback] Verificação de primeiro login:", {
        isFirstLogin,
        reason,
      });

      if (isFirstLogin) {
        // Primeiro login, vai para profile-setup
        router.replace("/profile-setup");
      } else {
        // Usuário já existe, vai para dashboard
        router.replace("/dashboard");
      }
    } catch (error) {
      console.error("Erro no callback:", error);
      // Em caso de erro, redireciona para profile-setup
      router.replace("/profile-setup");
    }
  };

  // --- UI de loading ---
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 to-purple-50">
      <div className="text-center">
        <Heart className="w-16 h-16 mb-8 text-violet-600 animate-pulse" />
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Processando seu login…
        </h1>
        <p className="text-gray-600 mb-8">
          Aguarde enquanto verificamos sua conta.
        </p>
        <div className="flex gap-2 justify-center">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-violet-600 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.12}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
