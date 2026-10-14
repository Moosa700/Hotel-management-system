import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    roomType: {
      type: String,
      required: true,
      enum: [
        "Single",
        "Double",
        "Twin",
        "Deluxe",
        "Suite",
        "Family",
        "Presidential",
      ],
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    capacity: {
      type: Number,
      required: true,
      min: 1,
    },

    floor: {
      type: Number,
      required: true,
      min: 0,
    },

    amenities: [
      {
        type: String,
        trim: true,
      },
    ],

    status: {
      type: String,
      enum: [
        "Available",
        "Booked",
        "Occupied",
        "Cleaning",
        "Maintenance",
        "Out of Service",
      ],
      default: "Available",
    },

    image: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    size: {
      type: Number, // in square feet
      default: 0,
    },

    bedType: {
      type: String,
      enum: ["Single", "Double", "Queen", "King"],
      default: "Queen",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Room", roomSchema);