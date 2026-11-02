
import { prisma } from "../lib/prisma";

// CREATE PAYMENT
export const createPayment = async (data: {
  amount: number;
  method: "CASH" | "UPI" | "CARD" | "BANK_TRANSFER";
  transactionId?: string;
  note?: string;
  shopId: string;
  repairTicketId: string;
}) => {
  return prisma.$transaction(async (tx) => {
    // Verify that the repair ticket belongs to this shop
    const ticket = await tx.repairTicket.findFirst({
      where: {
        id: data.repairTicketId,
        shopId: data.shopId,
      },
    });

    if (!ticket) {
      throw new Error("REPAIR_TICKET_NOT_FOUND");
    }

    // Calculate previous successful payments
    const paymentSummary = await tx.payment.aggregate({
      where: {
        repairTicketId: data.repairTicketId,
        shopId: data.shopId,
        status: "SUCCESS",
      },
      _sum: {
        amount: true,
      },
    });

    const alreadyPaid = paymentSummary._sum.amount ?? 0;

    const repairCost = ticket.finalCost ?? ticket.estimatedCost;

    if (repairCost === null) {
      throw new Error("REPAIR_COST_NOT_SET");
    }

    if (repairCost < 0 || alreadyPaid + data.amount > repairCost) {
      throw new Error("PAYMENT_EXCEEDS_REPAIR_COST");
    }

    if (!Number.isFinite(data.amount) || data.amount <= 0) {
      throw new Error("INVALID_PAYMENT_AMOUNT");
    }

    // Create payment
    return tx.payment.create({
      data: {
        amount: data.amount,
        method: data.method,
        transactionId: data.transactionId,
        note: data.note,
        shopId: data.shopId,
        repairTicketId: data.repairTicketId,
      },
    });
  });
};

// GET ALL PAYMENTS FOR A SHOP
export const getAllPayments = (shopId: string) => {
  return prisma.payment.findMany({
    where: { shopId },
    include: {
      repairTicket: {
        include: {
          customer: true,
        },
      },
    },
    orderBy: {
      paidAt: "desc",
    },
  });
};

// GET PAYMENTS FOR ONE REPAIR TICKET
export const getPaymentsByTicket = (
  repairTicketId: string,
  shopId: string
) => {
  return prisma.payment.findMany({
    where: {
      repairTicketId,
      shopId,
    },
    orderBy: {
      paidAt: "desc",
    },
  });
};

// GET PAYMENT SUMMARY
export const getPaymentSummary = async (
  repairTicketId: string,
  shopId: string
) => {
  const ticket = await prisma.repairTicket.findFirst({
    where: {
      id: repairTicketId,
      shopId,
    },
  });

  if (!ticket) {
    return null;
  }

  const paymentSummary = await prisma.payment.aggregate({
    where: {
      repairTicketId,
      shopId,
      status: "SUCCESS",
    },
    _sum: {
      amount: true,
    },
  });

  const totalPaid = paymentSummary._sum.amount ?? 0;
  const repairCost = ticket.finalCost ?? ticket.estimatedCost;

  return {
    repairCost,
    totalPaid,
    remainingBalance:
      repairCost === null ? null : repairCost - totalPaid,
  };
};
