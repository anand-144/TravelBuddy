import { FaLightbulb } from "react-icons/fa";

const TravelTips = ({ tips }) => {
  if (!tips?.length) return null;

  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-lime-600 flex items-center justify-center shadow-lg">
          <FaLightbulb className="text-2xl text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Travel Tips</h2>
      </div>
      <ul className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-xl space-y-3">
        {tips.map((tip, i) => (
          <li key={i} className="flex items-start gap-3 text-gray-700">
            <span className="text-green-600 mt-1">•</span>
            {tip.replace(/\*\*/g, "").replace(/^•\s*/, "")}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TravelTips;
