/*
  Warnings:

  - Changed the type of `terms` on the `Invoice` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "terms",
ADD COLUMN     "terms" INTEGER NOT NULL;
