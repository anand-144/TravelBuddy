import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { saveTrip, getUserTrips, deleteTrip } from "../controllers/tripController.js";

const router = express.Router();

router.post("/save", authMiddleware, saveTrip);
router.get("/my-trips", authMiddleware, getUserTrips);
router.delete("/:id", authMiddleware, deleteTrip);

export default router;
