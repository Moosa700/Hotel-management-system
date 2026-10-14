import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import roomRoutes from "./routes/room.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import staffRoutes from "./routes/staff.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import housekeepingRoutes from "./routes/housekeeping.routes.js";
import maintenanceRoutes from "./routes/maintenance.routes.js";
import billingRoutes from "./routes/billing.routes.js";
import feedbackRoutes from "./routes/feedback.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import settingsRoutes from "./routes/settings.routes.js";
import { maintenanceModeGate } from "./middleware/maintenance.middleware.js";

const app = express();

/* ---------------- CORS ---------------- */

const allowedOrigins = new Set([
  process.env.CLIENT_URL || "http://localhost:5173",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
]);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.has(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origin not allowed by CORS."));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// IMPORTANT: handle preflight requests
app.options("*", cors());

/* ---------------- Middleware ---------------- */

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

app.use("/api", maintenanceModeGate);

/* ---------------- Debug (TEMP - remove later) ---------------- */
app.use((req, res, next) => {
  console.log("➡️", req.method, req.url);
  next();
});

/* ---------------- API Routes ---------------- */

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/housekeeping", housekeepingRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/billing", billingRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/settings", settingsRoutes);

/* ---------------- Health Check ---------------- */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    project: "Hotel Management System",
    version: "1.0.0",
    message: "Backend is running successfully 🚀",
  });
});

/* ---------------- 404 ---------------- */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* ---------------- Error Handler ---------------- */

app.use((err, req, res, _next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;