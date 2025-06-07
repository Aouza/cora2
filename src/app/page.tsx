"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import LetterIcon from "../components/LetterIcon";

const inter = Inter({ subsets: ["latin"] });

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const steps = [
  {
    title: "Preencha os dados",
    description: "Forneça os nomes e datas de nascimento. Simples e rápido.",
    icon: (
      <svg
        className="w-6 h-6 text-red-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    ),
    gradient: "from-red-50 to-white",
    iconBg: "bg-red-100",
  },
  {
    title: "IA analisa a conexão",
    description: "Nossa IA cruza os dados para revelar a dinâmica da conexão.",
    icon: (
      <svg
        className="w-6 h-6 text-green-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V3m0 18v-3m6-6h3m-3 6h3m-9-9a6 6 0 100 12 6 6 0 000-12z"
        />
      </svg>
    ),
    gradient: "from-green-50 to-white",
    iconBg: "bg-green-100",
  },
  {
    title: "Receba o relatório exclusivo",
    description: "Um relatório completo com insights e conselhos práticos.",
    icon: (
      <svg
        className="w-6 h-6 text-blue-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
        />
      </svg>
    ),
    gradient: "from-blue-50 to-white",
    iconBg: "bg-blue-100",
  },
];

const discoveries = [
  {
    title: "Padrões que sabotam",
    description:
      "Identifique os ciclos repetitivos que minam a conexão sem que você perceba.",
    icon: "🧩",
    size: "large",
  },
  {
    title: "Por que ainda sente?",
    description:
      "Entenda a raiz emocional que te prende à essa memória, mesmo tentando esquecer.",
    icon: "❤️‍🔥",
    size: "small",
  },
  {
    title: "Realidade vs. Ilusão",
    description:
      "Diferencie o que era verdadeiro na relação do que era apenas uma projeção ou expectativa.",
    icon: "🎭",
    size: "small",
  },
  {
    title: "Como sair do ciclo",
    description:
      "Receba clareza sobre os próximos passos para quebrar o padrão e parar de se machucar.",
    icon: "🔄",
    size: "large",
  },
  {
    title: "Seguir, soltar ou tentar?",
    description:
      "Ganhe uma nova perspectiva para decidir o que fazer com esse sentimento: ressignificar o passado, seguir em frente ou, se for o caso, tentar de novo com clareza.",
    icon: "🗺️",
    size: "full",
  },
];

const testimonials = [
  {
    quote:
      "Nunca vi nossa história com tanta clareza. Doeu, mas me deu uma paz que eu não sentia há anos. Foi libertador.",
    name: "Ana C.",
    age: 28,
    avatar: "/avatars/avatar-1.png",
  },
  {
    quote:
      "Achava que era só mais uma dessas coisas da internet. Mas foi como conversar com alguém que me entendia de verdade.",
    name: "Marcos V.",
    age: 32,
    avatar: "/avatars/avatar-2.png",
  },
  {
    quote:
      "Finalmente entendi por que eu não conseguia seguir em frente. Foi o ponto final que eu precisava pra começar de novo.",
    name: "Juliana P.",
    age: 25,
    avatar: "/avatars/avatar-3.png",
  },
];

const logos = [
  { name: "AMONDO" },
  { name: "fullstory" },
  { name: "YEEZY" },
  { name: "Iceland" },
  { name: "Shortcut" },
];

const faqs = [
  {
    question: "Isso é tipo horóscopo?",
    answer:
      "Não. Longe disso. Enquanto o horóscopo oferece generalidades, nosso diagnóstico cria uma leitura simbólica e única baseada nos dados específicos da sua história. É um mapa da sua conexão, não das estrelas.",
  },
  {
    question: "É seguro? Meus dados estão protegidos?",
    answer:
      "Totalmente. Usamos seus dados apenas para gerar o relatório. Eles são processados de forma anônima e nunca são compartilhados ou armazenados. Sua privacidade é nossa prioridade máxima.",
  },
  {
    question: "Em quanto tempo recebo o diagnóstico?",
    answer:
      "Imediatamente. Após a confirmação do pagamento, seu relatório exclusivo é gerado e disponibilizado na hora para você acessar.",
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

function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <motion.div
      className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm p-4 border-t border-slate-200 z-50"
      initial={{ y: 100 }}
      animate={{ y: visible ? 0 : 100 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <Link
        href="/formulario"
        className="w-full text-center inline-block bg-gradient-to-r from-slate-900 to-slate-700 text-white px-6 py-3 rounded-full text-base font-semibold shadow-lg"
      >
        Quero meu diagnóstico agora →
      </Link>
    </motion.div>
  );
}

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <div className={`min-h-screen bg-white ${inter.className}`}>
      {/* Grid Pontilhado de Fundo */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-5 pointer-events-none select-none z-0"></div>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Ilustração SVG decorativa */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-30 pointer-events-none select-none z-0">
          <svg
            viewBox="0 0 600 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse
              cx="300"
              cy="150"
              rx="280"
              ry="100"
              fill="#a78bfa"
              fillOpacity="0.18"
            />
            <ellipse
              cx="300"
              cy="180"
              rx="180"
              ry="60"
              fill="#a78bfa"
              fillOpacity="0.12"
            />
          </svg>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="relative w-24 h-24 mb-8 -mt-12">
            <LetterIcon />
          </div>
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Você sente que essa conexão te marcou… mas não sabe por quê?
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Descubra o que existe entre vocês com um diagnóstico simbólico e
            verdadeiro. Feito sob medida para a sua história.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="flex flex-col items-center"
          >
            <Link
              href="/formulario"
              className="inline-block bg-gradient-to-r from-slate-900 to-slate-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition-all hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2"
            >
              Quero entender o que foi isso tudo
              <span className="ml-2 align-middle">→</span>
            </Link>
            <p className="mt-4 text-sm text-slate-500">
              Leitura única, personalizada e imediata
            </p>
          </motion.div>
        </div>
      </section>

      {/* SEÇÃO DE IDENTIFICAÇÃO */}
      <section className="bg-slate-50 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <p className="text-lg text-slate-600 mb-8">
            Você já se pegou revivendo conversas antigas?
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              "Reviveu conversas antigas?",
              "Sentiu que algo entre vocês ainda pulsa?",
              "Estão juntos, mas parece que algo sempre volta ao mesmo ponto?",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start space-x-3 p-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm"
              >
                <span className="text-violet-500 mt-1">✓</span>
                <p className="text-slate-700">{item}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 text-xl font-medium text-slate-800">
            Não é só você. Existe uma estrutura emocional entre vocês — e ela
            pode ser lida.
          </p>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="how-it-works" className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-16">
            Um caminho simples para a clareza
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`
                  p-8 rounded-3xl text-left
                  bg-gradient-to-br ${step.gradient}
                  border border-slate-100
                  shadow-2xl shadow-slate-200/50
                `}
              >
                <div
                  className={`w-14 h-14 rounded-2xl mb-6 flex items-center justify-center ${step.iconBg}`}
                >
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O QUE VOCÊ VAI DESCOBRIR - BENTO GRID */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
              O que você vai descobrir
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Seu relatório é um mapa da dinâmica emocional entre vocês,
              revelando pontos que ninguém nunca te mostrou.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {discoveries.map((item, i) => (
              <motion.div
                key={i}
                className={`
                  p-8 rounded-3xl border border-slate-200/80 shadow-sm relative overflow-hidden
                  flex flex-col justify-between min-h-[250px] bg-white
                  ${item.size === "large" ? "md:col-span-2" : ""}
                  ${item.size === "full" ? "md:col-span-3" : ""}
                `}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div>
                  <div className="text-4xl mb-5">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS - NOTION STYLE */}
      <section className="py-24 px-4 bg-white">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-16">
            O que dizem sobre o diagnóstico
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 text-left flex flex-col"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
              >
                <p className="text-slate-700 leading-relaxed flex-grow">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4 mt-6 pt-6 border-t border-slate-200">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-slate-800">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-slate-600">
                      {testimonial.age} anos
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PREVIEW DO RELATÓRIO */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Um trecho do que te espera...
          </h2>
          <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-sm relative">
            <p className="text-lg text-slate-600 leading-relaxed text-left">
              "A dinâmica entre vocês é marcada por uma dualidade intensa: a
              busca por um refúgio seguro e a necessidade de uma transformação
              radical. É como se um buscasse no outro um porto seguro contra as
              tempestades da vida, enquanto o outro enxergasse a relação como a
              própria tempestade — uma força caótica, mas necessária para o
              crescimento..."
            </p>
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
          </div>
          <div className="mt-8">
            <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 font-semibold px-4 py-2 rounded-full">
              <span className="text-lg">🔒</span>
              Acesso completo após o pagamento
            </div>
          </div>
        </div>
      </section>

      {/* É PRA VOCÊ SE... */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
              Este diagnóstico é para você se...
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
            {[
              "Já tentou seguir em frente mas sente algo",
              "Quer clareza emocional sem autoajuda",
              "Sente que tem algo que ninguém explica",
              "Gosta de verdade — mesmo que doa",
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                  ✓
                </span>
                <p className="text-lg text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-lg text-slate-600">
              Respostas rápidas para as dúvidas mais comuns.
            </p>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl border border-slate-200/80"
              >
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  {faq.question}
                </h3>
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.2),transparent_60%)] pointer-events-none select-none"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">
            Você pode continuar tentando entender tudo sozinho...
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Ou pode finalmente ver o que ninguém nunca te contou sobre vocês
            dois.
          </p>
          <Link
            href="/formulario"
            className="inline-block bg-white text-violet-700 font-bold px-8 py-4 rounded-full text-lg shadow-lg hover:bg-violet-100 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
          >
            Quero meu diagnóstico agora
            <span className="ml-2 align-middle">→</span>
          </Link>
        </div>
      </section>

      {/* RODAPÉ */}
      <footer className="py-8 px-4 text-center text-sm text-slate-500 border-t border-slate-100">
        <p>
          &copy; {new Date().getFullYear()} Cora. Todos os direitos reservados.
        </p>
      </footer>

      {/* STICKY MOBILE CTA */}
      <StickyMobileCTA />
    </div>
  );
}
