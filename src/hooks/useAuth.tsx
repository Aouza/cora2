"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";
import { debugUserData, getFixedAvatarUrl } from "../../lib/avatar-utils";

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
    // Obter sessão inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      // Debug inicial
      if (session?.user) {
        debugUserData(session.user, "useAuth initial session");
      }
    });

    // Escutar mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      // Debug das mudanças
      if (session?.user) {
        debugUserData(session.user, `useAuth ${event}`);
      }

      // Criar/atualizar perfil do usuário quando fizer login
      if (event === "SIGNED_IN" && session?.user) {
        try {
          // Usar Supabase diretamente (client-side)
          const { error } = await supabase.from("profiles").upsert({
            id: session.user.id,
            email: session.user.email!,
            full_name:
              session.user.user_metadata.full_name ||
              session.user.user_metadata.name ||
              null,
            avatar_url: getFixedAvatarUrl(
              session.user.user_metadata.avatar_url
            ),
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
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (provider: "google" | "facebook") => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
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
      if (error) throw error;
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
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
