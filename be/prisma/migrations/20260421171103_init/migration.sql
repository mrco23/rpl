/*
  Warnings:

  - You are about to drop the column `id_pendaftar` on the `pengumuman` table. All the data in the column will be lost.
  - You are about to drop the column `gambar` on the `program_unggulan` table. All the data in the column will be lost.
  - You are about to drop the column `nama` on the `program_unggulan` table. All the data in the column will be lost.
  - Added the required column `nama_pu` to the `program_unggulan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `pengumuman` DROP FOREIGN KEY `pengumuman_id_pendaftar_fkey`;

-- AlterTable
ALTER TABLE `pendaftar` ADD COLUMN `id_verifikator` INTEGER NULL;

-- AlterTable
ALTER TABLE `pengumuman` DROP COLUMN `id_pendaftar`;

-- AlterTable
ALTER TABLE `program_unggulan` DROP COLUMN `gambar`,
    DROP COLUMN `nama`,
    ADD COLUMN `gambar_pu` VARCHAR(191) NULL,
    ADD COLUMN `nama_pu` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `pengumuman_pendaftar` (
    `id_pengumuman_pendaftar` INTEGER NOT NULL AUTO_INCREMENT,
    `id_pendaftar` INTEGER NOT NULL,
    `id_pengumuman` INTEGER NOT NULL,

    INDEX `pengumuman_pendaftar_id_pendaftar_idx`(`id_pendaftar`),
    INDEX `pengumuman_pendaftar_id_pengumuman_idx`(`id_pengumuman`),
    PRIMARY KEY (`id_pengumuman_pendaftar`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `pendaftar_id_verifikator_idx` ON `pendaftar`(`id_verifikator`);

-- AddForeignKey
ALTER TABLE `pengumuman_pendaftar` ADD CONSTRAINT `pengumuman_pendaftar_id_pendaftar_fkey` FOREIGN KEY (`id_pendaftar`) REFERENCES `pendaftar`(`id_pendaftar`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pengumuman_pendaftar` ADD CONSTRAINT `pengumuman_pendaftar_id_pengumuman_fkey` FOREIGN KEY (`id_pengumuman`) REFERENCES `pengumuman`(`id_pengumuman`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pendaftar` ADD CONSTRAINT `pendaftar_id_verifikator_fkey` FOREIGN KEY (`id_verifikator`) REFERENCES `verifikator`(`id_verifikator`) ON DELETE SET NULL ON UPDATE CASCADE;
