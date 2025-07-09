"use client";

import { useState } from "react";
import Link from "next/link";

export default function LeituraEmocional() {
  const [activeSection, setActiveSection] = useState("diagnostico");

  const sections = [
    { id: "diagnostico", title: "Diagnóstico Emocional", icon: "💭" },
    { id: "padroes", title: "Padrões Identificados", icon: "🔍" },
    { id: "vinculos", title: "Análise de Vínculos", icon: "🔗" },
    { id: "reconstrucao", title: "Caminhos de Reconstrução", icon: "🌱" },
    { id: "prognostico", title: "Prognóstico Emocional", icon: "🌅" },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "diagnostico":
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 border border-violet-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                💭 Diagnóstico Emocional do Término
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Estado Emocional Atual
                  </h4>
                  <p className="text-gray-700">
                    Você está atravessando um período de{" "}
                    <strong>luto amoroso ativo</strong>, onde a dor se manifesta
                    principalmente através de saudade nostálgica e
                    questionamentos sobre o futuro. Sua capacidade de processar
                    emoções está funcionando, mas em ritmo acelerado.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Principais Emoções Identificadas
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded-lg border">
                      <span className="text-lg">💔</span>
                      <span className="ml-2 text-sm font-medium">
                        Dor da perda (85%)
                      </span>
                    </div>
                    <div className="bg-white p-3 rounded-lg border">
                      <span className="text-lg">🌫️</span>
                      <span className="ml-2 text-sm font-medium">
                        Confusão (70%)
                      </span>
                    </div>
                    <div className="bg-white p-3 rounded-lg border">
                      <span className="text-lg">🕳️</span>
                      <span className="ml-2 text-sm font-medium">
                        Vazio (60%)
                      </span>
                    </div>
                    <div className="bg-white p-3 rounded-lg border">
                      <span className="text-lg">🌱</span>
                      <span className="ml-2 text-sm font-medium">
                        Esperança (40%)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">
                O que isso significa?
              </h4>
              <p className="text-gray-700 leading-relaxed">
                Seu coração está fazendo exatamente o que deveria fazer:{" "}
                <strong>sentir profundamente</strong>. A intensidade da sua dor
                é proporcional à intensidade do que vocês viveram. Isso não é
                fraqueza — é humanidade.
              </p>
            </div>
          </div>
        );

      case "padroes":
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                🔍 Padrões Emocionais da Relação
              </h3>

              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Padrão de Apego Identificado
                  </h4>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="font-medium">
                      Apego Ansioso com Tendência à Idealização
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm">
                    Você tende a se conectar profundamente e rapidamente,
                    criando vínculos intensos. Quando a relação termina, a
                    sensação de perda é amplificada porque parte da sua
                    identidade estava entrelaçada com a relação.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 border">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Dinâmica Relacional
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span>🔄</span>
                      <span>Ciclos de proximidade e distanciamento</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>💭</span>
                      <span>Overthinking sobre sinais e comportamentos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🎭</span>
                      <span>
                        Tendência a adaptar-se ao que o outro precisava
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">
                Como isso te afeta agora?
              </h4>
              <p className="text-gray-700 leading-relaxed">
                Reconhecer esses padrões não é para se culpar, mas para se{" "}
                <strong>entender</strong>. Agora você pode escolher
                conscientemente como quer se relacionar — consigo mesma e com
                futuras conexões.
              </p>
            </div>
          </div>
        );

      case "vinculos":
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                🔗 Análise de Vínculos
              </h3>

              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Força do Vínculo
                  </h4>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div className="bg-green-500 h-3 rounded-full w-[85%]"></div>
                  </div>
                  <p className="text-sm text-gray-600">
                    85% - Vínculo Profundo
                  </p>
                  <p className="text-gray-700 text-sm mt-2">
                    Vocês criaram uma conexão que vai além do romântico —
                    envolveu identificação, cumplicidade e projeção de futuro.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border">
                    <h5 className="font-medium text-gray-900 mb-2">
                      O que ainda te prende
                    </h5>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Memórias compartilhadas intensas</li>
                      <li>• Planos que foram interrompidos</li>
                      <li>• Medo de não encontrar conexão similar</li>
                      <li>• Partes de você que só ele conhecia</li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-lg p-4 border">
                    <h5 className="font-medium text-gray-900 mb-2">
                      O que pode te libertar
                    </h5>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Reconhecer seu valor independente</li>
                      <li>• Integrar as lições aprendidas</li>
                      <li>• Aceitar que é possível amar de novo</li>
                      <li>• Redescobrir quem você é sozinha</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "reconstrucao":
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                🌱 Caminhos de Reconstrução
              </h3>

              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Fase Atual: Reorganização
                  </h4>
                  <p className="text-gray-700 text-sm mb-3">
                    Você está na fase onde a dor começa a dar lugar à
                    curiosidade sobre quem você é fora desta relação. É o
                    momento ideal para reconstrução consciente.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                      <h5 className="font-medium text-green-800 mb-1">
                        Próximas 2 semanas
                      </h5>
                      <p className="text-xs text-green-700">
                        Foco na estabilização emocional
                      </p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <h5 className="font-medium text-blue-800 mb-1">
                        Próximo mês
                      </h5>
                      <p className="text-xs text-blue-700">
                        Redescoberta de interesses pessoais
                      </p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                      <h5 className="font-medium text-purple-800 mb-1">
                        Próximos 3 meses
                      </h5>
                      <p className="text-xs text-purple-700">
                        Abertura para novas possibilidades
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Práticas Recomendadas
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-lg">📝</span>
                      <div>
                        <h5 className="font-medium text-gray-900">
                          Escrita Terapêutica
                        </h5>
                        <p className="text-sm text-gray-600">
                          15 min/dia para processar sentimentos
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-lg">🧘</span>
                      <div>
                        <h5 className="font-medium text-gray-900">
                          Mindfulness
                        </h5>
                        <p className="text-sm text-gray-600">
                          Para ancorar no presente quando a saudade apertar
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-lg">🌱</span>
                      <div>
                        <h5 className="font-medium text-gray-900">
                          Novos Projetos
                        </h5>
                        <p className="text-sm text-gray-600">
                          Algo só seu, que ninguém pode tirar
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "prognostico":
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-6 border border-orange-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                🌅 Prognóstico Emocional
              </h3>

              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Cenário de Recuperação
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium">
                        Prognóstico: Positivo com tendência a crescimento
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm">
                      Baseado no seu perfil emocional e capacidade de insight,
                      você tem todas as condições para não apenas se recuperar,
                      mas emergir desta experiência com maior autoconhecimento e
                      maturidade emocional.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border">
                    <h5 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                      <span>📈</span>
                      Pontos Fortes
                    </h5>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Alta capacidade de autorreflexão</li>
                      <li>• Abertura para crescimento</li>
                      <li>• Inteligência emocional desenvolvida</li>
                      <li>• Rede de apoio presente</li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-lg p-4 border">
                    <h5 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                      <span>⚠️</span>
                      Pontos de Atenção
                    </h5>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Tendência ao overthinking</li>
                      <li>• Idealização de relacionamentos</li>
                      <li>• Autocobrança excessiva</li>
                      <li>• Medo de vulnerabilidade</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg p-4 border border-violet-200">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Sua Palavra-Chave
                  </h4>
                  <div className="text-center">
                    <span className="text-2xl font-bold text-violet-600">
                      RENASCIMENTO
                    </span>
                    <p className="text-sm text-gray-700 mt-2">
                      Este fim é, na verdade, um convite para você se
                      redescobrir e florescer de uma forma que talvez não fosse
                      possível dentro da relação.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <div className="w-8 h-8 bg-purple-100 rounded-xl flex items-center justify-center">
                  <span className="text-lg">🧾</span>
                </div>
                <h1 className="text-xl font-bold text-gray-900">
                  Sua Leitura Emocional
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Navegação */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm sticky top-8">
              <h3 className="font-semibold text-gray-900 mb-4">
                Seções do Relatório
              </h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                      activeSection === section.id
                        ? "bg-violet-100 text-violet-700 font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span className="text-lg">{section.icon}</span>
                    <span className="text-sm">{section.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Conteúdo Principal */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Seu Mapa Interno
              </h2>
              <p className="text-gray-600">
                Uma leitura simbólica criada especialmente para você, baseada no
                seu momento atual e no que você compartilhou sobre sua situação.
              </p>
            </div>

            {renderContent()}

            {/* Próximos Passos */}
            <div className="mt-8 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Próximos Passos Recomendados
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  href="/dashboard/guia"
                  className="p-4 border border-gray-200 rounded-lg hover:border-violet-300 transition-colors"
                >
                  <div className="text-lg mb-2">📚</div>
                  <h4 className="font-medium text-gray-900 mb-1">
                    Explore o Cora.Guia
                  </h4>
                  <p className="text-sm text-gray-600">
                    Conteúdos curados para seu momento
                  </p>
                </Link>

                <Link
                  href="/dashboard/mural"
                  className="p-4 border border-gray-200 rounded-lg hover:border-violet-300 transition-colors"
                >
                  <div className="text-lg mb-2">🧱</div>
                  <h4 className="font-medium text-gray-900 mb-1">
                    Visite o Mural
                  </h4>
                  <p className="text-sm text-gray-600">
                    Conecte-se com outros em processo
                  </p>
                </Link>

                <div className="p-4 border border-gray-200 rounded-lg bg-violet-50">
                  <div className="text-lg mb-2">💬</div>
                  <h4 className="font-medium text-gray-900 mb-1">
                    Sessão Individual
                  </h4>
                  <p className="text-sm text-gray-600">
                    Aprofunde sua leitura com um especialista
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
