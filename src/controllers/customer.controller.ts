import type { Request, Response } from "express";

import {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from "../services/customer.service";

export const create = (req: Request, res: Response) => {
  const { name, phone, email, address } = req.body;

  if (!name || !phone) {
    return res.status(400).json({
      success: false,
      message: "Name and phone are required",
    });
  }

  const customer = createCustomer({ name, phone, email, address });

  return res.status(201).json({
    success: true,
    message: "Customer created successfully",
    data: customer,
  });
};

export const getAll = (_req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    data: getAllCustomers(),
  });
};

export const getOne = (req: Request, res: Response) => {
  const customer = getCustomerById(req.params.id as string);

  if (!customer) {
    return res.status(404).json({
      success: false,
      message: "Customer not found",
    });
  }

  return res.status(200).json({
    success: true,
    data: customer,
  });
};

export const update = (req: Request, res: Response) => {
  const customer = updateCustomer(
    req.params.id as string,
    req.body
  );

  if (!customer) {
    return res.status(404).json({
      success: false,
      message: "Customer not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Customer updated successfully",
    data: customer,
  });
};

export const remove = (req: Request, res: Response) => {
  const deleted = deleteCustomer(req.params.id as string);

  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: "Customer not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Customer deleted successfully",
  });
};