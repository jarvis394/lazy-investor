/*
  Warnings:

  - You are about to drop the column `potential` on the `Pulse` table. All the data in the column will be lost.
  - Added the required column `potentialPercentage` to the `Pulse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pulse" DROP COLUMN "potential",
ADD COLUMN     "potentialPercentage" INTEGER NOT NULL;
