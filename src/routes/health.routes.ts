import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

router.get("/db", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return res.json({
      success: true,
      message: "Neon database connected successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

export default router;