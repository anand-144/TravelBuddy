import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { upload, uploadToImageKit } from "../middleware/imagekit.js";
import {
  uploadMemory,
  getMemories,
  deleteMemory,
} from "../controllers/memoryController.js";

const router = express.Router();

router.post("/upload", authMiddleware, upload.single("image"), uploadToImageKit, uploadMemory);
router.get("/", authMiddleware, getMemories);
router.delete("/:id", authMiddleware, deleteMemory);

export default router;
