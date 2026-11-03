
import type { Request, Response } from "express";
import { getDashboardStats } from "../services/dashboard.service";

// GET SHOP DASHBOARD
export const getDashboard = async (
  req: Request,
  res: Response
) => {
  try {
    const shopId = req.query.shopId as string;

    if (!shopId) {
      return res.status(400).json({
        success: false,
        message: "Shop ID is required",
      });
    }

    const dashboard = await getDashboardStats(shopId);

    return res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully",
      data: dashboard,
    });
  } catch (error) {
    console.error("Dashboard error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data",
    });
  }
};
