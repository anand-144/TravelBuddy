import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrashAlt, FaMapMarkedAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const SavedTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchTrips = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/trips/my-trips", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTrips(res.data);
    } catch (err) {
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
      await axios.delete(`http://localhost:5000/api/trips/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Trip deleted!");
      setTrips((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      toast.error("Failed to delete trip");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
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
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-10">Your Saved Trips</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {trips.map((trip) => (
            <div
              key={trip._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all"
            >
              <img
                src={trip.image}
                alt={trip.location}
                className="h-48 w-full object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold mb-2">{trip.location}</h2>
                <p className="text-gray-500 mb-3">
                  {trip.duration} • {trip.travelers} • {trip.budget}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() =>
                      navigate("/trip-map", {
                        state: { location: trip.location, hotels: trip.hotels, itinerary: trip.itinerary },
                      })
                    }
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:scale-105 transition"
                  >
                    <FaMapMarkedAlt /> View
                  </button>

                  <button
                    onClick={() => handleDelete(trip._id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-full hover:scale-105 transition"
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedTrips;
