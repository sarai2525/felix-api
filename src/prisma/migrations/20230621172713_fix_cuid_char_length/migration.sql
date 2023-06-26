/*
  Warnings:

  - You are about to alter the column `publicId` on the `Plan` table. The data in that column could be lost. The data in that column will be cast from `Char(36)` to `Char(25)`.
  - You are about to alter the column `publicId` on the `Reservation` table. The data in that column could be lost. The data in that column will be cast from `Char(36)` to `Char(25)`.
  - You are about to alter the column `publicId` on the `Studio` table. The data in that column could be lost. The data in that column will be cast from `Char(36)` to `Char(25)`.
  - You are about to alter the column `publicId` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Char(36)` to `Char(25)`.

*/
-- AlterTable
ALTER TABLE `Plan` MODIFY `publicId` CHAR(25) NOT NULL;

-- AlterTable
ALTER TABLE `Reservation` MODIFY `publicId` CHAR(25) NOT NULL;

-- AlterTable
ALTER TABLE `Studio` MODIFY `publicId` CHAR(25) NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `publicId` CHAR(25) NOT NULL;
