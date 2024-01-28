/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Registers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Registers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Registers" DROP CONSTRAINT "Registers_RemedieId_fkey";

-- DropIndex
DROP INDEX "Registers_RemedieId_key";

-- AlterTable
ALTER TABLE "Registers" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Remedies" ADD COLUMN     "registersId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Registers_userId_key" ON "Registers"("userId");

-- AddForeignKey
ALTER TABLE "Remedies" ADD CONSTRAINT "Remedies_registersId_fkey" FOREIGN KEY ("registersId") REFERENCES "Registers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registers" ADD CONSTRAINT "Registers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
