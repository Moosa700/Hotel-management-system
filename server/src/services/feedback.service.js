import Feedback from "../models/Feedback.js";

class FeedbackService {
  /* Get All Feedback */

  async getAllFeedback() {
    return await Feedback.find()
      .populate("bookingId")
      .populate("guestId", "name email")
      .populate("roomId", "roomNumber roomType")
      .sort({ createdAt: -1 });
  }

  /* Get Feedback By ID */

  async getFeedbackById(id) {
    return await Feedback.findById(id)
      .populate("bookingId")
      .populate("guestId", "name email")
      .populate("roomId", "roomNumber roomType");
  }

  /* Create Feedback */

  async createFeedback(data) {
    return await Feedback.create(data);
  }

  /* Update Feedback */

  async updateFeedback(id, data) {
    return await Feedback.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  /* Delete Feedback */

  async deleteFeedback(id) {
    return await Feedback.findByIdAndDelete(id);
  }

  /* Approve Feedback */

  async approveFeedback(id) {
    return await Feedback.findByIdAndUpdate(
      id,
      {
        status: "Approved",
      },
      {
        new: true,
      }
    );
  }

  /* Reject Feedback */

  async rejectFeedback(id) {
    return await Feedback.findByIdAndUpdate(
      id,
      {
        status: "Rejected",
      },
      {
        new: true,
      }
    );
  }
}

export default new FeedbackService();