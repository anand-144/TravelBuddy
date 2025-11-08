// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gradient-to-b from-blue-50 to-white px-4">
      {/* Animated 404 */}
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="text-7xl sm:text-8xl font-extrabold text-blue-600 mb-6"
      >
        404
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2"
      >
        Page Not Found
      </motion.h2>

      <p className="text-gray-600 mb-8 max-w-md">
        Oops! The page you’re looking for doesn’t exist or has been moved.  
        Try going back to the homepage.
      </p>

      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-300"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
