
import { Router } from "express";

import {
  create,
  getAll,
  getByTicket,
  getSummary,
} from "../controllers/payment.controller";

const router = Router();

// Create payment
router.post("/", create);

// Get all payments for a shop
router.get("/", getAll);

// Get payment history for a repair ticket
router.get("/ticket/:id", getByTicket);

// Get payment summary for a repair ticket
router.get("/ticket/:id/summary", getSummary);

export default router;
