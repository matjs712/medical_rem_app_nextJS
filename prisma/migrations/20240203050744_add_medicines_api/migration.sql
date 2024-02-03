-- CreateTable
CREATE TABLE "MedicinesApi" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "indications" TEXT,
    "contraindications" TEXT,
    "description" TEXT,
    "content" INTEGER,
    "type" TEXT,
    "expires_at" TIMESTAMP(3),

    CONSTRAINT "MedicinesApi_pkey" PRIMARY KEY ("id")
);
