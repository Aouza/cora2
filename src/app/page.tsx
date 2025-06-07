"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import LetterIcon from "../components/LetterIcon";

const inter = Inter({ subsets: ["latin"] });

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const steps = [
  {
    title: "1. Preencha os dados",
    description: "Forneça os nomes e datas de nascimento. Simples e rápido.",
    icon: <svg>...</svg>,
  },
  {
    title: "2. Geramos a Análise",
    description: "Nossa IA cruza os dados para revelar a dinâmica da conexão.",
  },
  {
    title: "3. Receba o Diagnóstico",
    description: "Um relatório completo com insights e conselhos práticos.",
  },
];

const benefits = [
  {
    title: "Padrões Invisíveis",
    description:
      "Descubra os padrões de comportamento que sabotam a relação sem que vocês percebam.",
    size: "large",
    icon: "🧩",
    gradient: "from-violet-100 to-violet-50",
  },
  {
    title: "Sentimentos Reais",
    description:
      "Entenda por que você sente o que sente, mesmo tentando esquecer.",
    size: "small",
    icon: "❤️‍🔥",
    gradient: "from-blue-100 to-blue-50",
  },
  {
    title: "Verdade vs. Ilusão",
    description:
      "Saiba o que é verdadeiro na conexão e o que pode ser apenas uma projeção.",
    size: "small",
    icon: "🎭",
    gradient: "from-green-100 to-green-50",
  },
  {
    title: "Quebra de Ciclos",
    description:
      "Receba conselhos práticos para parar de repetir os mesmos erros que machucam.",
    size: "large",
    icon: "🔄",
    gradient: "from-orange-100 to-orange-50",
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
      {/* Grid Pontilhado de Fundo */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-5 pointer-events-none select-none z-0"></div>

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
          <div className="mb-8">
            <LetterIcon />
          </div>
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Descubra o{" "}
            <span className="text-violet-600">verdadeiro significado</span> da
            sua conexão
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            Um diagnóstico emocional único, feito sob medida para sua história.
            Entenda padrões, sentimentos e caminhos possíveis para o seu
            relacionamento.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
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

      {/* PROVA SOCIAL SUTIL */}
      <section className="py-16 px-4 text-center">
        <p className="text-sm text-slate-500 mb-6 uppercase tracking-wider">
          Usado por pessoas em busca de clareza
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4 opacity-70">
          <span className="font-medium text-slate-400">Ana C.</span>
          <span className="font-medium text-slate-400">Marcos V.</span>
          <span className="font-medium text-slate-400">Juliana P.</span>
          <span className="font-medium text-slate-400">Fernando R.</span>
          <span className="font-medium text-slate-400">Beatriz S.</span>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="py-24 px-4 bg-slate-50/50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-16">
            Um caminho simples para a clareza
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 border border-slate-100/80 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="mb-5 flex justify-center">{step.icon}</div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS - BENTO GRID */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
              Um Diagnóstico Profundo e Moderno
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Visualizamos sua conexão de uma forma que você nunca viu,
              revelando insights claros e diretos sobre o que realmente importa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                className={`
                  p-8 rounded-3xl border border-slate-200/50 shadow-sm relative overflow-hidden
                  flex flex-col justify-between min-h-[250px]
                  ${
                    benefit.size === "large" ? "md:col-span-2" : "md:col-span-1"
                  }
                  bg-gradient-to-br ${benefit.gradient}
                `}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div>
                  <div className="text-4xl mb-5">{benefit.icon}</div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
                <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-white/40 rounded-full blur-2xl opacity-80"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS - GLASSMORPHISM */}
      <section className="py-24 px-4 relative overflow-hidden">
        {/* Fundo com gradiente decorativo */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-100 via-blue-50 to-white blur-2xl opacity-60 z-0"></div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-16">
            O que dizem sobre o diagnóstico
          </h2>

          <motion.div
            className="flex flex-col items-center justify-center -space-y-24 md:-space-y-32"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
          >
            {testimonials.map((testimonial, i) => {
              const variants = {
                initial: { opacity: 0, y: 50, rotate: 0 },
                animate: {
                  opacity: 1,
                  y: i * 40, // Espaçamento vertical entre os cards
                  rotate: (i - (testimonials.length - 1) / 2) * 5, // Rotação para criar o efeito de leque
                  transition: { type: "spring", stiffness: 50, delay: i * 0.2 },
                },
              };

              return (
                <motion.div
                  key={i}
                  className="w-full max-w-lg p-6 rounded-2xl shadow-lg border border-white/30 bg-white/40 backdrop-blur-xl"
                  variants={variants}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-white/70 flex-shrink-0 flex items-center justify-center shadow-inner">
                      {testimonial.icon}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">
                        {testimonial.author}
                      </p>
                      <p className="text-sm text-slate-600">
                        Cliente Verificado
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-700 leading-relaxed text-left">
                    "{testimonial.text}"
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
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
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-lg text-slate-600">
              Respostas rápidas para as dúvidas mais comuns.
            </p>
          </div>
          <div className="space-y-8">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-slate-200/80 pb-6">
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  {faq.question}
                </h3>
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA - DEDICADO E COM IMPACTO */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.2),transparent_60%)] pointer-events-none select-none"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">
            Pronto para entender o que existe entre vocês?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Receba um diagnóstico emocional único, feito sob medida para sua
            história. Descubra padrões, sentimentos e caminhos possíveis.
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

      {/* RODAPÉ MINIMALISTA */}
      <footer className="py-8 px-4 text-center text-sm text-slate-500 border-t border-slate-100/80">
        <p>
          &copy; {new Date().getFullYear()} Cora. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}
