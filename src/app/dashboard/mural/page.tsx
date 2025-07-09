"use client";

import { useState } from "react";
import Link from "next/link";

export default function Mural() {
  const [newPost, setNewPost] = useState("");
  const [posts] = useState([
    {
      id: 1,
      content:
        "Hoje acordei sem aquela dor no peito pela primeira vez em semanas. Pequenos progressos também contam, né?",
      timeAgo: "há 2 horas",
      reactions: { florescer: 12, abraco: 5, entendo: 3 },
    },
    {
      id: 2,
      content:
        "Será que eu vou conseguir confiar em alguém de novo? Tenho medo que isso sempre aconteça comigo...",
      timeAgo: "há 5 horas",
      reactions: { entendo: 8, abraco: 15, florescer: 2 },
    },
    {
      id: 3,
      content:
        "Descobri que não tava chorando por ele, mas por uma versão de mim que eu achava que tinha perdido. O Cora me ajudou a ver isso.",
      timeAgo: "há 8 horas",
      reactions: { florescer: 24, entendo: 18, abraco: 9 },
    },
    {
      id: 4,
      content:
        "Às vezes acordo de madrugada e por um segundo esqueço que acabou. Aí a realidade bate e é como se perdesse ele de novo.",
      timeAgo: "há 12 horas",
      reactions: { entendo: 32, abraco: 28, florescer: 5 },
    },
    {
      id: 5,
      content:
        "Hoje consegui ouvir nossa música sem chorar. Ainda dói, mas é diferente. É como se a música fosse minha de novo.",
      timeAgo: "há 1 dia",
      reactions: { florescer: 19, abraco: 11, entendo: 7 },
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.trim()) {
      // Aqui você implementaria a lógica para salvar o post
      console.log("Novo post:", newPost);
      setNewPost("");
    }
  };

  const handleReaction = (postId: number, reaction: string) => {
    console.log(`Reação ${reaction} no post ${postId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Voltar
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center">
                  <span className="text-lg">🧱</span>
                </div>
                <h1 className="text-xl font-bold text-gray-900">Mural Vivo</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

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

        {/* Feed de Posts */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
            >
              <p className="text-gray-700 leading-relaxed mb-4">
                "{post.content}"
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
        </div>

        {/* Loading mais posts */}
        <div className="text-center mt-8">
          <button className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            Carregar mais desabafos
          </button>
        </div>
      </main>
    </div>
  );
}
