import { prisma } from "../lib/prisma";

export const createCustomer = (data: {
  name: string;
  phone: string;
  email?: string;
  address?: string;
  shopId: string;
}) => {
  return prisma.customer.create({
    data,
  });
};

export const getAllCustomers = (shopId: string) => {
  return prisma.customer.findMany({
    where: { shopId },
    orderBy: { createdAt: "desc" },
  });
};

export const getCustomerById = (id: string, shopId: string) => {
  return prisma.customer.findFirst({
    where: { id, shopId },
  });
};

export const updateCustomer = (
  id: string,
  shopId: string,
  data: {
    name?: string;
    phone?: string;
    email?: string;
    address?: string;
  }
) => {
  return prisma.customer.updateMany({
    where: { id, shopId },
    data,
  });
};

export const deleteCustomer = (id: string, shopId: string) => {
  return prisma.customer.deleteMany({
    where: { id, shopId },
  });
};