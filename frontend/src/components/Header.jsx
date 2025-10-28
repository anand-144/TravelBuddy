import React from "react";
import { FcGlobe } from "react-icons/fc";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 sm:px-10 backdrop-blur-lg border-b border-white/10 shadow-md overflow-hidden">
      {/* Static Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#0ea5e9,_#0f172a_70%)] opacity-90"></div>

      {/* Static Glow Orbs */}
      <div className="absolute -top-10 -left-10 w-48 h-48 bg-blue-500/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-green-500/30 rounded-full blur-3xl" />

      {/* Left: Logo + Title */}
      <div className="flex items-center gap-3 relative z-10">
        {/* Static Globe Icon */}
        <FcGlobe className="text-4xl sm:text-5xl drop-shadow-[0_0_20px_rgba(59,130,246,0.6)] animate-spin-slow" />

        {/* Brand Name */}
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(34,197,94,0.3)]">
          TravelBuddy
        </h1>
      </div>

      {/* Right: Button */}
      <button className="relative z-10 px-5 py-2 sm:px-6 sm:py-2.5 font-semibold text-white bg-gradient-to-r from-blue-500 via-green-400 to-yellow-400 rounded-full shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95">
        Sign In
      </button>

      {/* Decorative Gradient Line */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-green-400 via-blue-400 to-yellow-400 rounded-full opacity-70" />
    </header>
  );
};

export default Header;
