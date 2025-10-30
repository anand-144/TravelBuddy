import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Autocomplete from "react-google-autocomplete";
import {
  SelectBudgetOptions,
  SelectTravelersList,
} from "../components/Options";
import { useGoogleLogin } from "@react-oauth/google";

const CreateTrip = () => {
  const navigate = useNavigate();

  const [place, setPlace] = useState("");
  const [formData, setFormData] = useState({
    location: "",
    duration: "",
    budget: "",
    travelers: "",
  });

  const [selectedBudget, setSelectedBudget] = useState(null);
  const [selectedTraveler, setSelectedTraveler] = useState(null);

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log("Form data:", formData);
  }, [formData]);

  // ✅ Google login (for consistency with rest of app)
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          }
        );
        const data = await userInfo.json();
        localStorage.setItem("user", JSON.stringify(data));
        alert(`Welcome, ${data.name}!`);
      } catch (error) {
        console.error("❌ Failed to fetch Google user info:", error);
      }
    },
    onError: (error) => console.log("❌ Login Failed:", error),
  });

  const handleGenerateTrip = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/register");
      return;
    }

    if (
      !formData.location ||
      !formData.duration ||
      !formData.travelers ||
      !formData.budget
    ) {
      alert("Please fill all fields before generating your trip.");
      return;
    }

    navigate("/trip-result", { state: formData });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50 px-6 sm:px-10 md:px-32 lg:px-56 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="font-extrabold text-4xl sm:text-5xl bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">
          Plan Your Dream Trip 🌍
        </h2>
        <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
          Tell us a few details and let AI craft a personalized travel
          experience just for you.
        </p>
      </div>

      {/* Destination */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          Destination <span>📍</span>
        </h2>
        <Autocomplete
          apiKey={import.meta.env.VITE_GOOGLE_PLACES_API_KEY}
          onPlaceSelected={(place) => {
            if (place?.formatted_address) {
              setPlace(place.formatted_address);
              handleInputChange("location", place.formatted_address);
            } else if (place?.name) {
              setPlace(place.name);
              handleInputChange("location", place.name);
            }
          }}
          options={{ types: ["(cities)"] }}
          placeholder="Search for your destination..."
          className="w-full border border-gray-300 rounded-2xl p-4 text-lg outline-none focus:border-indigo-500 focus:shadow-md transition-all bg-white"
        />
      </div>

      {/* Duration */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          Trip Duration <span>🗓️</span>
        </h2>
        <input
          type="number"
          placeholder="e.g., 5"
          min="1"
          onChange={(e) => handleInputChange("duration", e.target.value)}
          className="w-full border border-gray-300 rounded-2xl p-4 text-lg outline-none focus:border-indigo-500 focus:shadow-md transition-all bg-white"
        />
      </div>

      {/* Budget */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          Your Budget <span>💰</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedBudget(index);
                handleInputChange("budget", item.title);
              }}
              className={`p-6 rounded-2xl border transition-all transform hover:-translate-y-1 cursor-pointer ${
                selectedBudget === index
                  ? "bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-xl"
                  : "bg-white border-gray-200 hover:border-indigo-400 hover:shadow-md"
              }`}
            >
              <div className="text-4xl mb-2">{item.icon}</div>
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p
                className={`text-sm mt-1 ${
                  selectedBudget === index ? "text-sky-100" : "text-gray-500"
                }`}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Travelers */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          Who are you traveling with? <span>🧳</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {SelectTravelersList.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedTraveler(index);
                handleInputChange("travelers", item.title);
              }}
              className={`p-6 rounded-2xl border transition-all transform hover:-translate-y-1 cursor-pointer ${
                selectedTraveler === index
                  ? "bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-xl"
                  : "bg-white border-gray-200 hover:border-pink-400 hover:shadow-md"
              }`}
            >
              <div className="text-4xl mb-2">{item.icon}</div>
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p
                className={`text-sm mt-1 ${
                  selectedTraveler === index ? "text-pink-100" : "text-gray-500"
                }`}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Generate Trip Button */}
      <div className="flex justify-center mt-20">
        <button
          onClick={handleGenerateTrip}
          className="relative px-12 py-5 text-lg font-semibold rounded-full text-white bg-gradient-to-r from-indigo-600 to-sky-500 hover:from-sky-500 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105"
        >
          ✈️ Generate My Trip
        </button>
      </div>
    </div>
  );
};

export default CreateTrip;
