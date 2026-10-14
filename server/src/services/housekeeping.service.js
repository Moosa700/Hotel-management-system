import Housekeeping from "../models/Housekeeping.js";

class HousekeepingService {
  /* Get All Tasks */

  async getAllTasks() {
    return await Housekeeping.find()
      .populate("roomId", "roomNumber roomType")
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });
  }

  /* Get Task By ID */

  async getTaskById(id) {
    return await Housekeeping.findById(id);
  }

  /* Create Task */

  async createTask(data) {
    return await Housekeeping.create(data);
  }

  /* Update Task */

  async updateTask(id, data) {
    return await Housekeeping.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      }
    );
  }

  /* Delete Task */

  async deleteTask(id) {
    return await Housekeeping.findByIdAndDelete(id);
  }
}

export default new HousekeepingService();