/*
  Warnings:

  - You are about to drop the column `workerId` on the `Texts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[jobId]` on the table `Texts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `jobId` to the `Texts` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Texts_workerId_key";

-- AlterTable
ALTER TABLE "Texts" DROP COLUMN "workerId",
ADD COLUMN     "jobId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Texts_jobId_key" ON "Texts"("jobId");
