/*
  Warnings:

  - You are about to drop the column `lastProcessedPulseId` on the `Scraper` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Scraper" DROP COLUMN "lastProcessedPulseId",
ADD COLUMN     "maxProcessedTelegramId" INTEGER NOT NULL DEFAULT -1,
ADD COLUMN     "minProcessedTelegramId" INTEGER NOT NULL DEFAULT -1;
