import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { generateTravelPlan } from '../services/AIModal';
import { FaHotel, FaMapMarkedAlt, FaStar, FaClock, FaTicketAlt, FaArrowLeft } from 'react-icons/fa';

const TripResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const tripData = location.state;

  const [loading, setLoading] = useState(true);
  const [aiResult, setAiResult] = useState(null);

  useEffect(() => {
    if (!tripData) {
      navigate('/create-trip');
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
        console.error('Error generating plan:', err);
        setAiResult({ error: true, message: 'Failed to generate trip.' });
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [tripData, navigate]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50">
        <div className="bg-white/70 backdrop-blur-xl p-12 rounded-3xl text-center border border-white/20 shadow-2xl">
          <div className="w-20 h-20 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <h2 className="text-2xl font-semibold animate-pulse bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
            Crafting your perfect journey...
          </h2>
          <p className="text-gray-600 mt-2">This will only take a moment</p>
        </div>
      </div>
    );
  }

  if (!aiResult || aiResult.error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50">
        <div className="bg-white/70 backdrop-blur-xl p-12 rounded-3xl text-center max-w-md border border-white/20 shadow-2xl">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">
            {aiResult?.message || 'No trip data found. Please try again.'}
          </p>
          <button
            onClick={() => navigate('/create-trip')}
            className="px-6 py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-full hover:shadow-lg transition-all hover:scale-105 font-semibold"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const { hotels = [], itinerary = {}, image: bannerImage } = aiResult;

  const renderPrice = (price) => {
    if (!price) return 'N/A';
    if (typeof price === 'object') {
      const { currency, amount, per_night } = price;
      return `${currency || '$'} ${amount || 'N/A'}${per_night ? ' / night' : ''}`;
    }
    return price;
  };

  const handleMapRedirect = () => {
    navigate('/trip-map', {
      state: { location: tripData.location, hotels, itinerary },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/create-trip')}
            className="flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-xl rounded-full hover:shadow-md transition-all border border-white/20"
          >
            <FaArrowLeft />
            <span className="hidden sm:inline">Back</span>
          </button>

          <button
            onClick={handleMapRedirect}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-full hover:shadow-lg transition-all hover:scale-105 font-semibold"
          >
            <FaMapMarkedAlt />
            View on Map
          </button>
        </div>

        {/* Banner */}
        {bannerImage && (
          <div className="relative h-64 sm:h-96 rounded-3xl overflow-hidden mb-12 shadow-2xl border-4 border-white/20">
            <img
              src={bannerImage}
              alt="Destination"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
                  {tripData.location}
                </h1>
                <p className="text-white/90 text-lg">
                  {tripData.duration} days • {tripData.travelers} • {tripData.budget}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Hotels Section */}
        {hotels.length > 0 && (
          <section className="mb-16 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center shadow-lg">
                <FaHotel className="text-2xl text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Recommended Hotels</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.map((hotel, i) => (
                <div
                  key={i}
                  className="bg-white/70 backdrop-blur-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-all hover:scale-105 border border-white/20"
                >
                  {hotel.image_url && (
                    <img
                      src={hotel.image_url}
                      alt={hotel.name}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{hotel.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{hotel.address}</p>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                        {renderPrice(hotel.price)}
                      </span>
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-500" />
                        <span className="font-semibold text-gray-800">{hotel.rating}</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600">{hotel.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Itinerary Section */}
        {Object.keys(itinerary).length > 0 && (
          <section className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg">
                <FaMapMarkedAlt className="text-2xl text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Your Itinerary</h2>
            </div>

            <div className="space-y-8">
              {Object.entries(itinerary).map(([day, places], dayIndex) => (
                <div key={day} className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-xl">
                  <h3 className="text-2xl font-bold mb-6 capitalize flex items-center gap-3 text-gray-800">
                    <span className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 text-white flex items-center justify-center font-bold shadow-lg">
                      {dayIndex + 1}
                    </span>
                    {day}
                  </h3>

                  <div className="space-y-6">
                    {places.map((place, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col sm:flex-row gap-6 p-6 bg-gradient-to-br from-white/50 to-blue-50/30 rounded-2xl hover:shadow-md transition-all"
                      >
                        {place.image_url && (
                          <img
                            src={place.image_url}
                            alt={place.place_name}
                            className="w-full sm:w-48 h-40 rounded-xl object-cover shadow-lg"
                          />
                        )}

                        <div className="flex-1">
                          <h4 className="text-xl font-bold mb-2 text-gray-800">{place.place_name}</h4>
                          <p className="text-gray-600 mb-4">{place.details}</p>

                          <div className="flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <FaTicketAlt className="text-violet-600" />
                              <span className="text-gray-700 font-medium">{renderPrice(place.ticket_pricing)}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <FaStar className="text-yellow-500" />
                              <span className="text-gray-700 font-medium">{place.rating}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <FaClock className="text-blue-600" />
                              <span className="text-gray-700 font-medium">{place.best_time_to_visit}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => navigate('/create-trip')}
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
