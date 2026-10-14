import { Router } from "express";

import {
  getRequests,
  getRequest,
  createRequest,
  updateRequest,
  deleteRequest,
} from "../controllers/maintenance.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = Router();

/* Get All Requests */

router.get(
  "/",
  authenticate,
  authorize("staff", "admin"),
  getRequests
);

/* Get One Request */

router.get(
  "/:id",
  authenticate,
  authorize("staff", "admin"),
  getRequest
);

/* Create Request */

router.post(
  "/",
  authenticate,
  authorize("staff", "admin"),
  createRequest
);

/* Update Request */

router.put(
  "/:id",
  authenticate,
  authorize("staff", "admin"),
  updateRequest
);

/* Delete Request */

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  deleteRequest
);

export default router;