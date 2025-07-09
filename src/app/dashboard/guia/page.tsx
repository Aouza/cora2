"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardHeader from "@/components/DashboardHeader";
import EmptyState from "@/components/EmptyState";

export default function Guia() {
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [contents, setContents] = useState<any[]>([]); // Inicializar vazio para produção

  const categories = [
    { id: "todos", name: "Todos", icon: "📚" },
    { id: "artigos", name: "Artigos", icon: "📖" },
    { id: "videos", name: "Vídeos", icon: "🎥" },
    { id: "exercicios", name: "Exercícios", icon: "🧘" },
    { id: "podcasts", name: "Podcasts", icon: "🎧" },
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

        {/* Conteúdos ou Empty State */}
        {filteredContents.length === 0 ? (
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <EmptyState
              icon="📚"
              title="Nenhum conteúdo disponível"
              description="Ainda não há conteúdos curados para esta categoria. Nossa equipe está trabalhando para trazer materiais especializados que vão te ajudar nesta jornada."
              actionText="Ver todos os conteúdos"
              onAction={() => setSelectedCategory("todos")}
            />
          </div>
        ) : (
          <>
            {/* Conteúdos em Destaque */}
            {selectedCategory === "todos" && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  ⭐ Recomendados para você
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredContents
                    .filter((content) => content.featured)
                    .map((content) => (
                      <div
                        key={content.id}
                        className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 border border-violet-200"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                              content.type
                            )}`}
                          >
                            {getTypeIcon(content.type)}
                            {content.type}
                          </span>
                          <span className="text-sm text-gray-500">
                            {content.duration}
                          </span>
                        </div>

                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                          {content.title}
                        </h4>
                        <p className="text-gray-600 text-sm mb-3">
                          {content.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {content.author}
                          </span>
                          <button className="text-violet-600 hover:text-violet-700 text-sm font-medium">
                            Acessar →
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Lista de Conteúdos */}
            <div className="space-y-4">
              {filteredContents.map((content) => (
                <div
                  key={content.id}
                  className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                          content.type
                        )}`}
                      >
                        {getTypeIcon(content.type)}
                        {content.type}
                      </span>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {content.category}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {content.duration}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {content.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{content.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">
                        {content.author}
                      </span>
                      {content.tags && (
                        <div className="flex gap-1">
                          {content.tags.slice(0, 2).map((tag: string) => (
                            <span
                              key={tag}
                              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <button className="text-violet-600 hover:text-violet-700 font-medium">
                      Acessar →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
