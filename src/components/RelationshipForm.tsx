"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

interface FormData {
  name1: string;
  email1: string;
  birthdate1: string;
  name2: string;
  birthdate2: string;
  gender1: "male" | "female";
  relationshipStatus:
    | "reconciliation"
    | "strengthening"
    | "attraction"
    | "complicated";
}

interface RelationshipFormProps {
  onSubmitStart: () => void;
  onReportReady: (report: string) => void;
  report: string | null;
}

const schema = yup.object({
  name1: yup.string().required("Seu nome é obrigatório"),
  email1: yup
    .string()
    .email("Email inválido")
    .required("Seu email é obrigatório"),
  birthdate1: yup.string().required("Sua data de nascimento é obrigatória"),
  name2: yup.string().required("O nome da outra pessoa é obrigatório"),
  birthdate2: yup
    .string()
    .required("A data de nascimento da outra pessoa é obrigatória"),
  gender1: yup
    .string()
    .oneOf(["male", "female"])
    .required("Por favor, selecione seu gênero"),
  relationshipStatus: yup
    .string()
    .oneOf(["reconciliation", "strengthening", "attraction", "complicated"])
    .required("Por favor, selecione o status do relacionamento"),
});

const relationshipStatusOptions = [
  { value: "reconciliation", label: "Não estamos mais juntos" },
  { value: "strengthening", label: "Estamos juntos" },
  { value: "attraction", label: "Ainda não estamos juntos" },
  { value: "complicated", label: "É complicado" },
];

export default function RelationshipForm({
  onSubmitStart,
  onReportReady,
  report,
}: RelationshipFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);

    // Inicia o loading emocional
    onSubmitStart();

    try {
      // Preparar dados do usuário para o checkout (SEM gerar relatório ainda)
      const userData = {
        userName: data.name1,
        userEmail: data.email1,
        userBirthdate: data.birthdate1,
        userGender: data.gender1,
        otherName: data.name2,
        otherBirthdate: data.birthdate2,
        relationshipStatus: data.relationshipStatus,
      };

      // Armazenar dados do usuário no localStorage para usar no checkout
      localStorage.setItem("cora_user_data", JSON.stringify(userData));

      // Simular um relatório temporário para mostrar na tela (sem custo)
      const tempReport = `
# Análise Emocional - ${data.name1} e ${data.name2}

## Preparando sua análise personalizada...

Seus dados foram processados com sucesso! Após a confirmação do pagamento, nossa IA gerará um relatório completo e personalizado sobre a conexão emocional entre **${data.name1}** e **${data.name2}**.

**O que você receberá:**
- Análise profunda da dinâmica emocional
- Insights sobre compatibilidade
- Estratégias para fortalecer a relação
- Conselhos personalizados baseados em IA

*Este relatório será gerado e enviado por email após a confirmação do pagamento.*
      `;

      // Passa o relatório temporário para o componente pai
      onReportReady(tempReport);
    } catch (err: any) {
      setError(err.message || "Erro ao processar dados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-xl rounded-3xl px-6 py-8 sm:px-8 sm:py-10 space-y-8 border border-slate-200 max-w-2xl mx-auto"
      >
        {/* Seção: Suas Informações */}
        <div className="space-y-6">
          <h3 className="text-left text-lg font-semibold text-slate-800 mb-4">
            📋 Suas Informações
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label
                htmlFor="name1"
                className="text-left block text-sm font-semibold text-slate-700 mb-2"
              >
                Seu Nome Completo
              </label>
              <input
                {...register("name1")}
                type="text"
                id="name1"
                className={`w-full px-4 py-3 rounded-xl border-2 bg-slate-50 focus:bg-white focus:border-violet-500 focus:ring-0 transition-all duration-200 text-slate-900 placeholder-slate-400 text-base ${
                  errors.name1 ? "border-red-400 bg-red-50" : "border-slate-200"
                }`}
                placeholder="Ex: Maria Silva"
              />
              {errors.name1 && (
                <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <span className="text-red-500">⚠️</span>
                  {errors.name1.message}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <label
                htmlFor="email1"
                className="text-left block text-sm font-semibold text-slate-700 mb-2"
              >
                Seu Email
              </label>
              <input
                {...register("email1")}
                type="email"
                id="email1"
                className={`w-full px-4 py-3 rounded-xl border-2 bg-slate-50 focus:bg-white focus:border-violet-500 focus:ring-0 transition-all duration-200 text-slate-900 placeholder-slate-400 text-base ${
                  errors.email1
                    ? "border-red-400 bg-red-50"
                    : "border-slate-200"
                }`}
                placeholder="Ex: maria@email.com"
              />
              {errors.email1 && (
                <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <span className="text-red-500">⚠️</span>
                  {errors.email1.message}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <label
                htmlFor="birthdate1"
                className="text-left block text-sm font-semibold text-slate-700 mb-2"
              >
                Sua Data de Nascimento
              </label>
              <input
                {...register("birthdate1")}
                type="date"
                id="birthdate1"
                className={`w-full px-4 py-3 rounded-xl border-2 bg-slate-50 focus:bg-white focus:border-violet-500 focus:ring-0 transition-all duration-200 text-slate-900 text-base ${
                  errors.birthdate1
                    ? "border-red-400 bg-red-50"
                    : "border-slate-200"
                }`}
              />
              {errors.birthdate1 && (
                <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <span className="text-red-500">⚠️</span>
                  {errors.birthdate1.message}
                </p>
              )}
            </div>
          </div>

          {/* Gênero */}
          <div className="space-y-3">
            <label className="text-left block text-sm font-semibold text-slate-700 mb-3">
              Seu Gênero
            </label>
            <div className="flex flex-col sm:flex-row gap-4">
              <label className="inline-flex items-center cursor-pointer group">
                <input
                  {...register("gender1")}
                  type="radio"
                  value="male"
                  className="w-5 h-5 text-violet-600 border-2 border-slate-300 focus:ring-violet-500 focus:ring-2 bg-slate-50"
                />
                <span className="ml-3 text-base text-slate-700 group-hover:text-violet-600 transition-colors">
                  👨 Masculino
                </span>
              </label>
              <label className="inline-flex items-center cursor-pointer group">
                <input
                  {...register("gender1")}
                  type="radio"
                  value="female"
                  className="w-5 h-5 text-violet-600 border-2 border-slate-300 focus:ring-violet-500 focus:ring-2 bg-slate-50"
                />
                <span className="ml-3 text-base text-slate-700 group-hover:text-violet-600 transition-colors">
                  👩 Feminino
                </span>
              </label>
            </div>
            {errors.gender1 && (
              <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                <span className="text-red-500">⚠️</span>
                {errors.gender1.message}
              </p>
            )}
          </div>
        </div>

        {/* Seção: Informações da Outra Pessoa */}
        <div className="space-y-6">
          <h3 className="text-left text-lg font-semibold text-slate-800 mb-4">
            💕 Informações da Outra Pessoa
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label
                htmlFor="name2"
                className="text-left block text-sm font-semibold text-slate-700 mb-2"
              >
                Nome Completo
              </label>
              <input
                {...register("name2")}
                type="text"
                id="name2"
                className={`w-full px-4 py-3 rounded-xl border-2 bg-slate-50 focus:bg-white focus:border-violet-500 focus:ring-0 transition-all duration-200 text-slate-900 placeholder-slate-400 text-base ${
                  errors.name2 ? "border-red-400 bg-red-50" : "border-slate-200"
                }`}
                placeholder="Ex: João Santos"
              />
              {errors.name2 && (
                <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <span className="text-red-500">⚠️</span>
                  {errors.name2.message}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <label
                htmlFor="birthdate2"
                className="text-left block text-sm font-semibold text-slate-700 mb-2"
              >
                Data de Nascimento
              </label>
              <input
                {...register("birthdate2")}
                type="date"
                id="birthdate2"
                className={`w-full px-4 py-3 rounded-xl border-2 bg-slate-50 focus:bg-white focus:border-violet-500 focus:ring-0 transition-all duration-200 text-slate-900 text-base ${
                  errors.birthdate2
                    ? "border-red-400 bg-red-50"
                    : "border-slate-200"
                }`}
              />
              {errors.birthdate2 && (
                <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <span className="text-red-500">⚠️</span>
                  {errors.birthdate2.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Seção: Status do Relacionamento */}
        <div className="space-y-6">
          <h3 className="text-left text-lg font-semibold text-slate-800 mb-4">
            💫 Status do Relacionamento
          </h3>

          <div className="space-y-3">
            <label
              htmlFor="relationshipStatus"
              className="text-left block text-sm font-semibold text-slate-700 mb-2"
            >
              Como vocês estão agora?
            </label>
            <select
              {...register("relationshipStatus")}
              id="relationshipStatus"
              className={`w-full px-4 py-3 rounded-xl border-2 bg-slate-50 focus:bg-white focus:border-violet-500 focus:ring-0 transition-all duration-200 text-slate-900 text-base ${
                errors.relationshipStatus
                  ? "border-red-400 bg-red-50"
                  : "border-slate-200"
              }`}
            >
              <option value="" className="text-slate-400">
                Selecione o status atual...
              </option>
              {relationshipStatusOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className="text-slate-900"
                >
                  {option.label}
                </option>
              ))}
            </select>
            {errors.relationshipStatus && (
              <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                <span className="text-red-500">⚠️</span>
                {errors.relationshipStatus.message}
              </p>
            )}
          </div>
        </div>

        {/* Botão de Envio */}
        <div className="pt-4">
          <button
            type="submit"
            className="
              relative w-full inline-flex items-center justify-center gap-3
              px-8 py-4 
              bg-gradient-to-r from-violet-600 via-violet-600 to-violet-700
              text-white font-bold text-lg
              rounded-2xl 
              transition-all duration-300 ease-in-out
              transform hover:scale-[1.02] active:scale-[0.98]
              focus:outline-none focus:ring-4 focus:ring-violet-300
              backdrop-blur-sm
              border border-violet-400/20
              disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none
              shadow-lg hover:shadow-xl
            "
            style={{
              boxShadow:
                "0 0 20px rgba(139, 92, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              filter: "drop-shadow(0 0 10px rgba(139, 92, 246, 0.2))",
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.boxShadow =
                  "0 0 30px rgba(139, 92, 246, 0.4), 0 0 60px rgba(139, 92, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 20px rgba(139, 92, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)";
            }}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Gerando sua análise...
              </>
            ) : (
              <>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                </svg>
                Gerar Análise Emocional
              </>
            )}
          </button>
        </div>

        {/* Mensagem de Erro */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="text-red-500 text-lg">⚠️</span>
              <p className="text-red-700 font-medium text-sm">{error}</p>
            </div>
          </div>
        )}
      </form>

      {/* Relatório Gerado */}
      {report && (
        <div className="mt-8 p-6 bg-white rounded-2xl shadow-lg border border-slate-200 text-slate-700 whitespace-pre-line max-w-2xl mx-auto">
          <h3 className="text-xl font-bold mb-4 text-slate-800 text-center">
            📊 Seu Relatório Emocional
          </h3>
          <ReactMarkdown children={report} skipHtml />
        </div>
      )}
    </>
  );
}
