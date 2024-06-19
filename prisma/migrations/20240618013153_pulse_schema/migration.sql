/*
  Warnings:

  - Added the required column `goal` to the `Pulse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `investmentSuccessTime` to the `Pulse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `potential` to the `Pulse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `share` to the `Pulse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shareTag` to the `Pulse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `Pulse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pulse" ADD COLUMN     "goal" TEXT NOT NULL,
ADD COLUMN     "investmentSuccessTime" TEXT NOT NULL,
ADD COLUMN     "potential" TEXT NOT NULL,
ADD COLUMN     "share" TEXT NOT NULL,
ADD COLUMN     "shareTag" TEXT NOT NULL,
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL;
