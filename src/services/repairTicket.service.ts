
import { prisma } from "../lib/prisma";
import { RepairStatus, type Prisma } from "../../generated/prisma/client";

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

// UPDATE REPAIR TICKET + SAVE STATUS HISTORY
export const updateRepairTicket = async (
  id: string,
  shopId: string,
  data: Prisma.RepairTicketUpdateManyMutationInput & {
    note?: string;
  }
) => {
  return prisma.$transaction(async (tx) => {
    // 1. Find existing ticket
    const existingTicket = await tx.repairTicket.findFirst({
      where: {
        id,
        shopId,
      },
    });

    if (!existingTicket) {
      return null;
    }

    // 2. Separate note from ticket data
    const { note, ...ticketData } = data;

    // 3. Update ticket
    const updatedTicket = await tx.repairTicket.update({
      where: { id },
      data: ticketData,
    });

    // 4. Save history only if status changed
    if (
      data.status &&
      data.status !== existingTicket.status
    ) {
      await tx.repairStatusHistory.create({
        data: {
          repairTicketId: id,
          oldStatus: existingTicket.status,
          newStatus: data.status as RepairStatus,
          note,
        },
      });
    }

    return updatedTicket;
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
// GET REPAIR TICKET STATUS HISTORY
export const getRepairStatusHistory = (
  repairTicketId: string
) => {
  return prisma.repairStatusHistory.findMany({
    where: {
      repairTicketId,
    },
    orderBy: {
      changedAt: "desc",
    },
  });
};
