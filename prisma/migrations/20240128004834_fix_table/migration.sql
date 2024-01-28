/*
  Warnings:

  - You are about to drop the column `RemedieId` on the `Registers` table. All the data in the column will be lost.
  - Added the required column `remediesId` to the `Registers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Registers" DROP COLUMN "RemedieId",
ADD COLUMN     "remediesId" TEXT NOT NULL;
