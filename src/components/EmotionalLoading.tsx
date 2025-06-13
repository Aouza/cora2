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
  const [showButton, setShowButton] = useState(false);
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
      // Quando chegar na última frase, finaliza o loading
      const timer = setTimeout(() => {
        setIsLoadingComplete(true);
        setTimeout(() => {
          setShowButton(true);
        }, 500);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [currentPhraseIndex, phrases.length]);

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

      <div className="w-full h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative font-inter flex flex-col items-center justify-center">
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
        </div>

        {/* Botão Final - só aparece quando o loading termina */}
        {showButton && (
          <div
            className={`
              absolute inset-0 flex items-center justify-center
              transition-all duration-700 ease-in-out
              ${
                showButton
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-4 scale-95"
              }
            `}
          >
            <button
              onClick={() => router.push("/pagamento")}
              className="
                relative inline-flex items-center justify-center gap-2
                px-8 py-4 
                bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700
                text-white font-medium text-lg
                rounded-full 
                transition-all duration-300 ease-in-out
                transform hover:scale-[1.02]
                focus:outline-none
                backdrop-blur-sm
                border border-purple-400/20
              "
              style={{
                boxShadow:
                  "0 0 20px rgba(139, 92, 246, 0.4), 0 0 40px rgba(139, 92, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                filter: "drop-shadow(0 0 10px rgba(139, 92, 246, 0.25))",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 30px rgba(139, 92, 246, 0.5), 0 0 60px rgba(139, 92, 246, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 20px rgba(139, 92, 246, 0.4), 0 0 40px rgba(139, 92, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)";
              }}
            >
              Visualizar meu relatório emocional
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default EmotionalLoading;
