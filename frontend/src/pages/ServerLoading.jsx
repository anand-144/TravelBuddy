import React from "react";

const ServerLoading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 text-center px-4">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
        Render Server is Loading...
      </h1>

      <p className="text-base sm:text-lg text-gray-600 max-w-md leading-relaxed">
        Please wait a few moments while we wake up the server.
        <br />
        Then sit back, relax, and enjoy the show 🎬
      </p>

      <div className="mt-8 flex gap-2">
        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
      </div>

      <p className="absolute bottom-6 text-xs text-gray-400">
        Powered by TravelBuddy
      </p>
    </div>
  );
};

export default ServerLoading;
