import type { Request, Response } from "express";
import { createShop } from "../services/shop.service";

export const create = async (req: Request, res: Response) => {
  try {
    const { name, email, phone } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Shop name is required",
      });
    }

    const shop = await createShop({ name, email, phone });

    return res.status(201).json({
      success: true,
      message: "Shop created successfully",
      data: shop,
    });
  } catch (error) {
    console.error("Create shop error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create shop",
    });
  }
};
