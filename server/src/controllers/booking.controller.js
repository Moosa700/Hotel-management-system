import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import Billing from "../models/Billing.js";
import Housekeeping from "../models/Housekeeping.js";
import SystemSettings from "../models/SystemSettings.js";
import User from "../models/User.js";
import { calculateStay, validateStayDates } from "../utils/bookingRules.js";
import mongoose from "mongoose";
import { success, error } from "../utils/apiResponse.js";

/* Get All Bookings */

export const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "name email phone")
      .populate("roomId", "roomNumber roomType");

    return success(
      res,
      "Bookings fetched successfully.",
      bookings
    );
  } catch (err) {
    next(err);
  }
};

/* Get Booking By ID */

export const getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("userId", "name email phone")
      .populate("roomId", "roomNumber roomType");

    if (!booking) {
      return error(res, "Booking not found.", 404);
    }

    return success(res, "Booking fetched successfully.", booking);
  } catch (err) {
    next(err);
  }
};

/* Customer Booking History */

export const myBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({
      userId: req.user.id,
    }).populate("roomId", "roomNumber roomType");

    return success(
      res,
      "Booking history fetched successfully.",
      bookings
    );
  } catch (err) {
    next(err);
  }
};

export const bookingCustomers = async (req, res, next) => {
  try {
    const customers = await User.find({ role: "customer", isActive: true })
      .select("name email phone")
      .sort({ name: 1 });

    return success(res, "Active guests fetched successfully.", customers);
  } catch (err) {
    next(err);
  }
};

/* Create Booking */

export const createBooking = async (req, res, next) => {
  try {
    const { roomId, checkIn, checkOut, guests = 1, guestPhone, specialRequest = "" } = req.body;

    if (!mongoose.isValidObjectId(roomId)) {
      return error(res, "Select a valid room.", 400);
    }

    const stayDates = validateStayDates(checkIn, checkOut);
    if (!stayDates.valid) {
      return error(res, "Choose valid future check-in and check-out dates.", 400);
    }
    const { checkInDate, checkOutDate } = stayDates;

    const guestCount = Number(guests);
    if (!Number.isInteger(guestCount) || guestCount < 1) {
      return error(res, "Guest count must be at least one.", 400);
    }

    const room = await Room.findById(roomId);
    if (
      !room ||
      !room.isActive ||
      ["Maintenance", "Out of Service"].includes(room.status)
    ) {
      return error(res, "This room is currently unavailable.", 409);
    }

    if (guestCount > room.capacity) {
      return error(res, "This room does not have enough guest capacity.", 400);
    }

    const isCustomer = req.user.role === "customer";
    const guest = isCustomer
      ? req.user
      : await User.findOne({
          _id: req.body.guestId,
          role: "customer",
          isActive: true,
        }).select("name email phone");

    if (!guest) {
      return error(res, "Select an active guest profile.", 404);
    }

    const phone = String(guestPhone || guest.phone || "").trim();
    if (!phone) {
      return error(res, "A guest contact phone is required.", 400);
    }

    const conflictingBooking = await Booking.exists({
      roomId,
      bookingStatus: { $nin: ["Cancelled", "Checked Out"] },
      checkIn: { $lt: checkOutDate },
      checkOut: { $gt: checkInDate },
    });

    if (conflictingBooking) {
      return error(res, "This room is already booked for those dates.", 409);
    }

    const settings = await SystemSettings.findOne({ key: "global" }).select("taxRate");
    const { nights, roomCharges, taxAmount, totalPrice } = calculateStay(
      room.price,
      checkInDate,
      checkOutDate,
      settings?.taxRate
    );

    const booking = await Booking.create({
      userId: guest._id,
      roomId: room._id,
      roomNumber: room.roomNumber,
      guestName: guest.name,
      guestEmail: guest.email,
      guestPhone: phone,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests: guestCount,
      nights,
      roomPrice: room.price,
      taxAmount,
      totalPrice,
      specialRequest: String(specialRequest).trim(),
      bookedBy: isCustomer ? "Customer" : req.user.role === "admin" ? "Admin" : "Receptionist",
    });

    try {
      await Billing.create({
        bookingId: booking._id,
        guestId: guest._id,
        roomCharges,
        tax: taxAmount,
        totalAmount: booking.totalPrice,
        paymentMethod: "Unspecified",
        paymentStatus: "Pending",
        invoiceNumber: `INV-${booking._id.toString().slice(-10).toUpperCase()}`,
      });
    } catch (billingError) {
      await Booking.deleteOne({ _id: booking._id });
      throw billingError;
    }

    return success(
      res,
      "Room booked successfully.",
      { booking },
      201
    );
  } catch (err) {
    next(err);
  }
};

/* Update Booking */

export const updateBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!booking) {
      return error(res, "Booking not found.", 404);
    }

    return success(
      res,
      "Booking updated successfully.",
      booking
    );
  } catch (err) {
    next(err);
  }
};

/* Cancel Booking */

export const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!booking) {
      return error(res, "Booking not found.", 404);
    }

    if (["Checked In", "Checked Out"].includes(booking.bookingStatus)) {
      return error(res, "This booking can no longer be cancelled.", 409);
    }

    booking.bookingStatus = "Cancelled";
    await booking.save();
    await Billing.updateOne(
      { bookingId: booking._id, paymentStatus: "Pending" },
      { $set: { paymentStatus: "Cancelled" } }
    );

    return success(res, "Booking cancelled successfully.", booking);
  } catch (err) {
    next(err);
  }
};

/* Delete Booking */

export const deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndDelete(
      req.params.id
    );

    if (!booking) {
      return error(res, "Booking not found.", 404);
    }

    return success(res, "Booking deleted successfully.");
  } catch (err) {
    next(err);
  }
};

export const checkInBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) return error(res, "Booking not found.", 404);
    if (booking.bookingStatus !== "Confirmed") {
      return error(res, "Only confirmed bookings can be checked in.", 409);
    }

    const room = await Room.findById(booking.roomId);
    if (!room || room.status !== "Available") {
      return error(res, "The assigned room is not available for check-in.", 409);
    }

    booking.bookingStatus = "Checked In";
    await booking.save();
    room.status = "Occupied";
    await room.save();

    return success(res, "Guest checked in successfully.", { booking, room });
  } catch (err) {
    next(err);
  }
};

export const checkOutBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) return error(res, "Booking not found.", 404);
    if (booking.bookingStatus !== "Checked In") {
      return error(res, "Only checked-in bookings can be checked out.", 409);
    }

    const room = await Room.findById(booking.roomId);
    if (!room) return error(res, "Assigned room was not found.", 404);

    booking.bookingStatus = "Checked Out";
    await booking.save();
    room.status = "Cleaning";
    await room.save();
    await Housekeeping.create({
      roomId: room._id,
      roomNumber: room.roomNumber,
      cleaningType: "Check-Out Cleaning",
      priority: "High",
      notes: `Check-out cleaning for booking ${booking._id}`,
    });

    return success(res, "Guest checked out successfully. Room marked for cleaning.", { booking, room });
  } catch (err) {
    next(err);
  }
};