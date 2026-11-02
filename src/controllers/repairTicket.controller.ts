
import type { Request, Response } from "express";

import {
  createRepairTicket,
  getAllRepairTickets,
  getRepairTicketById,
  updateRepairTicket,
  deleteRepairTicket,
  getRepairStatusHistory,
} from "../services/repairTicket.service";

// CREATE REPAIR TICKET
export const create = async (req: Request, res: Response) => {
  try {
    const {
      ticketNumber,
      deviceType,
      brand,
      model,
      imei,
      problem,
      estimatedCost,
      shopId,
      customerId,
    } = req.body;

    if (
      !ticketNumber ||
      !deviceType ||
      !brand ||
      !model ||
      !problem ||
      !shopId ||
      !customerId
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    const ticket = await createRepairTicket({
      ticketNumber,
      deviceType,
      brand,
      model,
      imei,
      problem,
      estimatedCost,
      shopId,
      customerId,
    });

    return res.status(201).json({
      success: true,
      message: "Repair ticket created successfully",
      data: ticket,
    });
  } catch (error) {
    console.error("Create repair ticket error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create repair ticket",
    });
  }
};

// GET ALL REPAIR TICKETS
export const getAll = async (req: Request, res: Response) => {
  try {
    const shopId = req.query.shopId as string;

    if (!shopId) {
      return res.status(400).json({
        success: false,
        message: "Shop ID is required",
      });
    }

    const tickets = await getAllRepairTickets(shopId);

    return res.status(200).json({
      success: true,
      data: tickets,
    });
  } catch (error) {
    console.error("Get repair tickets error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch repair tickets",
    });
  }
};

// GET SINGLE REPAIR TICKET
export const getOne = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const shopId = req.query.shopId as string;

    if (!shopId) {
      return res.status(400).json({
        success: false,
        message: "Shop ID is required",
      });
    }

    const ticket = await getRepairTicketById(id, shopId);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Repair ticket not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    console.error("Get repair ticket error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch repair ticket",
    });
  }
};

// UPDATE REPAIR TICKET
export const update = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const shopId = req.query.shopId as string;

    if (!shopId) {
      return res.status(400).json({
        success: false,
        message: "Shop ID is required",
      });
    }

    const result = await updateRepairTicket(id, shopId, req.body);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Repair ticket not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Repair ticket updated successfully",
      data: result,
    });
  } catch (error) {
    console.error("Update repair ticket error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update repair ticket",
    });
  }
};

// DELETE REPAIR TICKET
export const remove = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const shopId = req.query.shopId as string;

    if (!shopId) {
      return res.status(400).json({
        success: false,
        message: "Shop ID is required",
      });
    }

    const result = await deleteRepairTicket(id, shopId);

    if (result.count === 0) {
      return res.status(404).json({
        success: false,
        message: "Repair ticket not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Repair ticket deleted successfully",
    });
  } catch (error) {
    console.error("Delete repair ticket error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete repair ticket",
    });
  }
};

// GET REPAIR TICKET STATUS HISTORY
export const getStatusHistory = async (
  req: Request,
  res: Response
) => {
  try {
    const repairTicketId = String(req.params.id);
    const shopId = req.query.shopId as string;

    if (!shopId) {
      return res.status(400).json({
        success: false,
        message: "Shop ID is required",
      });
    }

    // Verify that the ticket belongs to this shop
    const ticket = await getRepairTicketById(repairTicketId, shopId);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Repair ticket not found",
      });
    }

    const history = await getRepairStatusHistory(repairTicketId);

    return res.status(200).json({
      success: true,
      data: history,
    });
  } catch (error) {
    console.error("Get repair status history error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch repair status history",
    });
  }
};
