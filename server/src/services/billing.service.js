import Billing from "../models/Billing.js";

class BillingService {
  async getBillsForGuest(guestId) {
    return await Billing.find({ guestId })
      .populate({
        path: "bookingId",
        populate: { path: "roomId", select: "roomNumber roomType" },
      })
      .sort({ createdAt: -1 });
  }

  /* Get All Bills */
  async getAllBills() {
    return await Billing.find()
      .populate({
        path: "bookingId",
        populate: { path: "roomId", select: "roomNumber roomType" },
      })
      .populate("guestId", "name email")
      .sort({ createdAt: -1 });
  }

  /* Get Bill By ID */
  async getBillById(id) {
    return await Billing.findById(id)
      .populate({
        path: "bookingId",
        populate: { path: "roomId", select: "roomNumber roomType" },
      })
      .populate("guestId", "name email");
  }

  /* Create Bill */
  async createBill(data) {
    return await Billing.create(data);
  }

  /* Update Bill */
  async updateBill(id, data) {
    return await Billing.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  /* Delete Bill */
  async deleteBill(id) {
    return await Billing.findByIdAndDelete(id);
  }

  /* Mark Bill As Paid */
  async markAsPaid(id) {
    return await Billing.findByIdAndUpdate(
      id,
      {
        paymentStatus: "Paid",
        paidAt: new Date(),
      },
      {
        new: true,
      }
    );
  }
}

export default new BillingService();