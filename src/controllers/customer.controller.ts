
import type { Request, Response } from "express";

import {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from "../services/customer.service";

// CREATE CUSTOMER
export const create = async (req: Request, res: Response) => {
  try {
    const { name, phone, email, address } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name and phone are required",
      });
    }

    const customer = await createCustomer({
      name,
      phone,
      email,
      address,
    });

    return res.status(201).json({
      success: true,
      message: "Customer created successfully",
      data: customer,
    });
  } catch (error) {
    console.error("Create customer error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create customer",
    });
  }
};

// GET ALL CUSTOMERS
export const getAll = async (_req: Request, res: Response) => {
  try {
    const customers = await getAllCustomers();

    return res.status(200).json({
      success: true,
      data: customers,
    });
  } catch (error) {
    console.error("Get customers error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch customers",
    });
  }
};

// GET CUSTOMER BY ID
export const getOne = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const customer = await getCustomerById(id);

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
  } catch (error) {
    console.error("Get customer error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch customer",
    });
  }
};

// UPDATE CUSTOMER
export const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const updatedCustomer = await updateCustomer(id, req.body);

    return res.status(200).json({
      success: true,
      message: "Customer updated successfully",
      data: updatedCustomer,
    });
  } catch (error) {
    console.error("Update customer error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update customer",
    });
  }
};

// DELETE CUSTOMER
export const remove = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    await deleteCustomer(id);

    return res.status(200).json({
      success: true,
      message: "Customer deleted successfully",
    });
  } catch (error) {
    console.error("Delete customer error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete customer",
    });
  }
};
