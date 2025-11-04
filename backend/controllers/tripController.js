
import Trip from "../models/Trip.js";

export const saveTrip = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      location,
      duration,
      travelers,
      budget,
      total_estimate,
      image,
      hotels,
      itinerary,
      optional_experiences,
      travel_tips,
    } = req.body;

    if (!location) {
      return res.status(400).json({ message: "Trip location is required" });
    }

    const newTrip = new Trip({
      user: userId,
      location,
      duration,
      travelers,
      budget,
      total_estimate,
      image,
      hotels: Array.isArray(hotels) ? hotels : [],
      itinerary: Array.isArray(itinerary) ? itinerary : [],
      optional_experiences: Array.isArray(optional_experiences)
        ? optional_experiences
        : [],
      travel_tips: Array.isArray(travel_tips) ? travel_tips : [],
    });

    await newTrip.save();

    res.status(201).json({
      message: "Trip saved successfully",
      trip: newTrip,
    });
  } catch (error) {
    console.error("❌ Error saving trip:", error);
    res.status(500).json({ message: "Failed to save trip" });
  }
};


// ---------- Get All Saved Trips ----------
export const getUserTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch trips" });
  }
};


// ---------- Delete Saved Trip ----------
export const deleteTrip = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const trip = await Trip.findById(id);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    if (trip.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized to delete this trip" });
    }

    await Trip.findByIdAndDelete(id);
    res.json({ message: "Trip deleted successfully" });
  } catch (error) {
    console.error("Delete trip error:", error);
    res.status(500).json({ message: "Failed to delete trip" });
  }
};
