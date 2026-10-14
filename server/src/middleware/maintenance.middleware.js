import jwt from "jsonwebtoken";
import User from "../models/User.js";
import SystemSettings from "../models/SystemSettings.js";

let cachedMode = false;
let cacheExpiresAt = 0;

export function invalidateMaintenanceModeCache() {
  cacheExpiresAt = 0;
}

export async function maintenanceModeGate(req, res, next) {
  const path = req.originalUrl.split("?")[0];
  if (
    path.startsWith("/api/auth/") ||
    path === "/api/settings" ||
    path.startsWith("/api/settings/")
  ) {
    return next();
  }

  try {
    if (Date.now() >= cacheExpiresAt) {
      const settings = await SystemSettings.findOne({ key: "global" })
        .select("maintenanceMode")
        .lean();
      cachedMode = Boolean(settings?.maintenanceMode);
      cacheExpiresAt = Date.now() + 5000;
    }

    if (!cachedMode) return next();

    const token = req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.slice(7)
      : null;
    if (!token) {
      return res.status(503).json({
        success: false,
        message: "Customer services are temporarily unavailable for maintenance.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("role isActive").lean();
    if (!user?.isActive || !["admin", "staff", "manager", "receptionist", "housekeeping"].includes(user.role)) {
      return res.status(503).json({
        success: false,
        message: "Customer services are temporarily unavailable for maintenance.",
      });
    }

    return next();
  } catch (error) {
    return next(error);
  }
}