import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import EmotionalNetworkVisualization from "./EmotionalNetworkVisualization";

export default function CoraDeepHero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-cora-deep via-cora-deep to-cora-wine relative overflow-hidden">
      {/* Background decorativo atmosférico */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/10" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-cora-wine/5 to-cora-deep/50" />

      {/* Efeitos de luz sutis */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-cora-sand/20 via-transparent to-transparent transform rotate-12 opacity-30" />
      <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-cora-mist/20 via-transparent to-transparent transform -rotate-12 opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Conteúdo principal */}
          <div className="space-y-8">
            {/* Badge simbólico */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 bg-cora-wine/20 backdrop-blur-sm border border-cora-wine/30 text-cora-sand px-4 py-2 rounded-full text-sm font-medium"
            >
              <Heart className="w-4 h-4 text-cora-wine" />
              <span>O espaço simbólico para atravessar o fim</span>
            </motion.div>

            {/* Título principal - Playfair Display */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-cora-sand leading-tight"
            >
              O fim do relacionamento pode ser o{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-cora-wine to-cora-sand bg-clip-text text-transparent">
                  começo da sua clareza
                </span>
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cora-wine/60 to-cora-sand/60 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.5, delay: 1 }}
                />
              </span>
            </motion.h1>

            {/* Subtítulo - Cormorant Italic */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="font-cormorant italic text-xl md:text-2xl text-cora-sand/90 leading-relaxed max-w-2xl"
            >
              "Um espaço simbólico e sensível onde sua dor começa a encontrar
              direção."
            </motion.p>

            {/* Descrição complementar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="space-y-4"
            >
              <p className="text-cora-mist text-lg leading-relaxed">
                Você não está aqui por acaso. Está aqui porque algo dentro de
                você ainda não entendeu o que viveu.
              </p>
              <p className="text-cora-mist/80 leading-relaxed">
                Nem todo fim precisa do caos. Às vezes, só precisa de clareza.
              </p>
            </motion.div>

            {/* CTA Principal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/formulario">
                <motion.button
                  className="group bg-gradient-to-r from-cora-wine to-cora-wine/80 hover:from-cora-wine/90 hover:to-cora-wine text-cora-sand px-8 py-4 rounded-cora font-semibold text-lg shadow-2xl transition-all duration-300 flex items-center gap-3"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Quero clareza agora</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              <motion.div
                className="text-cora-mist/60 text-sm self-center"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                ✨ Oferta limitada: R$ 29,90
              </motion.div>
            </motion.div>

            {/* Prova social sutil */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex items-center gap-4 pt-8"
            >
              <div className="flex -space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-cora-wine to-cora-wine/60 rounded-full border-2 border-cora-deep"></div>
                <div className="w-10 h-10 bg-gradient-to-br from-cora-sand to-cora-sand/60 rounded-full border-2 border-cora-deep"></div>
                <div className="w-10 h-10 bg-gradient-to-br from-cora-mist to-cora-mist/60 rounded-full border-2 border-cora-deep"></div>
              </div>
              <div className="text-cora-sand/80">
                <p className="font-medium">+47.382 pessoas</p>
                <p className="text-sm text-cora-mist">
                  encontraram sua clareza
                </p>
              </div>
            </motion.div>
          </div>

          {/* Visualização emocional */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative h-[600px] hidden lg:block"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cora-wine/10 to-transparent rounded-cora backdrop-blur-sm border border-cora-wine/20">
              <EmotionalNetworkVisualization />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-cora-sand/40 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-cora-sand/60 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
