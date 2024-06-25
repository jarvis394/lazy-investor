/*
  Warnings:

  - A unique constraint covering the columns `[telegramId]` on the table `Pulse` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Pulse_telegramId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Pulse_telegramId_key" ON "Pulse"("telegramId" DESC);
