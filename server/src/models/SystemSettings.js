import mongoose from "mongoose";

const systemSettingsSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      default: "global",
      unique: true,
      immutable: true,
    },
    hotelName: { type: String, default: "LuxuryStay Hospitality", trim: true, maxlength: 120 },
    email: { type: String, default: "", trim: true, lowercase: true },
    phone: { type: String, default: "", trim: true },
    address: { type: String, default: "", trim: true, maxlength: 300 },
    currency: { type: String, enum: ["USD", "EUR", "GBP", "PKR"], default: "USD" },
    language: { type: String, enum: ["English", "Urdu", "Arabic", "German"], default: "English" },
    notificationsEnabled: { type: Boolean, default: true },
    darkMode: { type: Boolean, default: false },
    maintenanceMode: { type: Boolean, default: false },
    taxRate: { type: Number, min: 0, max: 100, default: 0 },
    checkInTime: { type: String, default: "14:00" },
    checkOutTime: { type: String, default: "11:00" },
    cancellationPolicy: { type: String, default: "", maxlength: 2000 },
  },
  { timestamps: true }
);

export default mongoose.model("SystemSettings", systemSettingsSchema);