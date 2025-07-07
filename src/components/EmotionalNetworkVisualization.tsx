"use client";

import { motion } from "framer-motion";
import { Heart, User, Brain, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

// Dados dos sentimentos e conexões
const emotions = [
  { id: 1, name: "Saudade", color: "bg-red-400", x: 20, y: 15, delay: 0 },
  { id: 2, name: "Amor", color: "bg-pink-400", x: 70, y: 25, delay: 0.5 },
  { id: 3, name: "Dor", color: "bg-orange-400", x: 15, y: 60, delay: 1 },
  { id: 4, name: "Esperança", color: "bg-green-400", x: 80, y: 70, delay: 1.5 },
  { id: 5, name: "Confusão", color: "bg-purple-400", x: 45, y: 40, delay: 2 },
  { id: 6, name: "Clareza", color: "bg-blue-400", x: 60, y: 80, delay: 2.5 },
];

const connections = [
  { from: 1, to: 2, strength: 0.8 },
  { from: 1, to: 3, strength: 0.9 },
  { from: 2, to: 4, strength: 0.7 },
  { from: 3, to: 5, strength: 0.6 },
  { from: 5, to: 6, strength: 0.8 },
  { from: 4, to: 6, strength: 0.9 },
];

const analysisCards = [
  { title: "Diagnóstico", icon: Brain, x: 88, y: 12, delay: 3 },
  { title: "Padrões", icon: Sparkles, x: 8, y: 88, delay: 3.5 },
  { title: "Conexão", icon: Heart, x: 78, y: 55, delay: 4 },
];

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
    <div className="relative w-full h-full">
      {/* Background subtle */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-purple-50 rounded-3xl opacity-50" />

      {/* Linhas de conexão */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        {connections.map((connection, index) => {
          const fromEmotion = emotions.find((e) => e.id === connection.from);
          const toEmotion = emotions.find((e) => e.id === connection.to);

          if (!fromEmotion || !toEmotion) return null;

          return (
            <motion.line
              key={index}
              x1={`${fromEmotion.x}%`}
              y1={`${fromEmotion.y}%`}
              x2={`${toEmotion.x}%`}
              y2={`${toEmotion.y}%`}
              stroke="rgba(139, 92, 246, 0.2)"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: connection.strength * 0.6,
                strokeWidth:
                  activeEmotion === connection.from ||
                  activeEmotion === connection.to
                    ? 2
                    : 1.5,
              }}
              transition={{
                duration: 2,
                delay: connection.from * 0.3,
                strokeWidth: { duration: 0.3 },
              }}
            />
          );
        })}
      </svg>

      {/* Sentimentos flutuantes */}
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
            scale: activeEmotion === emotion.id ? 1.3 : 1,
            opacity: 1,
            y: [0, -10, 0],
          }}
          transition={{
            scale: { duration: 0.3 },
            opacity: { duration: 0.5, delay: emotion.delay },
            y: {
              duration: 3,
              repeat: Infinity,
              delay: emotion.delay,
              ease: "easeInOut",
            },
          }}
        >
          <div
            className={`w-12 h-12 ${emotion.color} rounded-full flex items-center justify-center shadow-md backdrop-blur-sm border border-white/30`}
          >
            <span className="text-white font-medium text-[9px] text-center leading-none">
              {emotion.name}
            </span>
          </div>

          {/* Pulse effect quando ativo */}
          {activeEmotion === emotion.id && (
            <motion.div
              className={`absolute inset-0 ${emotion.color} rounded-full`}
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 1 }}
            />
          )}
        </motion.div>
      ))}

      {/* Cards de análise */}
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
            y: [0, -5, 0],
          }}
          transition={{
            scale: { duration: 0.5, delay: card.delay },
            opacity: { duration: 0.5, delay: card.delay },
            rotateY: { duration: 0.6, delay: card.delay },
            y: {
              duration: 4,
              repeat: Infinity,
              delay: card.delay + 1,
              ease: "easeInOut",
            },
          }}
        >
          <div className="bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-sm border border-violet-100">
            <div className="flex items-center gap-1.5">
              <card.icon className="w-3 h-3 text-violet-600" />
              <span className="text-[10px] font-medium text-slate-600">
                {card.title}
              </span>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Avatars representando pessoas */}
      <motion.div
        className="absolute z-10"
        style={{ left: "30%", top: "30%", transform: "translate(-50%, -50%)" }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center shadow-sm">
          <User className="w-4 h-4 text-white" />
        </div>
      </motion.div>

      <motion.div
        className="absolute z-10"
        style={{ left: "65%", top: "35%", transform: "translate(-50%, -50%)" }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <div className="w-8 h-8 bg-gradient-to-br from-rose-400 to-rose-500 rounded-full flex items-center justify-center shadow-sm">
          <User className="w-4 h-4 text-white" />
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

      {/* Texto de status */}
      <motion.div
        className="absolute bottom-3 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 4.5 }}
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm border border-violet-100">
          <span className="text-[10px] font-medium text-violet-600">
            ✨ Analisando conexões emocionais...
          </span>
        </div>
      </motion.div>
    </div>
  );
}
