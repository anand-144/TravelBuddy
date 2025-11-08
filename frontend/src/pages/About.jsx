import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex flex-col items-center justify-center py-16 px-6 sm:px-16 lg:px-40">
      {/* Header Section */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl sm:text-6xl font-extrabold text-sky-700 text-center mb-6"
      >
        About <span className="text-sky-500">TravelBuddy🗼</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-lg sm:text-xl text-gray-700 max-w-3xl text-center leading-relaxed mb-10"
      >
        Your trusted AI-powered companion for exploring the world effortlessly.
        Whether you're chasing adventures, planning relaxing getaways, or
        exploring new cultures — <span className="font-semibold text-sky-600">TravelBuddy</span> helps you do it smarter, faster, and stress-free. 🌍✨
      </motion.p>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-5xl mt-10">
        {[
          {
            icon: <h1 className="text-4xl mb-3" >🧭</h1>,
            title: "Smart Trip Planning",
            desc: "AI-curated itineraries tailored to your preferences and travel style.",
          },
          {
            icon: <h1 className="text-4xl mb-3" >🌍</h1>,
            title: "Explore Hidden Gems",
            desc: "Discover local experiences, attractions, and authentic adventures.",
          },
          {
            icon: <h1 className="text-sky-600 text-4xl mb-3">😊</h1>,
            title: "Seamless Experience",
            desc: "From trip ideas to saved journeys — manage everything in one place.",
          },
          {
            icon: <h1 className="text-sky-600 text-4xl mb-3" >👥</h1>,
            title: "Connect & Share",
            desc: "Collaborate with friends and share memories from your travels.",
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center"
          >
            {feature.icon}
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Mission Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="max-w-3xl text-center mt-16"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-sky-700 mb-4">
          Our Mission 🌏
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          At <span className="font-semibold text-sky-600">TravelBuddy</span>, our mission is to make travel planning
          more personal, connected, and inspiring. We blend intelligent AI
          recommendations with real human experiences — empowering you to explore
          the world with confidence and joy.
        </p>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        className="mt-12"
      >
        <a
          href="/create-trip"
          className="px-8 py-4 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-full shadow-md transition-all duration-300"
        >
          Start Your Journey
        </a>
      </motion.div>
    </div>
  );  
};

export default About;
