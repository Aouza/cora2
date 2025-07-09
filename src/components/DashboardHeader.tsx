"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import { ArrowLeft, LogOut, Settings, User, Heart } from "lucide-react";
import {
  getUserDisplayInfo,
  shouldShowAvatar,
  debugUserData,
} from "../../lib/avatar-utils";

interface DashboardHeaderProps {
  title?: string;
  showBackButton?: boolean;
  backHref?: string;
}

export default function DashboardHeader({
  title = "Dashboard",
  showBackButton = false,
  backHref = "/dashboard",
}: DashboardHeaderProps) {
  const { user, loading, signOut } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isUserMenuOpen]);

  // Debug do usuário (apenas em desenvolvimento)
  useEffect(() => {
    debugUserData(user, "DashboardHeader component");
  }, [user]);

  // Resetar erro de avatar quando usuário mudar
  useEffect(() => {
    setAvatarError(false);
  }, [user?.user_metadata?.avatar_url]);

  // Extrair informações do usuário usando utilities modernas
  const userDisplay = getUserDisplayInfo(user);
  const showAvatar = shouldShowAvatar(user) && !avatarError;

  const handleAvatarError = () => {
    console.warn(
      "❌ Avatar falhou no DashboardHeader, usando iniciais como fallback"
    );
    setAvatarError(true);
  };

  const handleAvatarLoad = () => {
    console.log("✅ Avatar carregado com sucesso no DashboardHeader");
    setAvatarError(false);
  };

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Erro no logout:", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  if (loading) {
    return (
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="animate-pulse bg-gray-200 h-6 w-32 rounded"></div>
            </div>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Back button and title */}
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <Link
                href={backHref}
                className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors"
                title="Voltar"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
            )}

            <div className="flex items-center space-x-3">
              <Link href="/dashboard" className="flex items-center space-x-2">
                <Heart className="w-6 h-6 text-violet-600" />
                <span className="text-lg font-semibold text-gray-900">
                  {title}
                </span>
              </Link>
            </div>
          </div>

          {/* Right side - User menu */}
          <div className="flex items-center">
            {user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-3 p-2 rounded-full hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  {/* Avatar ou Iniciais */}
                  <div className="relative">
                    {showAvatar && userDisplay.avatarUrl ? (
                      <img
                        src={userDisplay.avatarUrl}
                        alt={`Avatar de ${userDisplay.name}`}
                        className="w-8 h-8 rounded-full object-cover border-2 border-violet-200"
                        onError={handleAvatarError}
                        onLoad={handleAvatarLoad}
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                        {userDisplay.initials}
                      </div>
                    )}
                  </div>

                  {/* Nome do usuário - visível apenas em telas maiores */}
                  <div className="hidden md:block">
                    <p className="text-sm font-medium text-gray-900">
                      {userDisplay.name}
                    </p>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {userDisplay.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {userDisplay.email}
                      </p>
                    </div>

                    <Link
                      href="/dashboard"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Heart className="w-4 h-4 mr-3" />
                      Dashboard
                    </Link>

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
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-violet-600 transition-colors"
                >
                  Entrar
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
