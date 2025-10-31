const Loader = () => (
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

export default Loader;
