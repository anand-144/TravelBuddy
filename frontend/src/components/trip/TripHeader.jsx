import { FaArrowLeft } from "react-icons/fa";

const TripHeader = ({ onBack, tripData, bannerImage, totalEstimate }) => (
  <>
    <div className="flex items-center justify-between mb-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-xl rounded-full hover:shadow-md transition-all border border-white/20"
      >
        <FaArrowLeft />
        <span className="hidden sm:inline">Back</span>
      </button>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
        {tripData.location}
      </h1>
    </div>

    {bannerImage && (
      <div className="relative h-64 sm:h-96 rounded-3xl overflow-hidden mb-12 shadow-2xl border-4 border-white/20">
        <img src={bannerImage} alt="Destination" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
              {tripData.location}
            </h1>
            <p className="text-white/90 text-lg">
              {tripData.duration} days • {tripData.travelers} • {tripData.budget}
            </p>
            {totalEstimate && (
              <p className="text-sky-300 font-semibold mt-2">
                Estimated Total: {totalEstimate}
              </p>
            )}
          </div>
        </div>
      </div>
    )}
  </>
);

export default TripHeader;
