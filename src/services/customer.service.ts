
import { prisma } from "../lib/prisma";

// Create a customer
export const createCustomer = (data: {
  name: string;
  phone: string;
  email?: string;
  address?: string;
}) => {
  return prisma.customer.create({
    data: {
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      address: data.address,
    },
  });
};

// Get all customers
export const getAllCustomers = () => {
  return prisma.customer.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

// Get customer by ID
export const getCustomerById = (id: string) => {
  return prisma.customer.findUnique({
    where: { id },
  });
};

// Update customer
export const updateCustomer = (
  id: string,
  data: {
    name?: string;
    phone?: string;
    email?: string;
    address?: string;
  }
) => {
  return prisma.customer.update({
    where: { id },
    data: {
      ...data,
      email: data.email === "" ? null : data.email,
    },
  });
};

// Delete customer
export const deleteCustomer = (id: string) => {
  return prisma.customer.delete({
    where: { id },
  });
};
