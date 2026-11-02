
import type { Request, Response } from "express";

import {
  createPayment,
  getAllPayments,
  getPaymentsByTicket,
  getPaymentSummary,
} from "../services/payment.service";

// CREATE PAYMENT
export const create = async (req: Request, res: Response) => {
  try {
    const {
      amount,
      method,
      transactionId,
      note,
      shopId,
      repairTicketId,
    } = req.body;

    if (
      amount === undefined ||
      !method ||
      !shopId ||
      !repairTicketId
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    const payment = await createPayment({
      amount: Number(amount),
      method,
      transactionId,
      note,
      shopId,
      repairTicketId,
    });

    return res.status(201).json({
      success: true,
      message: "Payment created successfully",
      data: payment,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "REPAIR_TICKET_NOT_FOUND") {
        return res.status(404).json({
          success: false,
          message: "Repair ticket not found",
        });
      }

      if (error.message === "REPAIR_COST_NOT_SET") {
        return res.status(400).json({
          success: false,
          message: "Repair cost has not been set",
        });
      }

      if (error.message === "PAYMENT_EXCEEDS_REPAIR_COST") {
        return res.status(400).json({
          success: false,
          message: "Payment exceeds the remaining balance",
        });
      }

      if (error.message === "INVALID_PAYMENT_AMOUNT") {
        return res.status(400).json({
          success: false,
          message: "Payment amount must be greater than zero",
        });
      }
    }

    console.error("Create payment error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create payment",
    });
  }
};

// GET ALL PAYMENTS
export const getAll = async (req: Request, res: Response) => {
  try {
    const shopId = req.query.shopId as string;

    if (!shopId) {
      return res.status(400).json({
        success: false,
        message: "Shop ID is required",
      });
    }

    const payments = await getAllPayments(shopId);

    return res.status(200).json({
      success: true,
      data: payments,
    });
  } catch (error) {
    console.error("Get payments error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch payments",
    });
  }
};

// GET PAYMENTS BY REPAIR TICKET
export const getByTicket = async (req: Request, res: Response) => {
  try {
    const repairTicketId = String(req.params.id);
    const shopId = req.query.shopId as string;

    if (!shopId) {
      return res.status(400).json({
        success: false,
        message: "Shop ID is required",
      });
    }

    const payments = await getPaymentsByTicket(
      repairTicketId,
      shopId
    );

    return res.status(200).json({
      success: true,
      data: payments,
    });
  } catch (error) {
    console.error("Get ticket payments error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch ticket payments",
    });
  }
};

// GET PAYMENT SUMMARY
export const getSummary = async (req: Request, res: Response) => {
  try {
    const repairTicketId = String(req.params.id);
    const shopId = req.query.shopId as string;

    if (!shopId) {
      return res.status(400).json({
        success: false,
        message: "Shop ID is required",
      });
    }

    const summary = await getPaymentSummary(
      repairTicketId,
      shopId
    );

    if (!summary) {
      return res.status(404).json({
        success: false,
        message: "Repair ticket not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error) {
    console.error("Get payment summary error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch payment summary",
    });
  }
};
