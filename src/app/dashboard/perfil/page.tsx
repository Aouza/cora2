"use client";

import { useAuth } from "@/hooks/useAuth";
import DashboardHeader from "@/components/DashboardHeader";
import Avatar from "@/components/Avatar";
import { User, Mail, Calendar, Globe } from "lucide-react";

export default function Perfil() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader
          title="Perfil"
          showBackButton={true}
          backHref="/dashboard"
        />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader
          title="Perfil"
          showBackButton={true}
          backHref="/dashboard"
        />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">
              Você precisa estar logado para ver seu perfil.
            </p>
          </div>
        </main>
      </div>
    );
  }

  const displayName =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split("@")[0] ||
    "Usuário";
  const avatarUrl = user.user_metadata?.avatar_url;

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader
        title="Perfil"
        showBackButton={true}
        backHref="/dashboard"
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Perfil Principal */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar Grande */}
            <div className="flex-shrink-0">
              <Avatar user={user} size="lg" showDebug={true} />
            </div>

            {/* Informações do Usuário */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {displayName}
              </h1>
              <p className="text-lg text-gray-600 mb-4">{user.email}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <Mail className="w-5 h-5 text-violet-600" />
                  <span>{user.email}</span>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <User className="w-5 h-5 text-violet-600" />
                  <span>{user.app_metadata?.provider || "Google"}</span>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <Calendar className="w-5 h-5 text-violet-600" />
                  <span>
                    Membro desde{" "}
                    {user.created_at
                      ? new Date(user.created_at).toLocaleDateString("pt-BR")
                      : "Data não disponível"}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <Globe className="w-5 h-5 text-violet-600" />
                  <span>
                    Última atividade:{" "}
                    {user.last_sign_in_at
                      ? new Date(user.last_sign_in_at).toLocaleDateString(
                          "pt-BR"
                        )
                      : "Nunca"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Teste de Avatares */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Sistema de Avatar
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Avatar Pequeno */}
            <div className="text-center">
              <h3 className="font-medium text-gray-900 mb-3">Pequeno (sm)</h3>
              <div className="flex justify-center mb-2">
                <Avatar user={user} size="sm" showDebug={true} />
              </div>
              <p className="text-sm text-gray-600">Usado nos headers</p>
            </div>

            {/* Avatar Médio */}
            <div className="text-center">
              <h3 className="font-medium text-gray-900 mb-3">Médio (md)</h3>
              <div className="flex justify-center mb-2">
                <Avatar user={user} size="md" showDebug={true} />
              </div>
              <p className="text-sm text-gray-600">Tamanho padrão</p>
            </div>

            {/* Avatar Grande */}
            <div className="text-center">
              <h3 className="font-medium text-gray-900 mb-3">Grande (lg)</h3>
              <div className="flex justify-center mb-2">
                <Avatar user={user} size="lg" showDebug={true} />
              </div>
              <p className="text-sm text-gray-600">Usado no perfil</p>
            </div>
          </div>
        </div>

        {/* Informações Técnicas */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Informações Técnicas
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">URL do Avatar</h3>
              <p className="text-sm text-gray-600 break-all bg-gray-50 p-3 rounded-lg">
                {avatarUrl || "Não disponível"}
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">
                Status do Avatar
              </h3>
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${avatarUrl ? "bg-green-500" : "bg-yellow-500"}`}
                ></div>
                <span className="text-sm text-gray-600">
                  {avatarUrl
                    ? "URL disponível - tentando carregar imagem"
                    : "Usando iniciais como fallback"}
                </span>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">
                Dados do Usuário
              </h3>
              <pre className="text-xs bg-gray-50 p-3 rounded-lg overflow-auto">
                {JSON.stringify(
                  {
                    id: user.id,
                    email: user.email,
                    full_name: user.user_metadata?.full_name,
                    avatar_url: user.user_metadata?.avatar_url,
                    provider: user.app_metadata?.provider,
                    created_at: user.created_at,
                    last_sign_in_at: user.last_sign_in_at,
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
