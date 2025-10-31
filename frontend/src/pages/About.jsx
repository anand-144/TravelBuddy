import React from "react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 sm:px-24 lg:px-56 text-center bg-gradient-to-b from-sky-100 to-white">
      <h1 className="text-4xl font-bold text-sky-700 mb-6">About TravelBuddy</h1>
      <p className="text-lg text-gray-700 max-w-3xl leading-relaxed">
        TravelBuddy is your smart companion for discovering the world with ease.
        We help travelers plan personalized trips, find hidden gems, and connect
        with local experiences — all powered by intelligent AI and real-time
        travel insights. 🌍✈️
      </p>
      <p className="text-gray-600 mt-4 max-w-2xl">
        Whether you’re planning a solo adventure, a family vacation, or a
        weekend getaway, TravelBuddy simplifies everything — from destination
        inspiration to itinerary planning — so you can focus on the journey, not
        the stress.
      </p>
    </div>
  );
};

export default About;
