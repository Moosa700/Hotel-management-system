import maintenanceService from "../services/maintenance.service.js";
import Maintenance from "../models/Maintenance.js";
import Room from "../models/Room.js";
import Housekeeping from "../models/Housekeeping.js";
import { success, error } from "../utils/apiResponse.js";

export const getRequests = async (req, res, next) => {
  try {
    const requests = await maintenanceService.getAllRequests();

    return success(
      res,
      "Maintenance requests fetched successfully.",
      requests
    );
  } catch (err) {
    next(err);
  }
};

export const getRequest = async (req, res, next) => {
  try {
    const request = await maintenanceService.getRequestById(
      req.params.id
    );

    if (!request) {
      return error(res, "Maintenance request not found.", 404);
    }

    return success(
      res,
      "Maintenance request fetched successfully.",
      request
    );
  } catch (err) {
    next(err);
  }
};

export const createRequest = async (req, res, next) => {
  try {
    const { roomId, title, description, priority } = req.body;
    const room = await Room.findById(roomId);

    if (!room) {
      return error(res, "Room not found.", 404);
    }

    const request = await maintenanceService.createRequest({
      roomId: room._id,
      title,
      description,
      priority,
      reportedBy: req.user.id,
    });
    room.status = "Maintenance";
    await room.save();

    return success(
      res,
      "Maintenance request created successfully.",
      request,
      201
    );
  } catch (err) {
    next(err);
  }
};

export const updateRequest = async (req, res, next) => {
  try {
    const request = await Maintenance.findById(req.params.id);

    if (!request) {
      return error(res, "Maintenance request not found.", 404);
    }

    const { status, priority, assignedStaff } = req.body;
    if (status !== undefined) request.status = status;
    if (priority !== undefined) request.priority = priority;
    if (assignedStaff !== undefined) request.assignedStaff = assignedStaff || null;
    if (request.status === "Completed") request.completedAt = new Date();
    await request.save();

    if (request.status === "Completed") {
      const room = await Room.findById(request.roomId);
      if (room) {
        room.status = "Cleaning";
        await room.save();
        await Housekeeping.create({
          roomId: room._id,
          roomNumber: room.roomNumber,
          cleaningType: "Maintenance Cleaning",
          priority: "High",
          notes: `Post-maintenance cleaning for request ${request._id}`,
        });
      }
    }

    return success(
      res,
      "Maintenance request updated successfully.",
      request
    );
  } catch (err) {
    next(err);
  }
};

export const deleteRequest = async (req, res, next) => {
  try {
    const request = await maintenanceService.deleteRequest(
      req.params.id
    );

    if (!request) {
      return error(res, "Maintenance request not found.", 404);
    }

    return success(
      res,
      "Maintenance request deleted successfully.",
      request
    );
  } catch (err) {
    next(err);
  }
};