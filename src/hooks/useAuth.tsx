"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (p: "google" | "facebook") => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true); // começa true

  console.log({ session: "JULIANO" });

  // -------- boot + listener --------
  useEffect(() => {
    let active = true;
    console.log({ active: "JULIANO" });
    const boot = async () => {
      try {
        console.log({ boot: "JULIANO" });
        const { data, error } = await supabase.auth
          .getSession()
          .then(({ data, error }) => {
            console.log({ data: "ALISON" });
            return { data, error };
          })
          .catch((e) => {
            console.log({ e: "ALISON" });
            return { data: null, error: e };
          });

        console.log({ data: "ALISON" });
        if (!active) return;
        if (error) console.error("getSession error:", error);
        setSession(data?.session ?? null);
      } catch (e) {
        console.error("getSession threw:", e);
      } finally {
        if (active) setLoading(false);
      }
    };

    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) =>
      setSession(sess)
    );

    boot();
    return () => {
      active = false;
      sub.subscription?.unsubscribe();
    };
  }, []);

  // -------- helpers --------
  const user = session?.user ?? null;

  const signIn = async (provider: "google" | "facebook") => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${location.origin}/auth/callback` },
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut({ scope: "global" });
    setSession(null);
  };

  // -------- profile sync --------
  useEffect(() => {
    if (!user) return;
    (async () => {
      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        email: user.email!,
        full_name:
          user.user_metadata.full_name || user.user_metadata.name || null,
        avatar_url: user.user_metadata.avatar_url || null,
        updated_at: new Date().toISOString(),
      });
      if (error) console.error("syncProfile error:", error);
    })();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
