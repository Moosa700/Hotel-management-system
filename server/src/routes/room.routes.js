import { Router } from "express";

import {
  getRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom,
  availableRooms,
} from "../controllers/room.controller.js";

import {
  authenticate,
} from "../middleware/auth.middleware.js";

import {
  authorize,
} from "../middleware/role.middleware.js";

const router = Router();

/* Public */

router.get("/", getRooms);

router.get("/available", availableRooms);

router.get("/:id", getRoom);

/* Staff/Admin */

router.post(
  "/",
  authenticate,
  authorize("staff", "admin"),
  createRoom
);

router.put(
  "/:id",
  authenticate,
  authorize("staff", "admin"),
  updateRoom
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  deleteRoom
);

export default router;