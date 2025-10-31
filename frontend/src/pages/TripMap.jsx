import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaArrowLeft, FaHotel, FaMapMarkerAlt } from 'react-icons/fa';

const RecenterMap = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) map.setView(coords, 12);
  }, [coords, map]);
  return null;
};

const TripMap = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { hotels = [], itinerary = {}, location: city } = location.state || {};

  const [cityCoords, setCityCoords] = useState([20.5937, 78.9629]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!city) {
      navigate('/create-trip');
      return;
    }

    const fetchCoordinates = async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`
        );
        const data = await res.json();

        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          setCityCoords([parseFloat(lat), parseFloat(lon)]);
        }
      } catch (err) {
        console.error('Geocoding error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoordinates();
  }, [city, navigate]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50">
        <div className="w-16 h-16 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mb-4" />
        <h2 className="text-xl animate-pulse text-gray-700">Loading map for {city}...</h2>
      </div>
    );
  }

  const hotelIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/139/139899.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  const attractionIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/854/854878.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  const allMarkers = [
    ...hotels.map((h) => ({
      type: 'Hotel',
      name: h.name,
      image: h.image_url,
      lat: h.lat || cityCoords[0] + (Math.random() - 0.5) * 0.1,
      lng: h.lng || cityCoords[1] + (Math.random() - 0.5) * 0.1,
      icon: hotelIcon,
    })),
    ...Object.values(itinerary)
      .flat()
      .map((p) => ({
        type: 'Attraction',
        name: p.place_name,
        image: p.image_url,
        lat: p.lat || cityCoords[0] + (Math.random() - 0.5) * 0.1,
        lng: p.lng || cityCoords[1] + (Math.random() - 0.5) * 0.1,
        icon: attractionIcon,
      })),
  ];

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full">
      {/* Map Section */}
      <div className="flex-1 relative min-h-[50vh] sm:min-h-[60vh] lg:min-h-screen">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-[1000] bg-white/80 backdrop-blur-xl p-4 m-4 rounded-2xl flex items-center justify-between shadow-xl border border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2 text-gray-800">
            <FaMapMarkerAlt className="text-violet-600" />
            {city}
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-full hover:shadow-lg transition-all"
          >
            <FaArrowLeft />
            <span className="hidden sm:inline">Back</span>
          </button>
        </div>

        {/* Legend */}
        <div className="absolute top-24 left-4 z-[1000] bg-white/80 backdrop-blur-xl p-4 rounded-xl shadow-lg border border-white/20">
          <h4 className="font-semibold mb-3 text-gray-800">Legend</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <img
                src="https://cdn-icons-png.flaticon.com/512/139/139899.png"
                alt="Hotel"
                className="w-5 h-5"
              />
              <span className="text-sm text-gray-700">Hotels</span>
            </div>
            <div className="flex items-center gap-2">
              <img
                src="https://cdn-icons-png.flaticon.com/512/854/854878.png"
                alt="Attraction"
                className="w-5 h-5"
              />
              <span className="text-sm text-gray-700">Attractions</span>
            </div>
          </div>
        </div>

        {/* Map */}
        <MapContainer
          center={cityCoords}
          zoom={12}
          style={{ height: '100%', width: '100%' }}
          className="rounded-none lg:rounded-r-3xl overflow-hidden"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <RecenterMap coords={cityCoords} />

          {allMarkers.map((marker, i) => (
            <Marker key={i} position={[marker.lat, marker.lng]} icon={marker.icon}>
              <Popup>
                <div className="w-44 text-center">
                  {marker.image && (
                    <img
                      src={marker.image}
                      alt={marker.name}
                      className="w-full h-24 object-cover rounded-md mb-2"
                    />
                  )}
                  <h3 className="font-semibold text-sm mb-1">{marker.name}</h3>
                  <p className="text-xs text-gray-600">{marker.type}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Sidebar */}
      <div className="w-full lg:w-96 bg-gradient-to-br from-white to-violet-50/30 border-t lg:border-t-0 lg:border-l border-gray-200 overflow-y-auto p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center shadow-lg">
            <FaHotel className="text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Places</h3>
        </div>

        {allMarkers.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No locations available</p>
        ) : (
          <div className="space-y-4">
            {allMarkers.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 bg-white/70 backdrop-blur-xl rounded-xl hover:shadow-lg transition-all border border-white/20"
              >
                <img
                  src={item.image || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e'}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg shadow-md"
                />
                <div className="flex-1">
                  <h4 className="font-semibold mb-1 text-gray-800">{item.name}</h4>
                  <p className="text-xs text-gray-600">{item.type}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TripMap;
