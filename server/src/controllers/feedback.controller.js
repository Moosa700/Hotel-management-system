import feedbackService from "../services/feedback.service.js";
import Booking from "../models/Booking.js";
import Feedback from "../models/Feedback.js";
import { success, error } from "../utils/apiResponse.js";

export async function getFeedback(req, res) {
  try {
    const data = await feedbackService.getAllFeedback();

    return success(
      res,
      "Feedback fetched successfully.",
      data
    );
  } catch (err) {
    return error(res, err.message, 500);
  }
}

export async function getSingleFeedback(req, res) {
  try {
    const data = await feedbackService.getFeedbackById(req.params.id);

    if (!data) {
      return error(res, "Feedback not found.", 404);
    }

    return success(
      res,
      "Feedback fetched successfully.",
      data
    );
  } catch (err) {
    return error(res, err.message, 500);
  }
}

export async function createFeedback(req, res) {
  try {
    const booking = await Booking.findOne({
      _id: req.body.bookingId,
      userId: req.user.id,
      bookingStatus: "Checked Out",
    });

    if (!booking) {
      return error(res, "Feedback can be submitted only for your completed stay.", 409);
    }

    if (await Feedback.exists({ bookingId: booking._id, guestId: req.user.id })) {
      return error(res, "Feedback has already been submitted for this stay.", 409);
    }

    const data = await feedbackService.createFeedback({
      bookingId: booking._id,
      guestId: req.user.id,
      roomId: booking.roomId,
      rating: Number(req.body.rating),
      title: String(req.body.title || "").trim(),
      comment: String(req.body.comment || "").trim(),
      status: "Pending",
    });

    return success(
      res,
      "Feedback submitted successfully.",
      data,
      201
    );
  } catch (err) {
    return error(res, err.message, 500);
  }
}

export async function updateFeedback(req, res) {
  try {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return error(res, "Feedback not found.", 404);
    }

    if (req.user.role === "customer") {
      if (feedback.guestId.toString() !== req.user.id || feedback.status !== "Pending") {
        return error(res, "Feedback not found or can no longer be changed.", 404);
      }
      for (const field of ["rating", "title", "comment"]) {
        if (req.body[field] !== undefined) feedback[field] = req.body[field];
      }
      await feedback.save();
    } else {
      const data = await feedbackService.updateFeedback(req.params.id, {
        rating: req.body.rating,
        title: req.body.title,
        comment: req.body.comment,
        status: req.body.status,
      });
      return success(res, "Feedback updated successfully.", data);
    }

    return success(
      res,
      "Feedback updated successfully.",
      feedback
    );
  } catch (err) {
    return error(res, err.message, 500);
  }
}

export async function approveFeedback(req, res) {
  try {
    const data = await feedbackService.approveFeedback(req.params.id);

    if (!data) {
      return error(res, "Feedback not found.", 404);
    }

    return success(
      res,
      "Feedback approved successfully.",
      data
    );
  } catch (err) {
    return error(res, err.message, 500);
  }
}

export async function rejectFeedback(req, res) {
  try {
    const data = await feedbackService.rejectFeedback(req.params.id);

    if (!data) {
      return error(res, "Feedback not found.", 404);
    }

    return success(
      res,
      "Feedback rejected successfully.",
      data
    );
  } catch (err) {
    return error(res, err.message, 500);
  }
}

export async function deleteFeedback(req, res) {
  try {
    const data = await feedbackService.deleteFeedback(req.params.id);

    if (!data) {
      return error(res, "Feedback not found.", 404);
    }

    return success(
      res,
      "Feedback deleted successfully.",
      data
    );
  } catch (err) {
    return error(res, err.message, 500);
  }
}