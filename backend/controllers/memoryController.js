import Memory from "../models/Memory.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

export const getMemories = async (req, res) => {
  try {
    const memories = await Memory.find().sort({ createdAt: -1 });
    res.status(200).json(memories);
  } catch (error) {
    console.error("Error fetching memories:", error);
    res.status(500).json({ message: "Failed to fetch memories" });
  }
};

export const createMemory = async (req, res) => {
  try {
    const { note } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const uploadStream = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "memory_board" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

    const result = await uploadStream();

    const memory = await Memory.create({
      note,
      imageUrl: result.secure_url,
      publicId: result.public_id,
    });

    res.status(201).json(memory);
  } catch (error) {
    console.error("Error creating memory:", error);
    res.status(500).json({ message: "Failed to create memory" });
  }
};

export const deleteMemory = async (req, res) => {
  try {
    const memory = await Memory.findById(req.params.id);
    if (!memory) return res.status(404).json({ message: "Memory not found" });

    await cloudinary.uploader.destroy(memory.publicId);

    await memory.deleteOne();

    res.status(200).json({ message: "Memory deleted successfully" });
  } catch (error) {
    console.error("Error deleting memory:", error);
    res.status(500).json({ message: "Failed to delete memory" });
  }
};
