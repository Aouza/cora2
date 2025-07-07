"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "Eu achava que só sentia saudade, mas descobri que era um medo profundo de ser esquecida. O relatório me fez chorar, mas de um jeito que eu precisava.",
    name: "Ana C.",
    result: "Encontrou a verdade por trás da dor",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face&auto=format",
    age: "29 anos",
  },
  {
    quote:
      "Foi como se alguém tivesse escrito exatamente o que eu tava sentindo, mas eu nunca consegui explicar.",
    name: "Marina R.",
    result: "Finalmente se entendeu",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face&auto=format",
    age: "34 anos",
  },
  {
    quote:
      "Descobri que eu não tava chorando por ele, mas por uma versão de mim que eu achava que tinha perdido. Mudou tudo.",
    name: "Carlos S.",
    result: "Redescobriu sua identidade",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&auto=format",
    age: "31 anos",
  },
  {
    quote:
      "A análise me mostrou que eu tava presa num luto que não era só pelo término, mas por tudo que eu nunca vivi.",
    name: "Fernanda L.",
    result: "Compreendeu seu luto profundo",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format",
    age: "28 anos",
  },
  {
    quote:
      "Pensei que ia ser mais uma análise genérica, mas foi como se tivessem lido minha alma. Finalmente entendi por que doía tanto.",
    name: "Juliana P.",
    result: "Encontrou o significado da dor",
    avatar:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=40&h=40&fit=crop&crop=face&auto=format",
    age: "26 anos",
  },
  {
    quote:
      "Parei de esperar que ele voltasse quando entendi que o que eu realmente queria era voltar pra mim mesma.",
    name: "Camila M.",
    result: "Reconectou consigo mesma",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face&auto=format",
    age: "32 anos",
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
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-violet-100"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-slate-900 text-sm">
                          {testimonial.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {testimonial.age}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-amber-400 text-sm">⭐⭐⭐⭐⭐</div>
                        <div className="text-xs text-green-600 font-medium">
                          ✓ {testimonial.result}
                        </div>
                      </div>
                    </div>
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
