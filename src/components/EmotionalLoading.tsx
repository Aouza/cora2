"use client";

import React, { useState, useEffect, memo } from "react";
import { useRouter } from "next/navigation";

interface EmotionalLoadingProps {
  onFinish: () => void;
}

// Componente de documento isolado com memo
const DocumentCard = memo(
  ({ color, animationDelay }: { color: string; animationDelay: string }) => {
    return (
      <div
        className="absolute"
        style={{
          animation: "slideInfinite 4s linear infinite",
          animationDelay,
        }}
      >
        <div className="w-32 h-40 bg-white rounded-lg shadow-lg border border-gray-200 p-3 relative overflow-hidden">
          {/* Cabeçalho do documento com cor específica */}
          <div className="mb-3">
            <div className={`w-16 h-2 ${color} rounded mb-2`}></div>
            <div className="w-20 h-1 bg-gray-300 rounded mb-1"></div>
            <div className="w-14 h-1 bg-gray-300 rounded"></div>
          </div>

          {/* Conteúdo do documento */}
          <div className="space-y-1">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`h-0.5 bg-gray-200 rounded ${
                  i % 3 === 0 ? "w-full" : i % 3 === 1 ? "w-3/4" : "w-5/6"
                }`}
              ></div>
            ))}
          </div>

          {/* Cantos dobrados */}
          <div className="absolute top-0 right-0 w-6 h-6">
            <div className="absolute top-0 right-0 border-l-[12px] border-b-[12px] border-l-transparent border-b-gray-100"></div>
            <div className="absolute top-0 right-0 border-l-[10px] border-b-[10px] border-l-white border-b-transparent"></div>
          </div>

          {/* Indicador de documento no canto inferior */}
          <div className="absolute bottom-1 left-1">
            <div className={`w-2 h-2 ${color} rounded-full opacity-60`}></div>
          </div>
        </div>
      </div>
    );
  }
);

DocumentCard.displayName = "DocumentCard";

// Componente de animação isolado com memo
const DocumentsAnimation = memo(() => {
  const documents = [
    { id: 0, color: "bg-blue-600", delay: "0s" },
    { id: 1, color: "bg-violet-600", delay: "-1.33s" },
    { id: 2, color: "bg-green-600", delay: "-2.66s" },
  ];

  return (
    <div className="relative w-80 h-60 flex items-center justify-center overflow-visible">
      {documents.map((doc) => (
        <DocumentCard
          key={doc.id}
          color={doc.color}
          animationDelay={doc.delay}
        />
      ))}
    </div>
  );
});

DocumentsAnimation.displayName = "DocumentsAnimation";

const EmotionalLoading: React.FC<EmotionalLoadingProps> = ({ onFinish }) => {
  const router = useRouter();
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  const phrases = [
    "Analisando as emoções que conectam vocês dois...",
    "Cruzando padrões simbólicos e fases emocionais...",
    "Lendo sinais ocultos de comportamento e apego...",
    "Interpretando a forma como vocês se conectam (ou se afastam)...",
    "Organizando os insights sobre o que ainda pulsa ou se desgasta...",
    "Finalizando o diagnóstico simbólico com base em mais de 1.200 análises anteriores...",
    "Relatório emocional gerado com sucesso.",
  ];

  // Controle das frases sequenciais
  useEffect(() => {
    if (currentPhraseIndex < phrases.length - 1) {
      const timer = setTimeout(() => {
        setCurrentPhraseIndex((prev) => prev + 1);
      }, 2000); // 2 segundos por frase

      return () => clearTimeout(timer);
    } else {
      // Quando chegar na última frase, finaliza o loading e redireciona automaticamente
      const timer = setTimeout(() => {
        setIsLoadingComplete(true);
        // Redireciona automaticamente após 1 segundo
        setTimeout(() => {
          router.push("/pagamento");
        }, 1000);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [currentPhraseIndex, phrases.length, router]);

  return (
    <>
      {/* CSS Global para a animação */}
      <style jsx global>{`
        @keyframes slideInfinite {
          0% {
            transform: translateX(-200px) scale(0.7) rotate(-10deg);
            opacity: 0;
          }
          20% {
            transform: translateX(-100px) scale(0.85) rotate(-5deg);
            opacity: 0.5;
          }
          50% {
            transform: translateX(0px) scale(1) rotate(0deg);
            opacity: 1;
          }
          80% {
            transform: translateX(100px) scale(0.85) rotate(5deg);
            opacity: 0.5;
          }
          100% {
            transform: translateX(200px) scale(0.7) rotate(10deg);
            opacity: 0;
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0px);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -100% 0;
          }
          100% {
            background-position: 100% 0;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }

        .loading-text {
          background: linear-gradient(
            90deg,
            #0f172a 0%,
            #0f172a 40%,
            #64748b 50%,
            #0f172a 60%,
            #0f172a 100%
          );
          background-size: 200% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 2s linear infinite;
        }
      `}</style>

      <div className="w-full h-screen bg-slate-50 relative font-inter flex flex-col items-center justify-center">
        {/* Container principal centralizado */}
        <div className="flex flex-col items-center justify-center space-y-2 max-w-2xl mx-auto px-6">
          {/* Animação dos Documentos */}
          {!isLoadingComplete && (
            <div className="relative">
              <DocumentsAnimation />
            </div>
          )}

          {/* Textos de Status */}
          {!isLoadingComplete && (
            <div className="text-left w-96 h-24">
              <p className="loading-text font-medium text-xl mb-2">
                Gerando relatório emocional...
              </p>
              <p className="text-slate-600 font-normal text-base text-wrap">
                {phrases[currentPhraseIndex]}
              </p>
            </div>
          )}

          {/* Mensagem de conclusão - aparece brevemente antes do redirecionamento */}
          {isLoadingComplete && (
            <div className="text-center animate-fade-in">
              <div className="mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  Análise Concluída!
                </h2>
                <p className="text-slate-600">
                  Redirecionando para o pagamento...
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EmotionalLoading;
