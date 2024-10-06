/*
  Warnings:

  - You are about to drop the column `post_id` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `dish_id` on the `Story` table. All the data in the column will be lost.
  - You are about to drop the `Dish` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `story_id` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cooking_method` to the `Story` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Story` table without a default value. This is not possible if the table is not empty.
  - Added the required column `featured_image` to the `Story` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region_id` to the `Story` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Story` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_post_id_fkey";

-- DropForeignKey
ALTER TABLE "Dish" DROP CONSTRAINT "Dish_region_id_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Story" DROP CONSTRAINT "Story_dish_id_fkey";

-- DropIndex
DROP INDEX "Story_dish_id_key";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "post_id",
ADD COLUMN     "story_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Shop" ADD COLUMN     "rating" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Story" DROP COLUMN "dish_id",
ADD COLUMN     "cooking_method" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "featured_image" TEXT NOT NULL,
ADD COLUMN     "region_id" INTEGER NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Dish";

-- DropTable
DROP TABLE "Post";

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "Story"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
