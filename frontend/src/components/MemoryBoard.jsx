import React, { useState, useEffect } from "react";
import api from "../services/api"; // ✅ updated import
import { toast } from "react-hot-toast";

const MemoryBoard = () => {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const res = await api.get("/memories", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.memories || [];
        setMemories(data);
      } catch (error) {
        console.error("Error fetching memories:", error);
        toast.error("Failed to load memories");
      }
    };
    fetchMemories();
  }, []);

  const handleAddMemory = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);
    try {
      const res = await api.post("/memories/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMemories((prev) => [res.data.memory || res.data, ...prev]);
      toast.success("Memory added!");
    } catch (error) {
      console.error("Error uploading memory:", error);
      toast.error("Failed to upload memory");
    } finally {
      setLoading(false);
    }
  };

  const handleNoteChange = async (id, value) => {
    setMemories((prev) =>
      prev.map((m) => (m._id === id ? { ...m, note: value } : m))
    );

    try {
      await api.put(
        `/memories/${id}`,
        { note: value },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Failed to save note");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this memory?")) return;

    try {
      await api.delete(`/memories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMemories((prev) => prev.filter((m) => m._id !== id));
      toast.success("Memory deleted!");
    } catch (error) {
      console.error("Error deleting memory:", error);
      toast.error("Failed to delete memory");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-sky-50 p-10">
      <h1 className="text-4xl font-bold text-sky-700 text-center mb-6">
        📸 My Travel Memories
      </h1>

      <div className="flex justify-center mb-6">
        <label className="cursor-pointer bg-sky-600 text-white px-6 py-3 rounded-lg">
          {loading ? "Uploading..." : "+ Add Photo"}
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleAddMemory}
            disabled={loading}
          />
        </label>
      </div>

      {memories.length === 0 ? (
        <p className="text-center text-gray-500">No memories yet. Add one!</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {memories.map((memory) => (
            <div
              key={memory._id}
              className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200 relative"
            >
              <img
                src={memory.imageUrl}
                alt="Memory"
                className="w-full h-56 object-cover"
              />
              <button
                onClick={() => handleDelete(memory._id)}
                className="absolute top-2 right-2 bg-red-500 text-white text-sm px-2 py-1 rounded hover:bg-red-600"
              >
                ✕
              </button>
              <textarea
                placeholder="Write a note..."
                value={memory.note || ""}
                onChange={(e) => handleNoteChange(memory._id, e.target.value)}
                className="w-full p-3 border-t border-gray-300 focus:outline-none"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MemoryBoard;
