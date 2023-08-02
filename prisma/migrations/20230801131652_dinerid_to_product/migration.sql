/*
  Warnings:

  - Added the required column `dinerId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "dinerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_dinerId_fkey" FOREIGN KEY ("dinerId") REFERENCES "Diner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
