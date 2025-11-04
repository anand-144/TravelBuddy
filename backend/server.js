import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import memoryRoutes from "./routes/memoryRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";


dotenv.config();

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // your React app
    credentials: true,
  })
);
app.use(express.json());

// Health check
app.get("/", (req, res) => res.send("✅ API is running..."));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/memories", memoryRoutes);
app.use("/api/trips", tripRoutes);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
