"use client";

import Link from "next/link";
import { Sparkles, User, LogOut } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

export default function Header() {
  const { user, signOut, loading } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50 border-b border-slate-200/80">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex h-20 flex-col items-center justify-center text-center sm:h-16 sm:flex-row sm:justify-between">
          <Link href="/" className="text-2xl font-bold text-slate-900">
            Cora<span className="text-violet-600">.Deep</span>
          </Link>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-600">
              <Sparkles className="h-4 w-4 flex-shrink-0 text-violet-500" />
              <span>Hub emocional para reconstrução pós-término</span>
            </div>

            {loading ? (
              <div className="w-8 h-8 animate-spin rounded-full border-2 border-violet-200 border-t-violet-600"></div>
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {user.user_metadata?.avatar_url ? (
                    <img
                      src={user.user_metadata.avatar_url}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <span className="hidden sm:block text-sm font-medium text-gray-700">
                    {user.user_metadata?.full_name ||
                      user.user_metadata?.name ||
                      "Usuário"}
                  </span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="text-sm font-semibold text-violet-600 hover:text-violet-700 transition-colors"
              >
                Entrar
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Overlay para fechar menu */}
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </header>
  );
}
