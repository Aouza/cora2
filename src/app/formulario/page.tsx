"use client";

import Header from "@/components/Header";
import RelationshipForm from "@/components/RelationshipForm";
import { motion } from "framer-motion";

export default function FormularioPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="pt-24 pb-12">
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
              Preencha os dados abaixo para receber sua análise personalizada.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8"
          >
            <RelationshipForm />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
