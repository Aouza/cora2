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
    title: "Preenchimento",
    description: "Forneça os dados básicos sobre você e a outra pessoa",
    icon: "✍️",
  },
  {
    title: "Pagamento",
    description: "Investimento único para um diagnóstico profundo",
    icon: "💎",
  },
  {
    title: "Relatório",
    description: "Receba seu diagnóstico completo em minutos",
    icon: "📊",
  },
];

const benefits = [
  "Entenda os padrões inconscientes que afetam seu relacionamento",
  "Descubra pontos de conexão que você nunca percebeu",
  "Ganhe clareza sobre os próximos passos",
  "Compreenda melhor suas emoções e as da outra pessoa",
];

const testimonials = [
  {
    text: "Nunca tinha visto minha relação por esse ângulo. Incrível!",
    author: "Ana, 28 anos",
  },
  {
    text: "Me ajudou a entender o que estava acontecendo entre nós.",
    author: "Pedro, 32 anos",
  },
  {
    text: "O relatório trouxe clareza para uma situação complicada.",
    author: "Marina, 25 anos",
  },
];

const faqs = [
  {
    question: "O relatório é genérico?",
    answer:
      "Não! Cada relatório é único e personalizado, baseado nas informações específicas do seu caso.",
  },
  {
    question: "Em quanto tempo recebo meu relatório?",
    answer:
      "O relatório é gerado instantaneamente após o pagamento, em questão de minutos.",
  },
  {
    question: "É confidencial?",
    answer: "Sim! Seus dados são tratados com total privacidade e segurança.",
  },
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
            O que existe entre vocês que ninguém nunca te contou?
          </motion.h1>
          <motion.p className="text-xl text-slate-600 mb-8" {...fadeIn}>
            Relatório único, feito sob medida para a sua conexão. Feito por
            especialistas com ajuda da IA.
          </motion.p>
          <motion.div {...fadeIn}>
            <Link
              href="/formulario"
              className="inline-block bg-violet-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-violet-500 transition-all shadow-lg hover:shadow-violet-500/25 hover:scale-105"
            >
              Quero meu diagnóstico
            </Link>
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
            Benefícios do Relatório
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
                <span className="text-violet-500 text-xl">✨</span>
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
            O que dizem sobre nós
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
                <p className="text-slate-700 mb-4">"{testimonial.text}"</p>
                <p className="text-violet-600 font-semibold">
                  {testimonial.author}
                </p>
              </motion.div>
            ))}
          </div>
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
            Ganhe clareza emocional para seguir com verdade
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
              Quero meu diagnóstico
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
