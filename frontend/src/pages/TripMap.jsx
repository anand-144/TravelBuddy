import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

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

  const [cityCoords, setCityCoords] = useState([20.5937, 78.9629]); // default India
  const [loading, setLoading] = useState(true);

  // 🎯 Get geocoordinates via OpenStreetMap (Nominatim)
  useEffect(() => {
    if (!city) {
      navigate("/create-trip");
      return;
    }

    const fetchCoordinates = async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            city
          )}`
        );
        const data = await res.json();

        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          setCityCoords([parseFloat(lat), parseFloat(lon)]);
        } else {
          console.warn("No coordinates found for:", city);
        }
      } catch (err) {
        console.error("Geocoding error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoordinates();
  }, [city, navigate]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-600">
        <h2 className="text-xl animate-pulse">Loading map for {city} 🗺️...</h2>
      </div>
    );
  }

  // 📍 Custom icons
  const hotelIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/139/139899.png", // 🟦 blue hotel icon
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  const attractionIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png", // 🔴 red attraction icon
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  // Combine all markers
  const allMarkers = [
    ...hotels.map((h) => ({
      type: "Hotel",
      name: h.name,
      image: h.image_url,
      lat: h.lat || cityCoords[0] + (Math.random() - 0.5) * 0.1,
      lng: h.lng || cityCoords[1] + (Math.random() - 0.5) * 0.1,
      icon: hotelIcon,
    })),
    ...Object.values(itinerary)
      .flat()
      .map((p) => ({
        type: "Attraction",
        name: p.place_name,
        image: p.image_url,
        lat: p.lat || cityCoords[0] + (Math.random() - 0.5) * 0.1,
        lng: p.lng || cityCoords[1] + (Math.random() - 0.5) * 0.1,
        icon: attractionIcon,
      })),
  ];

  return (
    <div className="h-screen w-full flex relative">
      {/* 🗺️ Left Side Map */}
      <div className="flex-1 relative">
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-gray-100 shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">
            🗺️ Map View - {city}
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            ← Back
          </button>
        </div>

        <MapContainer
          center={cityCoords}
          zoom={12}
          style={{ height: "calc(100vh - 64px)", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <RecenterMap coords={cityCoords} />

          {allMarkers.map((marker, i) => (
            <Marker
              key={i}
              position={[marker.lat, marker.lng]}
              icon={marker.icon}
            >
              <Popup>
                <div className="w-44 text-center">
                  {marker.image && (
                    <img
                      src={marker.image}
                      alt={marker.name}
                      className="w-full h-24 object-cover rounded-md mb-2"
                    />
                  )}
                  <h3 className="font-semibold text-gray-800 text-sm mb-1">
                    {marker.name}
                  </h3>
                  <p className="text-xs text-gray-500">{marker.type}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* 🧭 Legend Box */}
        <div className="absolute top-24 left-4 bg-white bg-opacity-90 rounded-lg shadow-md p-3 text-sm">
          <h4 className="font-semibold mb-2 text-gray-700">📍 Legend</h4>
          <div className="flex items-center gap-2 mb-1">
            <img
              src="https://cdn-icons-png.flaticon.com/512/139/139899.png"
              alt="Hotel"
              className="w-5 h-5"
            />
            <span className="text-gray-600">Hotels</span>
          </div>
          <div className="flex items-center gap-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/854/854878.png"
              alt="Attraction"
              className="w-5 h-5"
            />
            <span className="text-gray-600">Attractions</span>
          </div>
        </div>
      </div>

      {/* 🖼️ Right Sidebar with Places */}
      <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          📸 Places & Hotels
        </h3>

        {allMarkers.length === 0 && (
          <p className="text-gray-500 text-sm">No locations available.</p>
        )}

        <div className="space-y-3">
          {allMarkers.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 border rounded-lg p-2 hover:bg-gray-50 transition"
            >
              <img
                src={
                  item.image ||
                  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
                }
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <h4 className="font-semibold text-gray-800 text-sm">
                  {item.name}
                </h4>
                <p className="text-xs text-gray-500">{item.type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TripMap;
