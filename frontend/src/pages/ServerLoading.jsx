import React from "react";
import { FaFilm, FaServer } from "react-icons/fa";

const ServerLoading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-blue-900 to-sky-700 text-white text-center px-6">
      {/* Icon Section */}
      <div className="mb-8 relative">
        <FaServer className="text-7xl text-sky-400 drop-shadow-xl" />
        <FaFilm className="text-3xl text-yellow-400 absolute -bottom-2 -right-2" />
      </div>

      {/* Text Section */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide mb-4">
        Render Server is Loading...
      </h1>

      <p className="text-lg sm:text-xl text-sky-100 max-w-xl leading-relaxed">
        Please wait a few moments — then sit back, relax, and{" "}
        <span className="text-yellow-300 font-semibold">enjoy the show 🎬</span>
      </p>

      {/* Static Loader */}
      <div className="mt-10 flex items-center justify-center space-x-2">
        <div className="w-3 h-3 bg-yellow-300 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-300 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-300 rounded-full"></div>
      </div>

      {/* Footer Note */}
      <p className="absolute bottom-8 text-sm text-sky-200 opacity-70">
        Powered by PaperAI | Bringing ideas to life ✨
      </p>
    </div>
  );
};

export default ServerLoading;
