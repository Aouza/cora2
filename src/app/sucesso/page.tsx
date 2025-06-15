"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Download, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import { useSearchParams } from "next/navigation";

export default function SucessoPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [sessionVerified, setSessionVerified] = useState(false);
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      // Aqui você pode verificar a sessão com o Stripe se necessário
      // Por enquanto, vamos simular uma verificação bem-sucedida
      setTimeout(() => {
        setSessionVerified(true);
        setIsLoading(false);
      }, 1500);
    } else {
      setIsLoading(false);
    }
  }, [sessionId]);

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
        <div className="max-w-2xl mx-auto px-6 text-center">
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
            <p className="text-xl text-gray-600 mb-8">
              Seu relatório de análise emocional está sendo preparado
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-lg mb-8"
          >
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-purple-500 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-800">
                O que acontece agora?
              </h2>
            </div>

            <div className="space-y-4 text-left">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 mr-4">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Processamento Imediato
                  </h3>
                  <p className="text-gray-600">
                    Nossa IA está analisando os dados que você forneceu
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 mr-4">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Entrega por Email
                  </h3>
                  <p className="text-gray-600">
                    Você receberá seu relatório completo em até 5 minutos
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 mr-4">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Acesso Vitalício
                  </h3>
                  <p className="text-gray-600">
                    Salve o link do seu relatório para consultar sempre que
                    precisar
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="bg-green-100 border border-green-200 rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              📧 Verifique sua caixa de entrada
            </h3>
            <p className="text-green-700">
              Seu relatório será enviado para o email cadastrado. Não esqueça de
              verificar a pasta de spam!
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-8"
          >
            <p className="text-gray-500 text-sm">
              Tem alguma dúvida? Entre em contato conosco através do suporte.
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
