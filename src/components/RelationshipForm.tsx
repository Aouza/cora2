"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  relationshipFormSchema,
  type RelationshipFormData,
} from "../../db/form-schemas";

interface RelationshipFormProps {
  onAnalyze: (data: RelationshipFormData) => void;
}

export default function RelationshipForm({ onAnalyze }: RelationshipFormProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<RelationshipFormData>({
    resolver: zodResolver(relationshipFormSchema),
    mode: "onChange",
    defaultValues: {
      name1: "",
      email1: "",
      birthdate1: "",
      name2: "",
      birthdate2: "",
      gender1: undefined,
      relationshipStatus: undefined,
    },
  });

  const watchedFields = watch();
  const isFormComplete = Object.values(watchedFields).every(
    (value) => value && value.toString().trim() !== ""
  );

  const onSubmit = async (data: RelationshipFormData) => {
    setIsAnalyzing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simular processamento
      onAnalyze(data);
    } catch (error) {
      console.error("Erro na análise:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-3xl shadow-2xl border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Análise Emocional Personalizada
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Preencha os dados para receber insights profundos sobre sua dinâmica
          relacional
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Seção: Seus Dados */}
        <div className="bg-violet-50 p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="w-8 h-8 bg-violet-600 text-white rounded-full flex items-center justify-center text-sm mr-3">
              1
            </span>
            Seus Dados
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seu Nome Completo
              </label>
              <input
                {...register("name1")}
                type="text"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all ${
                  errors.name1 ? "border-red-300 bg-red-50" : "border-gray-300"
                }`}
                placeholder="Digite seu nome"
              />
              {errors.name1 && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name1.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seu Email
              </label>
              <input
                {...register("email1")}
                type="email"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all ${
                  errors.email1 ? "border-red-300 bg-red-50" : "border-gray-300"
                }`}
                placeholder="seu@email.com"
              />
              {errors.email1 && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email1.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sua Data de Nascimento
              </label>
              <input
                {...register("birthdate1")}
                type="date"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all ${
                  errors.birthdate1
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                }`}
              />
              {errors.birthdate1 && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.birthdate1.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seu Gênero
              </label>
              <select
                {...register("gender1")}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all ${
                  errors.gender1
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                }`}
              >
                <option value="">Selecione</option>
                <option value="feminino">Feminino</option>
                <option value="masculino">Masculino</option>
                <option value="outro">Outro</option>
              </select>
              {errors.gender1 && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.gender1.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Seção: Dados da Outra Pessoa */}
        <div className="bg-purple-50 p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm mr-3">
              2
            </span>
            Dados da Outra Pessoa
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome Completo
              </label>
              <input
                {...register("name2")}
                type="text"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                  errors.name2 ? "border-red-300 bg-red-50" : "border-gray-300"
                }`}
                placeholder="Nome da outra pessoa"
              />
              {errors.name2 && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name2.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data de Nascimento
              </label>
              <input
                {...register("birthdate2")}
                type="date"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                  errors.birthdate2
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                }`}
              />
              {errors.birthdate2 && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.birthdate2.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Seção: Status do Relacionamento */}
        <div className="bg-pink-50 p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center text-sm mr-3">
              3
            </span>
            Status do Relacionamento
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Como vocês estão atualmente?
            </label>
            <select
              {...register("relationshipStatus")}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all ${
                errors.relationshipStatus
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300"
              }`}
            >
              <option value="">Selecione o status</option>
              <option value="namorando">Namorando</option>
              <option value="casado">Casados</option>
              <option value="separados">Separados/Terminamos</option>
              <option value="outros">Outros</option>
            </select>
            {errors.relationshipStatus && (
              <p className="mt-1 text-sm text-red-600">
                {errors.relationshipStatus.message}
              </p>
            )}
          </div>
        </div>

        {/* Botão de Análise */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={!isFormComplete || !isValid || isAnalyzing}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform ${
              isFormComplete && isValid && !isAnalyzing
                ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-700 hover:to-purple-700 hover:scale-105 shadow-lg"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isAnalyzing ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                Analisando sua conexão...
              </div>
            ) : (
              "✨ Gerar Análise Emocional"
            )}
          </button>

          {(!isFormComplete || !isValid) && (
            <p className="mt-3 text-sm text-gray-500 text-center">
              Preencha todos os campos para gerar sua análise
            </p>
          )}
        </div>
      </form>

      {/* Garantia de Privacidade */}
      <div className="mt-8 p-4 bg-gray-50 rounded-xl">
        <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center">
            <span className="mr-2">🔒</span>
            <span>100% Privado</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">🛡️</span>
            <span>Dados Protegidos</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">⚡</span>
            <span>Análise Instantânea</span>
          </div>
        </div>
      </div>
    </div>
  );
}
