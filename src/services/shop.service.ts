import { prisma } from "../lib/prisma";

export const createShop = (data: {
  name: string;
  email?: string;
  phone?: string;
}) => {
  return prisma.shop.create({
    data,
  });
};
