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

// Dados mockados para preview - FOCADO EM TÉRMINO
const mockReportData: ReportData = {
  reportNumber: "47.382",
  profileName: "Maria Silva",
  profileAge: 28,
  profileCity: "São Paulo",
  connectionDuration: "1 ano e 4 meses",
  relationshipType: "Relacionamento sério que terminou",
  compatibilityScore: 78,
  compatibilityLevel: "Conexão emocional intensa",

  diagnosis: {
    mainInsight:
      "O término foi tão doloroso porque vocês criaram uma conexão que ia além do",
    highlightedText: "amor romântico - era uma fusão de identidades",
    secondaryInsight:
      "Você não está chorando apenas pelo fim do relacionamento, mas pela",
    warningText: "perda de uma versão de si mesma que só existia com ele",
  },

  patterns: {
    mainPattern: {
      title: "Padrão de Dependência Emocional",
      description:
        "Você construiu sua identidade em torno da relação, perdendo o senso de quem é independentemente dele.",
    },
    sabotagePattern: {
      title: "Idealização e Negação",
      description:
        "Você está idealizando os momentos bons e negando os problemas reais que levaram ao fim.",
    },
  },

  recommendations: {
    doList: [
      "Reconectar com atividades que te fazem única",
      "Processar o luto sem pressa ou julgamento",
      "Explorar quem você é fora da relação",
      "Permitir-se sentir a dor sem tentar fugir",
    ],
    avoidList: [
      "Stalking em redes sociais",
      "Tentar 'ser amigos' antes de se curar",
      "Pular para outro relacionamento",
      "Negar a importância do que vocês viveram",
    ],
  },

  prognosis: {
    evolutionChance: 85,
    timeFrame: "4-8 meses",
    longTermCompatibility: "Transformação pessoal",
  },
};

export default function ReportMockup() {
  return <EmotionalAnalysisReport data={mockReportData} isPreview={true} />;
}
