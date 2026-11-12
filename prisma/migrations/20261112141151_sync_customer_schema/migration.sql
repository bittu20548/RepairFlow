/*
  Warnings:

  - You are about to drop the column `shopId` on the `Customer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_shopId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_repairTicketId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_shopId_fkey";

-- DropForeignKey
ALTER TABLE "RepairTicket" DROP CONSTRAINT "RepairTicket_shopId_fkey";

-- DropIndex
DROP INDEX "Customer_shopId_phone_key";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "shopId",
ADD COLUMN     "passwordHash" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Customer_phone_key" ON "Customer"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- AddForeignKey
ALTER TABLE "RepairTicket" ADD CONSTRAINT "RepairTicket_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_repairTicketId_fkey" FOREIGN KEY ("repairTicketId") REFERENCES "RepairTicket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
