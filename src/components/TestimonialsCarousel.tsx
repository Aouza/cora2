"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "Foi como ler nossa história com uma lupa. Deu um soco de realidade... e paz.",
    name: "Juliana R.",
    handle: "Cliente Verificada",
  },
  {
    quote:
      "Recebi o diagnóstico e chorei por 20 minutos. Não de tristeza, mas de alívio. Finalmente entendi tudo.",
    name: "Marcos P.",
    handle: "Cliente Verificado",
  },
  {
    quote:
      "Achava que era só mais um teste bobo, mas a profundidade da análise me pegou. Me deu a clareza que eu precisava para agir.",
    name: "Fernanda L.",
    handle: "Cliente Verificado",
  },
  {
    quote:
      "Para quem está cansado de dar murro em ponta de faca num relacionamento, isso aqui é um mapa.",
    name: "Carlos S.",
    handle: "Cliente Verificado",
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
              className="h-full flex flex-col justify-between rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5"
            >
              <blockquote className="text-slate-700">
                <p>“{testimonial.quote}”</p>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-x-4">
                <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-slate-900">
                    {testimonial.name}
                  </div>
                  <div className="text-slate-600 text-sm">
                    ✅ {testimonial.handle}
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
