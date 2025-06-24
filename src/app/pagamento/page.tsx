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
  ArrowRight,
  Timer,
  Flame,
  CreditCard,
  Globe,
  Heart,
  TrendingUp,
  Award,
  DollarSign,
} from "lucide-react";
import Header from "@/components/Header";
import { useCheckout } from "@/hooks/useCheckout";

export default function PagamentoPage() {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutos
  const { isLoading, createCheckoutSession } = useCheckout();

  // ID do preço no Stripe
  const PRICE_ID =
    process.env.NEXT_PUBLIC_STRIPE_PRICE_ID || "price_1234567890";

  const handleCheckout = async () => {
    try {
      // Recuperar dados do usuário do localStorage
      const userData = localStorage.getItem("cora_user_data");
      const parsedUserData = userData ? JSON.parse(userData) : null;

      if (!parsedUserData) {
        window.location.href = "/";
        return;
      }

      await createCheckoutSession(PRICE_ID, parsedUserData);
    } catch (error) {
      console.error("Erro no checkout:", error);
    }
  };

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const benefits = [
    {
      icon: <TrendingUp className="w-5 h-5 text-green-500" />,
      text: "Pare de perder tempo em relacionamentos sem futuro",
    },
    {
      icon: <Heart className="w-5 h-5 text-red-500" />,
      text: "Entenda se vale a pena investir energia nessa pessoa",
    },
    {
      icon: <Award className="w-5 h-5 text-purple-500" />,
      text: "Quebre padrões destrutivos de uma vez por todas",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-blue-500" />,
      text: "Transforme ansiedade em clareza e paz mental",
    },
  ];

  const urgencyReasons = [
    "Sua análise foi gerada com base nos seus dados únicos",
    "Cada momento de dúvida é energia desperdiçada",
    "A promoção de R$ 9,90 pode terminar a qualquer momento",
    "Você merece viver sem essa ansiedade emocional",
  ];

  const guarantees = [
    {
      icon: <Shield className="w-5 h-5 text-green-500" />,
      title: "Garantia de 7 Dias",
      desc: "Se não trouxer clareza, devolvemos seu dinheiro",
    },
    {
      icon: <Lock className="w-5 h-5 text-blue-500" />,
      title: "100% Privado",
      desc: "Seus dados são protegidos e anônimos",
    },
    {
      icon: <Zap className="w-5 h-5 text-yellow-500" />,
      title: "Acesso Imediato",
      desc: "Receba sua análise em até 5 minutos",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      <Header />

      <main className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-6">
          {/* HERO - DOR E URGÊNCIA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            {/* Badge de urgência */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 animate-pulse">
              <Timer className="w-4 h-4" />
              TEMPO LIMITADO: {formatTime(timeLeft)}
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-4">
              Sua Análise Está{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                Pronta
              </span>
              .
            </h1>

            <p className="text-xl md:text-2xl text-slate-700 font-semibold mb-4">
              Não deixe a resposta que você precisa escapar.
            </p>

            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Sua análise emocional personalizada foi gerada com base nos dados
              que você forneceu.
              <br />
              <strong className="text-slate-800">
                Falta apenas um passo para acessar sua clareza.
              </strong>
            </p>
          </motion.div>

          {/* SEÇÃO PRINCIPAL - LAYOUT FOCADO */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* COLUNA ESQUERDA - BENEFÍCIOS */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200 mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-500" />O Que Você
                  Vai Descobrir Hoje:
                </h2>

                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className="flex items-start gap-3 p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border border-slate-100"
                    >
                      {benefit.icon}
                      <p className="text-slate-700 font-medium">
                        {benefit.text}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* SEÇÃO DE URGÊNCIA */}
              <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-2xl border-2 border-red-200">
                <h3 className="text-lg font-bold text-red-800 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Por Que Não Esperar Mais:
                </h3>
                <div className="space-y-3">
                  {urgencyReasons.map((reason, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-slate-700 text-sm">{reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* COLUNA DIREITA - CTA E PREÇO */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-1"
            >
              <div className="bg-white p-8 rounded-3xl shadow-2xl border-2 border-blue-200 sticky top-8">
                {/* PREÇO PRINCIPAL */}
                <div className="text-center mb-6">
                  <div className="bg-gradient-to-r from-red-100 to-orange-100 p-4 rounded-2xl mb-4">
                    <div className="flex items-center justify-center gap-2 text-red-600 font-bold text-sm mb-2">
                      <Flame className="w-4 h-4" />
                      OFERTA ESPECIAL ATIVA
                    </div>
                    <div className="text-slate-500 line-through text-lg mb-1">
                      De R$ 47,00
                    </div>
                    <div className="text-4xl font-black text-slate-900 mb-1">
                      R$ 9,90
                    </div>
                    <div className="text-sm text-slate-600">
                      Pagamento único • Sem mensalidades
                    </div>
                  </div>
                </div>

                {/* BOTÃO PRINCIPAL */}
                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 mb-6 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Processando...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      DESBLOQUEAR MINHA ANÁLISE
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                {/* MÉTODOS DE PAGAMENTO */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 text-sm text-slate-500 mb-2">
                    <Globe className="w-4 h-4" />
                    Pagamento 100% seguro via Stripe
                  </div>
                  <div className="flex items-center justify-center gap-4 text-xs text-slate-400">
                    <span>💳 Cartão</span>
                    <span>🏦 PIX</span>
                    <span>📱 Apple Pay</span>
                    <span>🔐 Google Pay</span>
                  </div>
                </div>

                {/* GARANTIAS */}
                <div className="space-y-3">
                  {guarantees.map((guarantee, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-sm"
                    >
                      {guarantee.icon}
                      <div>
                        <div className="font-semibold text-slate-800">
                          {guarantee.title}
                        </div>
                        <div className="text-slate-600 text-xs">
                          {guarantee.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* SEÇÃO DE COMPARAÇÃO RÁPIDA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-slate-900 text-white p-8 rounded-3xl mb-12"
          >
            <h2 className="text-2xl font-bold text-center mb-8">
              Compare: R$ 9,90 vs Outras Opções
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-slate-800 rounded-xl border border-red-500">
                <div className="text-red-400 font-bold mb-2">❌ Terapia</div>
                <div className="text-2xl font-bold text-red-400 mb-2">
                  R$ 300+
                </div>
                <div className="text-sm text-slate-400">
                  Por sessão + tempo de espera
                </div>
              </div>

              <div className="text-center p-4 bg-slate-800 rounded-xl border border-red-500">
                <div className="text-red-400 font-bold mb-2">❌ Coach</div>
                <div className="text-2xl font-bold text-red-400 mb-2">
                  R$ 200+
                </div>
                <div className="text-sm text-slate-400">
                  Por hora + agenda lotada
                </div>
              </div>

              <div className="text-center p-4 bg-gradient-to-br from-green-700 to-blue-700 rounded-xl border-2 border-green-400">
                <div className="text-green-300 font-bold mb-2">✅ Cora IA</div>
                <div className="text-3xl font-bold text-white mb-2">
                  R$ 9,90
                </div>
                <div className="text-sm text-green-300">
                  Resultado em 5 minutos
                </div>
              </div>
            </div>
          </motion.div>

          {/* DEPOIMENTOS RÁPIDOS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-white p-8 rounded-3xl shadow-xl"
          >
            <h2 className="text-2xl font-bold text-center text-slate-900 mb-8">
              O Que Outros Descobriram:
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    M
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">Marina</div>
                    <div className="text-xs text-slate-600">
                      ✅ Cliente Verificada
                    </div>
                  </div>
                </div>
                <p className="text-slate-700 text-sm italic">
                  "Economizei meses de terapia. A análise foi certeira e me deu
                  a paz que eu precisava para tomar uma decisão."
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    C
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">Carlos</div>
                    <div className="text-xs text-slate-600">
                      ✅ Cliente Verificado
                    </div>
                  </div>
                </div>
                <p className="text-slate-700 text-sm italic">
                  "Finalmente entendi por que eu sempre escolho os mesmos tipos
                  de pessoa. Isso mudou tudo para mim."
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA FINAL */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="text-center mt-12"
          >
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-3xl border-2 border-purple-200">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Sua Clareza Está a Um Clique de Distância
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Não deixe mais um dia passar em dúvida.
                <br />
                <strong>Sua paz mental vale R$ 9,90.</strong>
              </p>

              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-5 rounded-xl font-bold text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    Processando...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6" />
                    QUERO MINHA ANÁLISE AGORA
                    <ArrowRight className="w-6 h-6" />
                  </>
                )}
              </button>

              <div className="mt-4 text-sm text-slate-500">
                ⏰ Tempo restante: {formatTime(timeLeft)} • 🔒 Pagamento 100%
                seguro
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
