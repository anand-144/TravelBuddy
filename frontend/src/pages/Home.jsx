import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 sm:px-24 lg:px-56 text-center overflow-hidden">
      {/* Static Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#0ea5e9,_#0f172a_70%)] opacity-90"></div>

      {/* Static Glow Orbs */}
      <div className="absolute -top-20 -left-10 w-60 h-60 bg-blue-500/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-green-500/30 rounded-full blur-3xl" />

      {/* Title */}
      <h1 className="font-extrabold text-4xl sm:text-6xl lg:text-7xl leading-tight relative z-10">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400 drop-shadow-[0_0_25px_rgba(34,197,94,0.5)]">
          From Dream to Destination
        </span>{" "}
        <span className="block text-gray-200 mt-2">
          Planned Perfectly by <span className="text-blue-400 font-bold">AI</span>.
        </span>
      </h1>

      {/* CTA Button */}

      {/* Description */}
      <p className="text-lg sm:text-xl text-gray-300 max-w-3xl leading-relaxed bg-white/10 backdrop-blur-lg p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl mt-8 relative z-10">
        🌍 Every traveler is unique — let{" "}
        <span className="text-green-400 font-semibold">AI</span> craft a journey that’s truly yours ✈️.
        <br className="hidden sm:block" />
        Discover destinations that match your passions, plan smarter, and explore the world effortlessly 🌄.
      </p>


      <Link to={'/create-trip'}>
        <button className="relative z-10 mt-8 px-8 py-3 sm:px-10 sm:py-4 font-semibold text-lg text-white bg-gradient-to-r from-blue-500 via-green-400 to-yellow-400 rounded-full shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95">
          Get Started — It's Free
        </button>
      </Link>

      {/* Decorative Line */}
      <div className="w-40 h-1 mt-10 bg-gradient-to-r from-green-400 via-blue-400 to-yellow-400 rounded-full" />
    </div>
  );
};

export default Home;
