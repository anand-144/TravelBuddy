import express from "express";
import { getGroupByLocation, getGroupById } from "../controllers/chatController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/location/:location", authMiddleware, getGroupByLocation);
router.get("/:id", authMiddleware, getGroupById);

export default router;
