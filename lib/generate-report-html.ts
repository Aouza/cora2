import { ReactElement } from "react";
import { renderToString } from "react-dom/server";
import EmotionalAnalysisReport, {
  ReportData,
} from "@/components/EmotionalAnalysisReport";

/**
 * Gera HTML do relatório emocional baseado nos dados fornecidos
 * @param reportData - Dados estruturados do relatório
 * @returns HTML string do relatório completo
 */
export function generateReportHTML(reportData: ReportData): string {
  // Renderiza o componente React para HTML
  const reportElement = EmotionalAnalysisReport({
    data: reportData,
    isPreview: false,
  });

  const reportHTML = renderToString(reportElement as ReactElement);

  // Template HTML completo com estilos Tailwind
  const fullHTML = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Relatório Cora.Deep - ${reportData.profileName}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
    body { font-family: 'Inter', sans-serif; }
    @media print {
      body { print-color-adjust: exact; }
      .no-print { display: none !important; }
    }
  </style>
</head>
<body class="bg-gray-50 p-8">
  ${reportHTML}
</body>
</html>`;

  return fullHTML;
}

/**
 * Exemplo de como usar - pode ser chamado na API de geração de relatórios
 */
export function generateSampleReport(): string {
  const sampleData: ReportData = {
    reportNumber: Date.now().toString(),
    profileName: "Ana Carolina",
    profileAge: 32,
    profileCity: "Rio de Janeiro",
    connectionDuration: "1 ano e 3 meses",
    relationshipType: "Relacionamento sério com intermitências",
    compatibilityScore: 78,
    compatibilityLevel: "Alta compatibilidade emocional",

    diagnosis: {
      mainInsight:
        "Sua conexão demonstra uma base sólida de afeto mútuo, mas enfrenta desafios relacionados a",
      highlightedText: "comunicação de expectativas e gestão de ansiedade",
      secondaryInsight:
        "Os padrões de aproximação e distanciamento observados indicam",
      warningText:
        "necessidade de estabelecer limites saudáveis e comunicação clara",
    },

    patterns: {
      mainPattern: {
        title: "Padrão de Ansiedade Antecipatória",
        description:
          "Você tende a criar cenários negativos quando não há comunicação por períodos longos, interpretando silêncio como desinteresse ou problemas na relação.",
      },
      sabotagePattern: {
        title: "Comportamento de Validação Excessiva",
        description:
          "Busca constante por confirmações de afeto pode estar gerando pressão e afastamento, criando um ciclo contraproducente.",
      },
    },

    recommendations: {
      doList: [
        "Estabelecer acordos claros sobre frequência de comunicação",
        "Praticar técnicas de mindfulness para ansiedade",
        "Focar no desenvolvimento pessoal e hobbies individuais",
        "Comunicar necessidades de forma assertiva, não passiva",
      ],
      avoidList: [
        "Bombardear com mensagens quando não há resposta",
        "Fazer suposições sobre o que o silêncio significa",
        "Usar chantagem emocional para obter atenção",
        "Negligenciar suas próprias necessidades emocionais",
      ],
    },

    prognosis: {
      evolutionChance: 78,
      timeFrame: "2-4 semanas",
      longTermCompatibility: "Muito Alta",
    },
  };

  return generateReportHTML(sampleData);
}

/**
 * Converte dados de formulário em estrutura ReportData
 * Esta função pode ser expandida para mapear respostas específicas do formulário
 */
export function mapFormDataToReportData(
  formResponses: any,
  aiAnalysis: string
): ReportData {
  // Aqui você implementaria a lógica para extrair dados estruturados
  // da análise da IA e das respostas do formulário

  // Por enquanto, retorna um template que pode ser preenchido
  return {
    reportNumber: Date.now().toString(),
    profileName: formResponses.name || "Cliente",
    profileAge: formResponses.age || 25,
    profileCity: formResponses.city || "Não informado",
    connectionDuration: formResponses.duration || "Não especificado",
    relationshipType: formResponses.relationshipType || "Em análise",
    compatibilityScore: 75, // Seria calculado baseado na análise
    compatibilityLevel: "Compatibilidade moderada",

    diagnosis: {
      mainInsight: "Baseado na análise das suas respostas, identificamos que",
      highlightedText: "sua situação requer atenção especializada",
      secondaryInsight: "Os padrões observados sugerem",
      warningText: "necessidade de mudanças comportamentais específicas",
    },

    patterns: {
      mainPattern: {
        title: "Padrão Identificado",
        description:
          "Análise detalhada dos padrões será inserida aqui baseada na resposta da IA.",
      },
      sabotagePattern: {
        title: "Comportamento a Ajustar",
        description:
          "Recomendações específicas baseadas na análise individual.",
      },
    },

    recommendations: {
      doList: [
        "Recomendação específica 1",
        "Recomendação específica 2",
        "Recomendação específica 3",
      ],
      avoidList: [
        "Comportamento a evitar 1",
        "Comportamento a evitar 2",
        "Comportamento a evitar 3",
      ],
    },

    prognosis: {
      evolutionChance: 70,
      timeFrame: "4-6 semanas",
      longTermCompatibility: "Moderada",
    },
  };
}
