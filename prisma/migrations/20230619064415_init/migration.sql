-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `publicId` CHAR(36) NOT NULL,
    `firstName` CHAR(36) NOT NULL,
    `lastName` CHAR(36) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phoneNumber` CHAR(36) NOT NULL,
    `type` ENUM('GUEST', 'RELATIVES', 'STAFF') NOT NULL DEFAULT 'GUEST',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_publicId_key`(`publicId`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Studio` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `publicId` CHAR(36) NOT NULL,
    `name` CHAR(36) NOT NULL,
    `status` TINYINT NOT NULL,

    UNIQUE INDEX `Studio_publicId_key`(`publicId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Plan` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `publicId` CHAR(36) NOT NULL,
    `name` CHAR(70) NOT NULL,
    `nameJa` CHAR(70) NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `studioId` INTEGER NOT NULL,

    UNIQUE INDEX `Plan_publicId_key`(`publicId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reservation` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `publicId` CHAR(36) NOT NULL,
    `planId` INTEGER NOT NULL,
    `dateIn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dateEnd` DATETIME(3) NOT NULL,
    `status` ENUM('RESERVED', 'CANCELED', 'PAID', 'PAID_CANCEL_FEE') NOT NULL DEFAULT 'RESERVED',
    `studioId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdBy` VARCHAR(191) NULL,
    `updatedBy` VARCHAR(191) NULL,

    UNIQUE INDEX `Reservation_publicId_key`(`publicId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Plan` ADD CONSTRAINT `Plan_studioId_fkey` FOREIGN KEY (`studioId`) REFERENCES `Studio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_planId_fkey` FOREIGN KEY (`planId`) REFERENCES `Plan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_studioId_fkey` FOREIGN KEY (`studioId`) REFERENCES `Studio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
