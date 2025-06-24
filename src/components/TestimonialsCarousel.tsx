"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "Economizei 6 meses de terapia em 5 minutos. Finalmente entendi por que eu não conseguia seguir em frente.",
    name: "Ana C.",
    result: "Tomou a decisão definitiva",
  },
  {
    quote:
      "Descobri que estava numa relação tóxica há 2 anos sem perceber. Terminei no dia seguinte e hoje me sinto livre.",
    name: "Marina R.",
    result: "Saiu do relacionamento tóxico",
  },
  {
    quote:
      "Descobri por que sempre escolho os mesmos tipos de pessoa. Agora estou num relacionamento saudável pela primeira vez.",
    name: "Carlos S.",
    result: "Quebrou padrões destrutivos",
  },
  {
    quote:
      "A análise me mostrou que o problema não era com as pessoas, mas comigo mesmo. Mudou minha vida completamente.",
    name: "Fernando L.",
    result: "Transformou sua vida amorosa",
  },
  {
    quote:
      "R$ 9,90 que salvaram meu casamento. A análise mostrou como resolver nossos conflitos.",
    name: "Juliana P.",
    result: "Salvou seu casamento",
  },
  {
    quote:
      "Parei de perder o sono pensando 'e se'. A análise me deu a paz mental que eu precisava.",
    name: "Camila M.",
    result: "Conquistou paz mental",
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
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow h-full"
            >
              <blockquote className="mb-4">
                <p className="text-slate-700 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
              </blockquote>

              <div className="border-t border-slate-100 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-900">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-1">
                      <span className="text-green-500">✓</span>
                      Cliente Verificado
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-violet-600 font-medium">
                      {testimonial.result}
                    </div>
                    <div className="text-amber-400 text-sm">⭐⭐⭐⭐⭐</div>
                  </div>
                </div>
              </div>
            </motion.figure>
          </div>
        ))}
      </div>
    </div>
  );
}
