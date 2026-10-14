import { Router } from "express";

import {
  getAdminDashboard,
  getStaffDashboard,
  getCustomerDashboard,
} from "../controllers/dashboard.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = Router();

/* Apply authentication to all dashboard routes */
router.use(authenticate);

/* ---------- Admin Dashboard ---------- */

router.get(
  "/admin",
  authorize("admin"),
  getAdminDashboard
);

/* ---------- Staff Dashboard ---------- */

router.get(
  "/staff",
  authorize("staff", "admin"),
  getStaffDashboard
);

/* ---------- Customer Dashboard ---------- */

router.get(
  "/customer",
  authorize("customer"),
  getCustomerDashboard
);

export default router;