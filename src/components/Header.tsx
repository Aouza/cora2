"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Settings, LogOut, Heart } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Avatar from "./Avatar";

export default function Header() {
  const { user, loading, signOut } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isUserMenuOpen]);

  // Função para obter nome de exibição
  const getDisplayName = (user: any) => {
    if (!user) return "Usuário";
    return (
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      user.email?.split("@")[0] ||
      "Usuário"
    );
  };

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signOut();
    } catch (error) {
      console.error("❌ Erro no logout:", error);
    } finally {
      setIsSigningOut(false);
      router.push("/");
    }
  };

  const displayName = getDisplayName(user);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">
              <Heart className="w-6 h-6 text-violet-600" />
              <span>Cora.Deep</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/mural"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Mural Vivo
            </Link>
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {loading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
            ) : user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-3 p-2 rounded-full hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  {/* Avatar */}
                  <Avatar user={user} size="sm" showDebug={false} />

                  {/* Nome do usuário (apenas em telas maiores) */}
                  <div className="hidden md:block">
                    <p className="text-sm font-medium text-gray-900">
                      {displayName}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {displayName}
                      </p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>

                    <Link
                      href="/dashboard/perfil"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User className="w-4 h-4 mr-3" />
                      Perfil
                    </Link>

                    <Link
                      href="/dashboard/configuracoes"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Settings className="w-4 h-4 mr-3" />
                      Configurações
                    </Link>

                    <hr className="my-1" />

                    <button
                      onClick={handleSignOut}
                      disabled={isSigningOut}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      {isSigningOut ? "Saindo..." : "Sair"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition-colors text-sm font-medium"
              >
                Entrar
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
