/*
  Warnings:

  - You are about to alter the column `status` on the `Studio` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `Studio` MODIFY `status` ENUM('AVAILABLE', 'UNAVAILABLE') NOT NULL;
