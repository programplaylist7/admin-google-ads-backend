// ----------------------
// GET ALL USERS

import { User } from "../models/User.js";
import { Generation } from "../models/Generation.js"; 

// ----------------------
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .select("-password")
      .populate({
        path: "generations", // ❗ populate generations array
      });

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
