import { error } from "../utils/apiResponse.js";

export const authorize = (...roles) => {
  return (req, res, next) => {
    // Ensure authenticate middleware ran first
    if (!req.user) {
      return error(res, "Unauthorized.", 401);
    }

    const role = ["manager", "receptionist", "housekeeping"].includes(req.user.role)
      ? "staff"
      : req.user.role;

    if (!roles.includes(role)) {
      return error(res, "Access denied.", 403);
    }

    next();
  };
};