import { Router } from "express";

import {
  getFeedback,
  getSingleFeedback,
  createFeedback,
  updateFeedback,
  approveFeedback,
  rejectFeedback,
  deleteFeedback,
} from "../controllers/feedback.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = Router();

/* Apply authentication to all routes */
router.use(authenticate);

/* ---------- Staff & Admin ---------- */

// Get all feedback
router.get(
  "/",
  authorize("staff", "admin"),
  getFeedback
);

// Get feedback by ID
router.get(
  "/:id",
  authorize("staff", "admin"),
  getSingleFeedback
);

/* ---------- Customer ---------- */

// Submit feedback
router.post(
  "/",
  authorize("customer"),
  createFeedback
);

// Update own feedback
router.put(
  "/:id",
  authorize("customer", "admin"),
  updateFeedback
);

/* ---------- Admin ---------- */

// Approve feedback
router.patch(
  "/:id/approve",
  authorize("admin"),
  approveFeedback
);

// Reject feedback
router.patch(
  "/:id/reject",
  authorize("admin"),
  rejectFeedback
);

// Delete feedback
router.delete(
  "/:id",
  authorize("admin"),
  deleteFeedback
);

export default router;