"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (provider: "google" | "facebook") => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Obter sessão inicial
    const getInitialSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (!mounted) return;

        if (error) {
          console.error("❌ Erro ao obter sessão:", error);
          setLoading(false);
          return;
        }

        console.log("🔍 Sessão inicial obtida:", {
          hasSession: !!session,
          hasUser: !!session?.user,
        });

        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      } catch (error) {
        console.error("❌ Erro crítico ao obter sessão:", error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    getInitialSession();

    // Escutar mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      console.log("🔄 Auth state changed:", event, {
        hasSession: !!session,
        hasUser: !!session?.user,
      });

      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      // Criar/atualizar perfil do usuário quando fizer login
      if (event === "SIGNED_IN" && session?.user) {
        try {
          const { error } = await supabase.from("profiles").upsert({
            id: session.user.id,
            email: session.user.email!,
            full_name:
              session.user.user_metadata.full_name ||
              session.user.user_metadata.name ||
              null,
            avatar_url: session.user.user_metadata.avatar_url || null,
            updated_at: new Date().toISOString(),
          });

          if (error) {
            console.error("❌ Erro ao salvar perfil:", error);
          } else {
            console.log("✅ Perfil salvo com sucesso no Supabase");
          }
        } catch (error) {
          console.error("❌ Erro ao sincronizar perfil:", error);
        }
      }

      // Log quando o usuário faz logout
      if (event === "SIGNED_OUT") {
        console.log("✅ Usuário deslogado com sucesso");
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (provider: "google" | "facebook") => {
    try {
      console.log("🔄 Iniciando login com", provider);
      console.log(
        "🔗 Redirect URL será:",
        `${window.location.origin}/auth/callback`
      );

      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          scopes:
            provider === "google"
              ? "openid email profile https://www.googleapis.com/auth/userinfo.profile"
              : undefined,
          queryParams:
            provider === "google"
              ? {
                  access_type: "offline",
                  prompt: "consent",
                }
              : undefined,
        },
      });

      if (error) {
        console.error("❌ Erro no signInWithOAuth:", error);
        throw error;
      }

      console.log("✅ SignInWithOAuth executado, redirecionando...");
    } catch (error) {
      console.error("❌ Error signing in:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      console.log("🔄 Iniciando logout...");

      // Verificar se há sessão antes de tentar logout
      const {
        data: { session: currentSession },
      } = await supabase.auth.getSession();

      if (currentSession) {
        // Se há sessão, fazer logout normal
        console.log("📤 Sessão encontrada, fazendo logout...");
        const { error } = await supabase.auth.signOut({ scope: "global" });

        if (error) {
          // Se o erro for de sessão faltando, não é crítico
          if (
            error.message?.includes("Auth session missing") ||
            error.message?.includes("session missing")
          ) {
            console.log("⚠️ Sessão já expirada, limpando estado local");
          } else {
            console.error("❌ Erro no signOut:", error);
            throw error;
          }
        }
      } else {
        console.log(
          "⚠️ Nenhuma sessão ativa encontrada, limpando estado local"
        );
      }

      console.log("✅ SignOut executado com sucesso");

      // Sempre limpar estado local, independente do resultado do logout
      setUser(null);
      setSession(null);

      // Limpar qualquer storage local do Supabase
      if (typeof window !== "undefined") {
        localStorage.removeItem("supabase.auth.token");
        sessionStorage.removeItem("supabase.auth.token");
      }
    } catch (error) {
      console.error("❌ Erro inesperado no logout:", error);

      // Mesmo com erro, limpar estado local para garantir logout
      console.log("🧹 Limpando estado local mesmo com erro");
      setUser(null);
      setSession(null);

      // Não fazer throw do erro para não bloquear o logout
      // O usuário deve conseguir sair mesmo se houver erro no servidor
    }
  };

  const contextValue: AuthContextType = {
    user,
    session,
    loading,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
