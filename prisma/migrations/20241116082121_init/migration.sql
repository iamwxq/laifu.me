-- CreateTable
CREATE TABLE `tbl_post` (
    `slug` VARCHAR(191) NOT NULL,
    `hash` VARCHAR(191) NULL,
    `title` VARCHAR(191) NOT NULL,
    `words` INTEGER NOT NULL DEFAULT 0,
    `brief` VARCHAR(191) NOT NULL DEFAULT '',
    `archived` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,
    `tag_id` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_post_title_key`(`title`),
    PRIMARY KEY (`slug`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_tag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `count` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `tbl_tag_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_post` ADD CONSTRAINT `tbl_post_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `tbl_tag`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
