import { Router } from "express";

import {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
  cancelBooking,
  myBookings,
  bookingCustomers,
  checkInBooking,
  checkOutBooking,
} from "../controllers/booking.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = Router();

/* Apply authentication to all routes */
router.use(authenticate);

/* ---------- Customer Routes ---------- */

// Customer booking history
router.get("/my-bookings", myBookings);
router.get("/customers", authorize("staff", "admin"), bookingCustomers);

// Create booking
router.post(
  "/",
  authorize("customer", "staff", "admin"),
  createBooking
);

// Cancel booking
router.patch(
  "/:id/cancel",
  authorize("customer"),
  cancelBooking
);

router.patch(
  "/:id/check-in",
  authorize("staff", "admin"),
  checkInBooking
);

router.patch(
  "/:id/check-out",
  authorize("staff", "admin"),
  checkOutBooking
);

/* ---------- Staff & Admin Routes ---------- */

// Get all bookings
router.get(
  "/",
  authorize("staff", "admin"),
  getBookings
);

// Get booking by ID
router.get(
  "/:id",
  authorize("staff", "admin"),
  getBooking
);

// Update booking
router.put(
  "/:id",
  authorize("staff", "admin"),
  updateBooking
);

// Delete booking
router.delete(
  "/:id",
  authorize("admin"),
  deleteBooking
);

export default router;