import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const chatGroupSchema = new mongoose.Schema({
  location: { type: String, required: true, unique: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  messages: [messageSchema],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("ChatGroup", chatGroupSchema);
