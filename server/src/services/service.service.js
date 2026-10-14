import ServiceRequest from "../models/ServiceRequest.js";

class ServiceService {
  async getServicesForUser(userId) {
    return await ServiceRequest.find({ userId })
      .populate("bookingId", "roomNumber bookingStatus")
      .populate("roomId", "roomNumber roomType")
      .sort({ createdAt: -1 });
  }

  /* Get All Service Requests */

  async getAllServices() {
    return await ServiceRequest.find()
      .populate("bookingId")
      .populate("userId", "name email")
      .populate("roomId", "roomNumber roomType")
      .populate("assignedStaff", "name email")
      .sort({ requestedAt: -1 });
  }

  /* Get Service Request By ID */

  async getServiceById(id) {
    return await ServiceRequest.findById(id)
      .populate("bookingId")
      .populate("userId", "name email")
      .populate("roomId", "roomNumber roomType")
      .populate("assignedStaff", "name email");
  }

  /* Create Service Request */

  async createService(data) {
    return await ServiceRequest.create(data);
  }

  /* Update Service Request */

  async updateService(id, data) {
    return await ServiceRequest.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      }
    );
  }

  /* Delete Service Request */

  async deleteService(id) {
    return await ServiceRequest.findByIdAndDelete(id);
  }
}

export default new ServiceService();