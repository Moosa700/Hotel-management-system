import serviceService from "../services/service.service.js";
import Booking from "../models/Booking.js";
import ServiceRequest from "../models/ServiceRequest.js";
import { success, error } from "../utils/apiResponse.js";

/* Get All Service Requests */

export const getServices = async (req, res, next) => {
  try {
    const services = await serviceService.getAllServices();

    return success(
      res,
      "Services fetched successfully.",
      services
    );
  } catch (err) {
    next(err);
  }
};

/* Get Service Request By ID */

export const getMyServices = async (req, res, next) => {
  try {
    const services = await serviceService.getServicesForUser(req.user.id);
    return success(res, "Your service requests were fetched successfully.", services);
  } catch (err) {
    next(err);
  }
};

export const getService = async (req, res, next) => {
  try {
    const service = await serviceService.getServiceById(
      req.params.id
    );

    if (!service) {
      return error(res, "Service request not found.", 404);
    }

    if (req.user.role === "customer" && service.userId._id.toString() !== req.user.id) {
      return error(res, "Service request not found.", 404);
    }

    return success(
      res,
      "Service fetched successfully.",
      service
    );
  } catch (err) {
    next(err);
  }
};

/* Create Service Request */

export const createService = async (req, res, next) => {
  try {
    const booking = await Booking.findOne({
      _id: req.body.bookingId,
      userId: req.user.id,
      bookingStatus: "Checked In",
    });

    if (!booking) {
      return error(res, "Service requests require one of your active checked-in stays.", 409);
    }

    const service = await serviceService.createService({
      bookingId: booking._id,
      userId: req.user.id,
      roomId: booking.roomId,
      serviceType: req.body.serviceType,
      description: req.body.description,
      priority: "Medium",
    });

    return success(
      res,
      "Service request created successfully.",
      service,
      201
    );
  } catch (err) {
    next(err);
  }
};

/* Update Service Request */

export const updateService = async (req, res, next) => {
  try {
    const service = await ServiceRequest.findById(req.params.id);

    if (!service) {
      return error(res, "Service request not found.", 404);
    }

    for (const field of ["status", "assignedStaff", "priority"]) {
      if (req.body[field] !== undefined) service[field] = req.body[field];
    }
    if (service.status === "Completed") service.completedAt = new Date();
    await service.save();

    return success(
      res,
      "Service updated successfully.",
      service
    );
  } catch (err) {
    next(err);
  }
};

/* Delete Service Request */

export const deleteService = async (req, res, next) => {
  try {
    const service = await serviceService.deleteService(
      req.params.id
    );

    if (!service) {
      return error(res, "Service request not found.", 404);
    }

    return success(
      res,
      "Service deleted successfully."
    );
  } catch (err) {
    next(err);
  }
};