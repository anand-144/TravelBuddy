import mongoose from "mongoose";

const memorySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    imageUrl: { type: String, required: true },
    imageKitFileId: { type: String, required: true },
    note: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Memory", memorySchema);
