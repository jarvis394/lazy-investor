/*
  Warnings:

  - Added the required column `buttonText` to the `Pulse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buttonUrl` to the `Pulse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pulse" ADD COLUMN     "buttonText" TEXT NOT NULL,
ADD COLUMN     "buttonUrl" TEXT NOT NULL;
