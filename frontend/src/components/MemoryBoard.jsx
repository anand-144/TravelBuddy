import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaTrash, FaCloudUploadAlt } from "react-icons/fa";
import toast from "react-hot-toast";

const MemoryBoard = () => {
  const [memories, setMemories] = useState([]);
  const [note, setNote] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMemories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/memories");
      setMemories(res.data);
    } catch (error) {
      console.error("Error fetching memories:", error);
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

      const res = await axios.post("http://localhost:5000/api/memories", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMemories([res.data, ...memories]);
      setNote("");
      setFile(null);
      setPreview(null);
      toast.success("Memory added!");
    } catch (error) {
      console.error("Error uploading memory:", error);
      toast.error("Failed to upload memory");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/memories/${id}`);
      setMemories(memories.filter((m) => m._id !== id));
      toast.success("Memory deleted!");
    } catch (error) {
      console.error("Error deleting memory:", error);
      toast.error("Failed to delete memory");
    }
  };

  useEffect(() => {
    fetchMemories();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6 sm:px-12 md:px-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
          Memory Board
        </h1>

        <form
          onSubmit={handleUpload}
          className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 mb-10"
        >
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write a note about your memory..."
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4"
          ></textarea>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-3 w-48 h-48 object-cover rounded-xl border"
                />
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 transition disabled:opacity-60"
            >
              <FaCloudUploadAlt />
              {loading ? "Uploading..." : "Upload Memory"}
            </button>
          </div>
        </form>

        {memories.length === 0 ? (
          <p className="text-gray-500 text-center">No memories yet. Add one!</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {memories.map((m) => (
              <div
                key={m._id}
                className="p-4 bg-white rounded-2xl shadow-md border border-gray-200 relative overflow-hidden"
              >
                {m.imageUrl && (
                  <img
                    src={m.imageUrl}
                    alt="Memory"
                    className="w-full h-48 object-cover rounded-lg mb-3"
                  />
                )}
                <p className="text-gray-800">{m.note}</p>
                <button
                  onClick={() => handleDelete(m._id)}
                  className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
                <p className="text-xs text-gray-400 mt-2">
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
