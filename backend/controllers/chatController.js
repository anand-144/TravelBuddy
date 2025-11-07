import ChatGroup from "../models/ChatGroup.js";

// Get group by location
export const getGroupByLocation = async (req, res) => {
  try {
    const { location } = req.params;
    const group = await ChatGroup.findOne({ location }).populate("members", "name email");
    if (!group) return res.status(404).json({ message: "No group found for this location" });
    res.json(group);
  } catch (err) {
    console.error("Error fetching group:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get group by ID
export const getGroupById = async (req, res) => {
  try {
    const { id } = req.params;
    const group = await ChatGroup.findById(id).populate("members", "name email");
    if (!group) return res.status(404).json({ message: "Group not found" });
    res.json(group);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
