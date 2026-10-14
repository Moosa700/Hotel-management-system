import { Router } from "express";

import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/housekeeping.controller.js";

import {
  authenticate,
  authorize,
} from "../middleware/auth.middleware.js";

const router = Router();

/* Apply authentication to all routes */
router.use(authenticate);

/* ===================================================
   GET ALL HOUSEKEEPING TASKS
=================================================== */

router.get(
  "/",
  authorize("admin", "staff"),
  getTasks
);

/* ===================================================
   GET SINGLE TASK
=================================================== */

router.get(
  "/:id",
  authorize("admin", "staff"),
  getTask
);

/* ===================================================
   CREATE TASK
=================================================== */

router.post(
  "/",
  authorize("admin"),
  createTask
);

/* ===================================================
   UPDATE TASK
=================================================== */

router.put(
  "/:id",
  authorize("admin", "staff"),
  updateTask
);

/* ===================================================
   DELETE TASK
=================================================== */

router.delete(
  "/:id",
  authorize("admin"),
  deleteTask
);

export default router;