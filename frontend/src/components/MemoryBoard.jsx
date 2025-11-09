import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaCloudUploadAlt,
  FaTrash,
  FaRegImage,
  FaStickyNote,
} from "react-icons/fa";
import toast from "react-hot-toast";

const MemoryBoard = () => {
  const [memories, setMemories] = useState([]);
  const [note, setNote] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMemories = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/memories`);
      setMemories(res.data);
    } catch (error) {
      toast.error("Failed to load memories");
    }
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!note.trim() && !file) {
      toast.error("Add a note or photo!");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("note", note);
      if (file) formData.append("file", file);

      const res = await axios.post(`${import.meta.env.VITE_API_URL}/memories`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMemories([res.data, ...memories]);
      setNote("");
      setFile(null);
      setPreview(null);
      toast.success("Memory added!");
    } catch (error) {
      toast.error("Failed to upload memory");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/memories/${id}`);
      setMemories(memories.filter((m) => m._id !== id));
      toast.success("Memory deleted!");
    } catch (error) {
      toast.error("Failed to delete memory");
    }
  };

  useEffect(() => {
    fetchMemories();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-10 px-4 sm:px-6 lg:px-12 transition-all">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">
          ✨ Memory Board
        </h1>

        {/* Upload Form */}
        <form
          onSubmit={handleUpload}
          className="bg-white/80 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-xl border border-white/30 mb-12 transition-all hover:shadow-2xl"
        >
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write something memorable..."
            className="w-full p-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:outline-none mb-5 text-gray-800 placeholder-gray-400 text-base sm:text-lg resize-none"
            rows={3}
          ></textarea>

          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-5">
            <div className="w-full sm:w-1/2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <FaRegImage className="inline-block mr-1 text-indigo-500" />
                Upload Photo (optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-4 w-full sm:w-48 h-48 object-cover rounded-2xl border border-gray-200 shadow-md transition-transform hover:scale-105"
                />
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold rounded-2xl shadow-md flex items-center justify-center gap-2 hover:scale-105 transition-all disabled:opacity-60"
            >
              <FaCloudUploadAlt />
              {loading ? "Uploading..." : "Upload Memory"}
            </button>
          </div>
        </form>

        {/* Memory Grid */}
        {memories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-600 text-center">
            <FaStickyNote className="text-6xl mb-4 text-indigo-300" />
            <p className="text-lg sm:text-xl">No memories yet. Start adding one!</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {memories.map((m) => (
              <div
                key={m._id}
                className="relative bg-white/80 backdrop-blur-xl p-4 rounded-2xl shadow-md hover:shadow-2xl transition-all border border-white/20 hover:-translate-y-1"
              >
                {m.imageUrl ? (
                  <img
                    src={m.imageUrl}
                    alt="Memory"
                    className="w-full h-56 sm:h-60 object-cover rounded-xl mb-4 border border-gray-200 shadow-sm"
                  />
                ) : (
                  <div className="w-full h-56 sm:h-60 rounded-xl flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 text-indigo-400">
                    <FaRegImage className="text-4xl mb-2" />
                    <p className="text-sm">No image attached</p>
                  </div>
                )}

                <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
                  {m.note}
                </p>

                <button
                  onClick={() => handleDelete(m._id)}
                  className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition"
                  title="Delete memory"
                >
                  <FaTrash />
                </button>

                <p className="text-xs text-gray-500 mt-3">
                  {new Date(m.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryBoard;
