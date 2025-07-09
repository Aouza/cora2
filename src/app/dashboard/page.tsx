"use client";

import { useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [user] = useState({
    name: "Ana",
    joinedAt: "2024-01-15",
    currentMood: "Processando",
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header do Dashboard */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">
                Cora<span className="text-violet-600">.Deep</span>
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Olá, {user.name}</span>
              <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center">
                <span className="text-violet-600 text-sm font-medium">A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

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

              <div className="space-y-3">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-1">
                    📖 Como lidar com a saudade que não passa
                  </h4>
                  <p className="text-sm text-gray-600">
                    Artigo • 5 min de leitura
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-1">
                    🎥 Por que você se sente perdida após o término
                  </h4>
                  <p className="text-sm text-gray-600">Vídeo • 8 minutos</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-1">
                    🧘 Prática de grounding para momentos de ansiedade
                  </h4>
                  <p className="text-sm text-gray-600">
                    Exercício prático • 10 minutos
                  </p>
                </div>
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

              <div className="space-y-4 mb-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700 mb-2">
                    "Hoje acordei sem aquela dor no peito pela primeira vez em
                    semanas. Pequenos progressos também contam, né?"
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>há 2 horas</span>
                    <div className="flex items-center gap-2">
                      <button className="hover:scale-110 transition-transform">
                        🌱
                      </button>
                      <span>12</span>
                      <button className="hover:scale-110 transition-transform">
                        🫂
                      </button>
                      <span>5</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700 mb-2">
                    "Será que eu vou conseguir confiar em alguém de novo? Tenho
                    medo que isso sempre aconteça comigo..."
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>há 5 horas</span>
                    <div className="flex items-center gap-2">
                      <button className="hover:scale-110 transition-transform">
                        💧
                      </button>
                      <span>8</span>
                      <button className="hover:scale-110 transition-transform">
                        🫂
                      </button>
                      <span>15</span>
                    </div>
                  </div>
                </div>
              </div>

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

              <div className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg mb-4">
                <h4 className="font-medium text-gray-900 mb-2">
                  ✨ Insights Principais
                </h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Padrão de apego identificado</li>
                  <li>• Pontos de reconstrução</li>
                  <li>• Recursos emocionais disponíveis</li>
                </ul>
              </div>

              <Link
                href="/dashboard/leitura"
                className="w-full inline-flex items-center justify-center px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors text-sm font-medium"
              >
                Ver Leitura Completa
              </Link>
            </div>

            {/* Eco Emocional */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <span className="text-xl">💬</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Eco Emocional
                </h3>
              </div>
              <p className="text-gray-600 mb-4 text-sm">
                Conexões simbólicas com a comunidade
              </p>

              <div className="text-center py-4">
                <div className="text-2xl mb-2">🌱</div>
                <p className="text-sm text-gray-600">
                  Você recebeu 3 "Você vai florescer" hoje
                </p>
              </div>
            </div>

            {/* Progresso */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Seu Progresso
              </h3>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Jornada de Clareza</span>
                    <span className="text-violet-600">30%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-violet-600 h-2 rounded-full w-[30%]"></div>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-xs text-gray-500 mb-2">
                    Conquistas recentes:
                  </p>
                  <div className="flex gap-1">
                    <span className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center text-xs">
                      🏆
                    </span>
                    <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-xs">
                      ✨
                    </span>
                    <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs">
                      💎
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
