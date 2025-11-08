import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaTrashAlt,
  FaMapMarkedAlt,
  FaHotel,
  FaLightbulb,
  FaListUl,
  FaClock,
  FaUserFriends,
  FaMoneyBillAlt,
  FaGlobe,
  FaChevronDown,
  FaChevronUp,
  FaComments,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const SavedTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});
  const navigate = useNavigate();

  const toggleSection = (tripId, section) => {
    setExpanded((prev) => ({
      ...prev,
      [tripId]: { ...prev[tripId], [section]: !prev[tripId]?.[section] },
    }));
  };

  const fetchTrips = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/trips/my-trips`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTrips(res.data);
      console.log("✅ Fetched Saved Trips:", res.data);
    } catch (err) {
      console.error("❌ Error fetching trips:", err);
      toast.error("Failed to load saved trips");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this trip?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_API_URL}/trips/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Trip deleted!");
      setTrips((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      toast.error("Failed to delete trip");
    }
  };

  const handleJoinSoloChat = async (location) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/chat/location/${encodeURIComponent(location)}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(`/chat/${res.data._id}`);
    } catch {
      toast.error("No group exists yet — save the trip again to create & join it.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-700">
        Loading your saved trips...
      </div>
    );

  if (trips.length === 0)
    return (
      <div className="flex flex-col justify-center items-center h-screen text-gray-600">
        <p className="text-xl mb-4">You have no saved trips yet.</p>
        <button
          onClick={() => navigate("/create-trip")}
          className="px-8 py-3 bg-violet-600 text-white rounded-full font-semibold hover:scale-105 transition"
        >
          Plan a New Trip
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-10 text-violet-700">
          Your Saved Trips
        </h1>

        <div className="space-y-8">
          {trips.map((trip) => (
            <div
              key={trip._id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 p-6">
                <div className="flex items-center gap-5">
                  <img
                    src={trip.image}
                    alt={trip.location}
                    className="w-40 h-28 object-cover rounded-xl border border-gray-200"
                  />
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                      <FaGlobe className="text-violet-600" /> {trip.location}
                    </h2>
                    <p className="text-gray-600 flex items-center gap-3 mt-1 text-sm">
                      <span className="flex items-center gap-1">
                        <FaClock /> {trip.duration || "N/A"} days
                      </span>
                      <span className="flex items-center gap-1">
                        <FaUserFriends /> {trip.travelers}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaMoneyBillAlt /> {trip.budget}
                      </span>
                    </p>
                    {trip.total_estimate && (
                      <p className="mt-1 text-xs text-gray-500">
                        💵 Total Estimate: {JSON.stringify(trip.total_estimate)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 justify-end">
                  {trip.travelers?.toLowerCase().includes("solo") && (
                    <button
                      onClick={() => handleJoinSoloChat(trip.location)}
                      className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm rounded-full hover:bg-emerald-700 transition"
                    >
                      <FaComments /> Join Solo Chat
                    </button>
                  )}

                  <button
                    onClick={() =>
                      navigate("/trip-map", {
                        state: {
                          location: trip.location,
                          hotels: trip.hotels,
                          itinerary: trip.itinerary,
                        },
                      })
                    }
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition"
                  >
                    <FaMapMarkedAlt /> View Map
                  </button>

                  <button
                    onClick={() => handleDelete(trip._id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm rounded-full hover:bg-red-700 transition"
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </div>
              </div>

              {/* Collapsible Sections */}
              <div className="border-t border-gray-200 px-6 pb-6">
                {/* Hotels */}
                {trip.hotels?.length > 0 && (
                  <CollapsibleSection
                    trip={trip}
                    expanded={expanded}
                    toggleSection={toggleSection}
                    section="hotels"
                    title={`Hotels (${trip.hotels.length})`}
                    icon={<FaHotel />}
                    color="blue"
                    content={trip.hotels.map((hotel, i) => (
                      <div
                        key={i}
                        className="bg-blue-50 rounded-xl p-3 border border-blue-100 text-sm"
                      >
                        <h4 className="font-semibold">{hotel.name}</h4>
                        <p>{hotel.address}</p>
                        <p className="text-gray-500">
                          ⭐ {hotel.rating} | 💵 {hotel.price}
                        </p>
                        <p className="mt-1 text-gray-600">{hotel.short_description}</p>
                      </div>
                    ))}
                  />
                )}

                {/* Experiences */}
                {trip.optional_experiences?.length > 0 && (
                  <CollapsibleSection
                    trip={trip}
                    expanded={expanded}
                    toggleSection={toggleSection}
                    section="experiences"
                    title={`Experiences (${trip.optional_experiences.length})`}
                    icon={<FaListUl />}
                    color="rose"
                    content={trip.optional_experiences.map((exp, i) => (
                      <div
                        key={i}
                        className="bg-rose-50 rounded-xl p-3 border border-rose-100 text-sm"
                      >
                        <h4 className="font-semibold">{exp.name}</h4>
                        <p>{exp.description}</p>
                        <p className="text-xs text-gray-500">
                          🏷️ {exp.category} | 💰 {exp.price_estimate}
                        </p>
                      </div>
                    ))}
                  />
                )}

                {/* Tips */}
                {trip.travel_tips?.length > 0 && (
                  <CollapsibleSection
                    trip={trip}
                    expanded={expanded}
                    toggleSection={toggleSection}
                    section="tips"
                    title={`Travel Tips (${trip.travel_tips.length})`}
                    icon={<FaLightbulb />}
                    color="emerald"
                    content={trip.travel_tips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                    isList
                  />
                )}

                {/* Itinerary */}
                {trip.itinerary && Object.keys(trip.itinerary).length > 0 && (
                  <CollapsibleSection
                    trip={trip}
                    expanded={expanded}
                    toggleSection={toggleSection}
                    section="itinerary"
                    title={`Itinerary (${Object.keys(trip.itinerary).length} days)`}
                    icon={<FaClock />}
                    color="violet"
                    content={Object.entries(trip.itinerary).map(([day, activities], i) => (
                      <div key={i}>
                        <h4 className="font-semibold text-gray-800 mb-1">{day}</h4>
                        <ul className="list-disc list-inside text-gray-700 text-sm pl-3">
                          {activities.map((act, j) => (
                            <li key={j}>{act.place_name || act}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 🔹 Collapsible Section Component
const CollapsibleSection = ({
  trip,
  expanded,
  toggleSection,
  section,
  title,
  icon,
  color,
  content,
  isList = false,
}) => (
  <div className="mt-4">
    <button
      onClick={() => toggleSection(trip._id, section)}
      className={`flex justify-between items-center w-full text-left font-semibold text-${color}-700 py-2`}
    >
      <span className="flex items-center gap-2">
        {icon} {title}
      </span>
      {expanded[trip._id]?.[section] ? <FaChevronUp /> : <FaChevronDown />}
    </button>
    <AnimatePresence>
      {expanded[trip._id]?.[section] && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className={`${isList ? "list-disc list-inside pl-3" : "grid md:grid-cols-2 gap-3 mt-2"}`}
        >
          {content}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default SavedTrips;
