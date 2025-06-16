"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Send, Clock, Mail, Shield, Zap } from "lucide-react";
import Header from "@/components/Header";
import { useSearchParams } from "next/navigation";

function SucessoContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [sessionVerified, setSessionVerified] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [message, setMessage] = useState("");
  const [resendAttempts, setResendAttempts] = useState(0);
  const [canResend, setCanResend] = useState(true);
  const [cooldownTime, setCooldownTime] = useState(0);
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const MAX_RESEND_ATTEMPTS = 2;
  const COOLDOWN_SECONDS = 60; // 1 minuto

  useEffect(() => {
    if (sessionId) {
      setTimeout(() => {
        setSessionVerified(true);
        setIsLoading(false);
        localStorage.removeItem("cora_user_data");
      }, 500);
    } else {
      setIsLoading(false);
    }
  }, [sessionId]);

  // Timer de cooldown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (cooldownTime > 0) {
      interval = setInterval(() => {
        setCooldownTime((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [cooldownTime]);

  const handleResendEmail = () => {
    if (!sessionId || !canResend || resendAttempts >= MAX_RESEND_ATTEMPTS) {
      return;
    }

    setEmailSending(true);
    setMessage("Reenviando relatório...");
    setCanResend(false);

    fetch("/api/simulate-webhook-fast", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then((result) => {
        if (result.success) {
          setMessage(`✅ Relatório reenviado para: ${result.recipient}!`);
        } else {
          setMessage(`❌ Erro: ${result.error}`);
        }
      })
      .catch((error) => {
        console.error("Erro no reenvio:", error);
        setMessage(`❌ Erro: ${error.message}`);
      })
      .finally(() => {
        setEmailSending(false);
        setResendAttempts((prev) => prev + 1);
        setCooldownTime(COOLDOWN_SECONDS);
      });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-green-700 font-medium">Verificando pagamento...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <Header />

      <main className="pt-24 pb-12">
        <div className="max-w-3xl mx-auto px-6">
          {/* Hero Success */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
              className="mb-8"
            >
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                🎉 Pagamento Confirmado!
              </h1>
              <p className="text-xl text-gray-600 mb-2">
                Seu relatório de análise emocional está sendo preparado
              </p>
              <p className="text-gray-500">
                Você receberá o relatório completo em alguns minutos
              </p>
            </motion.div>
          </div>

          {/* Status Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-800">
                  Pagamento Seguro
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                Processado com segurança pelo Stripe
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800">IA Processando</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Análise personalizada sendo gerada
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-800">Email Enviado</h3>
              </div>
              <p className="text-gray-600 text-sm">Chegará em alguns minutos</p>
            </motion.div>
          </div>

          {/* Instruções */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              📬 O que acontece agora?
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Processamento Automático
                  </h3>
                  <p className="text-gray-600">
                    Nossa IA está analisando seus dados e criando um relatório
                    único e personalizado
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Email Automático
                  </h3>
                  <p className="text-gray-600">
                    Você receberá o relatório completo no email fornecido em até
                    5 minutos
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Verifique Spam
                  </h3>
                  <p className="text-gray-600">
                    Se não encontrar na caixa de entrada, verifique a pasta de
                    spam ou promoções
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Botão de Reenvio */}
          {sessionId && resendAttempts < MAX_RESEND_ATTEMPTS && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center"
            >
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                📧 Não recebeu o email?
              </h3>
              <p className="text-yellow-700 mb-4">
                Use o botão abaixo para reenviar o relatório
                {resendAttempts > 0 && (
                  <span className="block text-sm mt-1">
                    Tentativas restantes: {MAX_RESEND_ATTEMPTS - resendAttempts}
                  </span>
                )}
              </p>

              <button
                onClick={handleResendEmail}
                disabled={emailSending || !canResend}
                className="inline-flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white font-medium px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                type="button"
              >
                {emailSending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Reenviando...
                  </>
                ) : cooldownTime > 0 ? (
                  <>
                    <Clock className="w-4 h-4" />
                    Aguarde {formatTime(cooldownTime)}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Reenviar Relatório
                  </>
                )}
              </button>

              {message && (
                <div className="mt-4 p-3 bg-white rounded-lg border">
                  <p className="text-sm">{message}</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Máximo de tentativas atingido */}
          {resendAttempts >= MAX_RESEND_ATTEMPTS && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-red-50 border border-red-200 rounded-xl p-6 text-center"
            >
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                ⚠️ Limite de Tentativas Atingido
              </h3>
              <p className="text-red-700 mb-4">
                Você já solicitou o reenvio 2 vezes. Se ainda não recebeu o
                email, entre em contato conosco pelo suporte.
              </p>
              <p className="text-red-600 text-sm">
                Verifique sua caixa de spam e pasta de promoções
              </p>
            </motion.div>
          )}

          {/* Footer Info */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-center mt-12 text-gray-500 text-sm"
          >
            <p>
              🔒 Seus dados estão seguros e serão excluídos após o processamento
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default function SucessoPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <SucessoContent />
    </Suspense>
  );
}
