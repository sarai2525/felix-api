/*
  Warnings:

  - You are about to alter the column `dateEnd` on the `Plan` table. The data in that column could be lost. The data in that column will be cast from `Time(0)` to `Timestamp`.
  - You are about to alter the column `dateIn` on the `Plan` table. The data in that column could be lost. The data in that column will be cast from `Time(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `Plan` MODIFY `dateEnd` TIMESTAMP NULL,
    MODIFY `dateIn` TIMESTAMP NULL;
