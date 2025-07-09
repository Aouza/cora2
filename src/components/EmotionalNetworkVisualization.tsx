"use client";

import { motion } from "framer-motion";
import { Heart, User, Brain, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

// Dados dos sentimentos e conexões - Mais elaborados
const emotions = [
  {
    id: 1,
    name: "Saudade",
    color: "from-red-400 to-red-500",
    textColor: "text-red-100",
    x: 18,
    y: 12,
    delay: 0,
    intensity: 0.9,
  },
  {
    id: 2,
    name: "Amor",
    color: "from-pink-400 to-rose-500",
    textColor: "text-pink-100",
    x: 75,
    y: 20,
    delay: 0.5,
    intensity: 0.8,
  },
  {
    id: 3,
    name: "Dor",
    color: "from-orange-500 to-red-600",
    textColor: "text-orange-100",
    x: 12,
    y: 65,
    delay: 1,
    intensity: 1.0,
  },
  {
    id: 4,
    name: "Esperança",
    color: "from-emerald-400 to-green-500",
    textColor: "text-emerald-100",
    x: 82,
    y: 75,
    delay: 1.5,
    intensity: 0.6,
  },
  {
    id: 5,
    name: "Confusão",
    color: "from-purple-500 to-violet-600",
    textColor: "text-purple-100",
    x: 45,
    y: 35,
    delay: 2,
    intensity: 0.7,
  },
  {
    id: 6,
    name: "Clareza",
    color: "from-blue-400 to-indigo-500",
    textColor: "text-blue-100",
    x: 65,
    y: 82,
    delay: 2.5,
    intensity: 0.9,
  },
  {
    id: 7,
    name: "Raiva",
    color: "from-red-600 to-orange-700",
    textColor: "text-red-100",
    x: 25,
    y: 45,
    delay: 3,
    intensity: 0.8,
  },
  {
    id: 8,
    name: "Alívio",
    color: "from-teal-400 to-cyan-500",
    textColor: "text-teal-100",
    x: 88,
    y: 45,
    delay: 3.5,
    intensity: 0.5,
  },
];

const connections = [
  { from: 1, to: 2, strength: 0.8, type: "strong" },
  { from: 1, to: 3, strength: 0.9, type: "intense" },
  { from: 2, to: 4, strength: 0.7, type: "healing" },
  { from: 3, to: 5, strength: 0.6, type: "confusion" },
  { from: 3, to: 7, strength: 0.8, type: "intense" },
  { from: 5, to: 6, strength: 0.8, type: "transformation" },
  { from: 4, to: 6, strength: 0.9, type: "healing" },
  { from: 7, to: 8, strength: 0.7, type: "release" },
  { from: 6, to: 8, strength: 0.6, type: "peace" },
];

const analysisCards = [
  {
    title: "Mapeando",
    subtitle: "padrões",
    icon: Brain,
    x: 90,
    y: 8,
    delay: 4,
    progress: 85,
  },
  {
    title: "Analisando",
    subtitle: "conexões",
    icon: Sparkles,
    x: 5,
    y: 90,
    delay: 4.5,
    progress: 72,
  },
  {
    title: "Processando",
    subtitle: "emoções",
    icon: Heart,
    x: 92,
    y: 60,
    delay: 5,
    progress: 94,
  },
];

// Partículas flutuantes para dar mais vida
const particles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 5,
  duration: Math.random() * 3 + 2,
}));

export default function EmotionalNetworkVisualization() {
  const [activeEmotion, setActiveEmotion] = useState<number | null>(null);

  // Animação de pulsação dos sentimentos
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveEmotion(Math.floor(Math.random() * emotions.length) + 1);
      setTimeout(() => setActiveEmotion(null), 1000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background com gradiente mais sofisticado */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 rounded-3xl" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-violet-100/20 to-purple-100/30 rounded-3xl" />

      {/* Partículas de fundo */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-violet-200/30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Linhas de conexão melhoradas */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        <defs>
          <linearGradient
            id="connectionGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0.4)" />
            <stop offset="50%" stopColor="rgba(168, 85, 247, 0.6)" />
            <stop offset="100%" stopColor="rgba(139, 92, 246, 0.4)" />
          </linearGradient>
        </defs>
        {connections.map((connection, index) => {
          const fromEmotion = emotions.find((e) => e.id === connection.from);
          const toEmotion = emotions.find((e) => e.id === connection.to);

          if (!fromEmotion || !toEmotion) return null;

          const isActive =
            activeEmotion === connection.from ||
            activeEmotion === connection.to;

          return (
            <g key={index}>
              {/* Linha principal */}
              <motion.line
                x1={`${fromEmotion.x}%`}
                y1={`${fromEmotion.y}%`}
                x2={`${toEmotion.x}%`}
                y2={`${toEmotion.y}%`}
                stroke="url(#connectionGradient)"
                strokeWidth={isActive ? "3" : "2"}
                strokeDasharray={connection.type === "intense" ? "5,5" : "none"}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: connection.strength * (isActive ? 0.9 : 0.5),
                }}
                transition={{
                  duration: 2,
                  delay: connection.from * 0.2,
                }}
              />
              {/* Efeito de pulso */}
              {isActive && (
                <motion.line
                  x1={`${fromEmotion.x}%`}
                  y1={`${fromEmotion.y}%`}
                  x2={`${toEmotion.x}%`}
                  y2={`${toEmotion.y}%`}
                  stroke="rgba(168, 85, 247, 0.8)"
                  strokeWidth="6"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: 1,
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Sentimentos flutuantes melhorados */}
      {emotions.map((emotion) => (
        <motion.div
          key={emotion.id}
          className="absolute z-10"
          style={{
            left: `${emotion.x}%`,
            top: `${emotion.y}%`,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: activeEmotion === emotion.id ? 1.4 : 1,
            opacity: 1,
            y: [0, -8, 0],
            rotate: activeEmotion === emotion.id ? [0, 5, -5, 0] : 0,
          }}
          transition={{
            scale: { duration: 0.4, ease: "easeOut" },
            opacity: { duration: 0.6, delay: emotion.delay },
            y: {
              duration: 3 + emotion.intensity,
              repeat: Infinity,
              delay: emotion.delay,
              ease: "easeInOut",
            },
            rotate: { duration: 0.5 },
          }}
        >
          {/* Círculo principal com gradiente */}
          <div
            className={`relative w-14 h-14 bg-gradient-to-br ${emotion.color} rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/40`}
          >
            <span
              className={`${emotion.textColor} font-semibold text-[8px] text-center leading-tight drop-shadow-sm`}
            >
              {emotion.name}
            </span>

            {/* Brilho interno */}
            <div className="absolute inset-1 bg-white/20 rounded-full blur-sm" />
          </div>

          {/* Aura quando ativo */}
          {activeEmotion === emotion.id && (
            <>
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${emotion.color} rounded-full`}
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${emotion.color} rounded-full`}
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              />
            </>
          )}

          {/* Indicador de intensidade */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white/30 rounded-full overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${emotion.color} rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: `${emotion.intensity * 100}%` }}
              transition={{ duration: 1, delay: emotion.delay + 0.5 }}
            />
          </div>
        </motion.div>
      ))}

      {/* Cards de análise melhorados */}
      {analysisCards.map((card, index) => (
        <motion.div
          key={index}
          className="absolute z-20"
          style={{
            left: `${card.x}%`,
            top: `${card.y}%`,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ scale: 0, opacity: 0, rotateY: 90 }}
          animate={{
            scale: 1,
            opacity: 1,
            rotateY: 0,
            y: [0, -3, 0],
          }}
          transition={{
            scale: { duration: 0.6, delay: card.delay },
            opacity: { duration: 0.6, delay: card.delay },
            rotateY: { duration: 0.7, delay: card.delay },
            y: {
              duration: 4,
              repeat: Infinity,
              delay: card.delay + 1,
              ease: "easeInOut",
            },
          }}
          whileHover={{ scale: 1.05, y: -2 }}
        >
          <div className="bg-white/98 backdrop-blur-md rounded-xl p-3 shadow-lg border border-violet-200/60">
            <div className="flex flex-col items-center space-y-1.5">
              <div className="relative">
                <card.icon className="w-4 h-4 text-violet-600" />
                <motion.div
                  className="absolute -inset-1 bg-violet-200/40 rounded-full"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div className="text-center">
                <div className="text-[9px] font-semibold text-gray-800">
                  {card.title}
                </div>
                <div className="text-[7px] text-gray-600">{card.subtitle}</div>
              </div>

              {/* Barra de progresso */}
              <div className="w-12 h-1 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-violet-500 to-purple-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${card.progress}%` }}
                  transition={{ duration: 1.5, delay: card.delay + 0.5 }}
                />
              </div>
              <div className="text-[6px] text-gray-500 font-medium">
                {card.progress}%
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Avatars representando pessoas - Melhorados */}
      <motion.div
        className="absolute z-10"
        style={{ left: "30%", top: "30%", transform: "translate(-50%, -50%)" }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 0.5,
          delay: 1,
          rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <div className="relative w-10 h-10 bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white/40">
          <User className="w-5 h-5 text-white drop-shadow-sm" />
          <motion.div
            className="absolute -inset-0.5 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full opacity-30"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>

      <motion.div
        className="absolute z-10"
        style={{ left: "65%", top: "35%", transform: "translate(-50%, -50%)" }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          rotate: [0, -5, 5, 0],
        }}
        transition={{
          duration: 0.5,
          delay: 1.2,
          rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <div className="relative w-10 h-10 bg-gradient-to-br from-rose-400 via-pink-500 to-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white/40">
          <User className="w-5 h-5 text-white drop-shadow-sm" />
          <motion.div
            className="absolute -inset-0.5 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full opacity-30"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Pontos de dados flutuantes */}
      {[
        { x: 35, y: 20, delay: 5 },
        { x: 85, y: 85, delay: 5.5 },
        { x: 25, y: 75, delay: 6 },
      ].map((point, index) => (
        <motion.div
          key={`data-${index}`}
          className="absolute z-5"
          style={{
            left: `${point.x}%`,
            top: `${point.y}%`,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 0.4,
            y: [0, -8, 0],
          }}
          transition={{
            scale: { duration: 0.3, delay: point.delay },
            opacity: { duration: 0.3, delay: point.delay },
            y: {
              duration: 2.5,
              repeat: Infinity,
              delay: point.delay,
              ease: "easeInOut",
            },
          }}
        >
          <div className="w-1.5 h-1.5 bg-violet-300 rounded-full"></div>
        </motion.div>
      ))}

      {/* Texto de status melhorado */}
      <motion.div
        className="absolute bottom-3 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 4.5 }}
      >
        <div className="bg-white/98 backdrop-blur-md rounded-full px-4 py-2 shadow-lg border border-violet-200/60">
          <motion.span
            className="text-[10px] font-semibold text-violet-700 flex items-center gap-1"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              ✨
            </motion.span>
            Mapeando sua jornada emocional
          </motion.span>
        </div>
      </motion.div>

      {/* Efeitos de luz ambiente */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 2 }}
      >
        {/* Raios de luz sutis */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-violet-300/20 via-transparent to-transparent transform rotate-12" />
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-purple-300/20 via-transparent to-transparent transform -rotate-12" />
        <div className="absolute bottom-0 left-1/3 w-px h-full bg-gradient-to-t from-indigo-300/20 via-transparent to-transparent transform rotate-6" />
      </motion.div>
    </div>
  );
}
