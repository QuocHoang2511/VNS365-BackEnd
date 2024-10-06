/*
  Warnings:

  - You are about to drop the column `province_id` on the `Dish` table. All the data in the column will be lost.
  - You are about to drop the column `province_id` on the `Shop` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Dish" DROP CONSTRAINT "Dish_province_id_fkey";

-- DropForeignKey
ALTER TABLE "Shop" DROP CONSTRAINT "Shop_province_id_fkey";

-- AlterTable
ALTER TABLE "Dish" DROP COLUMN "province_id";

-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "province_id";
