import { Router } from "express";
import {
  register,
  login,
  profile,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

/* ---------- Public Routes ---------- */

// Register a new user
router.post("/register", register);

// Login user
router.post("/login", login);

/* ---------- Protected Routes ---------- */

// Get logged-in user's profile
router.get("/profile", authenticate, profile);

export default router;