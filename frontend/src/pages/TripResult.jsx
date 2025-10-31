import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { generateTravelPlan } from "../services/AIModal";
import TripHeader from "../components/trip/TripHeader";
import HotelList from "../components/trip/HotelList";
import ItinerarySection from "../components/trip/ItinerarySection";
import OptionalExperiences from "../components/trip/OptionalExperiences";
import TravelTips from "../components/trip/TravelTips";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";
import { FaMapMarkedAlt } from "react-icons/fa";

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
      } catch {
        setAiResult({ error: true });
      } finally {
        setLoading(false);
      }
    };
    fetchPlan();
  }, [tripData, navigate]);

  if (loading) return <Loader />;
  if (!aiResult || aiResult.error)
    return <ErrorState onBack={() => navigate("/create-trip")} />;

  const {
    hotels,
    itinerary,
    optional_experiences,
    travel_tips,
    total_estimate,
    image,
  } = aiResult;

  const renderPrice = (price) =>
    price
      ? typeof price === "object"
        ? `${price.currency || "₹"}${price.amount || ""}`
        : price
      : "N/A";

  // 🔹 Redirect handler for map view
  const handleMapRedirect = () => {
    navigate("/trip-map", {
      state: { location: tripData.location, hotels, itinerary },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <TripHeader
          onBack={() => navigate("/create-trip")}
          tripData={tripData}
          bannerImage={image}
          totalEstimate={total_estimate}
        />

        {/* 🔹 View on Map Button (inline, no import needed) */}
        <div className="flex justify-end mb-10">
          <button
            onClick={handleMapRedirect}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-full hover:shadow-lg transition-all hover:scale-105 font-semibold"
          >
            <FaMapMarkedAlt />
            View on Map
          </button>
        </div>

        {/* Sections */}
        <HotelList hotels={hotels} renderPrice={renderPrice} />
        <ItinerarySection itinerary={itinerary} renderPrice={renderPrice} />
        <OptionalExperiences experiences={optional_experiences} />
        <TravelTips tips={travel_tips} />

        {/* 🔹 Plan Another Trip CTA */}
        <div className="flex justify-center mt-16">
          <button
            onClick={() => navigate("/create-trip")}
            className="px-10 py-4 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-full font-bold hover:shadow-2xl transition-all hover:scale-105"
          >
            Plan Another Trip
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripResult;
