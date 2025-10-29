import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Autocomplete from "react-google-autocomplete";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelersList,
} from "../components/Options";

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

  const handleGenerateTrip = () => {
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
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl flex items-center gap-2">
        Tell us your travel preferences <span>🌍</span>
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our AI trip planner will
        generate a customized itinerary based on your preferences.
      </p>

      {/* Destination + Duration */}
      <div className="mt-20 flex flex-col gap-10">
        {/* Destination Input */}
        <div>
          <h2 className="text-xl my-3 font-medium flex items-center gap-2">
            What is your destination of choice? <span>📍</span>
          </h2>

          <Autocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACES_API_KEY}
            onPlaceSelected={(place) => {
              if (place && place.formatted_address) {
                const location = place.formatted_address;
                setPlace(location);
                handleInputChange("location", location);
              } else if (place && place.name) {
                setPlace(place.name);
                handleInputChange("location", place.name);
              } else {
                console.warn("⚠️ No valid place selected:", place);
              }
            }}
            options={{ types: ["(cities)"] }}
            placeholder="Search for destination..."
            className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:border-sky-500 transition-all shadow-sm"
          />
        </div>

        {/* Trip Duration */}
        <div>
          <h2 className="text-xl my-3 font-medium flex items-center gap-2">
            How many days are you planning your trip? <span>🗓️</span>
          </h2>
          <input
            type="number"
            placeholder="Ex. 3"
            min="1"
            onChange={(e) =>
              handleInputChange("duration", parseInt(e.target.value))
            }
            className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:border-sky-500 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Budget Options */}
      <div className="mt-20">
        <h2 className="text-xl my-3 font-medium flex items-center gap-2">
          What is your budget? <span>💰</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedBudget(index);
                handleInputChange("budget", item.title);
              }}
              className={`p-6 rounded-2xl border transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${
                selectedBudget === index
                  ? "bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-lg border-transparent"
                  : "border-gray-200 hover:border-sky-400 hover:shadow-md bg-white"
              }`}
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h2 className="font-semibold text-lg">{item.title}</h2>
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

      {/* Travelers Options */}
      <div className="mt-20 mb-20">
        <h2 className="text-xl my-3 font-medium flex items-center gap-2">
          Who do you plan on traveling with? <span>🧳</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mt-5">
          {SelectTravelersList.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedTraveler(index);
                handleInputChange("travelers", item.title);
              }}
              className={`p-6 rounded-2xl border transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${
                selectedTraveler === index
                  ? "bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-lg border-transparent"
                  : "border-gray-200 hover:border-pink-400 hover:shadow-md bg-white"
              }`}
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h2 className="font-semibold text-lg">{item.title}</h2>
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
      <div className="flex justify-end my-16">
        <button
          onClick={handleGenerateTrip}
          className="relative px-10 py-4 text-lg font-semibold rounded-full text-white bg-black cursor-pointer hover:bg-pink-950 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Generate Trip 🤖
        </button>
      </div>
    </div>
  );
};

export default CreateTrip;
