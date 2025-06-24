"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "Economizei 6 meses de terapia em 5 minutos. A análise foi tão certeira que chorei de alívio. Finalmente entendi por que eu não conseguia seguir em frente.",
    name: "Ana C.",
    handle: "Cliente Verificada",
    result: "Conseguiu tomar uma decisão definitiva",
    emoji: "😊",
  },
  {
    quote:
      "Descobri que eu estava numa relação tóxica há 2 anos sem perceber. A análise mostrou padrões que eu nunca tinha visto. Terminei no dia seguinte e hoje me sinto livre.",
    name: "Marina R.",
    handle: "Cliente Verificada",
    result: "Saiu de um relacionamento tóxico",
    emoji: "🌟",
  },
  {
    quote:
      "Valeu cada centavo. Descobri por que sempre escolho os mesmos tipos de pessoa. Agora estou num relacionamento saudável pela primeira vez na vida.",
    name: "Carlos S.",
    handle: "Cliente Verificado",
    result: "Quebrou padrões destrutivos",
    emoji: "💪",
  },
  {
    quote:
      "Estava quase desistindo do amor. A análise me mostrou que o problema não era com as pessoas, mas comigo mesmo. Mudou minha vida completamente.",
    name: "Fernando L.",
    handle: "Cliente Verificado",
    result: "Transformou sua vida amorosa",
    emoji: "❤️",
  },
  {
    quote:
      "R$ 9,90 que salvaram meu casamento. A análise mostrou como resolver nossos conflitos. Hoje somos mais felizes do que nunca.",
    name: "Juliana P.",
    handle: "Cliente Verificada",
    result: "Salvou seu casamento",
    emoji: "💑",
  },
  {
    quote:
      "Parei de perder o sono pensando 'e se'. A análise me deu a paz mental que eu precisava. Agora durmo tranquila sabendo que tomei a decisão certa.",
    name: "Camila M.",
    handle: "Cliente Verificada",
    result: "Conquistou paz mental",
    emoji: "😌",
  },
];

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

export function TestimonialsCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" });

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {testimonials.map((testimonial, index) => (
          <div
            className="flex-grow-0 flex-shrink-0 basis-full md:basis-1/2 lg:basis-1/3 p-4"
            key={index}
          >
            <motion.figure
              variants={itemVariants}
              className="h-full flex flex-col justify-between rounded-3xl bg-gradient-to-br from-white to-slate-50 p-8 shadow-xl ring-1 ring-slate-200 border-l-4 border-blue-500 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
            >
              <div>
                <blockquote className="text-slate-700 mb-6">
                  <p className="text-lg leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                </blockquote>

                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-2xl mb-6 border border-green-200">
                  <div className="flex items-center gap-2 text-green-700 font-bold text-sm">
                    <span className="text-lg">{testimonial.emoji}</span>
                    <span>RESULTADO:</span>
                  </div>
                  <p className="text-green-800 font-semibold text-sm mt-1">
                    {testimonial.result}
                  </p>
                </div>
              </div>

              <figcaption className="flex items-center gap-x-4 pt-4 border-t border-slate-200">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-lg">
                    {testimonial.name}
                  </div>
                  <div className="text-slate-600 text-sm flex items-center gap-1">
                    <span className="text-green-500">✅</span>
                    {testimonial.handle}
                    <span className="text-slate-400">•</span>
                    <span className="text-amber-500">⭐⭐⭐⭐⭐</span>
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          </div>
        ))}
      </div>
    </div>
  );
}
