import { Router } from "express";

import {
  getUsers,
  createGuest,
  getUser,
  getProfile,
  updateProfile,
  changeRole,
  toggleUser,
  deleteUser,
} from "../controllers/user.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = Router();

/* Logged In User */

router.get(
  "/profile",
  authenticate,
  getProfile
);

router.put(
  "/profile",
  authenticate,
  updateProfile
);

/* Admin */

router.get(
  "/",
  authenticate,
  authorize("admin"),
  getUsers
);

router.post(
  "/",
  authenticate,
  authorize("admin"),
  createGuest
);

router.get(
  "/:id",
  authenticate,
  authorize("admin"),
  getUser
);

router.put(
  "/role/:id",
  authenticate,
  authorize("admin"),
  changeRole
);

router.put(
  "/status/:id",
  authenticate,
  authorize("admin"),
  toggleUser
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  deleteUser
);

export default router;