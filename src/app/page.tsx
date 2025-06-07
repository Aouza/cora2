"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const steps = [
  {
    title: "Preencha seus dados",
    description: "Conte sobre você e a pessoa, sem julgamentos.",
    icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
        <circle cx="18" cy="18" r="18" fill="#ede9fe" />
        <path
          d="M12 18h12M12 22h8"
          stroke="#7c3aed"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Análise emocional",
    description: "Nossa IA analisa padrões e sentimentos únicos.",
    icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
        <circle cx="18" cy="18" r="18" fill="#dbeafe" />
        <path
          d="M18 12v12M12 18h12"
          stroke="#2563eb"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Receba seu diagnóstico",
    description: "Um relatório íntimo, direto e personalizado.",
    icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
        <circle cx="18" cy="18" r="18" fill="#f0fdf4" />
        <path
          d="M12 16l6 6 6-6"
          stroke="#22c55e"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const benefits = [
  {
    text: "Descubra padrões invisíveis que afetam sua relação",
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#ede9fe" />
        <path
          d="M10 16l4 4 8-8"
          stroke="#7c3aed"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    text: "Entenda sentimentos que você não consegue explicar",
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#dbeafe" />
        <path
          d="M16 10v8M16 22h.01"
          stroke="#2563eb"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    text: "Receba conselhos reais para agir com clareza",
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#f0fdf4" />
        <path
          d="M12 20l8-8M12 12h8v8"
          stroke="#22c55e"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const testimonials = [
  {
    text: "Nunca vi nossa história com tanta clareza. Me deu paz.",
    author: "Ana, 28 anos",
    icon: (
      <svg width="40" height="40" fill="none" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="20" fill="#ede9fe" />
        <path
          d="M20 14a6 6 0 0 1 6 6c0 2.5-2 4.5-6 8-4-3.5-6-5.5-6-8a6 6 0 0 1 6-6Z"
          fill="#7c3aed"
        />
      </svg>
    ),
  },
  {
    text: "Foi como conversar com alguém que me conhecia mais do que eu mesmo.",
    author: "Pedro, 32 anos",
    icon: (
      <svg width="40" height="40" fill="none" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="20" fill="#dbeafe" />
        <path
          d="M20 14a6 6 0 0 1 6 6c0 2.5-2 4.5-6 8-4-3.5-6-5.5-6-8a6 6 0 0 1 6-6Z"
          fill="#2563eb"
        />
      </svg>
    ),
  },
  {
    text: "Achei que ia doer. E doeu. Mas foi a melhor coisa que li esse ano.",
    author: "Marina, 25 anos",
    icon: (
      <svg width="40" height="40" fill="none" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="20" fill="#f0fdf4" />
        <path
          d="M20 14a6 6 0 0 1 6 6c0 2.5-2 4.5-6 8-4-3.5-6-5.5-6-8a6 6 0 0 1 6-6Z"
          fill="#22c55e"
        />
      </svg>
    ),
  },
];

const logos = [
  { name: "AMONDO" },
  { name: "fullstory" },
  { name: "YEEZY" },
  { name: "Iceland" },
  { name: "Shortcut" },
];

const faqs = [
  {
    question: "Isso é só mais um horóscopo bonito?",
    answer:
      "Não. É uma leitura emocional personalizada, sem clichês ou signos.",
  },
  {
    question: "É seguro?",
    answer:
      "Totalmente confidencial. Seus dados são usados só para gerar o relatório.",
  },
  {
    question: "Em quanto tempo recebo?",
    answer:
      "Em minutos. Depois do pagamento, o relatório já começa a ser gerado.",
  },
];

const reportPreview = {
  text: "Vocês foram o furacão um do outro. Mas também a bússola...",
  blur: true,
};

const targetAudience = [
  "Já tentou seguir em frente, mas ainda sente algo",
  "Sente que a relação tem algo que ninguém entende",
  "Quer clareza emocional sem papo de autoajuda",
  "Gosta de ouvir a verdade — mesmo que doa",
];

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <div className={`min-h-screen bg-white ${inter.className}`}>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Ilustração SVG decorativa */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-30 pointer-events-none select-none z-0">
          <svg
            viewBox="0 0 600 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse
              cx="300"
              cy="150"
              rx="280"
              ry="100"
              fill="#a78bfa"
              fillOpacity="0.18"
            />
            <ellipse
              cx="300"
              cy="180"
              rx="180"
              ry="60"
              fill="#a78bfa"
              fillOpacity="0.12"
            />
          </svg>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Descubra o{" "}
            <span className="text-violet-600">verdadeiro significado</span> da
            sua conexão
            <span className="inline-block align-middle ml-2">💜</span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            Um diagnóstico emocional único, feito sob medida para sua história.
            Entenda padrões, sentimentos e caminhos possíveis para o seu
            relacionamento.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <Link
              href="/formulario"
              className="inline-block bg-gradient-to-r from-slate-900 to-slate-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2"
            >
              Quero meu diagnóstico
              <span className="ml-2 align-middle">✨</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Storytelling Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.05),transparent_50%)]"></div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="text-center space-y-6 text-lg text-slate-700 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="font-medium">
              Você já se pegou revivendo conversas antigas?
            </p>
            <p>Já sentiu que algo entre vocês ainda pulsa, mesmo separados?</p>
            <p>
              Ou talvez vocês estejam juntos… mas parece que sempre voltam ao
              mesmo ponto.
            </p>
            <p className="font-semibold text-violet-600 text-xl">
              Não é só você. Existe uma estrutura emocional entre vocês — e ela
              pode ser lida.
            </p>
          </motion.div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 text-center mb-12">
            Como funciona
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center border border-violet-50 hover:shadow-lg transition-all"
              >
                <div className="mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-base">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 text-center mb-12">
            O que você vai descobrir
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center border border-violet-100 hover:shadow-lg transition-all"
              >
                <div className="mb-4">{benefit.icon}</div>
                <p className="text-slate-700 text-base font-medium">
                  {benefit.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 text-center mb-12">
            O que dizem sobre o diagnóstico
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow p-8 flex flex-col items-center text-center border border-violet-100 hover:shadow-lg transition-all"
              >
                <div className="mb-4">{t.icon}</div>
                <p className="text-slate-700 text-base mb-4">“{t.text}”</p>
                <span className="text-violet-700 font-semibold text-sm">
                  {t.author}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROVA SOCIAL */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-slate-700 mb-6">
            +1200 diagnósticos gerados com 92% de satisfação
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 opacity-70">
            {logos.map((logo, i) => (
              <span
                key={i}
                className="text-slate-500 text-base font-bold tracking-wide uppercase"
              >
                {logo.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Report Preview */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.05),transparent_50%)]"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-violet-100 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-white opacity-90"></div>
            <h3 className="text-2xl font-semibold mb-4 text-slate-800 font-clash font-[600]">
              Preview do Relatório
            </h3>
            <div className="relative">
              <div className="text-lg text-slate-700 leading-relaxed">
                {reportPreview.text}
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white"></div>
            </div>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-violet-600">
              <span className="text-xl">🔒</span>
              <span>acesso completo só após o pagamento</span>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.05),transparent_50%)]"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-800 font-clash font-[700]">
            O relatório é pra você se...
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {targetAudience.map((item, index) => (
              <motion.div
                key={index}
                className="group flex items-center space-x-3 p-4 rounded-xl bg-white shadow-md border border-violet-100 hover:border-violet-200 transition-all hover:shadow-lg hover:-translate-x-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <span className="text-violet-500 text-xl group-hover:scale-110 transition-transform">
                  🟣
                </span>
                <p className="text-slate-700 leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.05),transparent_50%)]"></div>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-lg border border-violet-100 backdrop-blur-sm bg-opacity-90"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-2xl font-semibold text-slate-800 mb-4 font-clash font-[600]">
              Mais de 1.200 diagnósticos gerados com 92% de satisfação
            </p>
            <div className="flex justify-center space-x-4">
              <span className="text-violet-600 flex items-center gap-1">
                <span className="text-xl">🔒</span>
                <span>100% confidencial</span>
              </span>
              <span className="text-violet-600 flex items-center gap-1">
                <span className="text-xl">✨</span>
                <span>Exclusivo e personalizado</span>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 text-center mb-12">
            Perguntas frequentes
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow p-6 border border-violet-100 flex items-start gap-4"
              >
                <div className="mt-1">
                  <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
                    <circle
                      cx="14"
                      cy="14"
                      r="14"
                      fill="#a78bfa"
                      fillOpacity="0.18"
                    />
                    <path
                      d="M14 8v6m0 4h.01"
                      stroke="#7c3aed"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    {faq.question}
                  </h3>
                  <p className="text-slate-700 text-base">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white text-center relative overflow-hidden">
        {/* Radial violeta decorativo no fundo */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.2),transparent_60%)] pointer-events-none select-none"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">
            Pronto para entender o que existe entre vocês?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Receba um diagnóstico emocional único, feito sob medida para sua
            história. Descubra padrões, sentimentos e caminhos possíveis para o
            seu relacionamento.
          </p>
          <Link
            href="/formulario"
            className="inline-block bg-white text-violet-700 font-bold px-8 py-4 rounded-full text-lg shadow-lg hover:bg-violet-100 transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
          >
            Quero meu diagnóstico agora
            <span className="ml-2 align-middle">💜</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
