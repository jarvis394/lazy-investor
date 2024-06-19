-- CreateTable
CREATE TABLE "Pulse" (
    "id" SERIAL NOT NULL,
    "telegramId" INTEGER NOT NULL,

    CONSTRAINT "Pulse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scraper" (
    "name" TEXT NOT NULL DEFAULT 'main',
    "lastProcessedPulseId" INTEGER NOT NULL,

    CONSTRAINT "Scraper_pkey" PRIMARY KEY ("name")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pulse_telegramId_key" ON "Pulse"("telegramId");
