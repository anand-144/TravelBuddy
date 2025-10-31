import { useState } from "react";
import { FaHiking, FaExclamationTriangle } from "react-icons/fa";

const OptionalExperiences = ({ experiences }) => {
  if (!experiences?.length) return null;

  return (
    <section className="mb-16">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center shadow-lg">
          <FaHiking className="text-2xl text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Optional Experiences</h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map((exp, i) => (
          <ExperienceCard key={i} exp={exp} />
        ))}
      </div>
    </section>
  );
};

const ExperienceCard = ({ exp }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 hover:shadow-xl transition">
      {!imgError && exp.image_url ? (
        <img
          src={exp.image_url}
          onError={() => setImgError(true)}
          alt={exp.name}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="relative w-full h-48 flex flex-col items-center justify-center bg-gradient-to-br from-orange-100 via-pink-100 to-yellow-100 animate-pulse">
          <FaExclamationTriangle className="text-3xl text-orange-500 mb-2" />
          <p className="text-gray-700 text-sm font-semibold">The fun’s too wild to capture — come see it live!</p>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shine_2s_linear_infinite]" />
        </div>
      )}

      <div className="p-6">
        <h3 className="text-lg font-bold mb-2 text-gray-800">{exp.name}</h3>
        <p className="text-sm text-gray-700">{exp.description}</p>
      </div>
    </div>
  );
};

export default OptionalExperiences;
