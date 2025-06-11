"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Inter } from "next/font/google";
import {
  Star,
  ChevronRight,
  HeartPulse,
  Sparkles,
  Pencil,
  BrainCircuit,
  CloudDownload,
} from "lucide-react";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

const howItWorksSteps = [
  {
    title: "1. Preencha os Dados",
    description: "Forneça os nomes e datas de nascimento. Simples e rápido.",
    icon: <Pencil className="w-5 h-5 text-red-500" />,
    bgColor: "bg-red-50",
    iconBg: "bg-red-100",
  },
  {
    title: "2. Análise por IA",
    description: "Nossa IA cruza os dados para revelar a dinâmica da conexão.",
    icon: <Sparkles className="w-5 h-5 text-green-500" />,
    bgColor: "bg-green-50",
    iconBg: "bg-green-100",
  },
  {
    title: "3. Receba o Diagnóstico",
    description: "Um relatório completo com insights e conselhos práticos.",
    icon: <CloudDownload className="w-5 h-5 text-blue-500" />,
    bgColor: "bg-blue-50",
    iconBg: "bg-blue-100",
  },
];

function DocumentIcon({ className }: { className?: string }) {
  return (
    <div
      className={`bg-white/60 backdrop-blur-md rounded-lg shadow-lg border border-slate-100 p-4 ${className} flex flex-col`}
    >
      <div className="h-2 w-1/3 bg-slate-200/80 rounded-sm mb-4"></div>
      <div className="space-y-2 flex-grow">
        <div className="h-1.5 w-full bg-slate-200/80 rounded-sm"></div>
        <div className="h-1.5 w-[90%] bg-slate-200/80 rounded-sm"></div>
        <div className="h-1.5 w-full bg-slate-200/80 rounded-sm"></div>
        <div className="h-1.5 w-5/6 bg-slate-200/80 rounded-sm"></div>
      </div>
      <div className="mt-5 flex justify-between items-center">
        <div className="flex items-center gap-0.5">
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <Star className="h-4 w-4 text-yellow-400/50 fill-yellow-400/50" />
        </div>
        <HeartPulse className="h-5 w-5 text-pink-500/70" />
      </div>
    </div>
  );
}

const features = [
  {
    title: "Análise da Dinâmica",
    description:
      "Revelamos a estrutura da sua conexão, mostrando os padrões de atração e conflito.",
    icon: "🧩",
  },
  {
    title: "Pontos de Bloqueio",
    description:
      "Identificamos os principais obstáculos que impedem a evolução.",
    icon: "🚫",
  },
  {
    title: "Potencial de Resolução",
    description: "Avaliamos os caminhos possíveis para um desfecho mais claro.",
    icon: "🗺️",
  },
  {
    title: "Conselhos Práticos",
    description:
      "Oferecemos insights para você tomar decisões com mais segurança.",
    icon: "💡",
  },
];

const testimonials = [
  {
    quote:
      "Nunca vi nossa história com tanta clareza. Doeu, mas me deu uma paz que eu não sentia há anos. Foi libertador.",
    name: "Ana C.",
    company: "Relatório de Reconciliação",
    avatar: "/avatars/avatar-1.png",
  },
  {
    quote:
      "Achava que era só mais uma dessas coisas da internet. Mas foi como conversar com alguém que me entendia de verdade.",
    name: "Marcos V.",
    company: "Relatório de Fortalecimento",
    avatar: "/avatars/avatar-2.png",
  },
  {
    quote:
      "Finalmente entendi por que eu não conseguia seguir em frente. Foi o ponto final que eu precisava pra começar de novo.",
    name: "Juliana P.",
    company: "Relatório de Atração",
    avatar: "/avatars/avatar-3.png",
  },
];

export default function LandingPage() {
  return (
    <div className={`bg-white text-slate-800 ${inter.className}`}>
      <Header />

      {/* Hero Section */}
      <main className="relative isolate overflow-hidden pt-24 sm:pt-32 pb-32">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#eab308] to-[#a855f7] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        {/* Floating Documents */}
        <div className="absolute inset-0 -z-10 pointer-events-none hidden md:block">
          <motion.div
            initial={{ opacity: 0, y: 100, rotate: -20 }}
            animate={{ opacity: 1, y: 0, rotate: -15 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="absolute left-[10%] top-[15%]"
          >
            <DocumentIcon className="w-48 h-60" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 100, rotate: 20 }}
            animate={{ opacity: 1, y: 0, rotate: 15 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="absolute right-[10%] top-[10%]"
          >
            <DocumentIcon className="w-56 h-72" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 100, rotate: -5 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="absolute right-[25%] bottom-[-5%]"
          >
            <DocumentIcon className="w-40 h-52" />
          </motion.div>
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center relative">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl"
          >
            Descubra o verdadeiro <br />
            significado da sua conexão
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-slate-600 max-w-3xl mx-auto"
          >
            Um diagnóstico emocional único, feito sob medida para sua história.
            Entenda padrões, sentimentos e caminhos possíveis para o seu
            relacionamento.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex items-center justify-center gap-x-6"
          >
            <Link
              href="/formulario"
              className="inline-flex items-center bg-slate-900 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-slate-800 transition-all duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
            >
              <span>Quero meu diagnóstico</span>
              <Sparkles className="w-5 h-5 ml-2 text-yellow-400" />
            </Link>
          </motion.div>
          <motion.div
            className="mt-8 text-left max-w-lg mx-auto grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-slate-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center gap-2">
              <span className="text-violet-500">✔</span>
              <span className="text-sm">Análise feita sob medida com IA</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-violet-500">✔</span>
              <span className="text-sm">Conteúdo íntimo e revelador</span>
            </div>
            <div className="flex items-center gap-2 col-span-1 sm:col-span-2 justify-center">
              <span className="text-violet-500">✔</span>
              <span className="text-sm">
                Entrega em minutos, 100% confidencial
              </span>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Pain Point Identification Section */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl leading-tight">
            🧠 Já se pegou revivendo conversas antigas?
          </h2>
          <div className="mt-8 space-y-4 text-lg text-slate-700">
            <p>💔 Ainda sente algo entre vocês — mesmo separados?</p>
            <p>🔄 Voltam e se afastam, como se estivessem presos num ciclo?</p>
          </div>
          <p className="mt-10 text-xl font-semibold text-slate-900">
            Você não está louco. Existe uma estrutura emocional entre vocês.
            <br />E ela pode ser lida.
          </p>
        </div>
      </section>

      {/* How it works with cards */}
      <section
        id="how-it-works-cards"
        className="py-24 sm:py-32 bg-slate-50/70"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Um caminho simples para a clareza
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Seu diagnóstico é gerado em 3 passos rápidos e seguros.
            </p>
          </div>
          <div className="relative mt-16 sm:mt-20">
            <div
              className="absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-slate-300 z-0"
              aria-hidden="true"
            />
            <div className="relative z-10 grid grid-cols-1 gap-12 md:grid-cols-3">
              {howItWorksSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  className={`relative w-full p-8 rounded-2xl shadow-xl border border-slate-100/50 text-left ${step.bgColor}`}
                >
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${step.iconBg}`}
                  >
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-slate-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-violet-600">
              Benefícios Reais do Diagnóstico
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Muito mais do que "matar a curiosidade"
            </p>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Este diagnóstico é uma ferramenta de clareza. Ele te ajuda a
              entender a fundo a dinâmica da sua conexão para que você possa
              tomar decisões mais conscientes.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-slate-900">
                  <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center text-xl">
                    🧠
                  </span>
                  Entenda os padrões invisíveis da relação
                </dt>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-slate-900">
                  <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center text-xl">
                    🔍
                  </span>
                  Descubra o que ainda pulsa entre vocês
                </dt>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-slate-900">
                  <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center text-xl">
                    🛑
                  </span>
                  Saiba por que as coisas travam (mesmo com amor)
                </dt>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-slate-900">
                  <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center text-xl">
                    ♻️
                  </span>
                  Rompa ciclos que te fazem voltar para o mesmo ponto
                </dt>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-slate-900">
                  <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center text-xl">
                    ✅
                  </span>
                  Receba conselhos práticos e personalizados
                </dt>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <blockquote className="text-2xl font-semibold leading-9 text-slate-800">
              <p>
                "Foi como ler nossa história com uma lupa. Deu um soco de
                realidade... e paz."
              </p>
            </blockquote>
          </div>
          <div className="mt-12 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-4 bg-violet-200/50 blur-2xl"></div>
              <div className="relative bg-white p-6 rounded-2xl shadow-lg ring-1 ring-slate-200/80">
                <div className="flex justify-between items-center mb-4">
                  <span className="inline-flex items-center rounded-md bg-violet-50 px-2 py-1 text-xs font-medium text-violet-700 ring-1 ring-inset ring-violet-700/10">
                    🟣 Relatório de Reconexão • Geração com IA
                  </span>
                </div>
                <div className="space-y-2 blur-sm select-none pointer-events-none">
                  <div className="h-2.5 w-1/4 bg-slate-300 rounded-sm"></div>
                  <div className="h-2 w-full bg-slate-200 rounded-sm"></div>
                  <div className="h-2 w-full bg-slate-200 rounded-sm"></div>
                  <div className="h-2 w-3/4 bg-slate-200 rounded-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        id="testimonials"
        className="relative isolate bg-white py-24 sm:py-32"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              O que dizem sobre a clareza que encontraram
            </h2>
          </div>
          <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true, amount: 0.5 }}
                  className="rounded-2xl bg-slate-50/80 p-8 shadow-sm ring-1 ring-slate-900/5"
                >
                  <div className="flex items-center gap-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-500 fill-yellow-500"
                      />
                    ))}
                  </div>
                  <blockquote className="mt-6 text-lg leading-7 tracking-tight text-slate-900">
                    <p>"{testimonial.quote}"</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <img
                      className="h-12 w-12 rounded-full bg-slate-50"
                      src={testimonial.avatar}
                      alt=""
                    />
                    <div>
                      <div className="font-semibold text-slate-900">
                        {testimonial.name}, 28
                      </div>
                      <div className="text-slate-600">
                        {testimonial.company}
                      </div>
                    </div>
                  </figcaption>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* For You If Section */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Este diagnóstico é para você se...
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-6 text-lg leading-7 text-slate-700 sm:grid-cols-2">
            <div className="flex gap-x-3">
              <span className="text-violet-500">✔</span>
              <span>Já tentou seguir em frente, mas ainda sente algo</span>
            </div>
            <div className="flex gap-x-3">
              <span className="text-violet-500">✔</span>
              <span>Quer entender o que travou (e o que ainda pode ser)</span>
            </div>
            <div className="flex gap-x-3">
              <span className="text-violet-500">✔</span>
              <span>Busca clareza emocional sem papo de autoajuda</span>
            </div>
            <div className="flex gap-x-3">
              <span className="text-violet-500">✔</span>
              <span>Está cansado de adivinhar o que a outra pessoa sente</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 sm:py-32 bg-slate-50/70">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Perguntas Frequentes
            </h2>
          </div>
          <div className="mt-12 space-y-8">
            <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/80">
              <h3 className="text-lg font-semibold leading-7 text-slate-900">
                Isso é só mais um horóscopo bonito?
              </h3>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Não. É um diagnóstico emocional baseado em padrões reais de
                comportamento, não em signos.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/80">
              <h3 className="text-lg font-semibold leading-7 text-slate-900">
                Em quanto tempo recebo?
              </h3>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Em minutos. Assim que concluir o pagamento, seu relatório começa
                a ser gerado.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/80">
              <h3 className="text-lg font-semibold leading-7 text-slate-900">
                É seguro?
              </h3>
              <p className="mt-3 text-base leading-7 text-slate-600">
                100% confidencial. Seus dados são usados apenas para gerar o
                relatório e nada mais.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative isolate overflow-hidden bg-slate-900 px-6 py-24 text-center shadow-2xl rounded-3xl sm:px-16">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Pronto para entender o que existe entre voces?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Receba um diagnóstico emocional único, feito sob medida para sua
              história. Descubra padroes, sentimentos e caminhos possiveis.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/formulario"
                className="inline-flex items-center bg-white text-slate-900 px-7 py-3.5 rounded-xl text-base font-semibold shadow-sm hover:bg-slate-100 transition-all duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span className="text-xl mr-2">🚀</span>
                <span>Quero meu diagnóstico agora</span>
              </Link>
            </div>
            <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
              aria-hidden="true"
            >
              <circle
                cx={512}
                cy={512}
                r={512}
                fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
                fillOpacity="0.7"
              />
              <defs>
                <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                  <stop stopColor="#a855f7" />
                  <stop offset={1} stopColor="#eab308" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 text-center text-sm text-slate-500 border-t border-slate-100">
        <p>
          &copy; {new Date().getFullYear()} Cora. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}
