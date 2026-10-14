import { Router } from "express";
import {
  getMyBills,
  getBills,
  getBill,
  createBill,
  updateBill,
  deleteBill,
  payBill,
} from "../controllers/billing.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = Router();

/* Apply Authentication to All Routes */
router.use(authenticate);

/* ---------- Bills ---------- */

router.get("/mine", authorize("customer"), getMyBills);

// Get all bills
router.get(
  "/",
  authorize("admin", "staff"),
  getBills
);

// Get bill by ID
router.get(
  "/:id",
  authorize("admin", "staff"),
  getBill
);

// Create bill
router.post(
  "/",
  authorize("admin", "staff"),
  createBill
);

// Update bill
router.put(
  "/:id",
  authorize("admin", "staff"),
  updateBill
);

// Mark bill as paid
router.patch(
  "/:id/pay",
  authorize("admin", "staff"),
  payBill
);

// Delete bill
router.delete(
  "/:id",
  authorize("admin"),
  deleteBill
);

export default router;