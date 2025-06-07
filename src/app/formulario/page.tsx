"use client";

import RelationshipForm from "@/components/RelationshipForm";

export default function FormPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-violet-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">
            Seu Relatório Emocional
          </h1>
          <p className="text-lg text-slate-600">
            Preencha os dados abaixo para receber seu diagnóstico personalizado
          </p>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.1),transparent_50%)]"></div>
          <div className="relative">
            <RelationshipForm />
          </div>
        </div>
      </div>
    </div>
  );
}
