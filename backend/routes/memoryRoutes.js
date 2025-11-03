import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import {
  getMemories,
  createMemory,
  deleteMemory,
} from "../controllers/memoryController.js";

const router = express.Router();

router.get("/", getMemories);
router.post("/", upload.single("file"), createMemory);
router.delete("/:id", deleteMemory);

export default router;
