import Link from "next/link";
import { ChevronRight, Gem } from "lucide-react";

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <Link href="/" className="font-bold text-xl text-slate-900">
          Cora
        </Link>
        <div className="inline-flex items-center gap-x-2 rounded-full bg-violet-100/80 px-4 py-1.5 text-sm font-semibold text-violet-700 ring-1 ring-inset ring-violet-200">
          <Gem className="w-4 h-4 text-violet-600" />
          <span>1.200+ diagnósticos gerados com 92% de satisfação</span>
        </div>
      </div>
    </header>
  );
}
