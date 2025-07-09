"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardHeader from "@/components/DashboardHeader";
import EmptyState from "@/components/EmptyState";

export default function LeituraEmocional() {
  const [activeSection, setActiveSection] = useState("diagnostico");
  const [hasAnalysis, setHasAnalysis] = useState(false); // Para controlar se há análise disponível

  const sections = [
    { id: "diagnostico", title: "Diagnóstico Emocional", icon: "💭" },
    { id: "padroes", title: "Padrões Identificados", icon: "🔍" },
    { id: "vinculos", title: "Análise de Vínculos", icon: "🔗" },
    { id: "reconstrucao", title: "Caminhos de Reconstrução", icon: "🌱" },
    { id: "prognostico", title: "Prognóstico Emocional", icon: "🌅" },
  ];

  const renderContent = () => {
    if (!hasAnalysis) {
      return (
        <EmptyState
          icon="🔍"
          title="Análise em desenvolvimento"
          description="Sua leitura emocional personalizada está sendo preparada. Compartilhe mais sobre seus sentimentos e experiências para gerar insights mais profundos."
          actionText="Fazer diagnóstico"
          onAction={() => {
            // Redirecionar para formulário de diagnóstico
            console.log("Redirecionar para diagnóstico");
          }}
        />
      );
    }

    // Conteúdo seria gerado dinamicamente baseado na análise real
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 border border-violet-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            {sections.find((s) => s.id === activeSection)?.icon}{" "}
            {sections.find((s) => s.id === activeSection)?.title}
          </h3>
          <p className="text-gray-700">
            Conteúdo da seção {activeSection} seria gerado aqui baseado na
            análise real dos dados do usuário.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <DashboardHeader
        title="Cora.Leitura"
        showBackButton={true}
        backHref="/dashboard"
      />

      {/* Conteúdo Principal */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Introdução */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Sua Leitura Emocional
          </h2>
          <p className="text-gray-600 mb-6">
            Uma análise profunda do seu momento emocional atual, baseada em suas
            respostas e interações. Aqui você encontra clareza sobre o que está
            sentindo e caminhos para onde quer ir.
          </p>

          <div className="bg-violet-50 border border-violet-200 rounded-lg p-4">
            <p className="text-violet-800 text-sm">
              <strong>🔮 Análise Personalizada:</strong> Esta leitura é única
              para você e evolui conforme você compartilha mais sobre sua
              jornada.
            </p>
          </div>
        </div>

        {hasAnalysis && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                    activeSection === section.id
                      ? "bg-violet-100 border-violet-300 text-violet-700"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span>{section.icon}</span>
                  <span className="font-medium">{section.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Conteúdo da Seção */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
