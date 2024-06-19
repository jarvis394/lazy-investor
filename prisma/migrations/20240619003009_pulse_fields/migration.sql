-- AlterTable
ALTER TABLE "Pulse" ADD COLUMN     "parsedPotentialPercentage" INTEGER,
ALTER COLUMN "shareTag" DROP NOT NULL,
ALTER COLUMN "potentialPercentage" SET DATA TYPE TEXT;
