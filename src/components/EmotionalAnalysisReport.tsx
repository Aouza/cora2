import {
  Heart,
  Calendar,
  User,
  Target,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

export interface ReportData {
  // Informações básicas
  reportNumber: string;
  profileName: string;
  profileAge: number;
  profileCity: string;
  connectionDuration: string;
  relationshipType: string;
  compatibilityScore: number;
  compatibilityLevel: string;

  // Diagnóstico
  diagnosis: {
    mainInsight: string;
    highlightedText: string;
    secondaryInsight: string;
    warningText: string;
  };

  // Padrões detectados
  patterns: {
    mainPattern: {
      title: string;
      description: string;
    };
    sabotagePattern: {
      title: string;
      description: string;
    };
  };

  // Recomendações
  recommendations: {
    doList: string[];
    avoidList: string[];
  };

  // Prognóstico
  prognosis: {
    evolutionChance: number;
    timeFrame: string;
    longTermCompatibility: string;
  };
}

interface EmotionalAnalysisReportProps {
  data: ReportData;
  isPreview?: boolean;
}

export default function EmotionalAnalysisReport({
  data,
  isPreview = false,
}: EmotionalAnalysisReportProps) {
  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-4xl mx-auto border">
      {/* Header do Relatório */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-purple-600 rounded-2xl flex items-center justify-center">
            <Heart className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">
              Análise Emocional Cora.Deep
            </h3>
            <p className="text-sm text-slate-500">
              Relatório Personalizado #{data.reportNumber}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full mb-2">
            CONFIDENCIAL
          </div>
          <p className="text-xs text-slate-500">
            Gerado em {new Date().toLocaleDateString("pt-BR")}
          </p>
        </div>
      </div>

      {/* Informações Básicas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-violet-600" />
            <span className="text-xs font-medium text-slate-600">
              PERFIL ANALISADO
            </span>
          </div>
          <p className="font-semibold text-slate-900">
            {isPreview ? "[NOME CENSURADO]" : data.profileName}
          </p>
          <p className="text-sm text-slate-600">
            {data.profileAge} anos, {isPreview ? "[CIDADE]" : data.profileCity}
          </p>
        </div>

        <div className="bg-slate-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-medium text-slate-600">
              DURAÇÃO DA CONEXÃO
            </span>
          </div>
          <p className="font-semibold text-slate-900">
            {data.connectionDuration}
          </p>
          <p className="text-sm text-slate-600">{data.relationshipType}</p>
        </div>

        <div className="bg-slate-50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-xs font-medium text-slate-600">
              COMPATIBILIDADE
            </span>
          </div>
          <p className="font-semibold text-slate-900">
            {data.compatibilityScore}%
          </p>
          <p className="text-sm text-slate-600">{data.compatibilityLevel}</p>
        </div>
      </div>

      {/* Seções do Relatório */}
      <div className="space-y-6">
        {/* Diagnóstico Principal */}
        <div className="border-l-4 border-violet-500 pl-6 bg-violet-50 rounded-r-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-5 h-5 text-violet-600" />
            <h4 className="font-bold text-slate-900 text-lg">
              💭 Diagnóstico Emocional do Término
            </h4>
          </div>
          <p className="text-slate-700 leading-relaxed mb-3">
            {data.diagnosis.mainInsight}{" "}
            <span className="font-semibold text-violet-700 bg-violet-100 px-2 py-1 rounded">
              {data.diagnosis.highlightedText}
            </span>
            .
          </p>
          <p className="text-slate-700 leading-relaxed">
            {data.diagnosis.secondaryInsight}{" "}
            <span className="bg-yellow-100 px-2 py-1 rounded font-medium">
              {data.diagnosis.warningText}
            </span>
            .
          </p>
        </div>

        {/* Padrões Detectados */}
        <div className="border-l-4 border-orange-500 pl-6 bg-orange-50 rounded-r-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <h4 className="font-bold text-slate-900 text-lg">
              🔍 Padrões Emocionais da Relação
            </h4>
          </div>
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-3 border border-orange-200">
              <p className="font-semibold text-orange-800 mb-1">
                🔍 {data.patterns.mainPattern.title}:
              </p>
              <p className="text-slate-700 text-sm">
                {data.patterns.mainPattern.description}
              </p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-orange-200">
              <p className="font-semibold text-orange-800 mb-1">
                ⚠️ {data.patterns.sabotagePattern.title}:
              </p>
              <p className="text-slate-700 text-sm">
                {data.patterns.sabotagePattern.description}
              </p>
            </div>
          </div>
        </div>

        {/* Recomendações */}
        <div className="border-l-4 border-green-500 pl-6 bg-green-50 rounded-r-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h4 className="font-bold text-slate-900 text-lg">
              🎯 Recomendações para Reconstrução
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <h5 className="font-semibold text-green-800 mb-2">✅ FAZER:</h5>
              <ul className="text-slate-700 text-sm space-y-1">
                {data.recommendations.doList.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4 border border-red-200">
              <h5 className="font-semibold text-red-800 mb-2">❌ EVITAR:</h5>
              <ul className="text-slate-700 text-sm space-y-1">
                {data.recommendations.avoidList.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Prognóstico */}
        <div className="bg-slate-100 rounded-2xl p-6">
          <h4 className="font-bold text-slate-900 mb-3 text-lg">
            🌅 Prognóstico Emocional
          </h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {data.prognosis.evolutionChance}%
              </div>
              <div className="text-xs text-slate-600">
                Chance de cura emocional
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {data.prognosis.timeFrame}
              </div>
              <div className="text-xs text-slate-600">Para reconstrução</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-violet-600">
                {data.prognosis.longTermCompatibility}
              </div>
              <div className="text-xs text-slate-600">
                Potencial de transformação
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 rounded-2xl p-4 text-center border-t-4 border-violet-500">
          <p className="text-slate-600 text-sm mb-2">
            ✨ <strong>Análise completa:</strong> Este relatório contém insights
            detalhados, exercícios práticos e cronograma de ações baseados nas
            suas respostas específicas.
          </p>
          <p className="text-xs text-slate-500">
            Relatório gerado por IA treinada em 50.000+ casos reais • Precisão
            de 94% • Cora.Deep © 2024
          </p>
        </div>
      </div>
    </div>
  );
}
