"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardHeader from "@/components/DashboardHeader";
import EmptyState from "@/components/EmptyState";
import { useRelatosComEcos } from "@/hooks/useRelatosComEcos";

export default function Mural() {
  const [newPost, setNewPost] = useState("");
  const { data: posts = [], isLoading, error } = useRelatosComEcos();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.trim()) {
      // Aqui você implementaria a lógica para salvar o post
      console.log("Novo post:", newPost);
      setNewPost("");
    }
  };

  const handleReaction = (postId: string, reaction: string) => {
    console.log(`Reação ${reaction} no post ${postId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader
          title="Mural Vivo"
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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader
          title="Mural Vivo"
          showBackButton={true}
          backHref="/dashboard"
        />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">
              Erro ao carregar os desabafos. Tente novamente mais tarde.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <DashboardHeader
        title="Mural Vivo"
        showBackButton={true}
        backHref="/dashboard"
      />

      {/* Conteúdo Principal */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Introdução */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Espaço de Expressão
          </h2>
          <p className="text-gray-600 mb-4">
            Um lugar seguro e anônimo para colocar pra fora o que está te
            consumindo por dentro. Escreva o que sente. Leia o que outros também
            estão vivendo.
          </p>
          <div className="bg-violet-50 border border-violet-200 rounded-lg p-4">
            <p className="text-violet-800 text-sm">
              <strong>💫 Lembre-se:</strong> Este é um espaço de apoio mútuo.
              Trate cada desabafo com o carinho que você gostaria de receber.
            </p>
          </div>
        </div>

        {/* Formulário para novo post */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Como você está se sentindo hoje?
          </h3>

          <form onSubmit={handleSubmit}>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Desabafe aqui... Ninguém saberá quem você é, mas todos entenderão o que você sente."
              className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              maxLength={500}
            />

            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-500">
                {newPost.length}/500 caracteres
              </span>
              <button
                type="submit"
                disabled={!newPost.trim()}
                className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Compartilhar Anonimamente
              </button>
            </div>
          </form>
        </div>

        {/* Explicação das Reações */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Reações Simbólicas
          </h3>
          <p className="text-gray-600 mb-4">
            Responda aos desabafos com símbolos, não com palavras. Um gesto
            simbólico vale mais do que mil curtidas:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <span className="text-2xl">🌱</span>
              <div>
                <p className="font-medium text-gray-900">Você vai florescer</p>
                <p className="text-sm text-gray-600">
                  Para momentos de esperança
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <span className="text-2xl">🫂</span>
              <div>
                <p className="font-medium text-gray-900">Senti algo parecido</p>
                <p className="text-sm text-gray-600">Para conexão e empatia</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-violet-50 rounded-lg">
              <span className="text-2xl">💧</span>
              <div>
                <p className="font-medium text-gray-900">Te entendo</p>
                <p className="text-sm text-gray-600">Para acolhimento</p>
              </div>
            </div>
          </div>
        </div>

        {/* Feed de Posts ou Empty State */}
        {posts.length === 0 ? (
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <EmptyState
              icon="💭"
              title="Nenhum desabafo ainda"
              description="Seja o primeiro a compartilhar seus sentimentos neste espaço seguro. Sua experiência pode ajudar outras pessoas que estão passando por situações similares."
              actionText="Escrever primeiro desabafo"
              onAction={() => {
                const textarea = document.querySelector("textarea");
                textarea?.focus();
              }}
            />
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
              >
                <p className="text-gray-700 leading-relaxed mb-4">
                  "{post.texto}"
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{post.timeAgo}</span>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleReaction(post.id, "florescer")}
                      className="flex items-center gap-1 hover:scale-110 transition-transform"
                    >
                      <span className="text-lg">🌱</span>
                      <span className="text-sm text-gray-600">
                        {post.reactions.florescer}
                      </span>
                    </button>

                    <button
                      onClick={() => handleReaction(post.id, "abraco")}
                      className="flex items-center gap-1 hover:scale-110 transition-transform"
                    >
                      <span className="text-lg">🫂</span>
                      <span className="text-sm text-gray-600">
                        {post.reactions.abraco}
                      </span>
                    </button>

                    <button
                      onClick={() => handleReaction(post.id, "entendo")}
                      className="flex items-center gap-1 hover:scale-110 transition-transform"
                    >
                      <span className="text-lg">💧</span>
                      <span className="text-sm text-gray-600">
                        {post.reactions.entendo}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Loading mais posts */}
            <div className="text-center mt-8">
              <button className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                Carregar mais desabafos
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
