import { motion } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Clock,
  Users,
  Repeat,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

const painPoints = [
  {
    icon: Heart,
    pain: "Sinto que ainda tô esperando uma mensagem que nunca vai chegar",
    details:
      "Mesmo sabendo que acabou, uma parte de mim ainda fica na expectativa",
    solution: "Entenda o que essa espera significa e como se libertar dela",
    color: "from-rose-500 to-pink-600",
    bgColor: "bg-rose-50",
    textColor: "text-rose-700",
  },
  {
    icon: MessageCircle,
    pain: "Fico pensando: será que eu interpretei tudo errado?",
    details: "Me questiono se o que senti era real ou se criei uma ilusão",
    solution: "Descubra a verdade sobre o que vocês viveram juntos",
    color: "from-purple-500 to-violet-600",
    bgColor: "bg-purple-50",
    textColor: "text-purple-700",
  },
  {
    icon: Clock,
    pain: "Acordo de madrugada com o peito apertado, pensando nele(a)",
    details: "Parece que meu corpo ainda não entendeu que acabou",
    solution: "Compreenda por que seu sistema emocional ainda está preso",
    color: "from-orange-500 to-red-600",
    bgColor: "bg-orange-50",
    textColor: "text-orange-700",
  },
  {
    icon: Users,
    pain: "Me sinto como se tivesse perdido uma parte de mim",
    details: "Não sei mais quem eu sou sem essa pessoa na minha vida",
    solution: "Redescubra sua identidade além desse relacionamento",
    color: "from-indigo-500 to-blue-600",
    bgColor: "bg-indigo-50",
    textColor: "text-indigo-700",
  },
  {
    icon: Repeat,
    pain: "Tenho medo de que isso sempre aconteça comigo",
    details: "Sinto que carrego algo que faz as pessoas me abandonarem",
    solution: "Identifique e transforme os padrões que te sabotam",
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-700",
  },
];

export default function PainPointsSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50/30 via-transparent to-rose-50/30" />

      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Título emocional */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Heart className="w-4 h-4" />
            <span>Se você sente isso...</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Você não está{" "}
            <span className="bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent relative">
              sozinho(a)
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 to-purple-400 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Essas são as dores mais íntimas que as pessoas sentem após um
            término. Se você se identifica com alguma delas, saiba que existe um
            caminho.
          </p>

          <motion.div
            className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-6 py-3 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="flex -space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full border-2 border-white"></div>
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-violet-500 rounded-full border-2 border-white"></div>
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-full border-2 border-white"></div>
            </div>
            <span className="text-gray-700 font-medium">
              +47.382 pessoas se identificaram
            </span>
          </motion.div>
        </motion.div>

        {/* Cards de dores - Layout especial */}
        <div className="space-y-8 mb-20">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              className={`relative ${point.bgColor} rounded-3xl p-8 md:p-12 border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-500 group`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              {/* Layout responsivo */}
              <div className="flex flex-col lg:flex-row items-start gap-8">
                {/* Ícone e título */}
                <div className="flex-shrink-0">
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${point.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <point.icon className="w-10 h-10 text-white" />
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="flex-1 space-y-6">
                  {/* Dor principal */}
                  <div>
                    <h3
                      className={`text-2xl md:text-3xl font-bold ${point.textColor} mb-3 leading-tight`}
                    >
                      "{point.pain}"
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {point.details}
                    </p>
                  </div>

                  {/* Solução */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/60">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          O Cora.Deep te ajuda a:
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                          {point.solution}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Efeitos visuais */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-3xl group-hover:from-white/30 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-2xl" />
            </motion.div>
          ))}
        </div>

        {/* CTA emocional */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl" />

            <div className="relative">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Se você se reconheceu em alguma dessas dores...
              </h3>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Saiba que elas têm uma origem, um significado e, principalmente,
                uma forma de serem transformadas em clareza e crescimento.
              </p>

              <Link href="/formulario">
                <motion.button
                  className="inline-flex items-center gap-3 bg-white text-violet-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Quero transformar minha dor em clareza</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
