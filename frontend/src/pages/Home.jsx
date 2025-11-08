import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FaRocket, FaMapMarkedAlt, FaBrain, FaRegClock, FaShieldAlt, FaGlobe } from 'react-icons/fa';
import ThreeDModel from '../components/three/ThreeDModel';

const AnimatedCounter = ({ target, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration * 60); // approx 60 frames per sec
    const interval = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(interval);
      }
      setCount(parseFloat(start.toFixed(1)));
    }, 1000 / 60);
    return () => clearInterval(interval);
  }, [target, duration]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const Home = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50">

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-violet-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] bg-blue-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-40 right-1/3 w-96 h-96 bg-cyan-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 sm:px-12 lg:px-24 text-center py-20">

        {/* Hero Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-xl shadow-lg border border-white/20 mb-8 animate-fade-in">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-violet-600"></span>
          </span>
          <span className="text-sm font-semibold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
            AI-Powered Travel Planning
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight mb-6 animate-fade-in">
          <span className="bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
            Dream. Plan.
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
            Explore.
          </span>
        </h1>

        {/* 🧭 3D Model Section */}
        <div className="w-full max-w-4xl h-[400px] mb-10 animate-fade-in">
          <ThreeDModel />
        </div>

        {/* Description */}
        <p className="text-lg sm:text-xl text-gray-700 max-w-2xl leading-relaxed bg-white/60 backdrop-blur-xl p-6 sm:p-8 rounded-3xl mb-10 shadow-xl border border-white/20 animate-fade-in">
          Experience the future of travel planning with AI. Get personalized itineraries that match your style, budget, and dreams in seconds.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-in">
          <Link to="/create-trip">
            <button className="group relative px-8 py-4 sm:px-10 sm:py-5 font-bold text-lg bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden cursor-pointer">
              <span className="relative z-10 flex items-center gap-2">
                <FaRocket className="group-hover:rotate-12 transition-transform" />
                Start Planning Free
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </Link>

          <a href="#features">
            <button className="px-8 py-4 sm:px-10 sm:py-5 font-bold text-lg bg-white/80 backdrop-blur-xl text-gray-700 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20 cursor-pointer">
              Learn More
            </button>
          </a>
        </div>

        {/* 🌍 Animated Stats Section */}
        <div className="grid grid-cols-3 gap-8 max-w-3xl w-full mb-20 animate-fade-in">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg"
          >
            <div className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent mb-1">
              <AnimatedCounter target={1000000} duration={2} suffix="+" />
            </div>
            <div className="text-sm text-gray-600 font-medium">Trips Planned</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg"
          >
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-1">
              <AnimatedCounter target={4.9} duration={2.5} suffix="★" />
            </div>
            <div className="text-sm text-gray-600 font-medium">User Rating</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg"
          >
            <div className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent mb-1">
              <AnimatedCounter target={195} duration={2} suffix="+" />
            </div>
            <div className="text-sm text-gray-600 font-medium">Countries</div>
          </motion.div>
        </div>

        {/* ✨ Features Section */}
        <div
          id="features"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full animate-fade-in text-center"
          style={{ animationDelay: '0.5s' }}
        >
          {[
            {
              icon: <FaBrain className="text-3xl text-white" />,
              title: "AI-Powered",
              desc: "Smart recommendations tailored to your unique preferences and travel style.",
              gradient: "from-violet-500 to-blue-600",
            },
            {
              icon: <FaMapMarkedAlt className="text-3xl text-white" />,
              title: "Interactive Maps",
              desc: "Visualize your entire journey with beautiful, detailed interactive maps.",
              gradient: "from-blue-500 to-cyan-600",
            },
            {
              icon: <FaRegClock className="text-3xl text-white" />,
              title: "Instant Results",
              desc: "Get your complete personalized itinerary in seconds, not hours.",
              gradient: "from-cyan-500 to-teal-600",
            },
            {
              icon: <FaShieldAlt className="text-3xl text-white" />,
              title: "Trusted & Secure",
              desc: "Your data is protected with enterprise-grade security measures.",
              gradient: "from-teal-500 to-green-600",
            },
            {
              icon: <FaGlobe className="text-3xl text-white" />,
              title: "Global Coverage",
              desc: "Explore destinations across 195+ countries worldwide.",
              gradient: "from-green-500 to-emerald-600",
            },
            {
              icon: <FaRocket className="text-3xl text-white" />,
              title: "Always Free",
              desc: "Premium features at no cost. Start planning your dream trip today.",
              gradient: "from-pink-500 to-rose-600",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl hover:shadow-2xl transition-all group border border-white/20 hover:scale-105 duration-300 flex flex-col items-center text-center"
            >
              {/* Centered Icon */}
              <div
                className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg`}
              >
                {feature.icon}
              </div>

              {/* Title & Description */}
              <h3 className="font-bold text-xl mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Home;
