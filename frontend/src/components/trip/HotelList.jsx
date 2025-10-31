import { FaHotel, FaStar } from "react-icons/fa";

const HotelList = ({ hotels, renderPrice }) => {
  if (!hotels?.length) return null;

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
          <div
            key={i}
            className="bg-white/70 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 hover:scale-105 transition"
          >
            {h.image_url && <img src={h.image_url} className="w-full h-48 object-cover" />}
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{h.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{h.address}</p>
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                  {renderPrice(h.price)}
                </span>
                <div className="flex items-center gap-1 text-yellow-500">
                  <FaStar />
                  <span>{h.rating}</span>
                </div>
              </div>
              <p className="text-sm text-gray-700">{h.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HotelList;
