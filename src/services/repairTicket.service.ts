
import { prisma } from "../lib/prisma";
import type { Prisma } from "../../generated/prisma/client";

// CREATE REPAIR TICKET
export const createRepairTicket = (
  data: Prisma.RepairTicketUncheckedCreateInput
) => {
  return prisma.repairTicket.create({
    data,
  });
};

// GET ALL REPAIR TICKETS
export const getAllRepairTickets = (shopId: string) => {
  return prisma.repairTicket.findMany({
    where: { shopId },
    include: {
      customer: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// GET SINGLE REPAIR TICKET
export const getRepairTicketById = (
  id: string,
  shopId: string
) => {
  return prisma.repairTicket.findFirst({
    where: { id, shopId },
    include: {
      customer: true,
    },
  });
};

// UPDATE REPAIR TICKET
export const updateRepairTicket = (
  id: string,
  shopId: string,
  data: Prisma.RepairTicketUpdateManyMutationInput
) => {
  return prisma.repairTicket.updateMany({
    where: { id, shopId },
    data,
  });
};

// DELETE REPAIR TICKET
export const deleteRepairTicket = (
  id: string,
  shopId: string
) => {
  return prisma.repairTicket.deleteMany({
    where: { id, shopId },
  });
};
