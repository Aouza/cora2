import {
  FileText,
  Brain,
  Mail,
  ArrowRight,
  Clock,
  Shield,
  Zap,
} from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      icon: FileText,
      title: "Você preenche",
      subtitle: "Dados básicos e situação atual",
      description:
        "Preencha um formulário rápido com informações essenciais: nomes, datas de nascimento e como está a situação entre vocês agora.",
      details: [
        "Apenas dados básicos necessários",
        "Processo rápido em 2 minutos",
        "Máxima privacidade garantida",
      ],
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      number: "02",
      icon: Brain,
      title: "Nossa IA analisa",
      subtitle: "Processamento inteligente",
      description:
        "Nossa inteligência artificial, treinada em milhares de casos, identifica padrões ocultos e insights únicos da sua situação.",
      details: [
        "IA treinada em 50.000+ casos",
        "Análise em menos de 2 minutos",
        "Precisão de 94% comprovada",
      ],
      color: "from-violet-500 to-purple-500",
      bgColor: "bg-violet-50",
      borderColor: "border-violet-200",
    },
    {
      number: "03",
      icon: Mail,
      title: "Você recebe a verdade",
      subtitle: "Relatório completo por email",
      description:
        "Receba um relatório detalhado com diagnóstico, padrões identificados e recomendações práticas para sua situação específica.",
      details: [
        "Relatório de 3-4 páginas",
        "Recomendações personalizadas",
        "Prognóstico da situação",
      ],
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
  ];

  return (
    <div className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Como o{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">
              Cora
            </span>{" "}
            funciona?
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            É bem simples: você preenche, nossa IA analisa e você recebe a
            verdade sobre sua situação
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Linha conectora - Desktop */}
          <div className="hidden lg:block absolute top-24 left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
            <div className="flex justify-between items-center px-32">
              <div className="w-32 h-0.5 bg-gradient-to-r from-blue-300 to-violet-300"></div>
              <div className="w-32 h-0.5 bg-gradient-to-r from-violet-300 to-green-300"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Card */}
                <div
                  className={`${step.bgColor} ${step.borderColor} border-2 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group`}
                >
                  {/* Número e Ícone */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-6xl font-black text-slate-200 group-hover:text-slate-300 transition-colors">
                      {step.number}
                    </div>
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Título */}
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-violet-600 font-medium mb-4">
                    {step.subtitle}
                  </p>

                  {/* Descrição */}
                  <p className="text-slate-700 leading-relaxed mb-6">
                    {step.description}
                  </p>

                  {/* Detalhes */}
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li
                        key={detailIndex}
                        className="flex items-center gap-2 text-sm text-slate-600"
                      >
                        <div className="w-1.5 h-1.5 bg-violet-400 rounded-full"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Seta conectora - Mobile */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-6">
                    <ArrowRight className="w-6 h-6 text-violet-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Features adicionais */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 bg-white rounded-2xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">Processo Rápido</h4>
              <p className="text-sm text-slate-600">
                Análise completa em menos de 5 minutos
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white rounded-2xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-violet-600" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">
                100% Confidencial
              </h4>
              <p className="text-sm text-slate-600">
                Seus dados são protegidos e nunca compartilhados
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white rounded-2xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">
                Resultados Imediatos
              </h4>
              <p className="text-sm text-slate-600">
                Relatório enviado direto no seu email
              </p>
            </div>
          </div>
        </div>

        {/* CTA final */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-3 bg-white rounded-2xl px-8 py-4 shadow-lg">
            <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">R$</span>
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold text-slate-900">
                Apenas R$ 9,90
              </div>
              <div className="text-sm text-slate-500">
                Pagamento único • Sem mensalidades
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
