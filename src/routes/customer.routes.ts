
import { Router } from "express";

import { validate } from "../middleware/validate.middleware";
import { createCustomerSchema } from "../schemas/customer.schema";

import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "../controllers/customer.controller";

const router = Router();

// Create customer with validation
router.post(
  "/",
  validate(createCustomerSchema),
  create
);

// Get all customers
router.get("/", getAll);

// Get customer by ID
router.get("/:id", getOne);

// Update customer
router.patch("/:id", update);

// Delete customer
router.delete("/:id", remove);

export default router;
