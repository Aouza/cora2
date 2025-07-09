import { motion } from "framer-motion";
import { CheckCircle, Target, Heart, Lightbulb } from "lucide-react";

const reasons = [
  {
    icon: Target,
    title: "Não tenta te distrair",
    description: "Te ajuda a entender de verdade o que está acontecendo",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Heart,
    title: "Não entrega frases prontas",
    description: "Mostra o que está por trás do que você realmente sente",
    color: "from-rose-500 to-pink-600",
  },
  {
    icon: Lightbulb,
    title: "Respeita sua dor",
    description:
      "Oferece direção simbólica e prática sem minimizar sua experiência",
    color: "from-violet-500 to-purple-600",
  },
];

export default function WhyItWorksSection() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-violet-50/30" />

      <div className="max-w-6xl mx-auto px-4 relative">
        {/* Título */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Por que isso{" "}
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              funciona?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Porque o Cora.Deep foi construído com base na verdade emocional, não
            em soluções superficiais.
          </p>
        </motion.div>

        {/* Cards dos motivos */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              {/* Ícone */}
              <div
                className={`w-16 h-16 bg-gradient-to-br ${reason.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <reason.icon className="w-8 h-8 text-white" />
              </div>

              {/* Conteúdo */}
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-violet-700 transition-colors">
                {reason.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {reason.description}
              </p>

              {/* Efeito visual */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Seção de destaque */}
        <motion.div
          className="text-center bg-gradient-to-r from-gray-50 to-white rounded-3xl p-12 border border-gray-200"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            A diferença está na abordagem
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Enquanto outros métodos focam em "superar rápido", o Cora.Deep te
            guia através de um processo de compreensão profunda que gera
            transformação real e duradoura.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
