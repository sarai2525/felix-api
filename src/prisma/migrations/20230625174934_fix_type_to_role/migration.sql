/*
  Warnings:

  - You are about to drop the column `type` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `type`,
    ADD COLUMN `role` ENUM('GUEST', 'RELATIVES', 'STAFF', 'ADMIN') NOT NULL DEFAULT 'GUEST',
    MODIFY `phoneNumber` VARCHAR(36) NULL;
