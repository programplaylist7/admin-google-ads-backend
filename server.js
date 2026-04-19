import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "./routes/adminRoutes.js";
import cors from "cors";
import { connectDB } from "./config/connectDB.js";
import { Admin } from "./models/admin.js";
dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

connectDB();

app.get("/test", (req, res) => {
  res.json({
    message: "everything working fine",
  });
});

// routes
app.use("/api/admin", router);

// import bcrypt for password hashing
import bcrypt from "bcrypt";

app.post("/add", async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ 1. basic validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // ✅ 2. email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    // ✅ 3. password validation
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    // ✅ 4. check existing user
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // ✅ 5. hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ 6. save user
    const user = await Admin.create({
      email,
      password: hashedPassword,
    });

    // ❌ never send password back
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error in /add:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
