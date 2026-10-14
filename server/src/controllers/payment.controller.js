import paymentService from "../services/payment.service.js";
import { success, error } from "../utils/apiResponse.js";

/* Get All Payments */

export const getPayments = async (req, res, next) => {
  try {
    const payments = await paymentService.getAllPayments();

    return success(
      res,
      "Payments fetched successfully.",
      payments
    );
  } catch (err) {
    next(err);
  }
};

/* Get Payment By ID */

export const getPayment = async (req, res, next) => {
  try {
    const payment = await paymentService.getPaymentById(
      req.params.id
    );

    if (!payment) {
      return error(res, "Payment not found.", 404);
    }

    return success(
      res,
      "Payment fetched successfully.",
      payment
    );
  } catch (err) {
    next(err);
  }
};

/* Create Payment */

export const createPayment = async (req, res, next) => {
  try {
    const payment = await paymentService.createPayment(req.body);

    return success(
      res,
      "Payment created successfully.",
      payment,
      201
    );
  } catch (err) {
    next(err);
  }
};

/* Update Payment */

export const updatePayment = async (req, res, next) => {
  try {
    const payment = await paymentService.updatePayment(
      req.params.id,
      req.body
    );

    if (!payment) {
      return error(res, "Payment not found.", 404);
    }

    return success(
      res,
      "Payment updated successfully.",
      payment
    );
  } catch (err) {
    next(err);
  }
};

/* Delete Payment */

export const deletePayment = async (req, res, next) => {
  try {
    const payment = await paymentService.deletePayment(
      req.params.id
    );

    if (!payment) {
      return error(res, "Payment not found.", 404);
    }

    return success(
      res,
      "Payment deleted successfully."
    );
  } catch (err) {
    next(err);
  }
};

/* Mark Payment as Paid */

export const markAsPaid = async (req, res, next) => {
  try {
    const payment = await paymentService.markAsPaid(
      req.params.id
    );

    if (!payment) {
      return error(res, "Payment not found.", 404);
    }

    return success(
      res,
      "Payment marked as paid successfully.",
      payment
    );
  } catch (err) {
    next(err);
  }
};

/* Get Payments By Booking */

export const getPaymentsByBooking = async (
  req,
  res,
  next
) => {
  try {
    const payments =
      await paymentService.getPaymentsByBooking(
        req.params.bookingId
      );

    return success(
      res,
      "Booking payments fetched successfully.",
      payments
    );
  } catch (err) {
    next(err);
  }
};