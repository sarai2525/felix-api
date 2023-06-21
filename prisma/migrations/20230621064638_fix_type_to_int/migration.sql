/*
  Warnings:

  - The `dateEnd` column on the `Plan` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `dateIn` column on the `Plan` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE `Plan` DROP COLUMN `dateEnd`,
    ADD COLUMN `dateEnd` INTEGER NULL,
    DROP COLUMN `dateIn`,
    ADD COLUMN `dateIn` INTEGER NULL;
