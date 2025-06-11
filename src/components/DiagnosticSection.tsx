import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Search, Puzzle, Map, Target } from "lucide-react";

const featureCards = [
  {
    icon: <Search className="w-8 h-8" />,
    title: "A verdade emocional da conexão",
    description:
      "Descubra o que realmente conecta vocês e o que pode distanciar, mesmo sem intenção.",
  },
  {
    icon: <Puzzle className="w-8 h-8" />,
    title: "Como cada um funciona na relação",
    description:
      "Entenda o seu estilo emocional e o da outra pessoa. Isso muda tudo.",
  },
  {
    icon: <Map className="w-8 h-8" />,
    title: "Os caminhos possíveis a partir daqui",
    description:
      "Seja seguir, fortalecer ou soltar: veja o que faz sentido para o seu momento.",
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: "O que essa história quer te ensinar",
    description:
      "A conexão diz mais sobre você do que imagina. A análise mostra como usar isso a seu favor.",
  },
];

const cardVariants = {
  offscreen: {
    opacity: 0,
    y: 20,
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

const DiagnosticSection = () => {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-7xl px-6 lg:px-8 grid lg:grid-cols-2 gap-x-16 gap-y-12 items-center"
      >
        {/* Left Column */}
        <motion.div
          variants={{
            offscreen: { opacity: 0, x: -50 },
            onscreen: { opacity: 1, x: 0, transition: { duration: 0.7 } },
          }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            🔍 Entenda o que existe entre vocês, de verdade.
          </h2>
          <p className="mt-6 text-lg text-slate-600">
            Cada conexão tem uma lógica emocional única. Nossa análise revela o
            padrão invisível da relação, para você agir com clareza e parar de
            agir no escuro.
          </p>
          <div className="mt-8">
            <Link
              href="/formulario"
              className="inline-flex items-center bg-slate-900 text-white px-6 py-3 rounded-lg text-base font-semibold shadow-md hover:bg-slate-800 transition-all duration-300 hover:scale-105"
            >
              <span>Pedir minha análise</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </motion.div>

        {/* Right Column */}
        <motion.div
          className="grid grid-cols-2 gap-6"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            onscreen: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {featureCards.map((card, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="p-6 rounded-xl border bg-white text-slate-700 shadow-lg transition-all duration-300 group hover:bg-gradient-to-br hover:from-slate-800 hover:to-slate-900 hover:text-white hover:shadow-2xl hover:shadow-slate-800/20 hover:scale-105"
            >
              <div className="mb-4 text-slate-500 group-hover:text-white transition-colors duration-300">
                {card.icon}
              </div>
              <h3 className="font-bold text-lg mb-1">{card.title}</h3>
              <p className="text-sm text-slate-500 group-hover:text-slate-300 transition-colors duration-300">
                {card.description}
              </p>
              <div className="mt-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <ArrowRight className="w-6 h-6 text-white" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default DiagnosticSection;
