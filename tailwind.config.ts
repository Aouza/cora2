import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Oficial Cora.Deep
        "cora-deep": "#3D2A54", // Roxo Profundo - Fundo principal
        "cora-wine": "#8C3A52", // Vinho Emocional - CTAs e intensidade
        "cora-sand": "#F5E6DC", // Areia Quente - Tipografia principal
        "cora-mist": "#B9B4BD", // Cinza Nebuloso - Suporte de interface
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        inter: ["Inter", "sans-serif"],
        cormorant: ["Cormorant Garamond", "serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderRadius: {
        cora: "1.5rem", // 2xl para suavidade
      },
      animation: {
        shimmer: "shimmer 2.5s ease-in-out infinite",
        "pulse-shine": "pulse-shine 2s ease-in-out infinite",
        "fade-in-slow": "fadeIn 1.5s ease-in-out",
        breathe: "breathe 4s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "50%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "pulse-shine": {
          "0%, 100%": {
            color: "rgb(30 41 59)", // slate-800
            textShadow: "none",
          },
          "50%": {
            color: "rgb(51 65 85)", // slate-600
            textShadow: "0 0 8px rgba(255, 255, 255, 0.5)",
          },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.02)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
