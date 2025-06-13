"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Users,
  Star,
  Shield,
  Zap,
  CheckCircle,
  AlertTriangle,
  Lock,
  Sparkles,
} from "lucide-react";
import Header from "@/components/Header";

export default function PagamentoPage() {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutos
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Testimonial rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const testimonials = [
    {
      text: "Descobri coisas sobre mim que nem eu sabia. Valeu cada centavo!",
      name: "Marina, 28 anos",
    },
    {
      text: "Finalmente entendi por que sempre escolho os caras errados.",
      name: "Carla, 34 anos",
    },
    {
      text: "Me deu a coragem para terminar um relacionamento tóxico.",
      name: "Ana, 26 anos",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <Header />

      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-6">
          {/* Hero Compacto */}
          <div className="text-center mb-12">
            {/* Timer */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full font-bold mb-6"
            >
              <Clock className="w-4 h-4" />
              <span>EXPIRA EM: {formatTime(timeLeft)}</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-5xl font-black text-gray-900 mb-4"
            >
              Seu Relatório Está
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                99% PRONTO
              </span>
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-600 mb-8"
            >
              <span className="text-orange-600 font-bold">ÚLTIMA ETAPA:</span>{" "}
              Desbloqueie seu mapa emocional completo
            </motion.p>
          </div>

          {/* Grid Principal */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Preview do Relatório - Exatamente como na imagem */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="relative"
            >
              {/* Card igual ao da imagem */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 relative overflow-hidden shadow-2xl">
                {/* Badges de garantia no topo (substituindo as tags coloridas) */}
                <div className="flex gap-2 mb-4">
                  <div className="flex items-center gap-1 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    <Shield className="w-3 h-3" />
                    <span>Garantia 7 dias</span>
                  </div>
                  <div className="flex items-center gap-1 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    <Zap className="w-3 h-3" />
                    <span>Acesso imediato</span>
                  </div>
                </div>

                {/* Título visível (como "Super secret passwords") */}
                <h2 className="text-2xl font-bold text-white mb-24">
                  Relatório de Análise
                  <br />
                  Emocional Completo
                </h2>

                {/* Conteúdo em blur atrás */}
                <div className="filter blur-md opacity-40 mb-8">
                  <div className="space-y-3">
                    <div className="h-3 bg-white/30 rounded w-full"></div>
                    <div className="h-3 bg-white/30 rounded w-4/5"></div>
                    <div className="h-3 bg-white/30 rounded w-3/4"></div>
                    <div className="h-3 bg-white/30 rounded w-5/6"></div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 my-6">
                    <div className="h-16 bg-white/20 rounded-lg"></div>
                    <div className="h-16 bg-white/20 rounded-lg"></div>
                  </div>

                  <div className="space-y-3">
                    <div className="h-3 bg-white/30 rounded w-full"></div>
                    <div className="h-3 bg-white/30 rounded w-2/3"></div>
                    <div className="h-3 bg-white/30 rounded w-4/5"></div>
                  </div>
                </div>

                {/* Ícone de cadeado centralizado na frente (como na imagem) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm mb-4">
                    <Lock className="w-8 h-8 text-white" />
                  </div>

                  {/* Copy do preço abaixo do cadeado */}
                  <div className="text-center">
                    <p className="text-gray-400 line-through text-sm mb-1">
                      De R$ 197,00
                    </p>
                    <div className="flex items-center justify-center gap-2 mb-8">
                      <span className="text-3xl font-black text-white">
                        R$ 47,00
                      </span>
                      <div className="text-left">
                        <p className="text-orange-400 font-bold text-xs">
                          APENAS HOJE
                        </p>
                        <p className="text-gray-300 text-xs">76% OFF</p>
                      </div>
                    </div>

                    {/* Botão Receber Relatório */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="
                        inline-flex items-center justify-center gap-2
                        px-8 py-4 
                        bg-gradient-to-r from-purple-600 to-purple-700
                        text-white font-semibold text-sm
                        rounded-full 
                        transition-all duration-300
                        border-0
                      "
                      style={{
                        boxShadow:
                          "0 0 30px rgba(147, 51, 234, 0.6), 0 0 60px rgba(147, 51, 234, 0.3)",
                        filter: "drop-shadow(0 0 20px rgba(147, 51, 234, 0.4))",
                      }}
                    >
                      <Sparkles className="w-4 h-4" />
                      <p className="text-xs"> RECEBER RELATÓRIO</p>
                    </motion.button>
                  </div>
                </div>

                {/* Data/timestamp no canto inferior (como "YESTERDAY") */}
                <div className="absolute bottom-4 left-6 right-6">
                  <div className="flex items-center justify-between text-gray-400 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span className="text-xs">
                        +368 pessoas compraram hoje
                      </span>
                    </div>
                    <span>•••</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Benefícios + Preço */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="space-y-6"
            >
              {/* O que você vai descobrir */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  O que você vai descobrir:
                </h2>
                <div className="space-y-3">
                  {[
                    "Por que você se conecta com essa pessoa",
                    "Os gatilhos emocionais da sua relação",
                    "O que a outra pessoa sente por você",
                    "Estratégias para seu próximo passo",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-gray-700"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonial}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 text-yellow-500 fill-yellow-500"
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 text-sm italic mb-2">
                      "{testimonials[currentTestimonial].text}"
                    </p>
                    <p className="text-purple-600 text-xs font-medium">
                      {testimonials[currentTestimonial].name}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* FAQ Compacto */}
          <div className="mt-12 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 text-center mb-6">
              Dúvidas Frequentes
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              {[
                { q: "É seguro?", a: "100% seguro via SSL" },
                { q: "Quando recebo?", a: "Acesso imediato" },
                { q: "E se não gostar?", a: "7 dias de garantia" },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-4"
                >
                  <h4 className="text-gray-900 font-medium text-sm mb-1">
                    {faq.q}
                  </h4>
                  <p className="text-gray-600 text-xs">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
