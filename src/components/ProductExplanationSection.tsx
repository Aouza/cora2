import { motion } from "framer-motion";
import {
  Brain,
  Shield,
  BarChart3,
  Wrench,
  Sparkles,
  Heart,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Curadoria terapêutica",
    description:
      "Abordagem baseada em princípios psicológicos para processar o luto emocional",
    color: "from-purple-500 to-violet-600",
    bgColor: "bg-purple-50",
  },
  {
    icon: Shield,
    title: "Espaço anônimo de expressão",
    description:
      "Ambiente seguro para explorar seus sentimentos sem julgamentos",
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50",
  },
  {
    icon: BarChart3,
    title: "Relatório simbólico de leitura emocional",
    description:
      "Análise profunda dos seus padrões emocionais e conexões afetivas",
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: Wrench,
    title: "Ferramentas de reconstrução",
    description:
      "Recursos práticos para transformar a dor em crescimento pessoal",
    color: "from-orange-500 to-red-600",
    bgColor: "bg-orange-50",
  },
];

export default function ProductExplanationSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 via-transparent to-purple-50/50" />

      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Título principal */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>O que é o Cora.Deep?</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Um hub emocional <br />
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              pós-término
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Um espaço simbólico e guiado para organizar a dor, entender sua
            ligação e virar a chave emocional — com profundidade e verdade.
          </p>
        </motion.div>

        {/* Grid de features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`relative ${feature.bgColor} rounded-3xl p-8 border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 group`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              {/* Ícone com animação */}
              <motion.div
                className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </motion.div>

              {/* Conteúdo */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-violet-700 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {feature.description}
              </p>

              {/* Efeitos visuais */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl group-hover:from-white/20 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-xl" />
            </motion.div>
          ))}
        </div>

        {/* Seção de destaque */}
        <motion.div
          className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl" />

          <div className="relative">
            <Heart className="w-12 h-12 text-white/80 mx-auto mb-4" />
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Mais que análise, uma jornada
            </h3>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              O Cora.Deep não é apenas um relatório. É um processo de descoberta
              que te acompanha da dor à clareza, do caos à reconstrução.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
