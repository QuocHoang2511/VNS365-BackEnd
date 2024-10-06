-- AlterTable
ALTER TABLE "Shop" ADD COLUMN     "provinceId" INTEGER;

-- CreateTable
CREATE TABLE "ShopFood" (
    "id" SERIAL NOT NULL,
    "food" TEXT NOT NULL,
    "shop_id" INTEGER NOT NULL,

    CONSTRAINT "ShopFood_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Province"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShopFood" ADD CONSTRAINT "ShopFood_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
