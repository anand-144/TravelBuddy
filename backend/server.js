import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import memoryRoutes from "./routes/memoryRoutes.js";

dotenv.config();

const app = express();

// 🧠 Connect to MongoDB
connectDB();

// 🌍 Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // React frontend origin
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" })); // Allow image base64 data if needed

// 🧪 Health check
app.get("/", (req, res) => {
  res.send("✅ TravelBuddy API is running...");
});

// 🔐 Routes
app.use("/api/auth", authRoutes);
app.use("/api/memories", memoryRoutes);

// ❌ 404 Fallback
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// 🧩 Global Error Handler (optional safety net)
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// 🚀 Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
