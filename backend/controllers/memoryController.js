import Memory from "../models/Memory.js";
import { deleteFromImageKit } from "../middleware/imagekit.js";

/**
 * @desc Upload a new memory
 */
export const uploadMemory = async (req, res) => {
  try {
    const { note } = req.body;
    const { imageUrl, imageKitFileId } = req.imageData;
    const userId = req.user.id;

    const memory = await Memory.create({
      user: userId,
      imageUrl,
      imageKitFileId,
      note,
    });

    res.status(201).json({ message: "Memory saved", memory });
  } catch (error) {
    console.error("❌ Memory save error:", error);
    res.status(500).json({ message: "Failed to save memory" });
  }
  
};

/**
 * @desc Get all user memories
 */
export const getMemories = async (req, res) => {
  try {
    const memories = await Memory.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(memories);
  } catch (error) {
    console.error("❌ Fetch error:", error);
    res.status(500).json({ message: "Failed to load memories" });
  }
};

/**
 * @desc Delete memory (and remove from ImageKit)
 */
export const deleteMemory = async (req, res) => {
  try {
    const memory = await Memory.findById(req.params.id);
    if (!memory || memory.user.toString() !== req.user.id)
      return res.status(404).json({ message: "Memory not found" });

    // Delete from ImageKit
    await deleteFromImageKit(memory.imageKitFileId);

    // Remove from DB
    await memory.deleteOne();

    res.json({ message: "Memory deleted successfully" });
  } catch (error) {
    console.error("❌ Delete error:", error);
    res.status(500).json({ message: "Delete failed" });
  }
};
