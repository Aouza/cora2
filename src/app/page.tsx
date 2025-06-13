"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Inter } from "next/font/google";
import {
  Star,
  ChevronRight,
  HeartPulse,
  Sparkles,
  Pencil,
  BrainCircuit,
  MessageSquareHeart,
  Repeat,
  Target,
  Lock,
  Users,
  Eye,
  FilePen,
  Bot,
  Award,
  ShieldCheck,
  Check,
  History,
  Puzzle,
  Drama,
  Recycle,
  MessageSquareQuote,
  ClipboardCheck,
  Compass,
  Scale,
  ShieldQuestion,
  Zap,
  Lightbulb,
} from "lucide-react";
import Header from "@/components/Header";
import { TypeAnimation } from "react-type-animation";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { ReportMockup } from "@/components/ReportMockup";
import DiagnosticSection from "@/components/DiagnosticSection";

const inter = Inter({ subsets: ["latin"] });

const howItWorksSteps = [
  {
    title: "1. Preencha os Dados",
    description: "Forneça os nomes e datas de nascimento. Simples e rápido.",
    icon: <Pencil className="w-5 h-5 text-red-500" />,
    bgColor: "bg-red-50",
    iconBg: "bg-red-100",
  },
  {
    title: "2. Análise por IA",
    description: "Nossa IA cruza os dados para revelar a dinâmica da conexão.",
    icon: <Sparkles className="w-5 h-5 text-green-500" />,
    bgColor: "bg-green-50",
    iconBg: "bg-green-100",
  },
  {
    title: "3. Receba o Diagnóstico",
    description: "Um relatório completo com insights e conselhos práticos.",
    bgColor: "bg-blue-50",
    iconBg: "bg-blue-100",
  },
];

function DocumentIcon({ className }: { className?: string }) {
  return (
    <div
      className={`bg-white/60 backdrop-blur-md rounded-lg shadow-lg border border-slate-100 p-4 ${className} flex flex-col`}
    >
      <div className="h-2 w-1/3 bg-slate-200/80 rounded-sm mb-4"></div>
      <div className="space-y-2 flex-grow">
        <div className="h-1.5 w-full bg-slate-200/80 rounded-sm"></div>
        <div className="h-1.5 w-[90%] bg-slate-200/80 rounded-sm"></div>
        <div className="h-1.5 w-full bg-slate-200/80 rounded-sm"></div>
        <div className="h-1.5 w-5/6 bg-slate-200/80 rounded-sm"></div>
      </div>
      <div className="mt-5 flex justify-between items-center">
        <div className="flex items-center gap-0.5">
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <Star className="h-4 w-4 text-yellow-400/50 fill-yellow-400/50" />
        </div>
        <HeartPulse className="h-5 w-5 text-pink-500/70" />
      </div>
    </div>
  );
}

const features = [
  {
    title: "Análise da Dinâmica",
    description:
      "Revelamos a estrutura da sua conexão, mostrando os padrões de atração e conflito.",
    icon: "🧩",
  },
  {
    title: "Pontos de Bloqueio",
    description:
      "Identificamos os principais obstáculos que impedem a evolução.",
    icon: "🚫",
  },
  {
    title: "Potencial de Resolução",
    description: "Avaliamos os caminhos possíveis para um desfecho mais claro.",
    icon: "🗺️",
  },
  {
    title: "Conselhos Práticos",
    description:
      "Oferecemos insights para você tomar decisões com mais segurança.",
    icon: "💡",
  },
];

const testimonials = [
  {
    quote:
      "Nunca vi nossa história com tanta clareza. Doeu, mas me deu uma paz que eu não sentia há anos. Foi libertador.",
    name: "Ana C.",
    company: "Relatório de Reconciliação",
    avatar: "/avatars/avatar-1.png",
  },
  {
    quote:
      "Achava que era só mais uma dessas coisas da internet. Mas foi como conversar com alguém que me entendia de verdade.",
    name: "Marcos V.",
    company: "Relatório de Fortalecimento",
    avatar: "/avatars/avatar-2.png",
  },
  {
    quote:
      "Finalmente entendi por que eu não conseguia seguir em frente. Foi o ponto final que eu precisava pra começar de novo.",
    name: "Juliana P.",
    company: "Relatório de Atração",
    avatar: "/avatars/avatar-3.png",
  },
];

const sectionVariants = {
  offscreen: {
    opacity: 0,
    y: 50,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 1,
    },
  },
};

const staggeredListVariants = {
  offscreen: {
    opacity: 0,
  },
  onscreen: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const staggeredGridVariants = {
  offscreen: {
    opacity: 0,
  },
  onscreen: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  offscreen: {
    opacity: 0,
    y: 30,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

export default function LandingPage() {
  return (
    <div className={`bg-white text-slate-800 ${inter.className}`}>
      <Header />

      {/* Hero Section */}
      <main className="relative isolate overflow-hidden pt-32 sm:pt-40 pb-24">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#eab308] to-[#a855f7] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8 grid lg:grid-cols-2 gap-x-12 items-center">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
            >
              <span className="inline-flex items-center justify-center gap-x-2 rounded-full bg-violet-100/80 px-4 py-1.5 text-xs sm:text-sm font-semibold text-violet-700 ring-1 ring-inset ring-violet-200">
                🔍 IA Emocional + Análise Profunda
              </span>
              <span className="inline-flex items-center justify-center gap-x-2 rounded-full bg-violet-100/80 px-4 py-1.5 text-xs sm:text-sm font-semibold text-violet-700 ring-1 ring-inset ring-violet-200">
                ✅ 1.200+ Relatórios Gerados
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-5xl"
            >
              Descubra o mapa emocional da sua relação
              <br />
              <span className="text-violet-600">
                gerado com IA, feito pra você
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-lg leading-8 text-slate-600"
            >
              Entenda os padrões emocionais e descubra insights transformadores
              sobre seu relacionamento
            </motion.p>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-10 flex items-center justify-center lg:justify-start gap-x-6"
            >
              <Link
                href="/formulario"
                className="inline-flex items-center bg-slate-900 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-slate-800 transition-all duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
              >
                <span>Quero minha análise</span>
                <Sparkles className="w-5 h-5 ml-2 text-yellow-400" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-x-6 gap-y-3"
            >
              <div className="flex items-center gap-x-2 text-sm text-slate-600">
                <Lock className="w-4 h-4 text-violet-600" />
                <span>100% Anônimo</span>
              </div>
              <div className="flex items-center gap-x-2 text-sm text-slate-600">
                <BrainCircuit className="w-4 h-4 text-violet-600" />
                <span>Geração única com IA</span>
              </div>
              <div className="flex items-center gap-x-2 text-sm text-slate-600">
                <ChevronRight className="w-4 h-4 text-violet-600" />
                <span>Entrega em 3 minutos</span>
              </div>
            </motion.div>
          </div>

          <div className="hidden lg:flex justify-center items-center mt-16 lg:mt-0">
            <ReportMockup />
          </div>
        </div>
      </main>

      {/* What is Cora Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {/* Left Column: Text */}
            <div className="lg:pr-4">
              <div className="relative text-center lg:text-left">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  🧠 O que é o Cora e por que funciona?
                </h2>
                <p className="mt-6 text-base text-slate-600 sm:text-lg">
                  O Cora é uma análise emocional simbólica, feita sob medida
                  para a sua conexão. Sem papo de signo, sem autoajuda genérica.
                </p>
                <p className="mt-4 text-base text-slate-600 sm:text-lg">
                  É uma leitura profunda, feita por IA emocional, que traduz
                  padrões, sentimentos e caminhos reais em um mapa direto,
                  simbólico e acionável.
                </p>
              </div>
            </div>

            {/* Right Column: Cards */}
            <div className="space-y-4 lg:pl-4">
              {[
                {
                  text: "Por que você sente o que sente (e se isso é real ou projeção)",
                },
                {
                  text: "Onde as coisas começaram a dar errado (ou a se fortalecer)",
                },
                {
                  text: "Qual o ciclo invisível que prende ou distancia vocês",
                },
                {
                  text: "E o principal: o que fazer com tudo isso agora",
                  isStrong: true,
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-start gap-4 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100"
                >
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-violet-100">
                    <Check className="h-5 w-5 text-violet-600" />
                  </div>
                  <p
                    className={`pt-1 text-slate-700 ${
                      item.isStrong ? "font-semibold text-slate-800" : ""
                    }`}
                  >
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pain Point Identification Section */}
      <section id="pain-points" className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-5xl px-6 lg:px-8 text-center">
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
          >
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              👉 Você já sentiu que tem algo entre vocês…
              <br className="hidden sm:inline" /> mas não sabe o que é?
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-base text-slate-600 sm:text-lg">
              Às vezes parece intenso demais, outras, leve demais. Às vezes
              parece certo, mas algo trava. Seja qual for o momento, entender a
              verdade dessa conexão pode mudar tudo.
            </p>
          </motion.div>
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggeredGridVariants}
            className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
          >
            {[
              {
                icon: Compass,
                title: "Quer entender por que essa pessoa mexe tanto com você?",
                description:
                  "Uma análise profunda para clarear os sentimentos e as dinâmicas da sua conexão.",
              },
              {
                icon: Scale,
                title:
                  "Sente que está vivendo uma relação boa, mas algo ainda confunde?",
                description:
                  "Identifique os pontos de harmonia e as dissonâncias que podem ser a chave para um próximo nível.",
              },
              {
                icon: Repeat,
                title:
                  "Está sempre entre o impulso de se jogar e o medo de se frustrar?",
                description:
                  "Receba uma perspectiva externa para entender o ciclo de aproximação e afastamento.",
              },
              {
                icon: ShieldQuestion,
                title:
                  "Tudo parece certo, mas você não sente aquela segurança emocional?",
                description:
                  "Descubra as bases da sua conexão e o que é preciso para construir uma confiança mútua.",
              },
              {
                icon: Zap,
                title:
                  "A química é real, mas você quer saber se é recíproca ou projeção?",
                description:
                  "Diferencie a atração genuína das projeções e expectativas que podem gerar confusão.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex flex-col items-start text-left"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-violet-100">
                  <item.icon className="w-6 h-6 text-violet-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mt-5">
                  {item.title}
                </h3>
                <p className="text-slate-600 mt-2">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 sm:py-28 bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 lg:px-8 text-center">
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
          >
            <h2 className="text-base font-semibold leading-7 text-violet-600">
              Você só precisa de 3 passos
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Nada de longos testes, só o que importa.
            </p>
          </motion.div>
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggeredGridVariants}
            className="relative mt-16 grid grid-cols-1 md:grid-cols-3 items-start gap-x-8 gap-y-12"
          >
            <div className="absolute top-1/2 left-0 w-full h-px border-t-2 border-dashed border-slate-300 -translate-y-1/2 hidden md:block"></div>

            {[
              {
                icon: FilePen,
                title: "1. Preencha os dados",
                text: "Você fornece nomes, datas e o contexto da relação.",
              },
              {
                icon: Bot,
                title: "2. A IA analisa",
                text: "Nossa IA processa os padrões e a dinâmica da sua conexão.",
              },
              {
                icon: Award,
                title: "3. Receba a clareza",
                text: "Sua análise chega em minutos, pronta para ser lida.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative flex flex-col items-center text-center bg-slate-50 z-10 p-6"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-violet-100 ring-8 ring-slate-50">
                  <step.icon className="w-7 h-7 text-violet-600" />
                </div>
                <h3 className="mt-3 text-lg font-semibold text-slate-900 sm:mt-5">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm text-slate-600 sm:mt-2">
                  {step.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <DiagnosticSection />

      {/* Report Preview Section */}
      <section id="preview" className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
            className="text-center"
          >
            <p className="font-semibold text-violet-600">
              👀 Veja um trecho real do relatório gerado
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Um gostinho do que você vai descobrir
            </h2>
          </motion.div>
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
            className="mt-12 p-8 rounded-2xl bg-slate-900 text-slate-300 font-mono text-base shadow-2xl shadow-violet-500/10 ring-1 ring-slate-800"
          >
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500"></span>
              <span className="h-3 w-3 rounded-full bg-yellow-400"></span>
              <span className="h-3 w-3 rounded-full bg-green-500"></span>
              <p className="ml-4 text-sm text-slate-400">
                analise-emocional.txt
              </p>
            </div>
            <div className="mt-6 border-t border-slate-700 pt-6">
              <TypeAnimation
                sequence={[
                  'Análise de Conexão: [Pessoa A] e [Pessoa B]\n\n# Fase 1: A Dinâmica Central\nA interação é marcada por uma dualidade: a busca por um porto seguro emocional (sentimento de familiaridade, conforto) e uma tensão constante gerada pela necessidade de transformação pessoal de ambos. É um cabo de guerra entre o desejo de ficar junto como antes e a necessidade de evoluir para algo novo.\n\n# Fase 2: Padrão de Comunicação\nObserva-se um padrão de "comunicação implícita". Muito é dito no silêncio, nas ações e nas entrelinhas. Isso gera um campo fértil para mal-entendidos, onde as expectativas de um não são verbalizadas e, portanto, não são atendidas pelo outro...\n\n# Fase 3: Pontos de Bloqueio\nO principal bloqueio é o medo. Medo de que, ao mudar, a conexão se perca. Medo de que a vulnerabilidade necessária para o próximo passo seja recebida com rejeição. Este medo alimenta um ciclo de afastamento e reaproximação...',
                  2000,
                ]}
                wrapper="span"
                speed={60}
                cursor={true}
                repeat={0}
                style={{ whiteSpace: "pre-wrap", display: "block" }}
              />
            </div>
            <p className="mt-6 text-center text-sm text-slate-400 italic">
              Sua análise vem ainda mais completa que isso.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
            variants={sectionVariants}
            className="relative overflow-hidden flex flex-col md:flex-row items-center gap-6 md:gap-8 rounded-2xl bg-slate-50 p-8 border border-slate-200"
          >
            <Sparkles className="absolute -top-4 -right-4 w-24 h-24 text-violet-200/70 opacity-50" />
            <div className="relative flex-shrink-0 text-4xl">🛡️</div>
            <div className="relative text-center md:text-left">
              <h3 className="text-xl font-bold text-slate-900">
                ✨ Garantia de Clareza: ou você sente o valor, ou não paga.
              </h3>
              <p className="mt-3 text-slate-600">
                Se em até 7 dias você sentir que a análise não fez diferença
                para você, nós devolvemos o valor. Sem burocracia, sem
                julgamento.
                <br className="hidden sm:block" />
                <span className="font-medium text-slate-700">
                  A intenção aqui é clareza, não dúvida.
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="relative isolate overflow-hidden bg-slate-50 py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
            className="mx-auto max-w-2xl lg:text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              O que dizem sobre a Cora
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Relatos de quem parou de adivinhar e começou a entender de
              verdade.
            </p>
          </motion.div>
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
            className="mx-auto mt-16 flow-root"
          >
            <TestimonialsCarousel />
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-slate-950" />
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#a855f7] to-[#eab308] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-4xl py-24 px-6 text-center sm:py-32 lg:px-8">
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
            variants={sectionVariants}
          >
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              <span className="block text-4xl sm:text-5xl font-bold tracking-tight text-white">
                Chega de incerteza.
              </span>
              <span className="mt-2 block text-2xl sm:text-3xl font-medium text-violet-200">
                Receba a clareza que você precisa para seguir em frente.
              </span>
            </h2>
            <div className="mt-10">
              <Link
                href="/formulario"
                className="inline-flex items-center bg-white text-slate-900 px-8 py-4 rounded-full text-lg font-bold shadow-2xl shadow-white/20 transition-transform duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span>Pedir minha análise agora</span>
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
              <p className="mt-4 text-xs text-violet-300">
                <span className="opacity-80">🔒</span> Seguro e Anônimo{" "}
                <span className="opacity-80">| ⏱️</span> Entrega em até 3
                minutos
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="bg-white py-8 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center text-sm text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} Cora. Todos os direitos
            reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
