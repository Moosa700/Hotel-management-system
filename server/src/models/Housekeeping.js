import mongoose from "mongoose";

const housekeepingSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: true,
      trim: true,
    },

    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      default: null,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Assigned",
        "In Progress",
        "Completed",
        "Inspected",
      ],
      default: "Pending",
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Urgent"],
      default: "Medium",
    },

    notes: {
      type: String,
      trim: true,
      default: "",
    },

    cleaningType: {
      type: String,
      enum: [
        "Daily Cleaning",
        "Deep Cleaning",
        "Check-Out Cleaning",
        "Maintenance Cleaning",
      ],
      default: "Daily Cleaning",
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Housekeeping", housekeepingSchema);