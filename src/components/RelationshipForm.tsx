"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

interface FormData {
  name1: string;
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
      const res = await fetch("/api/relatorio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: data.name1,
          userBirthdate: data.birthdate1,
          userGender: data.gender1,
          otherName: data.name2,
          otherBirthdate: data.birthdate2,
          relationshipStatus: data.relationshipStatus,
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Erro desconhecido");

      // Passa o relatório para o componente pai
      onReportReady(result.analysis);
    } catch (err: any) {
      setError(err.message || "Erro ao gerar relatório.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-xl rounded-3xl px-6 py-8 md:px-8 md:py-10 space-y-6 border border-violet-100"
      >
        <h2 className="text-xl font-semibold text-slate-800 mb-2 text-center">
          Formulário do Relacionamento
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Suas Informações */}
          <div className="space-y-2">
            <label
              htmlFor="name1"
              className="block text-sm font-medium text-slate-700"
            >
              Seu Nome
            </label>
            <input
              {...register("name1")}
              type="text"
              id="name1"
              className={`w-full px-4 py-2 rounded-xl border-none bg-slate-50 focus:bg-white focus:ring-2 focus:ring-violet-400 transition-colors text-slate-900 placeholder-slate-400 ${
                errors.name1 ? "ring-2 ring-red-400" : ""
              }`}
              placeholder="Digite seu nome"
            />
            {errors.name1 && (
              <p className="text-xs text-red-500 mt-0.5">
                {errors.name1.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="birthdate1"
              className="block text-sm font-medium text-slate-700"
            >
              Seu Nascimento
            </label>
            <input
              {...register("birthdate1")}
              type="date"
              id="birthdate1"
              className={`w-full px-4 py-2 rounded-xl border-none bg-slate-50 focus:bg-white focus:ring-2 focus:ring-violet-400 transition-colors text-slate-900 placeholder-slate-400 ${
                errors.birthdate1 ? "ring-2 ring-red-400" : ""
              }`}
            />
            {errors.birthdate1 && (
              <p className="text-xs text-red-500 mt-0.5">
                {errors.birthdate1.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="name2"
              className="block text-sm font-medium text-slate-700"
            >
              Nome da Pessoa
            </label>
            <input
              {...register("name2")}
              type="text"
              id="name2"
              className={`w-full px-4 py-2 rounded-xl border-none bg-slate-50 focus:bg-white focus:ring-2 focus:ring-violet-400 transition-colors text-slate-900 placeholder-slate-400 ${
                errors.name2 ? "ring-2 ring-red-400" : ""
              }`}
              placeholder="Digite o nome da outra pessoa"
            />
            {errors.name2 && (
              <p className="text-xs text-red-500 mt-0.5">
                {errors.name2.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="birthdate2"
              className="block text-sm font-medium text-slate-700"
            >
              Nascimento da Pessoa
            </label>
            <input
              {...register("birthdate2")}
              type="date"
              id="birthdate2"
              className={`w-full px-4 py-2 rounded-xl border-none bg-slate-50 focus:bg-white focus:ring-2 focus:ring-violet-400 transition-colors text-slate-900 placeholder-slate-400 ${
                errors.birthdate2 ? "ring-2 ring-red-400" : ""
              }`}
            />
            {errors.birthdate2 && (
              <p className="text-xs text-red-500 mt-0.5">
                {errors.birthdate2.message}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Seu Gênero
            </label>
            <div className="flex gap-4 mt-1">
              <label className="inline-flex items-center">
                <input
                  {...register("gender1")}
                  type="radio"
                  value="male"
                  className="w-4 h-4 text-violet-500 border-slate-300 focus:ring-violet-400 bg-slate-50"
                />
                <span className="ml-2 text-sm text-slate-700">Masculino</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  {...register("gender1")}
                  type="radio"
                  value="female"
                  className="w-4 h-4 text-violet-500 border-slate-300 focus:ring-violet-400 bg-slate-50"
                />
                <span className="ml-2 text-sm text-slate-700">Feminino</span>
              </label>
            </div>
            {errors.gender1 && (
              <p className="text-xs text-red-500 mt-0.5">
                {errors.gender1.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="relationshipStatus"
              className="block text-sm font-medium text-slate-700"
            >
              Status do Relacionamento
            </label>
            <select
              {...register("relationshipStatus")}
              id="relationshipStatus"
              className={`w-full px-4 py-2 rounded-xl border-none bg-slate-50 focus:bg-white focus:ring-2 focus:ring-violet-400 transition-colors text-slate-900 ${
                errors.relationshipStatus ? "ring-2 ring-red-400" : ""
              }`}
            >
              <option value="">Status</option>
              {relationshipStatusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.relationshipStatus && (
              <p className="text-xs text-red-500 mt-0.5">
                {errors.relationshipStatus.message}
              </p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="
            relative w-full inline-flex items-center justify-center gap-2
            px-6 py-3 
            bg-gradient-to-r from-violet-600 via-violet-600 to-violet-700
            text-white font-semibold text-lg
            rounded-2xl 
            transition-all duration-300 ease-in-out
            transform hover:scale-[1.02]
            focus:outline-none
            backdrop-blur-sm
            border border-violet-400/20
            disabled:opacity-60 disabled:cursor-not-allowed
          "
          style={{
            boxShadow:
              "0 0 15px rgba(139, 92, 246, 0.3), 0 0 30px rgba(139, 92, 246, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            filter: "drop-shadow(0 0 8px rgba(139, 92, 246, 0.2))",
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.boxShadow =
                "0 0 20px rgba(139, 92, 246, 0.4), 0 0 40px rgba(139, 92, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow =
              "0 0 15px rgba(139, 92, 246, 0.3), 0 0 30px rgba(139, 92, 246, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)";
          }}
          disabled={loading}
        >
          {loading ? "Gerando relatório..." : "Enviar"}
          {!loading && (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
            </svg>
          )}
        </button>
        {error && (
          <div className="mt-4 text-center text-red-500 text-sm font-medium">
            {error}
          </div>
        )}
      </form>
      {report && (
        <div className="mt-8 p-6 bg-white rounded-2xl shadow border border-violet-100 text-slate-700 whitespace-pre-line">
          <h3 className="text-lg font-bold mb-2 text-slate-800">
            Seu Relatório Emocional
          </h3>
          <ReactMarkdown children={report} skipHtml />
        </div>
      )}
    </>
  );
}
