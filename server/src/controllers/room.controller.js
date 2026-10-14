import Room from "../models/Room.js";
import { success, error } from "../utils/apiResponse.js";

/* Get All Rooms */

export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();

    return success(
      res,
      "Rooms fetched successfully.",
      rooms
    );
  } catch (err) {
    next(err);
  }
};

/* Get Room */

export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return error(res, "Room not found.", 404);
    }

    return success(
      res,
      "Room fetched successfully.",
      room
    );
  } catch (err) {
    next(err);
  }
};

/* Create Room */

export const createRoom = async (req, res, next) => {
  try {
    const exists = await Room.findOne({
      roomNumber: req.body.roomNumber,
    });

    if (exists) {
      return error(
        res,
        "Room number already exists.",
        409
      );
    }

    const room = await Room.create(req.body);

    return success(
      res,
      "Room created successfully.",
      room,
      201
    );
  } catch (err) {
    next(err);
  }
};

/* Update Room */

export const updateRoom = async (req, res, next) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!room) {
      return error(res, "Room not found.", 404);
    }

    return success(
      res,
      "Room updated successfully.",
      room
    );
  } catch (err) {
    next(err);
  }
};

/* Delete Room */

export const deleteRoom = async (req, res, next) => {
  try {
    const room = await Room.findByIdAndDelete(
      req.params.id
    );

    if (!room) {
      return error(res, "Room not found.", 404);
    }

    return success(
      res,
      "Room deleted successfully."
    );
  } catch (err) {
    next(err);
  }
};

/* Get Available Rooms */

export const availableRooms = async (
  req,
  res,
  next
) => {
  try {
    const rooms = await Room.find({
      status: "Available",
      isActive: true,
    });

    return success(
      res,
      "Available rooms fetched successfully.",
      rooms
    );
  } catch (err) {
    next(err);
  }
};