import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Admin } from "../models/admin.js";
import ms from "ms"

// ----------------------
// ADMIN LOGIN
// ----------------------
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({
        success: false,
        message: "required data not found",
      });

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRY },
    );

    // cookie
    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: ms(process.env.TOKEN_EXPIRY),
    });

    res.json({
      message: "Admin logged in successfully",
    });
  } catch (err) {
    console.log("err: ", err.message);
    res.status(500).json({ message:  "Internal Server Error"});
  }
};
