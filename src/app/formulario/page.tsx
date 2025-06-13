"use client";

import Header from "@/components/Header";
import RelationshipForm from "@/components/RelationshipForm";
import EmotionalLoading from "@/components/EmotionalLoading";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function FormularioPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);

  const handleSubmitStart = () => {
    setIsLoading(true);
  };

  const handleReportReady = (reportData: string) => {
    setReport(reportData);
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Função para testar o loading sem preencher o formulário
  const handleTestLoading = () => {
    setIsLoading(true);

    // Simula um relatório fake após o loading terminar
    setTimeout(() => {
      setReport(
        "🧠 **Análise de Teste**\n\nEste é um relatório de exemplo gerado pelo botão de teste. Aqui você veria a análise completa da sua conexão emocional.\n\n**Como Ana se conecta emocionalmente**\nEste seria o conteúdo real da análise...\n\n**O que move João por dentro**\nMais insights apareceriam aqui...\n\n**🎯 O que você pode fazer agora (de verdade)**\nConselhos práticos estariam nesta seção."
      );
    }, 15000); // Simula o tempo do loading (15 segundos)
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="pt-0" // Remove padding top para fullscreen do loading
          >
            <EmotionalLoading onFinish={handleLoadingComplete} />
          </motion.div>
        ) : (
          <motion.main
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="pt-24 pb-12"
          >
            <div className="mx-auto max-w-xl px-6 lg:px-8 text-center">
              {/* Botão de Teste - Apenas para desenvolvimento */}
              <div className="mb-6">
                <button
                  onClick={handleTestLoading}
                  className="
                    relative inline-flex items-center justify-center gap-2
                    px-4 py-2 
                    bg-gradient-to-r from-orange-500 via-orange-500 to-orange-600
                    text-white font-medium text-sm
                    rounded-lg 
                    transition-all duration-300 ease-in-out
                    transform hover:scale-105
                    focus:outline-none
                    backdrop-blur-sm
                    border border-orange-400/20
                  "
                  style={{
                    boxShadow:
                      "0 0 10px rgba(249, 115, 22, 0.25), 0 0 20px rgba(249, 115, 22, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                    filter: "drop-shadow(0 0 5px rgba(249, 115, 22, 0.15))",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 0 15px rgba(249, 115, 22, 0.35), 0 0 30px rgba(249, 115, 22, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 0 10px rgba(249, 115, 22, 0.25), 0 0 20px rgba(249, 115, 22, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)";
                  }}
                >
                  🧪 Testar Loading
                </button>
                <p className="text-xs text-slate-500 mt-1">
                  (Botão temporário para testes)
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Peça sua Análise Emocional
                </h1>
                <p className="mt-4 text-lg text-slate-600">
                  Preencha os dados abaixo para receber sua análise
                  personalizada.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-8"
              >
                <RelationshipForm
                  onSubmitStart={handleSubmitStart}
                  onReportReady={handleReportReady}
                  report={report}
                />
              </motion.div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
