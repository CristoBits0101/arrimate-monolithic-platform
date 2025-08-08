/*
  Warnings:

  - You are about to drop the column `cityId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `countryId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `zipCodeId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `City` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Country` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ZipCode` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[prefix]` on the table `PhonePrefix` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "City" DROP CONSTRAINT "City_countryId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_cityId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_countryId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_zipCodeId_fkey";

-- DropForeignKey
ALTER TABLE "ZipCode" DROP CONSTRAINT "ZipCode_cityId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "cityId",
DROP COLUMN "countryId",
DROP COLUMN "zipCodeId",
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "zipCode" TEXT,
ALTER COLUMN "interests" DROP NOT NULL,
ALTER COLUMN "interests" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "City";

-- DropTable
DROP TABLE "Country";

-- DropTable
DROP TABLE "ZipCode";

-- CreateIndex
CREATE UNIQUE INDEX "PhonePrefix_prefix_key" ON "PhonePrefix"("prefix");
