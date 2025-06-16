"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Download, Sparkles, Send } from "lucide-react";
import Header from "@/components/Header";
import { useSearchParams } from "next/navigation";

function SucessoContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [sessionVerified, setSessionVerified] = useState(false);
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [emailSending, setEmailSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    console.log("🎉 Página de sucesso carregada");
    console.log("🆔 Session ID:", sessionId);

    if (sessionId) {
      console.log("✅ Session ID encontrado, finalizando loading...");

      setTimeout(() => {
        setSessionVerified(true);
        setIsLoading(false);
        localStorage.removeItem("cora_user_data");
        console.log("🧹 localStorage limpo");

        setDebugInfo({
          sessionId,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          url: window.location.href,
        });
      }, 500);
    } else {
      console.log("❌ Session ID não encontrado");
      setIsLoading(false);
    }
  }, [sessionId]);

  // Função simplificada para teste
  const handleTestEmail = () => {
    console.log("🚀 BOTÃO CLICADO! Iniciando teste...");
    alert("🚀 Função handleTestEmail chamada!");

    if (!sessionId) {
      console.error("❌ Session ID não encontrado!");
      alert("❌ Session ID não encontrado!");
      return;
    }

    console.log("🆔 Session ID encontrado:", sessionId);
    setEmailSending(true);
    setMessage("Enviando email...");

    // Fazer a requisição
    fetch("/api/simulate-webhook-fast", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId }),
    })
      .then((response) => {
        console.log("📥 Resposta recebida, status:", response.status);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then((result) => {
        console.log("✅ Resultado:", result);
        if (result.success) {
          setEmailSent(true);
          setMessage(`✅ Email enviado para: ${result.recipient}!`);
          alert(`✅ Email enviado com sucesso para: ${result.recipient}!`);
        } else {
          setMessage(`❌ Erro: ${result.error}`);
          alert(`❌ Erro: ${result.error}`);
        }
      })
      .catch((error) => {
        console.error("❌ Erro na requisição:", error);
        setMessage(`❌ Erro: ${error.message}`);
        alert(`❌ Erro: ${error.message}`);
      })
      .finally(() => {
        console.log("🏁 Finalizando...");
        setEmailSending(false);
      });
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

          {/* Botão de teste simplificado */}
          {sessionId && !emailSent && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mb-8"
            >
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                  🚧 Ambiente de Desenvolvimento
                </h3>
                <p className="text-yellow-700 mb-4">
                  Clique no botão abaixo para enviar o relatório por email:
                </p>

                <button
                  onClick={handleTestEmail}
                  disabled={emailSending}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  type="button"
                >
                  {emailSending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      🧪 Enviar Email de Teste
                    </>
                  )}
                </button>

                {/* Botão de teste básico */}
                <button
                  onClick={() => {
                    console.log("🔥 BOTÃO BÁSICO CLICADO!");
                    alert("🔥 Botão básico funcionando!");
                  }}
                  className="ml-3 inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
                  type="button"
                >
                  🔥 Teste Básico
                </button>

                {message && (
                  <div className="mt-4 p-3 bg-white rounded-lg border">
                    <p className="text-sm">{message}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {emailSent && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="bg-green-100 border border-green-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  ✅ Email Enviado!
                </h3>
                <p className="text-green-700">
                  Seu relatório foi enviado com sucesso! Verifique sua caixa de
                  entrada e pasta de spam.
                </p>
              </div>
            </motion.div>
          )}

          {/* Debug Info */}
          {debugInfo && (
            <div className="mt-8 bg-gray-100 rounded-lg p-4 text-left">
              <h4 className="font-bold mb-2">🐛 Debug Info:</h4>
              <pre className="text-xs overflow-auto">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </div>
          )}
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
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-green-700 font-medium">Carregando...</p>
          </div>
        </div>
      }
    >
      <SucessoContent />
    </Suspense>
  );
}
