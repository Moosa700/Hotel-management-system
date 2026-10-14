import User from "../models/User.js";
import bcrypt from "bcrypt";
import { success, error } from "../utils/apiResponse.js";

const staffRoles = ["staff", "manager", "receptionist", "housekeeping"];

/* Get All Staff */

export const getStaff = async (req, res, next) => {
  try {
    const staff = await User.find({
      role: { $in: staffRoles },
    }).select("-password");

    return success(
      res,
      "Staff fetched successfully.",
      staff
    );
  } catch (err) {
    next(err);
  }
};

/* Get Staff By ID */

export const getStaffMember = async (req, res, next) => {
  try {
    const staff = await User.findById(req.params.id).select(
      "-password"
    );

    if (!staff) {
      return error(res, "Staff member not found.", 404);
    }

    if (
      !staffRoles.includes(staff.role)
    ) {
      return error(res, "User is not a staff member.", 400);
    }

    return success(
      res,
      "Staff member fetched successfully.",
      staff
    );
  } catch (err) {
    next(err);
  }
};

/* Create Staff */

export const createStaff = async (req, res, next) => {
  try {
    const name = String(req.body.name || "").trim();
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");
    const role = req.body.role || "staff";

    if (!name || !email || password.length < 8) {
      return error(res, "Name, valid email, and a password of at least 8 characters are required.", 400);
    }

    if (!staffRoles.includes(role)) {
      return error(res, "Select a valid staff access level.", 400);
    }

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return error(
        res,
        "Email already exists.",
        409
      );
    }

    const staff = await User.create({
      name,
      email,
      phone: req.body.phone || "",
      address: req.body.address || "",
      password: await bcrypt.hash(password, 12),
      role,
      isActive: true,
    });

    const staffData = staff.toObject();
    delete staffData.password;

    return success(
      res,
      "Staff member created successfully.",
      staffData,
      201
    );
  } catch (err) {
    next(err);
  }
};

/* Update Staff */

export const updateStaff = async (req, res, next) => {
  try {
    const staff = await User.findById(req.params.id);

    if (!staff) {
      return error(res, "Staff member not found.", 404);
    }

    if (!staffRoles.includes(staff.role)) {
      return error(res, "User is not a staff member.", 400);
    }

    for (const field of ["name", "phone", "address", "isActive"]) {
      if (req.body[field] !== undefined) staff[field] = req.body[field];
    }

    if (req.body.role !== undefined) {
      if (!staffRoles.includes(req.body.role)) {
        return error(res, "Select a valid staff access level.", 400);
      }
      staff.role = req.body.role;
    }

    if (req.body.email !== undefined) {
      const email = String(req.body.email).trim().toLowerCase();
      const duplicate = await User.exists({ email, _id: { $ne: staff._id } });
      if (duplicate) return error(res, "Email already exists.", 409);
      staff.email = email;
    }

    await staff.save();
    const staffData = staff.toObject();
    delete staffData.password;

    return success(
      res,
      "Staff member updated successfully.",
      staffData
    );
  } catch (err) {
    next(err);
  }
};

/* Delete Staff */

export const deleteStaff = async (req, res, next) => {
  try {
    const staff = await User.findOneAndDelete({
      _id: req.params.id,
      role: { $in: staffRoles },
    });

    if (!staff) {
      return error(res, "Staff member not found.", 404);
    }

    return success(
      res,
      "Staff member deleted successfully."
    );
  } catch (err) {
    next(err);
  }
};

/* Get Current Staff Profile */

export const getProfile = async (req, res, next) => {
  try {
    const staff = await User.findById(req.user.id).select(
      "-password"
    );

    if (!staff) {
      return error(res, "Staff member not found.", 404);
    }

    return success(
      res,
      "Profile fetched successfully.",
      staff
    );
  } catch (err) {
    next(err);
  }
};