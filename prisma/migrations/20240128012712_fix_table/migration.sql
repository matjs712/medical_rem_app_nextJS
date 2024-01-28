/*
  Warnings:

  - You are about to drop the `_RegistersToRemedies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_RegistersToRemedies" DROP CONSTRAINT "_RegistersToRemedies_A_fkey";

-- DropForeignKey
ALTER TABLE "_RegistersToRemedies" DROP CONSTRAINT "_RegistersToRemedies_B_fkey";

-- DropTable
DROP TABLE "_RegistersToRemedies";

-- AddForeignKey
ALTER TABLE "Registers" ADD CONSTRAINT "Registers_remediesId_fkey" FOREIGN KEY ("remediesId") REFERENCES "Remedies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
