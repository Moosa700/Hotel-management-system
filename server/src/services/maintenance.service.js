import Maintenance from "../models/Maintenance.js";

class MaintenanceService {
  /* Get All Maintenance Requests */

  async getAllRequests() {
    return await Maintenance.find()
      .populate("roomId", "roomNumber roomType")
      .populate("assignedStaff", "name email")
      .populate("reportedBy", "name email")
      .sort({ createdAt: -1 });
  }

  /* Get Maintenance Request By ID */

  async getRequestById(id) {
    return await Maintenance.findById(id)
      .populate("roomId", "roomNumber roomType")
      .populate("assignedStaff", "name email")
      .populate("reportedBy", "name email");
  }

  /* Create Maintenance Request */

  async createRequest(data) {
    return await Maintenance.create(data);
  }

  /* Update Maintenance Request */

  async updateRequest(id, data) {
    return await Maintenance.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      }
    );
  }

  /* Delete Maintenance Request */

  async deleteRequest(id) {
    return await Maintenance.findByIdAndDelete(id);
  }
}

export default new MaintenanceService();