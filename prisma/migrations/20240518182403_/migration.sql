/*
  Warnings:

  - You are about to drop the column `provinceId` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `regionId` on the `Shop` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Shop" DROP CONSTRAINT "Shop_provinceId_fkey";

-- DropForeignKey
ALTER TABLE "Shop" DROP CONSTRAINT "Shop_regionId_fkey";

-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "provinceId",
DROP COLUMN "regionId",
ADD COLUMN     "province_id" INTEGER,
ADD COLUMN     "region_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "Region"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "Province"("id") ON DELETE SET NULL ON UPDATE CASCADE;
