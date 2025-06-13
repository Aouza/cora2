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
