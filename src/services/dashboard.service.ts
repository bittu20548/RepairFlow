
import { prisma } from "../lib/prisma";

export const getDashboardStats = async (shopId: string) => {
  // Run independent database queries together
  const [
    totalCustomers,
    totalTickets,
    pendingRepairs,
    completedRepairs,
    paymentSummary,
    recentTickets,
    ticketsWithCost,
  ] = await Promise.all([
    // Total customers
    prisma.customer.count({
      where: { shopId },
    }),

    // Total repair tickets
    prisma.repairTicket.count({
      where: { shopId },
    }),

    // Pending repairs
    prisma.repairTicket.count({
      where: {
        shopId,
        status: {
          notIn: ["COMPLETED", "READY_FOR_PICKUP", "DELIVERED", "CANCELLED"],
        },
      },
    }),

    // Completed repairs
    prisma.repairTicket.count({
      where: {
        shopId,
        status: {
          in: ["COMPLETED", "READY_FOR_PICKUP", "DELIVERED"],
        },
      },
    }),

    // Total successful payments
    prisma.payment.aggregate({
      where: {
        shopId,
        status: "SUCCESS",
      },
      _sum: {
        amount: true,
      },
    }),

    // Latest 5 repair tickets
    prisma.repairTicket.findMany({
      where: { shopId },
      include: {
        customer: {
          select: {
            name: true,
            phone: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    }),

    // Repair tickets with their costs
    prisma.repairTicket.findMany({
      where: { shopId },
      select: {
        id: true,
        estimatedCost: true,
        finalCost: true,
      },
    }),
  ]);

  // Calculate outstanding balance
  const totalOutstanding = ticketsWithCost.reduce(
    (total, ticket) => {
      const repairCost = ticket.finalCost ?? ticket.estimatedCost;

      return total + (repairCost ?? 0);
    },
    0
  );

  const totalPaid = paymentSummary._sum.amount ?? 0;

  return {
    totalCustomers,
    totalTickets,
    pendingRepairs,
    completedRepairs,
    totalPaid,
    totalOutstanding: Math.max(0, totalOutstanding - totalPaid),
    recentTickets,
  };
};
