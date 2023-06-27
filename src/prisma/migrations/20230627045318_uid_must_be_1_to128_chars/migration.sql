/*
  Warnings:

  - You are about to alter the column `publicId` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(128)`.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `publicId` VARCHAR(128) NOT NULL;
