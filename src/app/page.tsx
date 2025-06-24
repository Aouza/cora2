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

import DiagnosticSection from "@/components/DiagnosticSection";
import HowItWorksSection from "@/components/HowItWorksSection";

const inter = Inter({ subsets: ["latin"] });

// Pain points AGRESSIVOS com ícones clean
const painPoints = [
  {
    icon: <Heart className="w-5 h-5" />,
    pain: "Será que eu tô me iludindo com essa pessoa?",
    details:
      "Fico criando filme na cabeça e não sei se é real ou fantasia minha",
    solution: "Descubra se é interesse real ou você está fantasiando",
  },
  {
    icon: <MessageCircle className="w-5 h-5" />,
    pain: "Por que toda vez que parece que vai dar certo… dá ruim de novo?",
    details: "Sempre a mesma história: começa bem e termina em decepção",
    solution: "Entenda o padrão e quebre esse ciclo de uma vez",
  },
  {
    icon: <Clock className="w-5 h-5" />,
    pain: "Sigo insistindo ou é melhor largar de vez?",
    details: "Já perdi tanto tempo, será que vale a pena continuar tentando?",
    solution: "Tenha clareza se deve investir ou partir pra próxima",
  },
  {
    icon: <Users className="w-5 h-5" />,
    pain: "Essa história tem futuro… ou só tá me machucando?",
    details: "Não sei se é amor de verdade ou só estou me iludindo",
    solution: "Saiba as chances reais antes de se desgastar mais",
  },
  {
    icon: <Repeat className="w-5 h-5" />,
    pain: "Será que ele(a) sente o mesmo… ou só me procura quando convém?",
    details: "Aparece quando quer, some quando não precisa mais de mim",
    solution: "Descubra se você é prioridade ou apenas uma opção",
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
    title: "Você para de ficar na dúvida",
    description:
      "Chega de passar madrugadas pensando 'será que rola?' - você vai saber a resposta",
    result: "Clareza total sobre onde você está pisando",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Nunca mais cai em cilada emocional",
    description:
      "Aprende a identificar quando alguém está só te enrolando ou realmente tem interesse",
    result: "Proteção contra pessoas que só querem te usar",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Para de repetir os mesmos erros",
    description:
      "Entende por que sempre acaba se envolvendo com o mesmo tipo de pessoa problemática",
    result: "Quebra o ciclo e atrai relacionamentos saudáveis",
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Conhece seus pontos cegos emocionais",
    description:
      "Descobre o que você faz (sem perceber) que afasta ou atrai as pessoas erradas",
    result: "Autoconhecimento que muda sua vida amorosa para sempre",
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
            <div className="inline-flex items-center rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-6 py-3 text-sm font-bold text-white mb-8 shadow-lg animate-pulse">
              <span className="mr-2">🕒</span>
              OFERTA ESPECIAL - ÚLTIMAS HORAS: R$ 9,90
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl mb-8">
              Você tá{" "}
              <span className="text-red-600">perdido numa história</span>
              <br />
              que nem sabe se é <span className="text-violet-600">real</span>?
            </h1>

            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              <strong>Pare de perder tempo, sono e saúde mental.</strong>
              <br />
              Em 5 minutos, nossa IA te entrega a verdade que ninguém tá te
              contando sobre essa conexão.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4">
              <Link
                href="/formulario"
                className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-10 py-5 text-xl font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                👉 Quero Meu Diagnóstico Agora
              </Link>
              <p className="text-slate-500 text-sm">
                ⚡ Resultado em 5 minutos | 💰 Apenas R$ 9,90 | 🔒 100% seguro
              </p>
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
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-6">
              Se alguma dessas frases parece sua…{" "}
              <span className="text-red-600">
                é porque tá na hora de encarar.
              </span>
            </h2>
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
              O que você vai <span className="text-violet-600">conseguir</span>{" "}
              depois do Cora
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Não é só um relatório. É uma <strong>virada de chave</strong> na
              sua vida amorosa.
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
                Bora descobrir a verdade?
              </h3>
              <p className="text-slate-600 mb-4 text-sm">
                Mais de 47.000 pessoas já pararam de sofrer. Sua vez chegou.
              </p>
              <Link
                href="/formulario"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Sparkles className="w-4 h-4" />
                Quero meu diagnóstico agora
              </Link>
              <p className="text-slate-500 text-xs mt-2">
                🚀 Resultado instantâneo | 🔒 100% privado e seguro
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 🧠 Como Funciona - Detalhado */}
      {/* 📋 Como Funciona - Novo Componente */}
      <HowItWorksSection />

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
            <div className="bg-violet-50 border border-violet-200 rounded-2xl p-4 max-w-3xl mx-auto">
              <p className="text-sm font-semibold text-violet-800 leading-6 text-center">
                <span className="inline-block mr-4">
                  ✅ <strong className="text-violet-900">+47.382</strong>{" "}
                  análises geradas
                </span>
                <span className="inline-block mr-4">
                  ⭐{" "}
                  <strong className="text-violet-900">Satisfação de 94%</strong>{" "}
                  nos últimos 6 meses
                </span>
                <span className="inline-block">
                  🏆 <strong className="text-violet-900">4.9/5 estrelas</strong>{" "}
                  de avaliação
                </span>
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full min-w-max">
                <thead>
                  <tr className="border-b-2 border-slate-100">
                    <th className="text-left py-4 px-4 font-semibold text-slate-900 text-sm whitespace-nowrap">
                      Opção
                    </th>
                    <th className="text-center py-4 px-4 font-semibold text-slate-900 text-sm whitespace-nowrap">
                      Preço
                    </th>
                    <th className="text-center py-4 px-4 font-semibold text-slate-900 text-sm whitespace-nowrap">
                      Tempo
                    </th>
                    <th className="text-center py-4 px-4 font-semibold text-slate-900 text-sm whitespace-nowrap">
                      Privacidade
                    </th>
                    <th className="text-center py-4 px-4 font-semibold text-slate-900 text-sm whitespace-nowrap">
                      Resultado
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {alternatives.map((alt, index) => (
                    <tr key={index} className="border-b border-slate-50">
                      <td className="py-4 px-4 text-slate-700 font-medium text-sm whitespace-nowrap">
                        {alt.option}
                      </td>
                      <td className="text-center py-4 px-4 text-slate-600 text-sm whitespace-nowrap">
                        {alt.price}
                      </td>
                      <td className="text-center py-4 px-4 text-slate-600 text-sm whitespace-nowrap">
                        {alt.time}
                      </td>
                      <td className="text-center py-4 px-4 text-slate-600 text-sm whitespace-nowrap">
                        {alt.privacy}
                      </td>
                      <td className="text-center py-4 px-4 text-slate-600 text-sm whitespace-nowrap">
                        {alt.result}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-violet-50 border-2 border-violet-200">
                    <td className="py-4 px-4 font-bold text-violet-900 text-sm whitespace-nowrap">
                      {ourSolution.option}
                    </td>
                    <td className="text-center py-4 px-4 font-bold text-violet-900 text-sm whitespace-nowrap">
                      {ourSolution.price}
                    </td>
                    <td className="text-center py-4 px-4 font-bold text-violet-900 text-sm whitespace-nowrap">
                      {ourSolution.time}
                    </td>
                    <td className="text-center py-4 px-4 font-bold text-violet-900 text-sm whitespace-nowrap">
                      {ourSolution.privacy}
                    </td>
                    <td className="text-center py-4 px-4 font-bold text-violet-900 text-sm whitespace-nowrap">
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

            <div className="bg-white rounded-2xl p-6 shadow-lg inline-block">
              <p className="text-slate-700 font-medium">
                🛡️ Garantia de satisfação | 💰 Reembolso integral | ⚡ Sem
                burocracia
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="py-24 bg-slate-900">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pare de sofrer por algo que{" "}
            <span className="text-violet-400">talvez nem seja real.</span>
          </h2>

          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Descubra agora se essa pessoa vale seu investimento emocional ou se
            é hora de seguir em frente.
          </p>

          <Link
            href="/formulario"
            className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-12 py-6 text-2xl font-bold text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 mb-6"
          >
            👉 Quero meu diagnóstico agora
          </Link>

          <p className="text-slate-400 text-sm">
            ⚡ Resultado em 5 minutos | 💰 Apenas R$ 9,90 | 🔒 7 dias de
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
                <span>💰 Apenas R$ 9,90</span>
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
