import RelationshipForm from "@/components/RelationshipForm";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#f8e7e0] via-[#f3e6f7] to-[#e3e6fa]">
      <div className="max-w-5xl w-full flex flex-col md:flex-row items-center justify-center gap-12 px-4 py-12">
        {/* Left Side: Title and Description */}
        <div className="flex-1 max-w-md text-center md:text-left">
          <span className="text-sm text-gray-500 mb-2 block">Para todos.</span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-gray-900">
            Descubra a <span className="text-purple-800">compatibilidade</span>
            <br />
            no <span className="text-purple-800">relacionamento</span>.
          </h1>
          <p className="text-gray-600 mb-6">
            Preencha o formulário ao lado para saber mais sobre o seu
            relacionamento de forma simples e rápida.
          </p>
        </div>
        {/* Right Side: Form Card */}
        <div className="flex-1 max-w-md w-full">
          <RelationshipForm />
        </div>
      </div>
    </div>
  );
}
