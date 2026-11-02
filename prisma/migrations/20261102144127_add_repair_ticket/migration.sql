-- CreateEnum
CREATE TYPE "RepairStatus" AS ENUM ('RECEIVED', 'DIAGNOSING', 'WAITING_FOR_APPROVAL', 'APPROVED', 'IN_PROGRESS', 'ON_HOLD', 'COMPLETED', 'READY_FOR_PICKUP', 'DELIVERED', 'CANCELLED');

-- CreateTable
CREATE TABLE "RepairTicket" (
    "id" TEXT NOT NULL,
    "ticketNumber" TEXT NOT NULL,
    "deviceType" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "imei" TEXT,
    "problem" TEXT NOT NULL,
    "status" "RepairStatus" NOT NULL DEFAULT 'RECEIVED',
    "estimatedCost" DOUBLE PRECISION,
    "finalCost" DOUBLE PRECISION,
    "shopId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RepairTicket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RepairTicket_shopId_status_idx" ON "RepairTicket"("shopId", "status");

-- CreateIndex
CREATE INDEX "RepairTicket_customerId_idx" ON "RepairTicket"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "RepairTicket_shopId_ticketNumber_key" ON "RepairTicket"("shopId", "ticketNumber");

-- AddForeignKey
ALTER TABLE "RepairTicket" ADD CONSTRAINT "RepairTicket_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RepairTicket" ADD CONSTRAINT "RepairTicket_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
