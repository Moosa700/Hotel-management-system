import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { error } from "../utils/apiResponse.js";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check Authorization Header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return error(res, "Access denied. No token provided.", 401);
    }

    // Extract Token
    const token = authHeader.split(" ")[1];

    // Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find User
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return error(res, "User not found.", 401);
    }

    // Check if account is active
    if (!user.isActive) {
      return error(
        res,
        "Your account has been deactivated. Please contact the administrator.",
        403
      );
    }

    // Attach user to request
    req.user = user;

    next();
  } catch {
    return error(res, "Invalid or expired token.", 401);
  }
};

/* ---------------- Role Middleware ---------------- */

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return error(res, "Unauthorized.", 401);
    }

    if (!roles.includes(req.user.role)) {
      return error(
        res,
        "You do not have permission to perform this action.",
        403
      );
    }

    next();
  };
};