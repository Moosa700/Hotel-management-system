import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },

    roomNumber: {
      type: String,
      required: true,
      trim: true,
    },

    guestName: {
      type: String,
      required: true,
      trim: true,
    },

    guestEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    guestPhone: {
      type: String,
      required: true,
      trim: true,
    },

    checkIn: {
      type: Date,
      required: true,
    },

    checkOut: {
      type: Date,
      required: true,
    },

    guests: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },

    nights: {
      type: Number,
      default: 1,
      min: 1,
    },

    roomPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    taxAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    paymentStatus: {
      type: String,
      enum: [
        "Pending",
        "Paid",
        "Partially Paid",
        "Refunded",
        "Cancelled",
      ],
      default: "Pending",
    },

    bookingStatus: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Checked In",
        "Checked Out",
        "Cancelled",
      ],
      default: "Confirmed",
    },

    specialRequest: {
      type: String,
      default: "",
      trim: true,
    },

    bookedBy: {
      type: String,
      enum: ["Customer", "Receptionist", "Admin"],
      default: "Customer",
    },
  },
  {
    timestamps: true,
  }
);

/* Calculate nights automatically */
bookingSchema.pre("save", function (next) {
  if (this.checkIn && this.checkOut) {
    const diff =
      (this.checkOut - this.checkIn) / (1000 * 60 * 60 * 24);

    this.nights = Math.max(1, Math.ceil(diff));
  }

  next();
});

export default mongoose.model("Booking", bookingSchema);