/*
  Warnings:

  - You are about to drop the column `registersId` on the `Remedies` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Remedies" DROP CONSTRAINT "Remedies_registersId_fkey";

-- AlterTable
ALTER TABLE "Remedies" DROP COLUMN "registersId";

-- CreateTable
CREATE TABLE "_RegistersToRemedies" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RegistersToRemedies_AB_unique" ON "_RegistersToRemedies"("A", "B");

-- CreateIndex
CREATE INDEX "_RegistersToRemedies_B_index" ON "_RegistersToRemedies"("B");

-- AddForeignKey
ALTER TABLE "_RegistersToRemedies" ADD CONSTRAINT "_RegistersToRemedies_A_fkey" FOREIGN KEY ("A") REFERENCES "Registers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RegistersToRemedies" ADD CONSTRAINT "_RegistersToRemedies_B_fkey" FOREIGN KEY ("B") REFERENCES "Remedies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
