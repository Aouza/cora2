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
} from "lucide-react";
import Header from "@/components/Header";
import { TypeAnimation } from "react-type-animation";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { ReportMockup } from "@/components/ReportMockup";
import DiagnosticSection from "@/components/DiagnosticSection";

const inter = Inter({ subsets: ["latin"] });

// Dores principais - Copy emocional AGRESSIVA com ícones clean
const painPoints = [
  {
    icon: <Clock className="w-5 h-5" />,
    pain: "Você perde o sono pensando nessa pessoa",
    details:
      "3h da manhã e você ainda está rolando na cama, criando cenários na cabeça",
    solution: "Descubra se vale a pena tanto sofrimento",
  },
  {
    icon: <Users className="w-5 h-5" />,
    pain: "Seus amigos já cansaram de ouvir a mesma história",
    details: "Todo mundo dá opinião diferente e você fica mais confuso ainda",
    solution: "Tenha uma resposta definitiva baseada em dados",
  },
  {
    icon: <Eye className="w-5 h-5" />,
    pain: "Você não sabe se é paixão ou só carência",
    details: "Será que é amor de verdade ou você só está projetando?",
    solution: "Entenda seus padrões emocionais de uma vez por todas",
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    pain: "Você desperdiça energia numa relação que não vai dar certo",
    details: "Enquanto isso, outras oportunidades passam batido",
    solution: "Pare de perder tempo e foque no que realmente importa",
  },
  {
    icon: <Repeat className="w-5 h-5" />,
    pain: "Você sempre escolhe as pessoas erradas",
    details: "É sempre a mesma história: começa bem e termina em decepção",
    solution: "Quebre esse ciclo destrutivo para sempre",
  },
  {
    icon: <Scale className="w-5 h-5" />,
    pain: "Você vive no vai-e-vem emocional",
    details: "Uma hora parece que rola, outra hora você quer distância",
    solution: "Entenda o que realmente está acontecendo",
  },
];

// Benefícios clean
const benefits = [
  {
    icon: <Zap className="w-6 h-6 text-violet-600" />,
    title: "Clareza emocional em minutos",
    description: "Entenda de uma vez por todas o que realmente acontece",
  },
  {
    icon: <Target className="w-6 h-6 text-violet-600" />,
    title: "Análise com base nos seus dados",
    description: "Personalizada para sua situação específica",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-violet-600" />,
    title: "Sem julgamento, sem enrolação",
    description: "Resposta objetiva e prática para sua vida",
  },
  {
    icon: <Clock className="w-6 h-6 text-violet-600" />,
    title: "Evite meses de indecisão",
    description: "Um diagnóstico direto em vez de ficar ruminando",
  },
  {
    icon: <Lightbulb className="w-6 h-6 text-violet-600" />,
    title: "Tome decisões com segurança",
    description: "Pare de desperdiçar tempo com incertezas",
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
  option: "Análise IA Cora",
  price: "R$ 9,90",
  time: "5 minutos",
  privacy: "100% Privado",
  result: "Insights precisos",
  status: "optimal",
};

// Estatísticas IMPACTANTES
const impactStats = [
  {
    number: "47.382",
    label: "Pessoas que pararam de sofrer",
    icon: <Users className="w-6 h-6" />,
  },
  {
    number: "94%",
    label: "Disseram 'Nossa, agora entendi tudo!'",
    icon: <Lightbulb className="w-6 h-6" />,
  },
  {
    number: "87%",
    label: "Tomaram a decisão certa na primeira",
    icon: <Target className="w-6 h-6" />,
  },
  {
    number: "4.9/5",
    label: "Classificaram como 'Vida mudou'",
    icon: <Star className="w-6 h-6" />,
  },
];

// Benefícios transformacionais AGRESSIVOS com ícones clean
const transformationalBenefits = [
  {
    icon: <Target className="w-6 h-6" />,
    title: "PARE de ficar na dúvida",
    description: "Chega de perder noites pensando 'será que rola?'",
    result: "Você vai saber EXATAMENTE o que fazer",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "NUNCA mais caia numa furada",
    description: "Identifique red flags que você nem sabia que existiam",
    result: "Economize anos da sua vida",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "QUEBRE o ciclo de relacionamentos tóxicos",
    description: "Entenda por que você sempre atrai o mesmo tipo de pessoa",
    result: "Mude seu padrão e atraia o amor verdadeiro",
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "DESCUBRA verdades sobre você mesmo",
    description: "Pare de se autoenganar e veja sua realidade emocional",
    result: "Torne-se irresistível para pessoas de qualidade",
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
      <section className="relative pt-32 pb-24 bg-white">
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

        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge URGENTE */}
            <div className="inline-flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 animate-pulse">
              <AlertTriangle className="w-4 h-4" />
              CHEGA DE SOFRER NO ESCURO
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl mb-6">
              <span className="text-violet-600 font-black">PARE</span> de
              desperdiçar sua vida
              <br />
              <span className="text-slate-600 font-light">
                numa relação que talvez nem exista.
              </span>
            </h1>

            <p className="mt-6 text-xl leading-8 text-slate-600 max-w-3xl mx-auto">
              Você vai{" "}
              <strong className="text-red-600">continuar sofrendo</strong> ou
              vai descobrir a verdade de uma vez por todas?
              <br />
              <strong className="text-slate-800">
                Nossa IA revela em 5 minutos o que você não consegue ver há
                meses.
              </strong>
            </p>

            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/formulario"
                className="relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold text-lg rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none shadow-xl"
                style={{
                  boxShadow: "0 0 20px rgba(139, 92, 246, 0.4)",
                }}
              >
                <Flame className="w-5 h-5" />
                <span>QUERO PARAR DE SOFRER AGORA</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-3">
              <div className="flex items-center gap-x-2 text-sm text-slate-600">
                <Lock className="w-4 h-4 text-green-600" />
                <span>100% Anônimo (ninguém vai saber)</span>
              </div>
              <div className="flex items-center gap-x-2 text-sm text-slate-600">
                <Zap className="w-4 h-4 text-yellow-600" />
                <span>5 minutos para clareza total</span>
              </div>
              <div className="flex items-center gap-x-2 text-sm text-slate-600">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span>Apenas R$ 9,90 (menos que um Uber)</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🚨 Faixa de Urgência - Logo após Hero */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="bg-gradient-to-r from-violet-500 via-purple-500 to-violet-600 text-white py-3 px-6"
      >
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-semibold text-sm">
            🔥 <strong>OFERTA POR TEMPO LIMITADO:</strong> Apenas R$ 9,90 (valor
            normal R$ 49,90) - Últimas 24 horas!
          </p>
        </div>
      </motion.div>

      {/* 😨 Seção de Dor AGRESSIVA - Cards Ultra Clean */}
      <motion.section
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="py-32 bg-slate-50"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-6">
              <span className="text-red-600">CHEGA</span> dessas situações na
              sua vida
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Se você se identifica com pelo menos uma dessas, precisa ler isso
              até o final
            </p>
          </div>

          <motion.div
            variants={staggeredListVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {painPoints.map((pain, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group bg-gray-50 p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md hover:border-red-200 transition-all duration-300"
              >
                {/* Ícone clean */}
                <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-100 transition-colors">
                  <div className="text-red-600">{pain.icon}</div>
                </div>

                {/* Conteúdo organizado */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">
                    {pain.pain}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed italic">
                    "{pain.details}"
                  </p>

                  <div className="pt-2">
                    <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                      <p className="text-sm font-semibold text-green-700">
                        ✓ {pain.solution}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center">
            <Link
              href="/formulario"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-orange-600 hover:to-red-600"
            >
              <Target className="w-5 h-5" />
              RESOLVER TODOS ESSES PROBLEMAS AGORA
            </Link>
            <p className="text-slate-500 text-sm mt-2">
              ⚡ Diagnóstico entregue em 5 minutos | 💰 Acesso imediato por
              apenas R$ 9,90
            </p>
          </div>
        </div>
      </motion.section>

      {/* 📊 Estatísticas IMPACTANTES - Ultra Clean */}
      <motion.section
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="py-24 bg-slate-900"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-white mb-6">
              RESULTADOS que falam por si só
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Pessoas que pararam de enrolar e tomaram uma atitude
            </p>
          </div>

          <motion.div
            variants={staggeredListVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {impactStats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-violet-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <div className="text-violet-400">{stat.icon}</div>
                </div>
                <div className="text-4xl font-black text-white mb-4">
                  {stat.number}
                </div>
                <p className="text-slate-300 text-sm font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ✨ Benefícios TRANSFORMACIONAIS - Modern Clean */}
      <motion.section
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="py-20 bg-white"
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">
              O que você vai <span className="text-violet-600">CONQUISTAR</span>{" "}
              de uma vez por todas
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Não é só um relatório. É uma <strong>mudança definitiva</strong>{" "}
              na sua vida amorosa.
            </p>
          </div>

          {/* Grid moderno e equilibrado */}
          <motion.div
            variants={staggeredListVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          >
            {transformationalBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group bg-slate-50 hover:bg-white p-6 rounded-2xl border border-slate-100 hover:border-violet-200 hover:shadow-md transition-all duration-300"
              >
                {/* Header compacto */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center group-hover:bg-violet-100 transition-colors">
                    <div className="text-violet-600">{benefit.icon}</div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 flex-1">
                    {benefit.title}
                  </h3>
                </div>

                {/* Conteúdo organizado */}
                <div className="space-y-4">
                  <p className="text-slate-600 leading-7">
                    {benefit.description}
                  </p>

                  <div className="bg-violet-50 border-l-4 border-violet-400 rounded-r-lg p-4">
                    <p className="text-sm font-medium text-violet-800 leading-6">
                      <strong>Resultado:</strong> {benefit.result}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA simples e direto */}
          <div className="text-center">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 max-w-lg mx-auto">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Pronto para essa transformação?
              </h3>
              <p className="text-slate-600 mb-4 text-sm">
                Milhares já conquistaram clareza. Sua vez chegou.
              </p>
              <Link
                href="/formulario"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Sparkles className="w-4 h-4" />
                Começar minha análise
              </Link>
              <p className="text-slate-500 text-xs mt-2">
                🚀 Resultado instantâneo | 🔒 100% privado e seguro
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 🧠 Como Funciona - Detalhado */}
      <motion.section
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="py-20 bg-white"
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">
              Como nossa IA analisa sua conexão
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Um processo sofisticado que vai além da superfície, revelando a
              verdadeira dinâmica emocional
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-violet-600 font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">
                    Análise de Padrões
                  </h3>
                  <p className="text-slate-600">
                    Nossa IA identifica a estrutura emocional única entre vocês,
                    baseada em dados comportamentais e psicológicos.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-violet-600 font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">
                    Mapeamento Emocional
                  </h3>
                  <p className="text-slate-600">
                    Revelamos os ciclos de aproximação e afastamento,
                    identificando os gatilhos que movem a dinâmica.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-violet-600 font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">
                    Insights Personalizados
                  </h3>
                  <p className="text-slate-600">
                    Geramos recomendações específicas para sua situação, com
                    caminhos claros para tomar decisões.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <ReportMockup />
            </div>
          </div>
        </div>
      </motion.section>

      {/* 🎯 Seção de Benefícios - Clean */}
      <motion.section
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="py-20 bg-slate-50"
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">
              Por que escolher nossa análise
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Vantagens únicas que fazem toda a diferença
            </p>
          </div>

          <motion.div
            variants={staggeredListVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-slate-600">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
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
              Transformações reais
            </h2>
            <p className="text-lg text-slate-600">
              Veja o que nossos clientes falam sobre a clareza que encontraram
            </p>
          </div>
          <TestimonialsCarousel />
        </div>
      </motion.section>

      {/* 🔍 Comparativo - Tabela Clean */}
      <motion.section
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="py-20 bg-slate-50"
      >
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">
              Compare suas opções
            </h2>
            <p className="text-lg text-slate-600 mb-4">
              Veja por que nossa análise é a escolha mais inteligente
            </p>
            {/* Reforço de Valor */}
            <div className="bg-violet-50 border border-violet-200 rounded-2xl p-4 max-w-2xl mx-auto">
              <p className="text-sm font-semibold text-violet-800">
                ✅ <strong>+47.382 análises geradas</strong> | ⭐{" "}
                <strong>Satisfação de 94%</strong> nos últimos 6 meses | 🏆{" "}
                <strong>4.9/5 estrelas</strong> de avaliação
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-slate-100">
                    <th className="text-left py-5 px-6 font-semibold text-slate-900 leading-6">
                      Opção
                    </th>
                    <th className="text-center py-5 px-6 font-semibold text-slate-900 leading-6">
                      Preço
                    </th>
                    <th className="text-center py-5 px-6 font-semibold text-slate-900 leading-6">
                      Tempo
                    </th>
                    <th className="text-center py-5 px-6 font-semibold text-slate-900 leading-6">
                      Privacidade
                    </th>
                    <th className="text-center py-5 px-6 font-semibold text-slate-900 leading-6">
                      Resultado
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {alternatives.map((alt, index) => (
                    <tr key={index} className="border-b border-slate-50">
                      <td className="py-5 px-6 text-slate-700 font-medium leading-6">
                        {alt.option}
                      </td>
                      <td className="text-center py-5 px-6 text-slate-600 leading-6">
                        {alt.price}
                      </td>
                      <td className="text-center py-5 px-6 text-slate-600 leading-6">
                        {alt.time}
                      </td>
                      <td className="text-center py-5 px-6 text-slate-600 leading-6">
                        {alt.privacy}
                      </td>
                      <td className="text-center py-5 px-6 text-slate-600 leading-6">
                        {alt.result}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-violet-50 border-2 border-violet-200">
                    <td className="py-5 px-6 font-bold text-violet-900 leading-6">
                      {ourSolution.option}
                    </td>
                    <td className="text-center py-5 px-6 font-bold text-violet-900 leading-6">
                      {ourSolution.price}
                    </td>
                    <td className="text-center py-5 px-6 font-bold text-violet-900 leading-6">
                      {ourSolution.time}
                    </td>
                    <td className="text-center py-5 px-6 font-bold text-violet-900 leading-6">
                      {ourSolution.privacy}
                    </td>
                    <td className="text-center py-5 px-6 font-bold text-violet-900 leading-6">
                      {ourSolution.result}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ⏰ Seção de Urgência - Faixa Discreta */}
      <motion.section
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="py-6 bg-gradient-to-r from-violet-600 to-purple-600"
      >
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <p className="text-white font-medium">
            <span className="font-bold">Oferta especial ativa:</span>{" "}
            desbloqueie sua análise por apenas R$ 9,90. Por tempo limitado.
          </p>
        </div>
      </motion.section>

      {/* Como Funciona - Seção Clean */}
      <DiagnosticSection />

      {/* 💰 Garantia - Bloco Clean */}
      <motion.section
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="py-20 bg-slate-50"
      >
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="bg-gray-50 rounded-3xl p-8 shadow-lg text-center border border-slate-200">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Garantia de Satisfação
            </h3>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto leading-7">
              Se não sentir clareza, devolvemos seu dinheiro em até 7 dias.
              <br />
              <strong className="text-slate-900">Simples assim.</strong>
            </p>
          </div>
        </div>
      </motion.section>

      {/* 📞 CTA Final - Grande e Centralizado */}
      <motion.section
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="py-24 bg-slate-900"
      >
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Pare de adivinhar. Comece a entender.
          </h2>

          <Link
            href="/formulario"
            className="inline-flex items-center bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-10 py-5 rounded-full text-xl font-bold shadow-2xl transition-all duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white gap-3"
          >
            <span>Quero Receber Meu Diagnóstico Agora</span>
            <ChevronRight className="w-6 h-6" />
          </Link>

          <p className="mt-6 text-slate-300 text-sm leading-6">
            <span className="opacity-80">🔒</span> 100% Seguro e Anônimo{" "}
            <span className="opacity-80">| ⏱️</span> Entrega em 5 minutos{" "}
            <span className="opacity-80">| 💰</span> Apenas R$ 9,90
          </p>
        </div>
      </motion.section>

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
