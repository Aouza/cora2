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
    }, 5000);
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
      text: "Não esperava que fosse tão certeiro. Me ajudou a entender o que eu mesmo não conseguia explicar.",
      name: "Lucas, 30 anos",
    },
    {
      text: "Finalmente entendi por que sempre escolho os caras errados.",
      name: "Carla, 34 anos",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <Header />

      <main className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          {/* Hero com Copy Emocional */}
          <div className="text-center mb-16">
            {/* Copy Emocional Otimizada */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-4xl font-bold text-gray-800 mt-8 leading-tight"
            >
              O que você sente tem explicação.
            </motion.h1>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-4xl font-bold mb-6 text-gray-800 leading-tight"
            >
              E já está aqui. 🔓
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="max-w-3xl mx-auto leading-snug"
            >
              Seu mapa emocional foi gerado com base nos dados que você
              preencheu.
            </motion.p>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="max-w-3xl mx-auto leading-snug"
            >
              Agora só falta um passo para desbloquear o que isso revela sobre
              vocês dois.
            </motion.p>
          </div>

          {/* Grid Principal - Layout Otimizado */}
          <div className="lg:grid-cols-5 gap-8 mb-12 items-start">
            {/* Preview do Relatório - Tamanho Reduzido */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="lg:col-span-2 relative"
            >
              {/* Card com tamanho reduzido */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-5 relative overflow-hidden shadow-2xl max-w-sm mx-auto">
                {/* Badges de garantia no topo */}
                <div className="flex gap-2 mb-3">
                  <div className="flex items-center gap-1 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    <Shield className="w-2 h-2" />
                    <span className="text-xs">Garantia 7 dias</span>
                  </div>
                  <div className="flex items-center gap-1 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    <Zap className="w-2 h-2" />
                    <span className="text-xs">Acesso imediato</span>
                  </div>
                </div>

                {/* Título visível */}
                <h2 className="text-center text-white mb-32">
                  Relatório de Análise Emocional Completo
                </h2>

                {/* Conteúdo em blur atrás */}
                <div className="filter blur-md opacity-40 mb-6">
                  <div className="space-y-2">
                    <div className="h-2 bg-white/30 rounded w-full"></div>
                    <div className="h-2 bg-white/30 rounded w-4/5"></div>
                    <div className="h-2 bg-white/30 rounded w-3/4"></div>
                    <div className="h-2 bg-white/30 rounded w-5/6"></div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 my-4">
                    <div className="h-12 bg-white/20 rounded-lg"></div>
                    <div className="h-12 bg-white/20 rounded-lg"></div>
                  </div>

                  <div className="space-y-2">
                    <div className="h-2 bg-white/30 rounded w-full"></div>
                    <div className="h-2 bg-white/30 rounded w-2/3"></div>
                    <div className="h-2 bg-white/30 rounded w-4/5"></div>
                  </div>
                </div>

                {/* Ícone de cadeado centralizado na frente */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm mb-3">
                    <Lock className="w-6 h-6 text-white" />
                  </div>

                  {/* Gatilho de preço otimizado */}
                  <div className="text-center mb-4">
                    <p className="text-orange-400 font-bold text-xs mb-1">
                      🔥 OFERTA ESPECIAL ATIVA
                    </p>
                    <p className="text-gray-400 line-through text-sm mb-1">
                      De R$ 47,00
                    </p>
                    <div className="flex items-center justify-center gap-2 mb-6">
                      <span className="text-2xl font-black text-white">
                        R$ 9,90
                      </span>
                      <div className="text-left">
                        <p className="text-orange-400 font-bold text-xs">
                          APENAS HOJE
                        </p>
                        <p className="text-gray-300 text-xs">90% OFF</p>
                      </div>
                    </div>
                  </div>

                  {/* Botão otimizado */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="
                      inline-flex items-center justify-center gap-2
                      px-6 py-3 
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
                    <span className="text-xs">DESBLOQUEAR AGORA</span>
                  </motion.button>
                </div>

                {/* Social proof no timestamp */}
                <div className="absolute bottom-3 left-4 right-4">
                  <div className="flex items-center justify-between text-gray-400 text-xs">
                    <div className="flex items-center gap-1">
                      <Users className="w-2 h-2" />
                      <span className="text-xs">
                        +368 pessoas compraram hoje
                      </span>
                    </div>
                    <span>•••</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Benefícios + Testemunhos - Expandido */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="lg:col-span-3 space-y-12"
            >
              {/* O que você vai descobrir - Design Moderno */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    O que você vai descobrir
                  </h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto"></div>
                </div>

                <div className="grid gap-6">
                  {[
                    {
                      icon: "💭",
                      title: "Por que você se conecta com essa pessoa",
                      description:
                        "Entenda os padrões inconscientes que criam essa atração",
                    },
                    {
                      icon: "⚡",
                      title: "Os gatilhos emocionais da sua relação",
                      description:
                        "Descubra o que desperta as emoções mais profundas entre vocês",
                    },
                    {
                      icon: "💖",
                      title: "O que a outra pessoa sente por você",
                      description:
                        "Insights sobre os sentimentos e intenções do outro lado",
                    },
                    {
                      icon: "🎯",
                      title: "Estratégias para seu próximo passo",
                      description:
                        "Um plano personalizado baseado na sua situação única",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 + index * 0.1 }}
                      className="group flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-purple-700 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Testemunhos Modernos */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    O que nossos clientes dizem
                  </h3>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                    <span className="ml-2 text-sm font-medium text-gray-600">
                      4.9/5 • +1.200 avaliações
                    </span>
                  </div>
                </div>

                <div className="max-w-2xl mx-auto">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentTestimonial}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5 }}
                      className="bg-white rounded-2xl p-8 shadow-sm border border-white/50 relative"
                    >
                      {/* Quote Icon */}
                      <div className="absolute -top-4 left-8">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-lg font-bold">
                            "
                          </span>
                        </div>
                      </div>

                      <blockquote className="text-lg text-gray-700 leading-relaxed mb-6 italic">
                        "{testimonials[currentTestimonial].text}"
                      </blockquote>

                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {testimonials[currentTestimonial].name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {testimonials[currentTestimonial].name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Cliente verificado
                          </p>
                        </div>
                        <div className="ml-auto">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 text-yellow-400 fill-yellow-400"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Indicadores */}
                  <div className="flex justify-center gap-2 mt-6">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTestimonial(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentTestimonial
                            ? "bg-purple-500 w-6"
                            : "bg-purple-200 hover:bg-purple-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* FAQ Moderno */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-20 max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Dúvidas Frequentes
              </h3>
              <p className="text-gray-600">
                Tudo que você precisa saber antes de começar
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: "🔒",
                  q: "É seguro?",
                  a: "100% seguro via SSL",
                  detail:
                    "Seus dados são protegidos com criptografia de nível bancário",
                },
                {
                  icon: "⚡",
                  q: "Quando recebo?",
                  a: "Acesso imediato",
                  detail: "Relatório enviado automaticamente após o pagamento",
                },
                {
                  icon: "💯",
                  q: "E se não gostar?",
                  a: "7 dias de garantia",
                  detail:
                    "Reembolso total sem perguntas se não ficar satisfeito",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6 + index * 0.1 }}
                  className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-purple-200 transition-all duration-300"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      {faq.icon}
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">
                      {faq.q}
                    </h4>
                    <p className="font-semibold text-purple-600 mb-2">
                      {faq.a}
                    </p>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {faq.detail}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Final */}
            <div className="text-center mt-12">
              <p className="text-gray-600 mb-6">
                Ainda tem dúvidas? Nossa equipe está aqui para ajudar.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all duration-300"
              >
                <span>💬</span>
                Falar com suporte
              </motion.button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
