import dashboardService from "../services/dashboard.service.js";
import { success } from "../utils/apiResponse.js";

export const getAdminDashboard = async (req, res, next) => {
  try {
    const data = await dashboardService.getAdminDashboard();

    return success(
      res,
      "Admin dashboard loaded successfully.",
      data
    );
  } catch (error) {
    next(error);
  }
};

export const getStaffDashboard = async (req, res, next) => {
  try {
    const data = await dashboardService.getStaffDashboard();

    return success(
      res,
      "Staff dashboard loaded successfully.",
      data
    );
  } catch (error) {
    next(error);
  }
};

export const getCustomerDashboard = async (req, res, next) => {
  try {
    const data = await dashboardService.getCustomerDashboard(
      req.user.id
    );

    return success(
      res,
      "Customer dashboard loaded successfully.",
      data
    );
  } catch (error) {
    next(error);
  }
};