import { motion } from "framer-motion";

const LetterIcon = () => {
  return (
    <motion.div
      className="relative inline-block"
      initial={{ opacity: 0, y: -50, rotate: -10 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        delay: 0.2,
        duration: 0.8,
      }}
    >
      {/* Sombra da carta */}
      <div className="absolute bottom-0 left-0 w-full h-full bg-slate-300 rounded-lg blur-md -translate-y-1 scale-95"></div>

      {/* Ícone do coração pulsante */}
      <motion.div
        className="absolute -top-3 -right-3 z-10"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
      >
        <div className="relative w-8 h-8 flex items-center justify-center">
          <div className="absolute inset-0 bg-red-400 rounded-full blur-sm"></div>
          <span className="text-xl relative">❤️</span>
        </div>
      </motion.div>

      {/* Corpo da carta */}
      <div className="relative bg-white p-4 rounded-lg shadow-lg border border-slate-100 w-20 h-20 flex items-center justify-center">
        {/* SVG do envelope */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-slate-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      </div>
    </motion.div>
  );
};

export default LetterIcon;
