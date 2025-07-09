import { motion } from "framer-motion";
import { Heart, MessageCircle, Users, ArrowRight } from "lucide-react";

const painPoints = [
  {
    icon: Heart,
    title: "Terminou recentemente",
    description: "Sente um nó no peito e não sabe por onde começar",
    color: "from-rose-500 to-pink-600",
    bgColor: "bg-rose-50",
  },
  {
    icon: MessageCircle,
    title: "Conselhos parecem vazios",
    description: "Os vídeos não ajudam e as frases prontas não tocam",
    color: "from-purple-500 to-violet-600",
    bgColor: "bg-purple-50",
  },
  {
    icon: Users,
    title: "Ninguém entende",
    description: "Você precisa de algo que realmente faça sentido",
    color: "from-indigo-500 to-blue-600",
    bgColor: "bg-indigo-50",
  },
];

export default function IdentificationSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Título da seção */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Isso é para você?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Se você se identifica com alguma dessas situações, continue lendo.
            Vamos falar sobre as dores que ninguém entende.
          </p>
        </motion.div>

        {/* Cards dos pain points */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              className={`relative ${point.bgColor} rounded-2xl p-6 border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              {/* Ícone com gradiente */}
              <div
                className={`w-12 h-12 bg-gradient-to-br ${point.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}
              >
                <point.icon className="w-6 h-6 text-white" />
              </div>

              {/* Conteúdo */}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {point.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {point.description}
              </p>

              {/* Efeito de brilho */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-xl" />
            </motion.div>
          ))}
        </div>

        {/* CTA de transição */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg">
            <span>Vamos falar sobre o que você realmente sente</span>
            <ArrowRight className="w-5 h-5" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
