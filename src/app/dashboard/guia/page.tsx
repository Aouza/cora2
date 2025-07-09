"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardHeader from "@/components/DashboardHeader";

export default function Guia() {
  const [selectedCategory, setSelectedCategory] = useState("todos");

  const categories = [
    { id: "todos", name: "Todos", icon: "📚" },
    { id: "artigos", name: "Artigos", icon: "📖" },
    { id: "videos", name: "Vídeos", icon: "🎥" },
    { id: "exercicios", name: "Exercícios", icon: "🧘" },
    { id: "podcasts", name: "Podcasts", icon: "🎧" },
  ];

  const contents = [
    {
      id: 1,
      title: "Como lidar com a saudade que não passa",
      type: "artigo",
      duration: "5 min de leitura",
      category: "Processamento Emocional",
      description:
        "Entenda por que alguns términos deixam uma saudade mais persistente e como trabalhar com ela de forma saudável.",
      author: "Dra. Marina Santos",
      tags: ["saudade", "luto", "autocompaixão"],
      featured: true,
    },
    {
      id: 2,
      title: "Por que você se sente perdida após o término",
      type: "video",
      duration: "8 minutos",
      category: "Autoconhecimento",
      description:
        "Um olhar profundo sobre a sensação de 'perda de identidade' que muitas pessoas experimentam após um relacionamento.",
      author: "Psicóloga Ana Clara",
      tags: ["identidade", "autoestima", "reconstrução"],
    },
    {
      id: 3,
      title: "Prática de grounding para momentos de ansiedade",
      type: "exercicio",
      duration: "10 minutos",
      category: "Ferramentas Práticas",
      description:
        "Técnica simples e eficaz para quando a ansiedade sobre o futuro se torna avassaladora.",
      author: "Centro Cora.Deep",
      tags: ["ansiedade", "presente", "respiração"],
    },
    {
      id: 4,
      title: "O mito do 'amor da sua vida'",
      type: "artigo",
      duration: "7 min de leitura",
      category: "Desmistificação",
      description:
        "Por que acreditar que existe apenas uma pessoa certa pode te manter presa no passado.",
      author: "Dr. Carlos Teixeira",
      tags: ["crenças", "amor", "futuro"],
    },
    {
      id: 5,
      title: "Podcast: Conversas sobre recomeços",
      type: "podcast",
      duration: "25 minutos",
      category: "Inspiração",
      description:
        "Histórias reais de mulheres que transformaram términos difíceis em renascimentos poderosos.",
      author: "Podcast Recomeçar",
      tags: ["histórias", "inspiração", "recomeço"],
      featured: true,
    },
    {
      id: 6,
      title: "Escrita terapêutica: cartas que você nunca vai enviar",
      type: "exercicio",
      duration: "15 minutos",
      category: "Ferramentas Práticas",
      description:
        "Como usar a escrita para processar sentimentos não resolvidos de forma segura e curativa.",
      author: "Terapia Narrativa",
      tags: ["escrita", "fechamento", "terapia"],
    },
    {
      id: 7,
      title: "Sinais de que você está se recuperando (mesmo sem perceber)",
      type: "video",
      duration: "6 minutos",
      category: "Progresso",
      description:
        "Pequenos sinais que mostram que seu coração está cicatrizando, mesmo quando parece que nada mudou.",
      author: "Psicóloga Beatriz Lima",
      tags: ["recuperação", "sinais", "progresso"],
    },
    {
      id: 8,
      title: "Meditação guiada: acolhendo a dor sem resistência",
      type: "exercicio",
      duration: "12 minutos",
      category: "Mindfulness",
      description:
        "Uma prática gentil para momentos em que a dor parece insuportável.",
      author: "Mindfulness Brasil",
      tags: ["meditação", "aceitação", "dor"],
    },
  ];

  const filteredContents =
    selectedCategory === "todos"
      ? contents
      : contents.filter(
          (content) => content.type === selectedCategory.slice(0, -1)
        );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "artigo":
        return "📖";
      case "video":
        return "🎥";
      case "exercicio":
        return "🧘";
      case "podcast":
        return "🎧";
      default:
        return "📚";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "artigo":
        return "bg-blue-100 text-blue-700";
      case "video":
        return "bg-red-100 text-red-700";
      case "exercicio":
        return "bg-green-100 text-green-700";
      case "podcast":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <DashboardHeader
        title="Cora.Guia"
        subtitle="Curadoria para Clareza"
        icon="📚"
        showBackButton={true}
        backHref="/dashboard"
      />

      {/* Conteúdo Principal */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Introdução */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Curadoria para Clareza
          </h2>
          <p className="text-gray-600 mb-6">
            Uma biblioteca emocional viva. Conteúdos escolhidos a dedo para te
            ajudar a atravessar esse momento com lucidez e autocompaixão.
          </p>

          <div className="bg-violet-50 border border-violet-200 rounded-lg p-4">
            <p className="text-violet-800 text-sm">
              <strong>✨ Personalizado para você:</strong> Estes conteúdos foram
              selecionados com base no seu perfil emocional e momento atual de
              recuperação.
            </p>
          </div>
        </div>

        {/* Filtros */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  selectedCategory === category.id
                    ? "bg-violet-100 border-violet-300 text-violet-700"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span>{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Conteúdos em Destaque */}
        {selectedCategory === "todos" && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Em Destaque
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contents
                .filter((content) => content.featured)
                .map((content) => (
                  <div
                    key={content.id}
                    className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-lg">
                          {getTypeIcon(content.type)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(content.type)}`}
                          >
                            {content.type}
                          </span>
                          <span className="text-xs text-gray-500">
                            {content.duration}
                          </span>
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {content.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                          {content.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            por {content.author}
                          </span>
                          <button className="text-violet-600 hover:text-violet-700 font-medium text-sm">
                            Acessar →
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Lista de Conteúdos */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {selectedCategory === "todos"
              ? "Todos os Conteúdos"
              : "Conteúdos Filtrados"}
          </h3>
          <div className="space-y-4">
            {filteredContents.map((content) => (
              <div
                key={content.id}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">{getTypeIcon(content.type)}</span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(content.type)}`}
                      >
                        {content.type}
                      </span>
                      <span className="text-xs text-gray-500">
                        {content.duration}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {content.category}
                      </span>
                      {content.featured && (
                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                          Destaque
                        </span>
                      )}
                    </div>

                    <h4 className="font-semibold text-gray-900 mb-2">
                      {content.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      {content.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-gray-500">
                          por {content.author}
                        </span>
                        <div className="flex gap-1">
                          {content.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button className="flex items-center gap-2 text-violet-600 hover:text-violet-700 font-medium text-sm">
                        Acessar
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
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA para mais conteúdo */}
        <div className="mt-12 bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-8 border border-violet-200">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Não encontrou o que procura?
            </h3>
            <p className="text-gray-600 mb-6">
              Nossa curadoria está sempre crescendo. Sugestões e pedidos são
              sempre bem-vindos.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors">
                Sugerir Conteúdo
              </button>
              <button className="px-6 py-3 border border-violet-300 text-violet-700 rounded-lg hover:bg-violet-50 transition-colors">
                Falar com Curador
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
