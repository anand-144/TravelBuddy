import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaGlobeAsia,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-violet-600 via-blue-600 to-cyan-500 text-white py-12 px-6 rounded-t-3xl shadow-[0_-4px_25px_rgba(0,0,0,0.1)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-10 text-center md:text-left">

        {/* ---- Left: Brand Info ---- */}
        <div className="flex flex-col items-center md:items-start gap-4 w-full md:w-1/3">
          <Link to="/" className="flex items-center gap-2 group">
            <FaGlobeAsia className="text-4xl text-white group-hover:rotate-[360deg] transition-transform duration-1000" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-cyan-100 to-violet-100 bg-clip-text text-transparent">
              TravelBuddy
            </h1>
          </Link>
          <p className="text-white/90 max-w-sm text-sm leading-relaxed">
            Discover breathtaking destinations, plan your dream trips, and make
            every journey unforgettable with your ultimate travel companion.
          </p>
        </div>

        {/* ---- Middle: Quick Links ---- */}
        <div className="space-y-4 w-full md:w-1/3">
          <h3 className="text-lg font-semibold border-b border-white/30 pb-2 inline-block">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-cyan-200 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/create-trip" className="hover:text-cyan-200 transition-colors">
                Plan a Trip
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-cyan-200 transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-cyan-200 transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* ---- Right: Social Media ---- */}
        <div className="space-y-4 w-full md:w-1/3">
          <h3 className="text-lg font-semibold border-b border-white/30 pb-2 inline-block">
            Connect With Us
          </h3>
          <div className="flex justify-center md:justify-start gap-5 text-2xl">
            {[
              { icon: <FaFacebook />, link: "#" },
              { icon: <FaInstagram />, link: "#" },
              { icon: <FaTwitter />, link: "#" },
              { icon: <FaGlobeAsia />, link: "#" },
              { icon: <FaEnvelope />, link: "mailto:support@travelbuddy.com" },
            ].map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-200 transition-transform transform hover:scale-110"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ---- Divider & Bottom Note ---- */}
      <div className="mt-10 border-t border-white/20 pt-6 text-center text-sm text-white/80">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-white">TravelBuddy</span>. All
        rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
