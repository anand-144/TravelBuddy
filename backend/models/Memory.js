import mongoose from "mongoose";

const memorySchema = new mongoose.Schema(
  {
    note: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    
  },
  { timestamps: true }
);

export default mongoose.model("Memory", memorySchema);
