import express from "express";
import { adminLogin } from "../controllers/adminLogin.js";
import { isAdmin } from "../middleware/auth.middleware.js";
import { getAllUsers } from "../controllers/getAllUsers.js";
import { adminDetail } from "../controllers/adminDetail.js";
import { logout } from "../controllers/logout.js";

const router = express.Router();

// login
router.post("/login", adminLogin);

// protected route
router.get("/users", isAdmin, getAllUsers);

router.get("/adminDetail", isAdmin, adminDetail);
router.post("/logout", logout);

export default router;