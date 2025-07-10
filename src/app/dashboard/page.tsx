"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardHeader from "@/components/DashboardHeader";
import EmptyState from "@/components/EmptyState";
import { useEstatisticas } from "@/hooks/useEstatisticas";
import { useRelatosComEcos } from "@/hooks/useRelatosComEcos";

export default function Dashboard() {
  const [user] = useState({
    name: "Ana",
    joinedAt: "2024-01-15",
    currentMood: "Processando",
  });

  const { data: estatisticas, isLoading: estatisticasLoading } =
    useEstatisticas();
  const { data: posts = [], isLoading: postsLoading } = useRelatosComEcos();

  // Pegar os 3 posts mais recentes para preview
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header do Dashboard */}
      <DashboardHeader />

      {/* Conteúdo Principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Boas-vindas e Status Emocional */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Bem-vinda ao seu espaço de clareza
          </h2>
          <p className="text-gray-600">
            Este é seu hub emocional. Um lugar seguro para processar, entender e
            reconstruir.
          </p>

          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-gray-500">Estado atual:</span>
            <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full font-medium">
              {user.currentMood}
            </span>
          </div>
        </div>

        {/* Estatísticas Rápidas */}
        {!estatisticasLoading && estatisticas && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
              <div className="text-2xl font-bold text-violet-600">
                {estatisticas.totalRelatos}
              </div>
              <div className="text-sm text-gray-600">Desabafos</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
              <div className="text-2xl font-bold text-blue-600">
                {estatisticas.totalEcos}
              </div>
              <div className="text-sm text-gray-600">Ecos de apoio</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
              <div className="text-2xl font-bold text-green-600">
                {estatisticas.totalUsuarios}
              </div>
              <div className="text-sm text-gray-600">Pessoas conectadas</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
              <div className="text-2xl font-bold text-purple-600">
                {estatisticas.relatosRecentes}
              </div>
              <div className="text-sm text-gray-600">Novos esta semana</div>
            </div>
          </div>
        )}

        {/* Grid Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Área Principal - Esquerda */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cora.Guia */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
                  <span className="text-xl">📚</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Cora.Guia — Curadoria para Clareza
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Conteúdos escolhidos especificamente para o seu momento atual
              </p>

              <div className="py-6">
                <EmptyState
                  icon="📚"
                  title="Conteúdos sendo preparados"
                  description="Nossa equipe está selecionando materiais personalizados para seu momento atual."
                />
              </div>

              <Link
                href="/dashboard/guia"
                className="inline-flex items-center gap-2 text-violet-600 font-medium mt-4 hover:text-violet-700"
              >
                Ver toda a curadoria
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>

            {/* Mural Vivo */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <span className="text-xl">🧱</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Mural Vivo — Espaço de Expressão
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Desabafe anonimamente e conecte-se com quem está passando pelo
                mesmo
              </p>

              {postsLoading ? (
                <div className="py-6">
                  <div className="animate-pulse space-y-3">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                  </div>
                </div>
              ) : recentPosts.length === 0 ? (
                <div className="py-6">
                  <EmptyState
                    icon="💭"
                    title="Seja a primeira a compartilhar"
                    description="O mural está esperando por você. Compartilhe seus sentimentos e conecte-se com outras pessoas."
                  />
                </div>
              ) : (
                <div className="space-y-4 mb-4">
                  {recentPosts.map((post) => (
                    <div
                      key={post.id}
                      className="border-l-4 border-violet-200 pl-4 py-2"
                    >
                      <p className="text-gray-600 text-sm line-clamp-2">
                        "{post.texto}"
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                        <span>{post.timeAgo}</span>
                        <span>🌱 {post.reactions.florescer}</span>
                        <span>🫂 {post.reactions.abraco}</span>
                        <span>💧 {post.reactions.entendo}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <Link
                href="/dashboard/mural"
                className="inline-flex items-center gap-2 text-violet-600 font-medium hover:text-violet-700"
              >
                Ir para o Mural
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Sidebar Direita */}
          <div className="space-y-6">
            {/* Leitura Emocional */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <span className="text-xl">🧾</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Sua Leitura Emocional
                </h3>
              </div>
              <p className="text-gray-600 mb-4 text-sm">
                Mapa simbólico do seu momento atual
              </p>

              <div className="py-6">
                <EmptyState
                  icon="🔍"
                  title="Análise sendo gerada"
                  description="Complete seu perfil emocional para receber insights personalizados."
                />
              </div>

              <Link
                href="/dashboard/leitura"
                className="inline-flex items-center gap-2 text-violet-600 font-medium hover:text-violet-700"
              >
                Ver análise completa
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>

            {/* Progresso Emocional */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                📈 Seu Progresso
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                Acompanhe sua jornada de recuperação
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Dias no Cora.Deep</span>
                  <span className="font-medium">
                    {Math.floor(
                      (Date.now() - new Date(user.joinedAt).getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Comunidade ativa</span>
                  <span className="font-medium">
                    {estatisticas?.totalUsuarios || 0} pessoas
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Desabafos na plataforma</span>
                  <span className="font-medium">
                    {estatisticas?.totalRelatos || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Ecos de Apoio */}
            {!estatisticasLoading && estatisticas && (
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  💫 Ecos de Apoio
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Gestos simbólicos compartilhados
                </p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🌱</span>
                      <span className="text-sm text-gray-600">
                        Você vai florescer
                      </span>
                    </div>
                    <span className="font-medium text-green-600">
                      {estatisticas.ecosPorTipo.florescer}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🫂</span>
                      <span className="text-sm text-gray-600">
                        Senti algo parecido
                      </span>
                    </div>
                    <span className="font-medium text-blue-600">
                      {estatisticas.ecosPorTipo.abraco}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">💧</span>
                      <span className="text-sm text-gray-600">Te entendo</span>
                    </div>
                    <span className="font-medium text-purple-600">
                      {estatisticas.ecosPorTipo.entendo}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Próxima Sessão */}
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 border border-violet-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                💫 Momento de Reflexão
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                Reserve um tempo para si mesma hoje
              </p>
              <button className="w-full bg-violet-600 text-white py-2 px-4 rounded-lg hover:bg-violet-700 transition-colors">
                Iniciar Reflexão
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
