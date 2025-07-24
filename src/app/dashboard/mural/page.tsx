"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import DashboardHeader from "@/components/DashboardHeader";
import EmptyState from "@/components/EmptyState";
import { useRelatosComEcos } from "@/hooks/useRelatosComEcos";
import { useCreateRelato } from "@/hooks/useRelatos";
import { useCreateEco } from "@/hooks/useEcos";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ToastContainer";

// Constantes de validação
const MIN_CHARACTERS = 10;
const MAX_CHARACTERS = 500;

export default function Mural() {
  const [newPost, setNewPost] = useState("");
  const [validationError, setValidationError] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { data: posts = [], isLoading, error } = useRelatosComEcos();
  const { mutate: createRelato, isPending: isCreatingRelato } =
    useCreateRelato();
  const { mutate: createEco, isPending: isCreatingEco } = useCreateEco();
  const { user } = useAuth();
  const { showToast } = useToast();

  // Validação em tempo real
  useEffect(() => {
    const trimmedText = newPost.trim();

    if (trimmedText.length === 0) {
      setValidationError("");
    } else if (trimmedText.length < MIN_CHARACTERS) {
      setValidationError(`Mínimo de ${MIN_CHARACTERS} caracteres`);
    } else if (trimmedText.length > MAX_CHARACTERS) {
      setValidationError(`Máximo de ${MAX_CHARACTERS} caracteres`);
    } else {
      setValidationError("");
    }
  }, [newPost]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedText = newPost.trim();

    // Validação final antes de submeter
    if (trimmedText.length < MIN_CHARACTERS) {
      setValidationError(`Mínimo de ${MIN_CHARACTERS} caracteres`);
      return;
    }

    if (trimmedText.length > MAX_CHARACTERS) {
      setValidationError(`Máximo de ${MAX_CHARACTERS} caracteres`);
      return;
    }

    if (!isCreatingRelato && !validationError) {
      createRelato(trimmedText, {
        onSuccess: () => {
          setNewPost("");
          setValidationError("");
          setShowSuccessMessage(true);

          // Toast de sucesso
          showToast({
            type: "success",
            title: "Desabafo compartilhado!",
            message: "Sua mensagem foi enviada anonimamente para o mural.",
          });

          // Esconder mensagem de sucesso após 3 segundos
          setTimeout(() => {
            setShowSuccessMessage(false);
          }, 3000);
        },
        onError: (error) => {
          console.error("Erro ao criar relato:", error);
          showToast({
            type: "error",
            title: "Erro ao criar relato",
            message: "Tente novamente em alguns instantes.",
          });
        },
      });
    }
  };

  const handleReaction = (postId: string, reaction: string) => {
    if (isCreatingEco) return;

    // Mapear reações para os tipos do banco
    const reactionMap: Record<string, string> = {
      florescer: "🌱",
      abraco: "🫂",
      entendo: "💧",
    };

    const tipo = reactionMap[reaction];
    if (!tipo) return;

    createEco(
      { relatoId: postId, tipo },
      {
        onError: (error) => {
          console.error("Erro ao criar eco:", error);
          showToast({
            type: "error",
            title: "Erro ao adicionar reação",
            message: "Tente novamente em alguns instantes.",
          });
        },
      }
    );
  };

  // Se não estiver autenticado, mostrar mensagem
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader
          title="Mural Vivo"
          showBackButton={true}
          backHref="/dashboard"
        />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800">
              Você precisa estar logado para acessar o mural.
            </p>
          </div>
        </main>
      </div>
    );
  }

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

  const canSubmit =
    newPost.trim().length >= MIN_CHARACTERS &&
    newPost.trim().length <= MAX_CHARACTERS &&
    !validationError &&
    !isCreatingRelato;

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
              className={`w-full h-32 p-4 border rounded-lg resize-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors ${
                validationError
                  ? "border-red-300 focus:ring-red-500"
                  : newPost.trim().length >= MIN_CHARACTERS
                    ? "border-green-300 focus:ring-green-500"
                    : "border-gray-300"
              }`}
              maxLength={MAX_CHARACTERS}
              disabled={isCreatingRelato}
            />

            <div className="flex justify-between items-center mt-4">
              <div className="flex flex-col">
                <span
                  className={`text-sm ${
                    validationError ? "text-red-600" : "text-gray-500"
                  }`}
                >
                  {newPost.length}/{MAX_CHARACTERS} caracteres
                </span>
                {validationError && (
                  <span className="text-xs text-red-600 mt-1">
                    {validationError}
                  </span>
                )}
              </div>
              <button
                type="submit"
                disabled={!canSubmit}
                className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {isCreatingRelato ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Compartilhando...
                  </>
                ) : (
                  <>
                    <span>💭</span>
                    Compartilhar Anonimamente
                  </>
                )}
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
                      disabled={isCreatingEco}
                      className="flex items-center gap-1 hover:scale-110 transition-transform disabled:opacity-50"
                    >
                      <span className="text-lg">🌱</span>
                      <span className="text-sm text-gray-600">
                        {post.reactions.florescer}
                      </span>
                    </button>

                    <button
                      onClick={() => handleReaction(post.id, "abraco")}
                      disabled={isCreatingEco}
                      className="flex items-center gap-1 hover:scale-110 transition-transform disabled:opacity-50"
                    >
                      <span className="text-lg">🫂</span>
                      <span className="text-sm text-gray-600">
                        {post.reactions.abraco}
                      </span>
                    </button>

                    <button
                      onClick={() => handleReaction(post.id, "entendo")}
                      disabled={isCreatingEco}
                      className="flex items-center gap-1 hover:scale-110 transition-transform disabled:opacity-50"
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
