import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        shimmer: "shimmer 2.5s ease-in-out infinite",
        "pulse-shine": "pulse-shine 2s ease-in-out infinite",
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
      },
    },
  },
  plugins: [],
};

export default config;
