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

// Problemas que o cliente enfrenta
const painPoints = [
  {
    icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
    problem: "Não consegue parar de pensar nessa pessoa",
    solution: "Descubra o padrão emocional que te mantém preso",
  },
  {
    icon: <Clock className="w-6 h-6 text-orange-500" />,
    problem: "Perdendo tempo numa relação sem futuro",
    solution: "Veja se vale a pena investir energia nisso",
  },
  {
    icon: <Repeat className="w-6 h-6 text-blue-500" />,
    problem: "Sempre escolhe os relacionamentos errados",
    solution: "Entenda seu padrão e quebre o ciclo",
  },
  {
    icon: <Drama className="w-6 h-6 text-purple-500" />,
    problem: "Amigos dão conselhos contraditórios",
    solution: "Tenha uma análise objetiva baseada em dados",
  },
];

// Comparação com alternativas
const alternatives = [
  {
    option: "Terapia Individual",
    price: "R$ 200-400",
    time: "Semanas/Meses",
    privacy: "Expor vida pessoal",
    result: "Processo longo",
    icon: <X className="w-5 h-5 text-red-500" />,
  },
  {
    option: "Coach Relacionamento",
    price: "R$ 300-600",
    time: "Várias sessões",
    privacy: "Agenda lotada",
    result: "Genérico",
    icon: <X className="w-5 h-5 text-red-500" />,
  },
  {
    option: "Conselhos de Amigos",
    price: "Grátis",
    time: "Disponibilidade",
    privacy: "Fofoca garantida",
    result: "Baseado em opinião",
    icon: <X className="w-5 h-5 text-red-500" />,
  },
];

// Nossa solução
const ourSolution = {
  option: "Análise IA Cora",
  price: "R$ 9,90",
  time: "5 minutos",
  privacy: "100% Privado",
  result: "Insights precisos",
  icon: <Check className="w-5 h-5 text-green-500" />,
};

// Benefícios transformacionais
const transformationalBenefits = [
  {
    icon: <Target className="w-8 h-8 text-blue-600" />,
    title: "Clareza Emocional Imediata",
    description: "Entenda de uma vez por todas o que você realmente sente",
    result: "Fim da ansiedade e confusão mental",
  },
  {
    icon: <Shield className="w-8 h-8 text-green-600" />,
    title: "Proteção Contra Decisões Erradas",
    description: "Pare de desperdiçar tempo em relacionamentos tóxicos",
    result: "Economize meses ou anos da sua vida",
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-purple-600" />,
    title: "Evolução no Amor",
    description:
      "Quebre padrões destrutivos e atraia relacionamentos saudáveis",
    result: "Transforme sua vida amorosa para sempre",
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-yellow-600" />,
    title: "Autoconhecimento Profundo",
    description: "Descubra verdades sobre você que nem imaginava",
    result: "Torne-se magnético para o amor verdadeiro",
  },
];

// Estatísticas de impacto
const impactStats = [
  { number: "47.382", label: "Análises realizadas", icon: "📊" },
  { number: "94%", label: "Relatam maior clareza", icon: "💡" },
  { number: "87%", label: "Tomaram decisões assertivas", icon: "🎯" },
  { number: "4.9/5", label: "Avaliação média", icon: "⭐" },
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

      {/* HERO - DOR PRINCIPAL */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-slate-50 via-white to-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              {/* Badge de urgência */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 animate-pulse">
                <Flame className="w-4 h-4" />
                PARE DE SOFRER NO ESCURO
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-6">
                Você já perdeu{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600">
                  noites pensando
                </span>{" "}
                se vale a pena?
              </h1>

              <div className="text-2xl md:text-3xl text-slate-700 font-semibold mb-4">
                <TypeAnimation
                  sequence={[
                    "Essa pessoa te faz bem ou mal?",
                    2000,
                    "Por que não consegue esquecê-la?",
                    2000,
                    "Vale a pena insistir nessa relação?",
                    2000,
                    "Por que sempre escolhe errado?",
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </div>

              <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
                <strong className="text-slate-800">
                  Nossa IA especializada
                </strong>{" "}
                analisa seu padrão emocional em{" "}
                <strong className="text-blue-600">5 minutos</strong> e te dá as
                respostas que você precisa para{" "}
                <strong className="text-green-600">parar de sofrer</strong>.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/formulario"
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  DESCOBRIR AGORA
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <div className="text-sm text-slate-500">
                  ✅ Resultado em 5 min • ✅ 100% privado • ✅ R$ 9,90
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ESTATÍSTICAS DE IMPACTO */}
      <motion.section
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="py-16 bg-slate-900 text-white"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Transformando Vidas Através da Clareza Emocional
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-black text-blue-400 mb-1">
                  {stat.number}
                </div>
                <div className="text-slate-300 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SEÇÃO DE DORES */}
      <motion.section
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="py-20 bg-white"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Cansado Dessas Situações?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Se você se identifica com pelo menos uma dessas situações, nossa
              análise é para você:
            </p>
          </div>

          <motion.div
            variants={staggeredListVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
          >
            {painPoints.map((pain, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group bg-gradient-to-br from-red-50 to-orange-50 hover:from-red-100 hover:to-orange-100 p-6 rounded-2xl border border-red-100 hover:border-red-200 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-2 bg-white rounded-lg shadow-sm">
                    {pain.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">
                      😰 {pain.problem}
                    </h3>
                    <p className="text-slate-600 text-sm">
                      <strong className="text-green-700">✅ Solução:</strong>{" "}
                      {pain.solution}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link
              href="/formulario"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Target className="w-5 h-5" />
              RESOLVER MEUS PROBLEMAS AGORA
            </Link>
          </div>
        </div>
      </motion.section>

      {/* COMPARAÇÃO COM ALTERNATIVAS */}
      <motion.section
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="py-20 bg-slate-50"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Por Que Perder Tempo e Dinheiro?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Compare nossa solução com as alternativas tradicionais:
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl max-w-5xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="text-left py-4 px-4 font-bold text-slate-900">
                      Opção
                    </th>
                    <th className="text-center py-4 px-4 font-bold text-slate-900">
                      Preço
                    </th>
                    <th className="text-center py-4 px-4 font-bold text-slate-900">
                      Tempo
                    </th>
                    <th className="text-center py-4 px-4 font-bold text-slate-900">
                      Privacidade
                    </th>
                    <th className="text-center py-4 px-4 font-bold text-slate-900">
                      Resultado
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {alternatives.map((alt, index) => (
                    <tr
                      key={index}
                      className="border-b border-slate-100 hover:bg-red-50"
                    >
                      <td className="py-4 px-4 flex items-center gap-2">
                        {alt.icon}
                        <span className="font-medium text-slate-700">
                          {alt.option}
                        </span>
                      </td>
                      <td className="text-center py-4 px-4 text-slate-600">
                        {alt.price}
                      </td>
                      <td className="text-center py-4 px-4 text-slate-600">
                        {alt.time}
                      </td>
                      <td className="text-center py-4 px-4 text-slate-600">
                        {alt.privacy}
                      </td>
                      <td className="text-center py-4 px-4 text-slate-600">
                        {alt.result}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
                    <td className="py-4 px-4 flex items-center gap-2">
                      {ourSolution.icon}
                      <span className="font-bold text-green-800">
                        {ourSolution.option}
                      </span>
                    </td>
                    <td className="text-center py-4 px-4 font-bold text-green-800">
                      {ourSolution.price}
                    </td>
                    <td className="text-center py-4 px-4 font-bold text-green-800">
                      {ourSolution.time}
                    </td>
                    <td className="text-center py-4 px-4 font-bold text-green-800">
                      {ourSolution.privacy}
                    </td>
                    <td className="text-center py-4 px-4 font-bold text-green-800">
                      {ourSolution.result}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/formulario"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <DollarSign className="w-5 h-5" />
              ECONOMIZAR TEMPO E DINHEIRO
            </Link>
          </div>
        </div>
      </motion.section>

      {/* BENEFÍCIOS TRANSFORMACIONAIS */}
      <motion.section
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="py-20 bg-white"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              O Que Você Vai Ganhar
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Mais do que um relatório: uma transformação completa na sua vida
              amorosa
            </p>
          </div>

          <motion.div
            variants={staggeredListVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
          >
            {transformationalBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 p-8 rounded-2xl border border-blue-100 hover:border-blue-200 transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-slate-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-slate-600 mb-3">{benefit.description}</p>
                    <div className="bg-white/60 p-3 rounded-lg border border-blue-200">
                      <p className="text-sm font-semibold text-blue-800">
                        🎯 <strong>Resultado:</strong> {benefit.result}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link
              href="/formulario"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Sparkles className="w-5 h-5" />
              COMEÇAR MINHA TRANSFORMAÇÃO
            </Link>
          </div>
        </div>
      </motion.section>

      {/* SEÇÃO DE DEPOIMENTOS MELHORADA */}
      <motion.section
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="py-20 bg-slate-900 text-white"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Vidas Transformadas
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Veja o que nossos clientes falam sobre a transformação que
              viveram:
            </p>
          </div>
          <TestimonialsCarousel />
        </div>
      </motion.section>

      {/* URGÊNCIA E ESCASSEZ */}
      <motion.section
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="py-20 bg-gradient-to-br from-red-50 to-orange-50"
      >
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <div className="bg-white p-8 rounded-3xl shadow-xl border-2 border-red-200">
            <div className="flex items-center justify-center gap-2 text-red-600 font-bold text-lg mb-4">
              <Timer className="w-6 h-6 animate-pulse" />
              ATENÇÃO: OFERTA LIMITADA
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Não Deixe Passar Esta Oportunidade
            </h2>

            <p className="text-lg text-slate-600 mb-6">
              Mais um dia perdendo o sono pensando se vale a pena?
              <br />
              <strong>Sua paz mental vale R$ 9,90.</strong>
            </p>

            <div className="bg-gradient-to-r from-red-100 to-orange-100 p-6 rounded-2xl mb-8">
              <div className="text-2xl font-black text-red-700 mb-2">
                🔥 DE R$ 47,00 POR APENAS R$ 9,90
              </div>
              <div className="text-sm text-slate-600">
                Promoção válida por tempo limitado
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/formulario"
                className="group bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <Flame className="w-5 h-5" />
                QUERO MINHA ANÁLISE AGORA
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-green-500" />
                Garantia 7 dias
              </div>
              <div className="flex items-center gap-1">
                <Lock className="w-4 h-4 text-blue-500" />
                100% Seguro
              </div>
              <div className="flex items-center gap-1">
                <Zap className="w-4 h-4 text-yellow-500" />
                Resultado Imediato
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SEÇÃO COMO FUNCIONA - SIMPLIFICADA */}
      <DiagnosticSection />

      {/* FOOTER CTA FINAL */}
      <motion.section
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="py-20 bg-slate-900 text-white"
      >
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pare de Sofrer. Comece a Viver.
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Você merece clareza. Você merece paz. Você merece amor verdadeiro.
            <br />
            <strong className="text-white">Tudo começa com uma decisão.</strong>
          </p>

          <Link
            href="/formulario"
            className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-xl font-bold text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-3"
          >
            <Sparkles className="w-6 h-6" />
            DESCOBRIR A VERDADE AGORA
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>

          <div className="mt-6 text-slate-400">
            ✅ 5 minutos para clareza • ✅ R$ 9,90 • ✅ Garantia total
          </div>
        </div>
      </motion.section>
    </div>
  );
}
