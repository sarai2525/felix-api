/*
  Warnings:

  - You are about to drop the column `studioId` on the `Reservation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Reservation` DROP FOREIGN KEY `Reservation_studioId_fkey`;

-- AlterTable
ALTER TABLE `Reservation` DROP COLUMN `studioId`;

-- AlterTable
ALTER TABLE `User` MODIFY `type` ENUM('GUEST', 'RELATIVES', 'STAFF', 'ADMIN') NOT NULL DEFAULT 'GUEST';
