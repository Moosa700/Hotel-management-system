import User from "../models/User.js";
import Room from "../models/Room.js";
import Booking from "../models/Booking.js";
import Billing from "../models/Billing.js";
import Housekeeping from "../models/Housekeeping.js";

class DashboardService {
  /* ==========================================
      ADMIN DASHBOARD
  ========================================== */

  async getAdminDashboard() {
    const [
      totalUsers,
      totalCustomers,
      totalStaff,
      totalRooms,
      availableRooms,
      occupiedRooms,
      maintenanceRooms,
      totalBookings,
      recentBookings,
      recentCustomers,
      bills,
    ] = await Promise.all([
      User.countDocuments(),

      User.countDocuments({ role: "customer" }),

      User.countDocuments({
        role: { $in: ["staff", "manager", "receptionist", "housekeeping"] },
      }),

      Room.countDocuments(),

      Room.countDocuments({ status: "Available" }),

      Room.countDocuments({ status: "Occupied" }),

      Room.countDocuments({
        status: "Maintenance",
      }),

      Booking.countDocuments(),

      Booking.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("userId", "name email")
        .populate("roomId", "roomNumber roomType"),

      User.find({ role: "customer" })
        .sort({ createdAt: -1 })
        .limit(5),

      Billing.find({ paymentStatus: "Paid" }),
    ]);

    const totalRevenue = bills.reduce(
      (sum, bill) => sum + bill.totalAmount,
      0
    );

    return {
      statistics: {
        totalUsers,
        totalCustomers,
        totalStaff,
        totalRooms,
        availableRooms,
        occupiedRooms,
        maintenanceRooms,
        totalBookings,
        totalRevenue,
      },

      recentBookings,

      recentCustomers,

      roomStatus: {
        available: availableRooms,
        occupied: occupiedRooms,
        maintenance: maintenanceRooms,
      },
    };
  }

  /* ==========================================
      STAFF DASHBOARD
  ========================================== */

  async getStaffDashboard() {
    const housekeepingTasks =
      await Housekeeping.find({
        status: {
          $ne: "Completed",
        },
      }).limit(10);

    const maintenanceTasks = [];

    const serviceRequests = [];

    return {
      housekeepingTasks,
      maintenanceTasks,
      serviceRequests,

      todayAssignments: [
        ...housekeepingTasks,
      ],
    };
  }

  /* ==========================================
      CUSTOMER DASHBOARD
  ========================================== */

  async getCustomerDashboard(userId) {
    const activeBookings =
      await Booking.find({
        userId,
        bookingStatus: {
          $in: [
            "Confirmed",
            "Checked In",
          ],
        },
      }).populate("roomId");

    const bookingHistory =
      await Booking.find({
        userId,
      })
        .sort({
          createdAt: -1,
        })
        .populate("roomId");

    const pendingPayments =
      await Billing.find({
        guestId: userId,
        paymentStatus: "Pending",
      });

    return {
      userId,

      activeBookings,

      bookingHistory,

      pendingPayments,

      recentFeedback: [],
    };
  }
}

export default new DashboardService();