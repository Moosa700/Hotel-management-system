import User from "../models/User.js";
import bcrypt from "bcrypt";
import { success, error } from "../utils/apiResponse.js";

/* Get All Users */

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });

    return success(
      res,
      "Users fetched successfully.",
      users
    );
  } catch (err) {
    next(err);
  }
};

export const createGuest = async (req, res, next) => {
  try {
    const name = String(req.body.name || "").trim();
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");

    if (!name || !email || password.length < 8) {
      return error(res, "Name, valid email, and a password of at least 8 characters are required.", 400);
    }

    if (await User.exists({ email })) {
      return error(res, "Email already registered.", 409);
    }

    const guest = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 12),
      phone: String(req.body.phone || "").trim(),
      address: String(req.body.address || "").trim(),
      role: "customer",
      isActive: true,
    });
    const guestData = guest.toObject();
    delete guestData.password;

    return success(res, "Guest profile created successfully.", guestData, 201);
  } catch (err) {
    next(err);
  }
};

/* Get Current User */

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-password"
    );

    if (!user) {
      return error(res, "User not found.", 404);
    }

    return success(
      res,
      "Profile fetched successfully.",
      user
    );
  } catch (err) {
    next(err);
  }
};

/* Get User By ID */

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select(
      "-password"
    );

    if (!user) {
      return error(res, "User not found.", 404);
    }

    return success(
      res,
      "User fetched successfully.",
      user
    );
  } catch (err) {
    next(err);
  }
};

/* Update Profile */

export const updateProfile = async (req, res, next) => {
  try {
    const allowedFields = [
      "name",
      "phone",
      "address",
      "profileImage",
      "gender",
      "dateOfBirth",
      "nationalId",
    ];

    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!user) {
      return error(res, "User not found.", 404);
    }

    return success(
      res,
      "Profile updated successfully.",
      user
    );
  } catch (err) {
    next(err);
  }
};

/* Change User Role */

export const changeRole = async (req, res, next) => {
  try {
    const validRoles = ["admin", "manager", "receptionist", "housekeeping", "staff", "customer"];
    if (!validRoles.includes(req.body.role)) {
      return error(res, "Choose a valid role.", 400);
    }

    const existing = await User.findById(req.params.id);
    if (!existing) return error(res, "User not found.", 404);

    if (existing.role === "admin" && req.body.role !== "admin" && existing.isActive) {
      const adminCount = await User.countDocuments({ role: "admin", isActive: true });
      if (adminCount <= 1) {
        return error(res, "The last active admin cannot be demoted.", 409);
      }
    }

    existing.role = req.body.role;
    await existing.save();
    const user = existing.toObject();
    delete user.password;

    if (!user) {
      return error(res, "User not found.", 404);
    }

    if (user._id.toString() === req.user.id && user.isActive) {
      return error(res, "You cannot deactivate your own account.", 409);
    }

    if (user.role === "admin" && user.isActive) {
      const adminCount = await User.countDocuments({ role: "admin", isActive: true });
      if (adminCount <= 1) {
        return error(res, "The last active admin cannot be deactivated.", 409);
      }
    }

    return success(
      res,
      "User role updated successfully.",
      user
    );
  } catch (err) {
    next(err);
  }
};

/* Activate / Deactivate User */

export const toggleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return error(res, "User not found.", 404);
    }

    user.isActive = !user.isActive;

    await user.save();

    const userData = user.toObject();
    delete userData.password;

    return success(
      res,
      "User status updated successfully.",
      userData
    );
  } catch (err) {
    next(err);
  }
};

/* Delete User */

export const deleteUser = async (req, res, next) => {
  try {
    const existing = await User.findById(req.params.id);
    if (!existing) return error(res, "User not found.", 404);
    if (existing._id.toString() === req.user.id) {
      return error(res, "You cannot delete your own account.", 409);
    }
    if (existing.role === "admin" && existing.isActive) {
      const adminCount = await User.countDocuments({ role: "admin", isActive: true });
      if (adminCount <= 1) {
        return error(res, "The last active admin cannot be deleted.", 409);
      }
    }

    const user = await User.findByIdAndDelete(
      req.params.id
    );

    if (!user) {
      return error(res, "User not found.", 404);
    }

    return success(
      res,
      "User deleted successfully."
    );
  } catch (err) {
    next(err);
  }
};