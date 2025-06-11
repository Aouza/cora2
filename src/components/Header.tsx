import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="font-bold text-xl text-slate-900">
          Cora
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#how-it-works"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Como Funciona
          </Link>
          <Link
            href="#testimonials"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Depoimentos
          </Link>
          <Link
            href="#features"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Recursos
          </Link>
        </nav>
        <Link
          href="/formulario"
          className="hidden md:inline-flex items-center bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-sm hover:bg-slate-800 transition-colors"
        >
          <span>Receber Diagnóstico</span>
          <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </header>
  );
}
