"use client";
import { motion } from "framer-motion";
import {
  Sparkles,
  Heart,
  Calendar,
  User,
  Target,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import EmotionalAnalysisReport, { ReportData } from "./EmotionalAnalysisReport";

// Dados mockados para preview
const mockReportData: ReportData = {
  reportNumber: "47.382",
  profileName: "Maria Silva",
  profileAge: 28,
  profileCity: "São Paulo",
  connectionDuration: "8 meses",
  relationshipType: "Relacionamento intermitente",
  compatibilityScore: 72,
  compatibilityLevel: "Alta compatibilidade",

  diagnosis: {
    mainInsight:
      "Com base nos padrões identificados, sua conexão apresenta sinais de",
    highlightedText: "interesse genuíno mas com bloqueios emocionais",
    secondaryInsight:
      "A frequência de contato irregular (3-4 dias de intervalo) sugere",
    warningText: "medo de vulnerabilidade emocional, não desinteresse",
  },

  patterns: {
    mainPattern: {
      title: "Padrão Principal",
      description:
        "Você tende a interpretar silêncios como rejeição, quando na verdade podem ser sinais de processamento emocional.",
    },
    sabotagePattern: {
      title: "Comportamento Sabotador",
      description:
        "Cobrança excessiva por respostas rápidas pode estar criando pressão desnecessária.",
    },
  },

  recommendations: {
    doList: [
      "Dar espaço de 2-3 dias entre conversas",
      "Focar em atividades que te fazem bem",
      "Comunicar necessidades de forma clara",
    ],
    avoidList: [
      "Cobrar respostas imediatas",
      "Interpretar silêncios como rejeição",
      "Tomar decisões baseadas em ansiedade",
    ],
  },

  prognosis: {
    evolutionChance: 85,
    timeFrame: "3-6",
    longTermCompatibility: "Alta",
  },
};

export default function ReportMockup() {
  return <EmotionalAnalysisReport data={mockReportData} isPreview={true} />;
}
