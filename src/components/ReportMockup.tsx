"use client";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function ReportMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="[perspective:2000px] group"
    >
      <div className="transition-transform duration-500 group-hover:rotate-y-4">
        <div className="relative w-[340px] h-[480px] bg-white/60 backdrop-blur-md rounded-lg shadow-2xl p-6 border border-slate-200/50">
          {/* Pulsing AI Core */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-48 h-48 bg-violet-500/10 rounded-full animate-pulse blur-2xl"></div>
          </div>

          {/* Header */}
          <div className="flex items-center justify-center gap-2 text-center font-semibold text-slate-800 bg-white/80 backdrop-blur-sm py-2 rounded-t-lg border-b border-slate-200/80">
            <Sparkles className="w-5 h-5 text-violet-500" />
            <span>Análise de Conexão</span>
          </div>

          {/* Body Content Placeholder */}
          <div className="relative mt-6 space-y-4 text-sm text-slate-700">
            <div className="space-y-2">
              <div
                className="h-3 w-1/3 bg-slate-300/70 rounded-sm animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="h-2 w-full bg-slate-300/50 rounded-sm animate-pulse"
                style={{ animationDelay: "0.3s" }}
              ></div>
              <div
                className="h-2 w-5/6 bg-slate-300/50 rounded-sm animate-pulse"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
            <div className="space-y-2 pt-4">
              <div
                className="h-3 w-1/4 bg-slate-300/70 rounded-sm animate-pulse"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div
                className="h-2 w-full bg-slate-300/50 rounded-sm animate-pulse"
                style={{ animationDelay: "0.6s" }}
              ></div>
              <div
                className="h-2 w-full bg-slate-300/50 rounded-sm animate-pulse"
                style={{ animationDelay: "0.7s" }}
              ></div>
              <div
                className="h-2 w-3/4 bg-slate-300/50 rounded-sm animate-pulse"
                style={{ animationDelay: "0.8s" }}
              ></div>
            </div>
          </div>

          {/* Watermark */}
          <div className="absolute bottom-6 right-6 text-xs text-slate-400 font-mono">
            Cora AI / Geração Segura
          </div>
        </div>
      </div>
    </motion.div>
  );
}
