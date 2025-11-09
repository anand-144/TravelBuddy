import React from "react";
import { motion } from "framer-motion";
import { FaFilm, FaServer } from "react-icons/fa";

const ServerLoading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-blue-900 to-sky-700 text-white text-center px-6">
      {/* Animated Icon */}
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        className="mb-8"
      >
        <div className="relative">
          <FaServer className="text-7xl text-sky-400 drop-shadow-xl" />
          <FaFilm className="text-3xl text-yellow-400 absolute -bottom-2 -right-2 animate-bounce" />
        </div>
      </motion.div>

      {/* Text Section */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide mb-4"
      >
        Render Server is Loading...
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="text-lg sm:text-xl text-sky-100 max-w-xl leading-relaxed"
      >
        Please wait a few moments — then sit back, relax, and{" "}
        <span className="text-yellow-300 font-semibold">enjoy the show 🎬</span>
      </motion.p>

      {/* Loader Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="mt-10 flex items-center justify-center space-x-2"
      >
        <div className="w-3 h-3 bg-yellow-300 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <div className="w-3 h-3 bg-yellow-300 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <div className="w-3 h-3 bg-yellow-300 rounded-full animate-bounce" />
      </motion.div>

      {/* Optional Footer Message */}
      <p className="absolute bottom-8 text-sm text-sky-200 opacity-70">
        Powered by PaperAI | Bringing ideas to life ✨
      </p>
    </div>
  );
};

export default ServerLoading;
