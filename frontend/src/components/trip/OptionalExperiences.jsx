import { FaHiking } from "react-icons/fa";

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
          <div key={i} className="bg-white/70 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 hover:shadow-xl transition">
            {exp.image_url && <img src={exp.image_url} className="w-full h-48 object-cover" />}
            <div className="p-6">
              <h3 className="text-lg font-bold mb-2">{exp.name}</h3>
              <p className="text-sm text-gray-700">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OptionalExperiences;
