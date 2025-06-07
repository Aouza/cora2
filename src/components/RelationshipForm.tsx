"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

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

export default function RelationshipForm() {
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
  const [report, setReport] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);
    setReport(null);
    try {
      const res = await fetch("/api/relatorio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Erro desconhecido");
      setReport(result.report);
      // reset(); // Descomente se quiser limpar o form após sucesso
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
        className="bg-white/90 shadow-xl rounded-3xl px-6 py-8 md:px-8 md:py-10 space-y-6 border border-white/60 backdrop-blur-sm"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
          Formulário do Relacionamento
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Suas Informações */}
          <div className="space-y-2">
            <label
              htmlFor="name1"
              className="block text-sm font-medium text-gray-700"
            >
              Seu Nome
            </label>
            <input
              {...register("name1")}
              type="text"
              id="name1"
              className={`w-full px-4 py-2 rounded-xl border-none bg-gray-100 focus:bg-white focus:ring-2 focus:ring-violet-400 transition-colors text-gray-900 placeholder-gray-400 ${
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
              className="block text-sm font-medium text-gray-700"
            >
              Seu Nascimento
            </label>
            <input
              {...register("birthdate1")}
              type="date"
              id="birthdate1"
              className={`w-full px-4 py-2 rounded-xl border-none bg-gray-100 focus:bg-white focus:ring-2 focus:ring-violet-400 transition-colors text-gray-900 placeholder-gray-400 ${
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
              className="block text-sm font-medium text-gray-700"
            >
              Nome da Pessoa
            </label>
            <input
              {...register("name2")}
              type="text"
              id="name2"
              className={`w-full px-4 py-2 rounded-xl border-none bg-gray-100 focus:bg-white focus:ring-2 focus:ring-violet-400 transition-colors text-gray-900 placeholder-gray-400 ${
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
              className="block text-sm font-medium text-gray-700"
            >
              Nascimento da Pessoa
            </label>
            <input
              {...register("birthdate2")}
              type="date"
              id="birthdate2"
              className={`w-full px-4 py-2 rounded-xl border-none bg-gray-100 focus:bg-white focus:ring-2 focus:ring-violet-400 transition-colors text-gray-900 placeholder-gray-400 ${
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
            <label className="block text-sm font-medium text-gray-700">
              Seu Gênero
            </label>
            <div className="flex gap-4 mt-1">
              <label className="inline-flex items-center">
                <input
                  {...register("gender1")}
                  type="radio"
                  value="male"
                  className="w-4 h-4 text-violet-500 border-gray-300 focus:ring-violet-400"
                />
                <span className="ml-2 text-sm text-gray-700">Masculino</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  {...register("gender1")}
                  type="radio"
                  value="female"
                  className="w-4 h-4 text-violet-500 border-gray-300 focus:ring-violet-400"
                />
                <span className="ml-2 text-sm text-gray-700">Feminino</span>
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
              className="block text-sm font-medium text-gray-700"
            >
              Status do Relacionamento
            </label>
            <select
              {...register("relationshipStatus")}
              id="relationshipStatus"
              className={`w-full px-4 py-2 rounded-xl border-none bg-gray-100 focus:bg-white focus:ring-2 focus:ring-violet-400 transition-colors text-gray-900 ${
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
          className="w-full bg-primary text-white py-3 px-6 rounded-2xl font-semibold text-lg shadow-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Gerando relatório..." : "Enviar"}
        </button>
        {error && (
          <div className="mt-4 text-center text-red-600 text-sm font-medium">
            {error}
          </div>
        )}
      </form>
      {report && (
        <div className="mt-8 p-6 bg-white/80 rounded-2xl shadow border border-gray-100 text-gray-900 whitespace-pre-line">
          <h3 className="text-lg font-bold mb-2 text-primary">
            Seu Relatório Emocional
          </h3>
          <div>{report}</div>
        </div>
      )}
    </>
  );
}
