import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { generateTravelPlan } from "../services/AIModal";

const TripResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const tripData = location.state;

  const [loading, setLoading] = useState(true);
  const [aiResult, setAiResult] = useState(null);

  useEffect(() => {
    if (!tripData) {
      navigate("/create-trip");
      return;
    }

    const fetchPlan = async () => {
      try {
        const plan = await generateTravelPlan(
          tripData.location,
          tripData.duration,
          tripData.travelers,
          tripData.budget
        );
        setAiResult(plan);
      } catch (err) {
        console.error("Error generating plan:", err);
        setAiResult({ error: true, message: "Failed to generate trip." });
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [tripData, navigate]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-600">
        <h2 className="text-2xl font-semibold animate-pulse">
          Generating your trip plan... ✈️
        </h2>
      </div>
    );
  }

  if (!aiResult || aiResult.error) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-semibold text-red-600">
          Oops! Something went wrong 😢
        </h2>
        <p className="mt-3 text-gray-500">
          {aiResult?.message || "No trip data found. Please try again."}
        </p>
        <button
          onClick={() => navigate("/create-trip")}
          className="mt-6 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          Go Back
        </button>
      </div>
    );
  }

  const { hotels = [], itinerary = {}, image: bannerImage } = aiResult;

  const renderPrice = (price) => {
    if (!price) return "N/A";
    if (typeof price === "object") {
      const { currency, amount, per_night } = price;
      return `${currency || "₹"} ${amount || "N/A"}${
        per_night ? " / night" : ""
      }`;
    }
    return price;
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-gray-50 rounded-2xl shadow-lg">
      {/* 🌄 Destination Banner */}
      {bannerImage && (
        <img
          src={bannerImage}
          alt="Destination"
          className="w-full h-72 object-cover rounded-2xl mb-6"
        />
      )}

      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        🧭 Your AI-Generated Travel Plan
      </h2>

      {/* 🏨 Hotels Section */}
      {hotels.length > 0 && (
        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">🏨 Recommended Hotels</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map((hotel, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition"
              >
                {hotel.image_url && (
                  <img
                    src={hotel.image_url}
                    alt={hotel.name}
                    className="rounded-xl mb-3 h-48 w-full object-cover"
                  />
                )}
                <h3 className="text-lg font-bold">{hotel.name}</h3>
                <p className="text-gray-600 text-sm">{hotel.address}</p>
                <p className="mt-2 text-blue-600 font-semibold">
                  {renderPrice(hotel.price)}
                </p>
                <p className="text-sm mt-1">⭐ {hotel.rating}/5</p>
                <p className="text-sm text-gray-700 mt-2">
                  {hotel.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 🗓️ Itinerary Section */}
      {Object.keys(itinerary).length > 0 && (
        <section>
          <h3 className="text-2xl font-semibold mb-4">🗓️ Itinerary</h3>
          {Object.entries(itinerary).map(([day, places]) => (
            <div key={day} className="mb-8">
              <h4 className="text-xl font-semibold mb-2 capitalize">{day}</h4>
              <div className="space-y-4">
                {places.map((place, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex gap-4">
                      {place.image_url && (
                        <img
                          src={place.image_url}
                          alt={place.place_name}
                          className="w-32 h-24 rounded-lg object-cover"
                        />
                      )}
                      <div>
                        <h4 className="text-lg font-semibold">
                          {place.place_name}
                        </h4>
                        <p className="text-gray-700 text-sm">{place.details}</p>
                        <p className="text-sm text-blue-600 mt-1">
                          🎟 {renderPrice(place.ticket_pricing)}
                        </p>
                        <p className="text-sm">⭐ {place.rating}</p>
                        <p className="text-sm text-green-600">
                          🕒 {place.best_time_to_visit}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      <div className="flex justify-end mt-10">
        <button
          onClick={() => navigate("/create-trip")}
          className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800"
        >
          Plan Another Trip 🌍
        </button>
      </div>
    </div>
  );
};

export default TripResult;
