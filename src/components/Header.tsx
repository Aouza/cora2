import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50 border-b border-slate-200/80">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex h-20 flex-col items-center justify-center text-center sm:h-16 sm:flex-row sm:justify-between">
          <Link href="/" className="text-2xl font-bold text-slate-900">
            Cora
          </Link>
          <div className="flex items-center gap-2 text-xs text-slate-600 sm:text-sm">
            <Sparkles className="h-4 w-4 flex-shrink-0 text-violet-500" />
            <span>1.200+ análises geradas com 92% de satisfação</span>
          </div>
        </div>
      </div>
    </header>
  );
}
