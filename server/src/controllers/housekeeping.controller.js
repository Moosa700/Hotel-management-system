import housekeepingService from "../services/housekeeping.service.js";
import Housekeeping from "../models/Housekeeping.js";
import Room from "../models/Room.js";
import { success, error } from "../utils/apiResponse.js";

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await housekeepingService.getAllTasks();

    return success(
      res,
      "Housekeeping tasks fetched successfully.",
      tasks
    );
  } catch (err) {
    next(err);
  }
};

export const getTask = async (req, res, next) => {
  try {
    const task = await housekeepingService.getTaskById(req.params.id);

    if (!task) {
      return error(res, "Housekeeping task not found.", 404);
    }

    return success(
      res,
      "Housekeeping task fetched successfully.",
      task
    );
  } catch (err) {
    next(err);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const task = await housekeepingService.createTask(req.body);

    return success(
      res,
      "Housekeeping task created successfully.",
      task,
      201
    );
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await Housekeeping.findById(req.params.id);

    if (!task) {
      return error(res, "Housekeeping task not found.", 404);
    }

    const { status, priority, assignedTo, notes } = req.body;
    if (status !== undefined) task.status = status;
    if (priority !== undefined) task.priority = priority;
    if (assignedTo !== undefined) task.assignedTo = assignedTo || null;
    if (notes !== undefined) task.notes = notes;
    if (["Completed", "Inspected"].includes(task.status)) {
      task.completedAt = new Date();
    }
    await task.save();

    if (["Completed", "Inspected"].includes(task.status) && task.roomId) {
      await Room.findByIdAndUpdate(task.roomId, { status: "Available" });
    }

    return success(
      res,
      "Housekeeping task updated successfully.",
      task
    );
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await housekeepingService.deleteTask(req.params.id);

    if (!task) {
      return error(res, "Housekeeping task not found.", 404);
    }

    return success(
      res,
      "Housekeeping task deleted successfully.",
      task
    );
  } catch (err) {
    next(err);
  }
};