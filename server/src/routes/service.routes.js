import { Router } from "express";

import {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
  getMyServices,
} from "../controllers/service.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Get All Service Requests
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  authenticate,
  authorize("admin", "staff"),
  getServices
);

router.get(
  "/mine",
  authenticate,
  authorize("customer"),
  getMyServices
);

/*
|--------------------------------------------------------------------------
| Get Single Service Request
|--------------------------------------------------------------------------
*/

router.get(
  "/:id",
  authenticate,
  getService
);

/*
|--------------------------------------------------------------------------
| Customer Creates Service Request
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  authenticate,
  authorize("customer"),
  createService
);

/*
|--------------------------------------------------------------------------
| Staff/Admin Updates Request
|--------------------------------------------------------------------------
*/

router.put(
  "/:id",
  authenticate,
  authorize("staff", "admin"),
  updateService
);

/*
|--------------------------------------------------------------------------
| Admin Deletes Request
|--------------------------------------------------------------------------
*/

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  deleteService
);

export default router;