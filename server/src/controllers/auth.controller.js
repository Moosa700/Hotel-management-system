import bcrypt from "bcrypt";
import User from "../models/User.js";

import { generateToken } from "../utils/generateToken.js";
import { success, error } from "../utils/apiResponse.js";

/* ===========================
   REGISTER
=========================== */

export async function register(req, res) {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

    if (!name || !email || !password) {
      return error(res, "All fields are required.");
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return error(res, "Email already registered.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role: "customer",
    });

    const token = generateToken(user);

    return success(
      res,
      "Registration successful.",
      {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      201
    );
  } catch (err) {
    console.error(err);

    return error(res, err.message, 500);
  }
}

/* ===========================
   LOGIN
=========================== */

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return error(res, "Email and password are required.");
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return error(res, "Invalid email or password.", 401);
    }

    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {
      return error(res, "Invalid email or password.", 401);
    }

    const token = generateToken(user);

    return success(res, "Login successful.", {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);

    return error(res, err.message, 500);
  }
}

/* ===========================
   PROFILE
=========================== */

export async function profile(req, res) {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return error(res, "User not found.", 404);
    }

    return success(
      res,
      "Profile fetched successfully.",
      user
    );
  } catch (err) {
    console.error(err);

    return error(res, err.message, 500);
  }
}