import { Router } from "express";
import {
  createStaff,
  deleteStaff,
  getProfile,
  getStaff,
  getStaffMember,
  updateStaff,
} from "../controllers/staff.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = Router();

router.use(authenticate);
router.get("/profile", authorize("staff", "admin"), getProfile);
router.get("/", authorize("admin"), getStaff);
router.post("/", authorize("admin"), createStaff);
router.get("/:id", authorize("admin"), getStaffMember);
router.put("/:id", authorize("admin"), updateStaff);
router.delete("/:id", authorize("admin"), deleteStaff);

export default router;