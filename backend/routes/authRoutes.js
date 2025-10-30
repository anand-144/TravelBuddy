import express from "express";
import { registerUser, loginUser, googleAuth, getProfile } from "../controllers/authController.js";
import { authMiddleware} from "../middleware/authMiddleware.js"
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google", googleAuth);
router.get("/profile", authMiddleware, getProfile);

export default router;
