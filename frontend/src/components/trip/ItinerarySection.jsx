import { useState } from "react";
import { FaMapMarkedAlt, FaStar, FaClock, FaTicketAlt, FaGem, FaExclamationTriangle } from "react-icons/fa";

const ItinerarySection = ({ itinerary, renderPrice }) => {
  if (!Object.keys(itinerary).length) return null;

  return (
    <section className="mb-16">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg">
          <FaMapMarkedAlt className="text-2xl text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Day-wise Itinerary</h2>
      </div>

      {Object.entries(itinerary).map(([day, places], idx) => (
        <div key={idx} className="mb-8 bg-white/70 p-8 rounded-3xl border border-white/20 shadow-lg">
          <h3 className="text-2xl font-bold mb-6 capitalize flex items-center gap-3 text-gray-800">
            <span className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 text-white flex items-center justify-center font-bold shadow-lg">
              {idx + 1}
            </span>
            {day}
          </h3>

          <div className="space-y-6">
            {places.map((p, i) => (
              <PlaceCard key={i} place={p} renderPrice={renderPrice} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

const PlaceCard = ({ place, renderPrice }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`flex flex-col sm:flex-row gap-6 p-6 rounded-2xl transition ${
        place.is_hidden_gem
          ? "bg-gradient-to-br from-yellow-50 to-rose-50 border-l-4 border-yellow-500"
          : "bg-gradient-to-br from-white/50 to-blue-50/30"
      }`}
    >
      {/* Image Section */}
      {!imgError && place.image_url ? (
        <img
          src={place.image_url}
          onError={() => setImgError(true)}
          alt={place.place_name}
          className="w-full sm:w-48 h-40 rounded-xl object-cover shadow-md"
        />
      ) : (
        <div className="relative w-full sm:w-48 h-40 rounded-xl flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-cyan-100 to-violet-100 animate-pulse">
          <FaExclamationTriangle className="text-3xl text-blue-600 mb-2" />
          <p className="text-gray-700 text-sm font-semibold text-center">Looks like this spot is camera-shy today 😅</p>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shine_2s_linear_infinite]" />
        </div>
      )}

      {/* Details */}
      <div className="flex-1">
        <h4 className="text-xl font-bold mb-2 text-gray-800 flex items-center gap-2">
          {place.place_name}
          {place.is_hidden_gem && (
            <span className="flex items-center text-yellow-600 text-sm font-semibold">
              <FaGem className="mr-1" /> Hidden Gem
            </span>
          )}
        </h4>
        <p className="text-gray-600 mb-3">{place.details || place.description}</p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <FaTicketAlt className="text-violet-600" /> {renderPrice(place.ticket_price)}
          </div>
          <div className="flex items-center gap-2">
            <FaStar className="text-yellow-500" /> {place.rating}
          </div>
          <div className="flex items-center gap-2">
            <FaClock className="text-blue-600" /> {place.best_time_to_visit}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItinerarySection;
