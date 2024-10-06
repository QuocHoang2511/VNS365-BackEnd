/*
  Warnings:

  - Made the column `province_id` on table `Shop` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Shop" DROP CONSTRAINT "Shop_province_id_fkey";

-- AlterTable
ALTER TABLE "Shop" ALTER COLUMN "province_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "Province"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
