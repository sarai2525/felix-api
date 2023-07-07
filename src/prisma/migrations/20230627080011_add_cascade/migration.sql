-- DropForeignKey
ALTER TABLE `Plan` DROP FOREIGN KEY `Plan_studioId_fkey`;

-- AddForeignKey
ALTER TABLE `Plan` ADD CONSTRAINT `Plan_studioId_fkey` FOREIGN KEY (`studioId`) REFERENCES `Studio`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
