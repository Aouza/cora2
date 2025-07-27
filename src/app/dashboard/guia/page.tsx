"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardHeader from "@/components/DashboardHeader";
import EmptyState from "@/components/EmptyState";

export default function Guia() {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [contents, setContents] = useState<any[]>([]); // Inicializar vazio para produção

  // Categorias emocionais principais
  const emotionalCategories = [
    {
      id: "perdido",
      name: "Me sinto perdido(a)",
      emoji: "🌪️",
      description: "Não sei por onde começar",
    },
    {
      id: "dolorido",
      name: "Dói muito ainda",
      emoji: "💔",
      description: "Estou no luto emocional",
    },
    {
      id: "esperanca",
      name: "Ainda penso em voltar",
      emoji: "♻️",
      description: "Fico preso em esperanças",
    },
    {
      id: "culpa",
      name: "Me culpo por tudo",
      emoji: "⚖️",
      description: "Carrego culpa ou arrependimento",
    },
    {
      id: "seguir",
      name: "Quero seguir em frente",
      emoji: "🚪",
      description: "Já entendi, mas tá difícil virar a chave",
    },
    {
      id: "saudade",
      name: "Sinto saudade",
      emoji: "🌊",
      description: "A saudade aperta",
    },
  ];

  // Categorias de tipo de conteúdo
  const contentTypeCategories = [
    { id: "todos", name: "Todos", icon: "📚" },
    { id: "artigos", name: "Artigos", icon: "📖" },
    { id: "videos", name: "Vídeos", icon: "🎥" },
    { id: "exercicios", name: "Exercícios", icon: "🧘" },
    { id: "podcasts", name: "Podcasts", icon: "🎧" },
  ];

  // Conteúdos de destaque (mesmo sem filtro)
  const featuredContents = [
    {
      id: "destaque-1",
      title: "Como lidar com a culpa pós-separação",
      description: "Um guia prático para transformar culpa em aprendizado",
      type: "artigo",
      author: "Dra. Ana Silva",
      duration: "8 min",
      featured: true,
      emotion: "culpa",
      category: "Autoconhecimento",
    },
    {
      id: "destaque-2",
      title: "Meditação para momentos de saudade",
      description: "Exercício guiado para acalmar o coração",
      type: "exercicio",
      author: "Prof. Carlos Mendes",
      duration: "12 min",
      featured: true,
      emotion: "saudade",
      category: "Bem-estar",
    },
  ];

  // Conteúdos gerais para a categoria "todos"
  const generalContents = [
    {
      id: "geral-1",
      title: "Reconstruindo sua identidade pós-relacionamento",
      description: "Um processo de redescoberta pessoal em 30 dias",
      type: "artigo",
      author: "Psicóloga Dr. Mariana Costa",
      duration: "15 min",
      category: "Desenvolvimento Pessoal",
    },
    {
      id: "geral-2",
      title: "Exercícios de respiração para ansiedade",
      description: "Técnicas simples para momentos de crise emocional",
      type: "exercicio",
      author: "Terapeuta Roberto Santos",
      duration: "8 min",
      category: "Bem-estar",
    },
    {
      id: "geral-3",
      title: "Como estabelecer novos limites",
      description: "Guia prático para se proteger emocionalmente",
      type: "video",
      author: "Coach Fernanda Lima",
      duration: "20 min",
      category: "Autocuidado",
    },
    {
      id: "geral-4",
      title: "O poder do perdão próprio",
      description: "Um episódio sobre libertação emocional",
      type: "podcast",
      author: "Mentor Lucas Oliveira",
      duration: "35 min",
      category: "Crescimento",
    },
  ];

  // Conteúdos recomendados por emoção
  const getEmotionalRecommendations = (emotion: string) => {
    const recommendations = {
      perdido: [
        {
          id: "perdido-1",
          title: "Primeiros passos: Como reorganizar sua vida",
          description: "Um plano de 7 dias para encontrar direção",
          type: "artigo",
          author: "Coach Maria Santos",
          duration: "10 min",
          category: "Planejamento",
        },
      ],
      dolorido: [
        {
          id: "dolorido-1",
          title: "O processo do luto emocional",
          description: "Entenda as fases e como atravessá-las",
          type: "video",
          author: "Psicóloga Dr. João Costa",
          duration: "15 min",
          category: "Psicologia",
        },
      ],
      culpa: [
        {
          id: "culpa-1",
          title: "Perdão interno: Liberte-se da culpa",
          description: "Exercícios para transformar culpa em sabedoria",
          type: "exercicio",
          author: "Terapeuta Sofia Lima",
          duration: "20 min",
          category: "Autocura",
        },
      ],
      saudade: [
        {
          id: "saudade-1",
          title: "Saudade que transforma",
          description: "Como usar a saudade como força motriz",
          type: "podcast",
          author: "Mentor Pedro Alves",
          duration: "25 min",
          category: "Crescimento",
        },
      ],
    };

    return recommendations[emotion as keyof typeof recommendations] || [];
  };

  const filteredContents = selectedEmotion
    ? getEmotionalRecommendations(selectedEmotion)
    : selectedCategory === "todos"
      ? [...featuredContents, ...generalContents] // Incluir conteúdos de destaque + conteúdos gerais
      : [...featuredContents, ...generalContents].filter(
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

  const handleRandomRecommendation = () => {
    const randomEmotion =
      emotionalCategories[
        Math.floor(Math.random() * emotionalCategories.length)
      ];
    setSelectedEmotion(randomEmotion.id);
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

        {/* Filtro Emocional Principal */}
        <div className="mb-8">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              ❓ Como você está se sentindo agora?
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Selecione um estado emocional para receber recomendações mais
              precisas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {emotionalCategories.map((emotion) => (
              <button
                key={emotion.id}
                onClick={() =>
                  setSelectedEmotion(
                    selectedEmotion === emotion.id ? null : emotion.id
                  )
                }
                className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                  selectedEmotion === emotion.id
                    ? "bg-violet-100 border-violet-300 text-violet-700 shadow-md"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
                }`}
              >
                <span className="text-2xl">{emotion.emoji}</span>
                <div className="text-left">
                  <div className="font-medium text-sm">{emotion.name}</div>
                  <div className="text-xs text-gray-500">
                    {emotion.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Filtro por Tipo de Conteúdo */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {contentTypeCategories.map((category) => (
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

        {/* Destaque da Semana */}
        {!selectedEmotion && selectedCategory === "todos" && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              ⭐ Destaque da Semana
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredContents.map((content) => (
                <div
                  key={content.id}
                  className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 border border-violet-200 shadow-sm"
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

        {/* Conteúdos ou Empty State */}
        {filteredContents.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm text-center">
            <div className="mb-6">
              <span className="text-6xl mb-4 block">🌱</span>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Ainda estamos preparando os conteúdos certos
              </h3>
              <p className="text-gray-600 mb-6">
                para esse momento emocional. Enquanto isso, veja o que pode te
                ajudar agora:
              </p>
            </div>

            <button
              onClick={handleRandomRecommendation}
              className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-lg font-medium hover:bg-violet-700 transition-colors"
            >
              🎯 Me indique algo agora
            </button>
          </div>
        ) : (
          <>
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
                    </div>
                    <button className="text-violet-600 hover:text-violet-700 font-medium">
                      Acessar →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Botão para criar ritual */}
            <div className="mt-8 text-center">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all shadow-md">
                🌿 Criar meu ritual de reconstrução
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
