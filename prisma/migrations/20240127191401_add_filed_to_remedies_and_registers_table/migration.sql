-- AlterTable
ALTER TABLE "Remedies" ADD COLUMN     "contraindications" TEXT,
ADD COLUMN     "indications" TEXT,
ADD COLUMN     "start_at" TIMESTAMP(3),
ADD COLUMN     "time" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Registers" (
    "id" TEXT NOT NULL,
    "RemedieId" TEXT NOT NULL,
    "dosis" INTEGER NOT NULL,
    "start_at" TIMESTAMP(3),
    "time" TIMESTAMP(3),

    CONSTRAINT "Registers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Registers_RemedieId_key" ON "Registers"("RemedieId");

-- AddForeignKey
ALTER TABLE "Registers" ADD CONSTRAINT "Registers_RemedieId_fkey" FOREIGN KEY ("RemedieId") REFERENCES "Remedies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
