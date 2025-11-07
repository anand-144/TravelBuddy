// backend/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import http from "http";
import { Server as IOServer } from "socket.io";

import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import memoryRoutes from "./routes/memoryRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import ChatGroup from "./models/ChatGroup.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

// ✅ Setup Socket.IO
const io = new IOServer(server, {
  cors: { origin: "http://localhost:5173", credentials: true },
});

connectDB();

// ✅ Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/memories", memoryRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => res.send("✅ API Running"));

// ✅ Socket.IO Chat Logic
io.on("connection", (socket) => {
  console.log("🔌 Socket connected:", socket.id);

  socket.on("joinGroup", (groupId) => {
    socket.join(groupId);
    console.log(`${socket.id} joined group ${groupId}`);
  });

socket.on("sendMessage", async ({ groupId, senderId, content }) => {
  const msg = { sender: senderId, content, timestamp: new Date() };
  
  // Emit to all users in group (including sender)
  io.to(groupId).emit("receiveMessage", msg);

  // Save message to DB
  try {
    await ChatGroup.findByIdAndUpdate(groupId, { $push: { messages: msg } });
  } catch (err) {
    console.error("Error saving message:", err);
  }
});

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected:", socket.id);
  });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
