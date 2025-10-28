import React, { useState } from "react";
import Autocomplete from "react-google-autocomplete";
import { SelectBudgetOptions, SelectTravelersList } from "../components/Options";

const CreateTrip = () => {
  const [place, setPlace] = useState("");
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [selectedTraveler, setSelectedTraveler] = useState(null);

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preference</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      {/* Destination + Duration */}
      <div className="mt-20 flex flex-col gap-10">
        {/* Destination Input */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your destination of choice?
          </h2>

          <Autocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACES_API_KEY}
            onPlaceSelected={(place) => {
              setPlace(place);
              console.log("Selected place:", place);
            }}
            options={{ types: ["(cities)"] }}
            placeholder="Search for destination..."
            className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:border-sky-500 transition-all shadow-sm"
          />
        </div>

        {/* Trip Duration */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <input
            type="number"
            placeholder="Ex. 3"
            min="1"
            className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:border-sky-500 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Budget Options */}
      <div className="mt-20">
        <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedBudget(index)}
              className={`p-6 rounded-2xl border transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${selectedBudget === index
                ? "bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-lg border-transparent"
                : "border-gray-200 hover:border-sky-400 hover:shadow-md bg-white"
                }`}
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h2 className="font-semibold text-lg">{item.title}</h2>
              <p
                className={`text-sm mt-1 ${selectedBudget === index ? "text-sky-100" : "text-gray-500"
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
        <h2 className="text-xl my-3 font-medium">
          Who do you plan on traveling with on your next adventure?
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mt-5">
          {SelectTravelersList.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedTraveler(index)}
              className={`p-6 rounded-2xl border transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${selectedTraveler === index
                ? "bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-lg border-transparent"
                : "border-gray-200 hover:border-pink-400 hover:shadow-md bg-white"
                }`}
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h2 className="font-semibold text-lg">{item.title}</h2>
              <p
                className={`text-sm mt-1 ${selectedTraveler === index ? "text-pink-100" : "text-gray-500"
                  }`}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end my-16">
        <button
          className="relative px-10 py-4 text-lg font-semibold rounded-full text-white bg-black cursor-pointer hover:bg-pink-950">
          Generate Trip 🤖
        </button>
      </div>

    </div>
  );
};

export default CreateTrip;
