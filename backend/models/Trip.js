import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    location: { type: String, required: true },
    duration: { type: String },
    travelers: { type: String },
    budget: { type: String },
    total_estimate: { type: mongoose.Schema.Types.Mixed }, // can store numbers or objects
    image: { type: String },

    // Store complex nested data from AI result
    hotels: { type: Array, default: [] },
    itinerary: { type: Array, default: [] },
    optional_experiences: { type: Array, default: [] },
    travel_tips: { type: Array, default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("Trip", tripSchema);
