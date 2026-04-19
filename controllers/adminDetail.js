import { Admin } from "../models/admin.js";

export const adminDetail = async (req, res) => {
  try {

    const admin = await Admin.findById(req.admin.id).select("-password");

    if (!admin) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      success: true,
      adminEmail: admin.email,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};