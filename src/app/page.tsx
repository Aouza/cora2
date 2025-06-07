"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const steps = [
  {
    title: "Você preenche",
    description:
      "Dados que ninguém mais sabe: nomes, datas, o que estão vivendo.",
    icon: "🔍",
  },
  {
    title: "Nós geramos com IA",
    description: "Uma análise simbólica profunda — sem astrologia clichê.",
    icon: "🤖",
  },
  {
    title: "Você recebe o relatório",
    description: "Um conteúdo íntimo, direto, com conselhos reais.",
    icon: "💌",
  },
];

const benefits = [
  "Os padrões invisíveis que sabotam a relação",
  "Por que você sente tanto — mesmo tentando esquecer",
  "O que existe de verdadeiro (ou ilusório) entre vocês",
  "Como parar de repetir ciclos que machucam",
  "E o que fazer com isso: seguir, reconectar ou soltar",
];

const testimonials = [
  {
    text: "Nunca vi nossa história com tanta clareza. Me deu paz.",
    author: "Ana, 28 anos",
    image: "/testimonials/ana.jpg",
  },
  {
    text: "Foi como conversar com alguém que me conhecia mais do que eu mesmo.",
    author: "Pedro, 32 anos",
    image: "/testimonials/pedro.jpg",
  },
  {
    text: "Achei que ia doer. E doeu. Mas foi a melhor coisa que li esse ano.",
    author: "Marina, 25 anos",
    image: "/testimonials/marina.jpg",
  },
];

const faqs = [
  {
    question: "Isso é só mais um horóscopo bonito?",
    answer:
      "Não. É uma leitura emocional personalizada, sem clichês ou signos.",
  },
  {
    question: "É seguro?",
    answer:
      "Totalmente confidencial. Seus dados são usados só para gerar o relatório.",
  },
  {
    question: "Em quanto tempo recebo?",
    answer:
      "Em minutos. Depois do pagamento, o relatório já começa a ser gerado.",
  },
];

const reportPreview = {
  text: "Vocês foram o furacão um do outro. Mas também a bússola...",
  blur: true,
};

const targetAudience = [
  "Já tentou seguir em frente, mas ainda sente algo",
  "Sente que a relação tem algo que ninguém entende",
  "Quer clareza emocional sem papo de autoajuda",
  "Gosta de ouvir a verdade — mesmo que doa",
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-violet-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.1),transparent_50%)]"></div>
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-slate-800"
            {...fadeIn}
          >
            Você sente que essa conexão te marcou... mas não sabe por quê?
          </motion.h1>
          <motion.p className="text-xl text-slate-600 mb-8" {...fadeIn}>
            Descubra o que existe entre vocês com um diagnóstico simbólico e
            verdadeiro. Feito sob medida para sua história.
          </motion.p>
          <motion.div {...fadeIn}>
            <Link
              href="/formulario"
              className="inline-block bg-violet-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-violet-500 transition-all shadow-lg hover:shadow-violet-500/25 hover:scale-105"
            >
              Quero entender o que foi isso tudo
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Storytelling Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.05),transparent_50%)]"></div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="text-center space-y-6 text-lg text-slate-700"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p>Você já se pegou revivendo conversas antigas?</p>
            <p>Já sentiu que algo entre vocês ainda pulsa, mesmo separados?</p>
            <p>
              Ou talvez vocês estejam juntos… mas parece que sempre voltam ao
              mesmo ponto.
            </p>
            <p className="font-semibold text-violet-600">
              Não é só você. Existe uma estrutura emocional entre vocês — e ela
              pode ser lida.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.05),transparent_50%)]"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">
            Como funciona
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-2xl bg-white shadow-lg border border-violet-100 hover:border-violet-200 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-slate-800">
                  {step.title}
                </h3>
                <p className="text-slate-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.05),transparent_50%)]"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">
            O que você vai descobrir
          </h2>
          <div className="space-y-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-4 p-4 rounded-xl bg-white shadow-md border border-violet-100 hover:border-violet-200 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <span className="text-violet-500 text-xl">✅</span>
                <p className="text-lg text-slate-700">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.05),transparent_50%)]"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">
            Você vai se sentir como essas pessoas
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-md border border-violet-100 hover:border-violet-200 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="aspect-square w-24 h-24 mx-auto mb-4 rounded-full bg-violet-100 overflow-hidden">
                  {/* Add testimonial image here */}
                </div>
                <p className="text-slate-700 mb-4">"{testimonial.text}"</p>
                <p className="text-violet-600 font-semibold">
                  {testimonial.author}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Report Preview */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.05),transparent_50%)]"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-violet-100">
            <h3 className="text-2xl font-semibold mb-4 text-slate-800">
              Preview do Relatório
            </h3>
            <div
              className={`text-lg text-slate-700 ${
                reportPreview.blur ? "blur-sm" : ""
              }`}
            >
              {reportPreview.text}
            </div>
            <p className="text-sm text-violet-600 mt-2">
              🚫 acesso completo só após o pagamento
            </p>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.05),transparent_50%)]"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">
            O relatório é pra você se...
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {targetAudience.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-3 p-4 rounded-xl bg-white shadow-md border border-violet-100 hover:border-violet-200 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <span className="text-violet-500 text-xl">🟣</span>
                <p className="text-slate-700">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.05),transparent_50%)]"></div>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="bg-white p-8 rounded-2xl shadow-lg border border-violet-100"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-2xl font-semibold text-slate-800 mb-4">
              Mais de 1.200 diagnósticos gerados com 92% de satisfação
            </p>
            <div className="flex justify-center space-x-4">
              <span className="text-violet-600">🔒 100% confidencial</span>
              <span className="text-violet-600">
                ✨ Exclusivo e personalizado
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.05),transparent_50%)]"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">
            Perguntas Frequentes
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-md border border-violet-100 hover:border-violet-200 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold mb-2 text-slate-800">
                  {faq.question}
                </h3>
                <p className="text-slate-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.1),transparent_50%)]"></div>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative">
          <motion.h2
            className="text-3xl font-bold mb-6 text-slate-800"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Você pode continuar tentando entender tudo sozinho…
            <br />
            Ou pode ler agora o que ninguém nunca te contou sobre vocês dois.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link
              href="/formulario"
              className="inline-block bg-violet-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-violet-500 transition-all shadow-lg hover:shadow-violet-500/25 hover:scale-105"
            >
              Quero o meu diagnóstico
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
