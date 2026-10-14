import SystemSettings from "../models/SystemSettings.js";
import { invalidateMaintenanceModeCache } from "../middleware/maintenance.middleware.js";
import { error, success } from "../utils/apiResponse.js";

const editableFields = [
  "hotelName",
  "email",
  "phone",
  "address",
  "currency",
  "language",
  "notificationsEnabled",
  "darkMode",
  "maintenanceMode",
  "taxRate",
  "checkInTime",
  "checkOutTime",
  "cancellationPolicy",
];

export async function getSettings(req, res, next) {
  try {
    let settings = await SystemSettings.findOne({ key: "global" });
    if (!settings) settings = await SystemSettings.create({ key: "global" });
    return success(res, "System settings loaded.", settings);
  } catch (requestError) {
    return next(requestError);
  }
}

export async function updateSettings(req, res, next) {
  try {
    const updates = Object.fromEntries(
      editableFields
        .filter((field) => req.body[field] !== undefined)
        .map((field) => [field, req.body[field]])
    );

    if (Object.keys(updates).length === 0) {
      return error(res, "No valid settings were provided.", 400);
    }

    const settings = await SystemSettings.findOneAndUpdate(
      { key: "global" },
      { $set: updates, $setOnInsert: { key: "global" } },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    );
    if (updates.maintenanceMode !== undefined) {
      invalidateMaintenanceModeCache();
    }

    return success(res, "System settings saved.", settings);
  } catch (requestError) {
    if (requestError.name === "ValidationError" || requestError.name === "CastError") {
      return error(res, requestError.message, 400);
    }

    return next(requestError);
  }
}