import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import { getSettings, updateSettings } from "../controllers/settings.controller.js";

const router = Router();

router.use(authenticate, authorize("admin"));
router.get("/", getSettings);
router.put("/", updateSettings);

export default router;