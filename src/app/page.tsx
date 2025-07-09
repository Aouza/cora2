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
  Clock,
  TrendingUp,
  AlertTriangle,
  X,
  DollarSign,
  Shield,
  Timer,
  Flame,
  ArrowRight,
  Heart,
  MessageCircle,
} from "lucide-react";
import Header from "@/components/Header";
import { TypeAnimation } from "react-type-animation";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import EmotionalNetworkVisualization from "@/components/EmotionalNetworkVisualization";
import IdentificationSection from "@/components/IdentificationSection";
import ProductExplanationSection from "@/components/ProductExplanationSection";
import WhyItWorksSection from "@/components/WhyItWorksSection";
import PainPointsSection from "@/components/PainPointsSection";
import CoraDeepHero from "@/components/CoraDeepHero";

import HowItWorksSection from "@/components/HowItWorksSection";
import ReportMockup from "@/components/ReportMockup";

const inter = Inter({ subsets: ["latin"] });

// Pain points ÍNTIMOS e SIMBÓLICOS - FOCO EM TÉRMINOS
const painPoints = [
  {
    icon: <Heart className="w-5 h-5" />,
    pain: "Sinto que ainda tô esperando uma mensagem que nunca vai chegar",
    details:
      "Mesmo sabendo que acabou, uma parte de mim ainda fica na expectativa",
    solution: "Entenda o que essa espera significa e como se libertar dela",
  },
  {
    icon: <MessageCircle className="w-5 h-5" />,
    pain: "Fico pensando: será que eu interpretei tudo errado?",
    details: "Me questiono se o que senti era real ou se criei uma ilusão",
    solution: "Descubra a verdade sobre o que vocês viveram juntos",
  },
  {
    icon: <Clock className="w-5 h-5" />,
    pain: "Acordo de madrugada com o peito apertado, pensando nele(a)",
    details: "Parece que meu corpo ainda não entendeu que acabou",
    solution: "Compreenda por que seu sistema emocional ainda está preso",
  },
  {
    icon: <Users className="w-5 h-5" />,
    pain: "Me sinto como se tivesse perdido uma parte de mim",
    details: "Não sei mais quem eu sou sem essa pessoa na minha vida",
    solution: "Redescubra sua identidade além desse relacionamento",
  },
  {
    icon: <Repeat className="w-5 h-5" />,
    pain: "Tenho medo de que isso sempre aconteça comigo",
    details: "Sinto que carrego algo que faz as pessoas me abandonarem",
    solution: "Identifique e transforme os padrões que te sabotam",
  },
];

// Benefícios clean - FOCO EM RECONSTRUÇÃO PÓS-TÉRMINO
const benefits = [
  {
    icon: <Zap className="w-6 h-6 text-violet-600" />,
    title: "Clareza sobre o término em minutos",
    description: "Entenda por que dói tanto e o que essa dor significa",
  },
  {
    icon: <Target className="w-6 h-6 text-violet-600" />,
    title: "Análise simbólica personalizada",
    description: "Baseada na sua história específica de término",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-violet-600" />,
    title: "Sem julgamento, só transformação",
    description: "Foco na cura e reconstrução emocional",
  },
  {
    icon: <Clock className="w-6 h-6 text-violet-600" />,
    title: "Acelere sua recuperação",
    description: "Evite meses de sofrimento desnecessário",
  },
  {
    icon: <Lightbulb className="w-6 h-6 text-violet-600" />,
    title: "Transforme dor em sabedoria",
    description: "Use essa experiência para se fortalecer",
  },
];

// Comparativo clean
const alternatives = [
  {
    option: "Terapia Individual",
    price: "R$ 200-400",
    time: "Semanas",
    privacy: "Exposição pessoal",
    result: "Processo longo",
    status: "limited",
  },
  {
    option: "Coach de Relacionamento",
    price: "R$ 300-600",
    time: "Várias sessões",
    privacy: "Agenda limitada",
    result: "Genérico",
    status: "limited",
  },
  {
    option: "Conselhos de Amigos",
    price: "Grátis",
    time: "Quando disponível",
    privacy: "Sem privacidade",
    result: "Opinião pessoal",
    status: "limited",
  },
];

const ourSolution = {
  option: "Cora.Deep - Análise de Término",
  price: "R$ 29,90",
  time: "5 minutos",
  privacy: "100% Privado",
  result: "Clareza transformadora",
  status: "optimal",
};

// Estatísticas IMPACTANTES - FOCO EM RECONSTRUÇÃO
const impactStats = [
  {
    number: "47.382",
    label: "Pessoas que transformaram dor em clareza",
    icon: <Users className="w-6 h-6" />,
  },
  {
    number: "94%",
    label: "Disseram 'Agora entendi por que doía tanto!'",
    icon: <Lightbulb className="w-6 h-6" />,
  },
  {
    number: "87%",
    label: "Conseguiram seguir em frente com paz",
    icon: <Target className="w-6 h-6" />,
  },
  {
    number: "4.9/5",
    label: "Classificaram como 'Transformador'",
    icon: <Star className="w-6 h-6" />,
  },
];

// O que você vai conseguir depois do Cora - SIMBÓLICO E EMOCIONAL
const transformationalBenefits = [
  {
    icon: <Target className="w-6 h-6" />,
    title: "🌘 Entender por que esse fim ainda te machuca tanto",
    description:
      "Vai além da saudade superficial e descobre as camadas profundas da sua dor",
    result: "Clareza sobre o que realmente perdeu e por que dói tanto",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "🌱 Dar nome ao que você sentiu e não conseguiu explicar",
    description:
      "Finalmente entende aqueles sentimentos confusos que ninguém parecia compreender",
    result: "Vocabulário emocional para processar sua experiência",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "🕯️ Começar um processo de cura emocional guiado",
    description:
      "Recebe um mapa simbólico para navegar suas próximas fases de reconstrução",
    result: "Direção clara para sua jornada de cura",
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "🔓 Deixar ir o que te prende e abrir espaço pra recomeçar",
    description:
      "Identifica as amarras invisíveis e aprende como se libertar delas com gentileza",
    result: "Liberdade emocional para escrever um novo capítulo",
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

export default function Home() {
  return (
    <div className={`${inter.className} min-h-screen bg-white`}>
      <Header />

      {/* 1. HERO SECTION - Acima da Dobra */}
      <section className="relative pt-24 pb-32 bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
                Saia da dor do término com{" "}
                <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  clareza e profundidade
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-2">
                — sem autoajuda superficial.
              </p>

              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                Um lugar seguro e simbólico onde tudo o que você sente começa a
                fazer sentido.
              </p>

              <div className="mb-8">
                <Link
                  href="/formulario"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Comece Agora • Acesso a partir de R$ 29
                </Link>
              </div>

              <p className="text-sm text-gray-500">
                Ambiente seguro e anônimo • Resultado imediato
              </p>
            </motion.div>

            {/* Right Side - 3D Visual Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative h-[500px] hidden lg:block"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Geometric shape inspired by WorkOS */}
                <div className="relative">
                  <div className="w-80 h-80 bg-gradient-to-br from-violet-400 via-purple-500 to-pink-500 rounded-3xl transform rotate-12 shadow-2xl opacity-90" />
                  <div className="absolute top-8 left-8 w-64 h-64 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 rounded-2xl transform -rotate-6 shadow-xl opacity-80" />
                  <div className="absolute top-16 left-16 w-48 h-48 bg-gradient-to-br from-pink-400 via-rose-500 to-red-500 rounded-xl transform rotate-3 shadow-lg opacity-70" />

                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full shadow-lg animate-pulse" />
                  <div className="absolute -bottom-8 -left-8 w-8 h-8 bg-green-400 rounded-full shadow-lg animate-bounce" />
                  <div className="absolute top-1/2 -right-12 w-6 h-6 bg-blue-400 rounded-full shadow-lg animate-ping" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. IDENTIFICAÇÃO: "Isso é para você?" */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Isso é para você?
          </h2>

          <div className="space-y-6 text-lg text-gray-700 mb-12">
            <p>
              Se você terminou recentemente, sente um nó no peito e não sabe por
              onde começar...
            </p>
            <p>Se os conselhos parecem vazios e os vídeos não ajudam...</p>
            <p className="text-xl font-semibold text-gray-900">
              O Cora.Deep foi feito exatamente para esse momento.
            </p>
          </div>
        </div>
      </section>

      {/* 3. O QUE É O CORA.DEEP? */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              O que é o Cora.Deep?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Um hub emocional pós-término. Um espaço simbólico e guiado para
              organizar a dor, entender sua ligação e virar a chave emocional —
              com profundidade e verdade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Curadoria terapêutica
              </h4>
              <p className="text-sm text-gray-600">
                Conteúdo selecionado para seu momento específico
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤫</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Espaço anônimo de expressão
              </h4>
              <p className="text-sm text-gray-600">
                Lugar seguro para processar seus sentimentos
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Relatório simbólico
              </h4>
              <p className="text-sm text-gray-600">
                Leitura emocional personalizada da sua situação
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔧</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Ferramentas de reconstrução
              </h4>
              <p className="text-sm text-gray-600">
                Recursos práticos para sua jornada de cura
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. POR QUE ISSO FUNCIONA? */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              Por que isso funciona?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-violet-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Não tenta te distrair
              </h3>
              <p className="text-gray-600">
                O Cora te ajuda a entender de verdade o que está acontecendo com
                você.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Sem frases prontas
              </h3>
              <p className="text-gray-600">
                Mostra o que está por trás do que você sente, não apenas clichês
                motivacionais.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Respeita sua dor
              </h3>
              <p className="text-gray-600">
                Oferece direção simbólica e prática, honrando o que você está
                vivendo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. O QUE VOCÊ ENCONTRA DENTRO DO CORA (Detalhamento) */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              O que você encontra dentro do Cora
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Cora.Guia */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">📚</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Cora.Guia — Curadoria para Clareza
                  </h3>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Artigos, vídeos, leituras simbólicas e ferramentas indicadas
                especificamente para o seu momento.
              </p>
            </div>

            {/* Mural Vivo */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🧱</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Mural Vivo — Espaço de Expressão
                  </h3>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Desabafos anônimos. Escrita terapêutica e escuta simbólica em um
                ambiente seguro.
              </p>
            </div>

            {/* Eco Emocional */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">💬</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Eco Emocional — Conexão sem fala
                  </h3>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Reações simbólicas como 🌱 "Você vai florescer" para momentos de
                apoio mútuo.
              </p>
            </div>

            {/* Leitura Emocional */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🧾</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Leitura Emocional — Seu Mapa Interno
                  </h3>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Relatório criado por IA para revelar o que ainda está em jogo
                emocionalmente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PLANOS E PREÇOS */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Planos e Preços
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Escolha o nível de profundidade que faz sentido para o seu momento
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cora.Light */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🕯</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Cora.Light
                </h3>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  R$ 29
                </div>
                <p className="text-gray-600">
                  Acesso ao Hub + relatório básico
                </p>
              </div>
              <ul className="space-y-3 text-sm text-gray-700 mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Acesso ao Hub Cora
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Relatório básico
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Mural Vivo
                </li>
              </ul>
              <Link
                href="/formulario"
                className="w-full inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Escolher Light
              </Link>
            </div>

            {/* Cora.Deep */}
            <div className="bg-white rounded-2xl p-8 border-2 border-violet-200 shadow-lg relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-violet-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Mais Popular
                </span>
              </div>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌑</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Cora.Deep
                </h3>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  R$ 59 - R$ 69
                </div>
                <p className="text-gray-600">
                  Hub completo + relatório profundo + carta de cura + análise
                  emocional
                </p>
              </div>
              <ul className="space-y-3 text-sm text-gray-700 mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Tudo do Light
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Relatório profundo
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Carta de cura
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Análise emocional
                </li>
              </ul>
              <Link
                href="/formulario"
                className="w-full inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-violet-600 rounded-lg hover:bg-violet-700 transition-colors"
              >
                Escolher Deep
              </Link>
            </div>

            {/* Cora.Renascimento */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔥</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Cora.Renascimento
                </h3>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  R$ 99 - R$ 119
                </div>
                <p className="text-gray-600">Transformação completa</p>
              </div>
              <ul className="space-y-3 text-sm text-gray-700 mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Tudo do Deep
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Carta de despedida simbólica
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Plano de reconstrução 21 dias
                </li>
              </ul>
              <Link
                href="/formulario"
                className="w-full inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Escolher Renascimento
              </Link>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/formulario"
              className="inline-flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors"
            >
              Escolher Meu Caminho
            </Link>
          </div>
        </div>
      </section>

      {/* 7. DEPOIMENTOS SIMBÓLICOS (prova de valor) */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
              Vozes de quem atravessou a dor
            </h2>
            <p className="text-lg text-gray-600">
              Pessoas reais que encontraram clareza onde antes só havia confusão
            </p>
          </div>
          <TestimonialsCarousel />
        </div>
      </section>

      {/* 8. O QUE VEM DEPOIS? (visão de crescimento) */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            O que vem depois?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            O Cora vai crescer com você.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Novos conteúdos, experiências simbólicas e ferramentas práticas
            estão sendo construídas para quem decide atravessar esse momento com
            clareza.
          </p>
        </div>
      </section>

      {/* 9. UPSELL MENCIONADO SUAVEMENTE */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              🌀 Quer ir além?
            </h2>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Após sua leitura simbólica, você poderá (se quiser) agendar uma
              conversa individual com um especialista do Cora.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              É uma sessão de realinhamento emocional para te ajudar a entender
              ainda mais o que emergiu no seu processo.
            </p>

            <div className="flex flex-col md:flex-row gap-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <span>📅</span>
                <span>Oferecido somente após sua primeira leitura</span>
              </div>
              <div className="flex items-center gap-2">
                <span>💬</span>
                <span>Duração: 45 minutos por chamada</span>
              </div>
            </div>

            <p className="text-lg text-gray-700 italic text-center">
              Às vezes, é só com alguém te ouvindo com o mapa na mão que tudo
              começa a fazer sentido.
            </p>
          </div>
        </div>
      </section>

      {/* 10. FAQ SIMBÓLICO */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Dúvidas Frequentes
            </h2>
            <p className="text-gray-600">
              As perguntas mais comuns sobre o Cora.Deep
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-3">
                "Isso é tipo um app de terapia?"
              </h3>
              <p className="text-gray-700">
                Não. O Cora é um espaço simbólico de autoconhecimento. Não
                substitui terapia, mas oferece uma leitura emocional profunda do
                seu momento.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-3">
                "Funciona mesmo se eu já estiver seguindo em frente?"
              </h3>
              <p className="text-gray-700">
                Sim. Mesmo quando achamos que "superamos", muitas vezes há
                camadas não processadas. O Cora revela o que ainda precisa ser
                integrado.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-3">
                "Preciso acreditar em astrologia?"
              </h3>
              <p className="text-gray-700">
                Não. O Cora usa linguagem simbólica e análise de padrões
                emocionais. É mais sobre psicologia e autoconhecimento do que
                crenças específicas.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-3">
                "É anônimo mesmo?"
              </h3>
              <p className="text-gray-700">
                Completamente. Não salvamos informações pessoais identificáveis.
                Sua privacidade e segurança emocional são fundamentais.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FECHAMENTO EMOCIONAL + CTA FINAL */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Você não precisa entender tudo agora.
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Só precisa de um lugar onde o que você sente possa finalmente fazer
            sentido.
            <br />
            <strong>E esse lugar é o Cora.</strong>
          </p>

          <Link
            href="/formulario"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors mb-4"
          >
            Quero Começar Agora
          </Link>

          <p className="text-sm text-gray-500">
            🔒 Ambiente seguro e anônimo • ⚡ Acesso imediato • 💰 A partir de
            R$ 29
          </p>
        </div>
      </section>

      {/* 12. RODAPÉ */}
      <footer className="bg-gray-50 py-16 border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo e Descrição */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Cora<span className="text-violet-600">.Deep</span>
                </h3>
              </div>
              <p className="text-gray-600 mb-4 max-w-md">
                Um hub emocional pós-término. Espaço simbólico e guiado para
                organizar a dor e encontrar clareza.
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>⚡ Resultado imediato</span>
                <span>💰 A partir de R$ 29</span>
                <span>🔒 100% Anônimo</span>
              </div>
            </div>

            {/* Suporte e Contato */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">
                Suporte e Contato
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a
                    href="/formulario"
                    className="hover:text-violet-600 transition-colors"
                  >
                    Fazer Análise
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-violet-600 transition-colors"
                  >
                    Central de Ajuda
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-violet-600 transition-colors"
                  >
                    Contato
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-violet-600 transition-colors"
                  >
                    Suporte Emocional
                  </a>
                </li>
              </ul>
            </div>

            {/* Termos e Garantias */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">
                Termos e Políticas
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a
                    href="#"
                    className="hover:text-violet-600 transition-colors"
                  >
                    Termos de Uso
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-violet-600 transition-colors"
                  >
                    Política de Privacidade
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-violet-600 transition-colors"
                  >
                    Garantia Simbólica de Sigilo
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-violet-600 transition-colors"
                  >
                    Código de Ética
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Cora.Deep. Todos os direitos
              reservados.
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <span className="text-sm text-gray-500">
                Feito com 🤍 para quem busca clareza emocional
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
