import { useNavigate } from "react-router-dom";

const ErrorState = ({ message }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50">
      <div className="bg-white/70 backdrop-blur-xl p-12 rounded-3xl text-center max-w-md border border-white/20 shadow-2xl">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">
          Oops! Something went wrong
        </h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <button
          onClick={() => navigate("/create-trip")}
          className="px-6 py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-full hover:shadow-lg transition-all hover:scale-105 font-semibold"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorState;
