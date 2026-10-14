import billingService from "../services/billing.service.js";

export const getMyBills = async (req, res, next) => {
  try {
    const bills = await billingService.getBillsForGuest(req.user.id);

    res.status(200).json({
      success: true,
      message: "Your invoices were fetched successfully.",
      data: bills,
    });
  } catch (error) {
    next(error);
  }
};

export const getBills = async (req, res, next) => {
  try {
    const bills = await billingService.getAllBills();

    res.status(200).json({
      success: true,
      message: "Bills fetched successfully.",
      data: bills,
    });
  } catch (error) {
    next(error);
  }
};

export const getBill = async (req, res, next) => {
  try {
    const bill = await billingService.getBillById(req.params.id);

    if (!bill) {
      return res.status(404).json({
        success: false,
        message: "Bill not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Bill fetched successfully.",
      data: bill,
    });
  } catch (error) {
    next(error);
  }
};

export const createBill = async (req, res, next) => {
  try {
    const bill = await billingService.createBill(req.body);

    res.status(201).json({
      success: true,
      message: "Bill created successfully.",
      data: bill,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBill = async (req, res, next) => {
  try {
    const bill = await billingService.updateBill(
      req.params.id,
      req.body
    );

    if (!bill) {
      return res.status(404).json({
        success: false,
        message: "Bill not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Bill updated successfully.",
      data: bill,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBill = async (req, res, next) => {
  try {
    const bill = await billingService.deleteBill(req.params.id);

    if (!bill) {
      return res.status(404).json({
        success: false,
        message: "Bill not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Bill deleted successfully.",
      data: bill,
    });
  } catch (error) {
    next(error);
  }
};

export const payBill = async (req, res, next) => {
  try {
    const bill = await billingService.markAsPaid(req.params.id);

    if (!bill) {
      return res.status(404).json({
        success: false,
        message: "Bill not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment completed successfully.",
      data: bill,
    });
  } catch (error) {
    next(error);
  }
};