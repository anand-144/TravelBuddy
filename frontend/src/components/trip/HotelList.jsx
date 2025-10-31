import { FaHotel, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const HotelList = ({ hotels, renderPrice }) => {
  if (!hotels?.length) return null;

  // Detect rate limit
  const isRateLimitExceeded = hotels.some(
    (h) =>
      !h.image_url ||
      (typeof h.image_url === "string" &&
        h.image_url.toLowerCase().includes("api rate limit"))
  );

  // 🩵 Fun fallback display
  if (isRateLimitExceeded) {
    return (
      <section className="mb-20 text-center">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center shadow-lg">
            <FaHotel className="text-3xl text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">
            Our Hotels Are Taking a Short Break 🏨
          </h2>
        </div>

        {/* Illustration / placeholder grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl hover:scale-105 transition-all"
            >
              <div className="w-full h-44 bg-gradient-to-br from-violet-200 to-blue-100 animate-pulse rounded-xl mb-4" />
              <div className="space-y-3">
                <div className="h-4 w-2/3 bg-gradient-to-r from-violet-100 to-blue-50 rounded-md animate-pulse"></div>
                <div className="h-3 w-1/2 bg-gradient-to-r from-violet-100 to-blue-50 rounded-md animate-pulse"></div>
                <div className="h-3 w-1/3 bg-gradient-to-r from-violet-100 to-blue-50 rounded-md animate-pulse"></div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-gray-600 mt-10 text-lg">
          Looks like our travel elves are recharging 🌙
          Try again in a few moments.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-8 py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-full hover:shadow-2xl transition-all hover:scale-105 font-semibold"
        >
          🔁 Retry Loading Hotels
        </button>
      </section>
    );
  }

  // ✅ Normal hotel list
  return (
    <section className="mb-16">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center shadow-lg">
          <FaHotel className="text-2xl text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Recommended Hotels</h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((h, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/70 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 hover:shadow-xl hover:scale-105 transition-all"
          >
            {h.image_url ? (
              <img
                src={h.image_url}
                alt={h.name || "Hotel"}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/400x250.png?text=Image+Unavailable";
                  e.target.alt = "The hotel’s being shy — check it out when you arrive!";
                }}
              />

            ) : (
              <div className="w-full h-48 bg-gradient-to-br from-violet-100 to-blue-50 animate-pulse" />
            )}

            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                {h.name || "Unnamed Hotel"}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{h.address || "N/A"}</p>

              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                  {renderPrice(h.price)}
                </span>
                <div className="flex items-center gap-1 text-yellow-500">
                  <FaStar />
                  <span>{h.rating || "N/A"}</span>
                </div>
              </div>

              <p className="text-sm text-gray-700">
                {h.description || "A comfortable stay awaits you."}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HotelList;
