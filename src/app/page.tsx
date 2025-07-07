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

      {/* 💥 HERO - Copy AGRESSIVA */}
      <section className="relative pt-32 pb-24 bg-white overflow-hidden">
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

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
                Saia da dor do término com{" "}
                <span className="text-violet-600">clareza e profundidade</span>
                <br />— sem autoajuda superficial.
              </h1>

              <div className="space-y-6 mb-8">
                <p className="text-lg font-medium text-slate-700 leading-relaxed">
                  Um lugar seguro e simbólico onde tudo o que você sente começa
                  a fazer sentido.
                </p>
              </div>

              <div className="space-y-4">
                <Link
                  href="/formulario"
                  className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-4 text-lg font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Comece Agora • Acesso a partir de R$ 29
                </Link>

                <p className="text-sm text-slate-500">
                  🔒 Ambiente seguro e anônimo
                </p>
              </div>
            </motion.div>

            {/* Right Side - Emotional Network Visualization */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative h-[600px] hidden lg:block"
            >
              <EmotionalNetworkVisualization />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🎯 Identificação: "Isso é para você?" */}
      <motion.section
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="py-24 bg-slate-50"
      >
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
              Isso é para você?
            </h2>
            <div className="space-y-4 text-lg text-slate-700 leading-relaxed">
              <p>
                Se você <strong>terminou recentemente</strong>, sente um nó no
                peito e não sabe por onde começar...
              </p>
              <p>
                Se os <strong>conselhos parecem vazios</strong> e os vídeos não
                ajudam...
              </p>
              <p className="text-violet-700 font-semibold">
                O Cora.Deep foi feito exatamente para esse momento.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
              O que é o Cora.Deep?
            </h3>
            <div className="space-y-4 text-base text-slate-700 leading-relaxed">
              <p>
                Um <strong>hub emocional pós-término</strong>. Um espaço
                simbólico e guiado para organizar a dor, entender sua ligação e
                virar a chave emocional — com profundidade e verdade.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center">
                      <span className="text-violet-600 font-semibold text-sm">
                        🧠
                      </span>
                    </div>
                    <span className="font-semibold text-slate-900">
                      Curadoria terapêutica
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center">
                      <span className="text-violet-600 font-semibold text-sm">
                        🔒
                      </span>
                    </div>
                    <span className="font-semibold text-slate-900">
                      Espaço anônimo de expressão
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center">
                      <span className="text-violet-600 font-semibold text-sm">
                        📊
                      </span>
                    </div>
                    <span className="font-semibold text-slate-900">
                      Relatório simbólico de leitura emocional
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center">
                      <span className="text-violet-600 font-semibold text-sm">
                        🔧
                      </span>
                    </div>
                    <span className="font-semibold text-slate-900">
                      Ferramentas de reconstrução
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 🎯 Por que isso funciona? */}
      <motion.section
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="py-24 bg-white"
      >
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-8">
              Por que isso funciona?
            </h2>
            <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
              <p>
                Porque o Cora <strong>não tenta te distrair</strong> — ele te
                ajuda a entender.
              </p>
              <p>
                Porque não entrega <strong>frases prontas</strong> — mostra o
                que está por trás do que você sente.
              </p>
              <p>
                Porque <strong>respeita sua dor</strong>, e oferece direção
                simbólica e prática.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 📄 O que você encontra dentro do Cora */}
      <motion.section
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="py-24 bg-slate-50"
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
              O que você encontra dentro do Cora
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Cora.Guia */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">📚</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Cora.Guia
                  </h3>
                  <p className="text-sm text-slate-600">
                    Curadoria para Clareza
                  </p>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Artigos, vídeos, leituras simbólicas e ferramentas indicadas
                especificamente para o seu momento.
              </p>
            </div>

            {/* Mural Vivo */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🧱</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Mural Vivo
                  </h3>
                  <p className="text-sm text-slate-600">Espaço de Expressão</p>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Desabafos anônimos. Escrita terapêutica e escuta simbólica em um
                ambiente seguro.
              </p>
            </div>

            {/* Eco Emocional */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">💬</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Eco Emocional
                  </h3>
                  <p className="text-sm text-slate-600">Conexão sem fala</p>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Reações simbólicas como 🌱 "Você vai florescer" para momentos de
                apoio mútuo.
              </p>
            </div>

            {/* Leitura Emocional */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🧾</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Leitura Emocional
                  </h3>
                  <p className="text-sm text-slate-600">Seu Mapa Interno</p>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Relatório criado por IA para revelar o que ainda está em jogo
                emocionalmente.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 💰 Planos e Preços */}
      <motion.section
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="py-24 bg-white"
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
              Escolha seu caminho
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Diferentes profundidades para diferentes momentos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cora.Light */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🕯</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Cora.Light
                </h3>
                <div className="text-3xl font-bold text-slate-900 mb-2">
                  R$ 29
                </div>
                <p className="text-slate-600">
                  Acesso ao Hub + relatório básico
                </p>
              </div>
              <ul className="space-y-3 text-sm text-slate-700">
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
            </div>

            {/* Cora.Deep */}
            <div className="bg-violet-50 rounded-2xl p-8 border-2 border-violet-200 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-violet-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Mais Popular
                </span>
              </div>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌑</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Cora.Deep
                </h3>
                <div className="text-3xl font-bold text-slate-900 mb-2">
                  R$ 59
                </div>
                <p className="text-slate-600">
                  Hub completo + relatório profundo
                </p>
              </div>
              <ul className="space-y-3 text-sm text-slate-700">
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
            </div>

            {/* Cora.Renascimento */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔥</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Cora.Renascimento
                </h3>
                <div className="text-3xl font-bold text-slate-900 mb-2">
                  R$ 99
                </div>
                <p className="text-slate-600">Transformação completa</p>
              </div>
              <ul className="space-y-3 text-sm text-slate-700">
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
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/formulario"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-4 rounded-full font-bold text-lg text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Escolher Meu Caminho
            </Link>
          </div>
        </div>
      </motion.section>

      {/* 💬 Prova Social - Estilo Trustpilot */}
      <motion.section
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="py-20 bg-white"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">
              Vozes de quem atravessou a dor
            </h2>
            <p className="text-lg text-slate-600">
              Pessoas reais que encontraram clareza onde antes só havia confusão
            </p>
          </div>
          <TestimonialsCarousel />
        </div>
      </motion.section>

      {/* 🌟 Fechamento Emocional */}
      <motion.section
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="py-24 bg-gradient-to-br from-violet-50 to-purple-50"
      >
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Você não precisa entender tudo agora.
          </h2>
          <p className="text-lg text-slate-700 mb-8 leading-relaxed">
            Só precisa de um lugar onde o que você sente possa finalmente fazer
            sentido.
            <br />
            <strong>E esse lugar é o Cora.</strong>
          </p>

          <Link
            href="/formulario"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-4 rounded-full font-bold text-lg text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 mb-4"
          >
            Quero Começar Agora
          </Link>

          <p className="text-sm text-slate-500">
            🔒 Ambiente seguro e anônimo • ⚡ Acesso imediato • 💰 A partir de
            R$ 29
          </p>
        </div>
      </motion.section>

      {/* Mini FAQ */}
      <div className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Dúvidas Frequentes
            </h2>
            <p className="text-slate-600">
              As perguntas mais comuns antes de fazer sua análise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-violet-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">
                Em quanto tempo recebo?
              </h3>
              <p className="text-slate-600 text-sm">
                Seu relatório chega no e-mail em até <strong>5 minutos</strong>{" "}
                após o pagamento aprovado.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">É seguro?</h3>
              <p className="text-slate-600 text-sm">
                <strong>100% seguro.</strong> Pagamento via Stripe, dados
                criptografados e análise totalmente anônima.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">
                Como chega o relatório?
              </h3>
              <p className="text-slate-600 text-sm">
                Enviamos um <strong>PDF completo</strong> no seu e-mail com a
                análise detalhada da sua situação.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 💰 Garantia */}
      <div className="py-24 bg-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <div className="bg-gray-50 rounded-3xl p-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
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
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Sem riscos. Se você sentir que não te trouxe clareza...{" "}
              <span className="text-green-600">devolvemos seu dinheiro.</span>
            </h2>

            <p className="text-xl text-slate-600 mb-8">
              <strong>7 dias de garantia.</strong> Simples assim.
            </p>

            <div className="bg-white rounded-2xl p-6 shadow-lg inline-block mb-8">
              <p className="text-slate-700 font-medium">
                🛡️ Garantia de satisfação | 💰 Reembolso integral | ⚡ Sem
                burocracia
              </p>
            </div>

            {/* CTA após garantia */}
            <div className="pt-6">
              <p className="text-slate-600 mb-4 text-sm">
                Agora você não tem mais desculpas. É 100% sem risco!
              </p>
              <Link
                href="/formulario"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                🛡️ Garantido! Quero começar agora
              </Link>
              <p className="text-slate-500 text-xs mt-3">
                💰 R$ 29,90 | ⚡ 5 minutos | 🔒 7 dias para testar sem risco
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="py-24 bg-slate-900">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            O fim de um relacionamento pode ser{" "}
            <span className="text-violet-400">
              o começo da sua reconstrução.
            </span>
          </h2>

          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Se você sentiu que ninguém entende o que está passando, talvez o
            Cora esteja aqui pra te mostrar que dá pra atravessar isso com
            verdade.
          </p>

          <Link
            href="/formulario"
            className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-12 py-6 text-2xl font-bold text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 mb-6"
          >
            🔥 Quero minha transformação agora
          </Link>

          <p className="text-slate-400 text-sm">
            ⚡ Resultado em 5 minutos | 💰 Apenas R$ 29,90 | 🔒 7 dias de
            garantia
          </p>
        </div>
      </div>

      <footer className="bg-slate-50 py-16 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo e Descrição */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Cora<span className="text-violet-600">.Deep</span>
                </h3>
              </div>
              <p className="text-slate-600 mb-4 max-w-md">
                Análise emocional por IA que revela a verdade sobre suas
                conexões amorosas. Pare de sofrer, comece a entender.
              </p>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span>⚡ Resultado em 5 minutos</span>
                <span>💰 Apenas R$ 29,90</span>
                <span>🔒 100% Seguro</span>
              </div>
            </div>

            {/* Links Úteis */}
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Links Úteis</h4>
              <ul className="space-y-2 text-sm text-slate-600">
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
                    href="#como-funciona"
                    className="hover:text-violet-600 transition-colors"
                  >
                    Como Funciona
                  </a>
                </li>
                <li>
                  <a
                    href="#depoimentos"
                    className="hover:text-violet-600 transition-colors"
                  >
                    Depoimentos
                  </a>
                </li>
                <li>
                  <a
                    href="#garantia"
                    className="hover:text-violet-600 transition-colors"
                  >
                    Garantia
                  </a>
                </li>
              </ul>
            </div>

            {/* Suporte */}
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm text-slate-600">
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
                    Política de Privacidade
                  </a>
                </li>
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
                    Contato
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-slate-500">
              &copy; {new Date().getFullYear()} Cora.Deep. Todos os direitos
              reservados.
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <span className="text-sm text-slate-500">
                Pagamento 100% seguro
              </span>
              <div className="flex items-center gap-2">
                <div className="w-8 h-6 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">💳</span>
                </div>
                <div className="w-8 h-6 bg-orange-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">🔒</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
