import type { Request, Response } from "express";

import {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from "../services/customer.service";

export const create = async (req: Request, res: Response) => {
  try {
    const { name, phone, email, address, shopId } = req.body;

    if (!name || !phone || !shopId) {
      return res.status(400).json({
        success: false,
        message: "Name, phone and shopId are required",
      });
    }

    const customer = await createCustomer({
      name,
      phone,
      email,
      address,
      shopId,
    });

    return res.status(201).json({
      success: true,
      message: "Customer created successfully",
      data: customer,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create customer",
    });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const shopId = req.query.shopId as string;

    if (!shopId) {
      return res.status(400).json({
        success: false,
        message: "shopId is required",
      });
    }

    const customers = await getAllCustomers(shopId);

    return res.status(200).json({
      success: true,
      data: customers,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch customers",
    });
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const shopId = req.query.shopId as string;
    const id = req.params.id as string;

    if (!shopId) {
      return res.status(400).json({
        success: false,
        message: "shopId is required",
      });
    }

    const customer = await getCustomerById(id, shopId);

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
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch customer",
    });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const shopId = req.query.shopId as string;
    const id = req.params.id as string;

    if (!shopId) {
      return res.status(400).json({
        success: false,
        message: "shopId is required",
      });
    }

    const result = await updateCustomer(id, shopId, req.body);

    if (result.count === 0) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    const updatedCustomer = await getCustomerById(id, shopId);

    return res.status(200).json({
      success: true,
      message: "Customer updated successfully",
      data: updatedCustomer,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update customer",
    });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const shopId = req.query.shopId as string;
    const id = req.params.id as string;

    if (!shopId) {
      return res.status(400).json({
        success: false,
        message: "shopId is required",
      });
    }

    const result = await deleteCustomer(id, shopId);

    if (result.count === 0) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Customer deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete customer",
    });
  }
};