/*
  Warnings:

  - You are about to drop the column `id_sekolah` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `id_sekolah` on the `berita` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `berita` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `VarChar(191)`.
  - You are about to alter the column `status_verifikasi` on the `dokumen` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(3))` to `VarChar(191)`.
  - You are about to drop the column `id_sekolah` on the `ekstrakurikuler` table. All the data in the column will be lost.
  - You are about to drop the column `id_sekolah` on the `fasilitas` table. All the data in the column will be lost.
  - You are about to drop the column `id_sekolah` on the `pendaftar` table. All the data in the column will be lost.
  - You are about to alter the column `jenis_kelamin` on the `pendaftar` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `VarChar(191)`.
  - You are about to alter the column `status_pendaftaran` on the `pendaftar` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(4))` to `VarChar(191)`.
  - You are about to drop the column `id_sekolah` on the `pengumuman` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `pengumuman` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.
  - You are about to drop the column `id_sekolah` on the `prestasi` table. All the data in the column will be lost.
  - You are about to drop the column `id_sekolah` on the `program_unggulan` table. All the data in the column will be lost.
  - You are about to drop the column `id_sekolah` on the `verifikator` table. All the data in the column will be lost.
  - You are about to drop the `kontak_sekolah` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profil_sekolah` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `id_admin` on table `berita` required. This step will fail if there are existing NULL values in that column.
  - Made the column `id_admin` on table `ekstrakurikuler` required. This step will fail if there are existing NULL values in that column.
  - Made the column `id_admin` on table `fasilitas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `id_admin` on table `pengumuman` required. This step will fail if there are existing NULL values in that column.
  - Made the column `id_admin` on table `prestasi` required. This step will fail if there are existing NULL values in that column.
  - Made the column `id_admin` on table `program_unggulan` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `admin` DROP FOREIGN KEY `admin_id_sekolah_fkey`;

-- DropForeignKey
ALTER TABLE `berita` DROP FOREIGN KEY `berita_id_admin_fkey`;

-- DropForeignKey
ALTER TABLE `berita` DROP FOREIGN KEY `berita_id_sekolah_fkey`;

-- DropForeignKey
ALTER TABLE `ekstrakurikuler` DROP FOREIGN KEY `ekstrakurikuler_id_admin_fkey`;

-- DropForeignKey
ALTER TABLE `ekstrakurikuler` DROP FOREIGN KEY `ekstrakurikuler_id_sekolah_fkey`;

-- DropForeignKey
ALTER TABLE `fasilitas` DROP FOREIGN KEY `fasilitas_id_admin_fkey`;

-- DropForeignKey
ALTER TABLE `fasilitas` DROP FOREIGN KEY `fasilitas_id_sekolah_fkey`;

-- DropForeignKey
ALTER TABLE `kontak_sekolah` DROP FOREIGN KEY `kontak_sekolah_id_sekolah_fkey`;

-- DropForeignKey
ALTER TABLE `pendaftar` DROP FOREIGN KEY `pendaftar_id_sekolah_fkey`;

-- DropForeignKey
ALTER TABLE `pengumuman` DROP FOREIGN KEY `pengumuman_id_admin_fkey`;

-- DropForeignKey
ALTER TABLE `pengumuman` DROP FOREIGN KEY `pengumuman_id_sekolah_fkey`;

-- DropForeignKey
ALTER TABLE `prestasi` DROP FOREIGN KEY `prestasi_id_admin_fkey`;

-- DropForeignKey
ALTER TABLE `prestasi` DROP FOREIGN KEY `prestasi_id_sekolah_fkey`;

-- DropForeignKey
ALTER TABLE `program_unggulan` DROP FOREIGN KEY `program_unggulan_id_admin_fkey`;

-- DropForeignKey
ALTER TABLE `program_unggulan` DROP FOREIGN KEY `program_unggulan_id_sekolah_fkey`;

-- DropForeignKey
ALTER TABLE `verifikator` DROP FOREIGN KEY `verifikator_id_sekolah_fkey`;

-- DropIndex
DROP INDEX `pendaftar_tahun_ajaran_idx` ON `pendaftar`;

-- AlterTable
ALTER TABLE `admin` DROP COLUMN `id_sekolah`;

-- AlterTable
ALTER TABLE `berita` DROP COLUMN `id_sekolah`,
    MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'draft',
    MODIFY `id_admin` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `dokumen` MODIFY `status_verifikasi` VARCHAR(191) NOT NULL DEFAULT 'menunggu_verifikasi';

-- AlterTable
ALTER TABLE `ekstrakurikuler` DROP COLUMN `id_sekolah`,
    MODIFY `id_admin` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `fasilitas` DROP COLUMN `id_sekolah`,
    MODIFY `id_admin` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `pendaftar` DROP COLUMN `id_sekolah`,
    MODIFY `jenis_kelamin` VARCHAR(191) NULL,
    MODIFY `tahun_ajaran` VARCHAR(191) NULL,
    MODIFY `status_pendaftaran` VARCHAR(191) NOT NULL DEFAULT 'draft';

-- AlterTable
ALTER TABLE `pengumuman` DROP COLUMN `id_sekolah`,
    MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'draft',
    MODIFY `id_admin` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `prestasi` DROP COLUMN `id_sekolah`,
    MODIFY `id_admin` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `program_unggulan` DROP COLUMN `id_sekolah`,
    MODIFY `id_admin` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `verifikator` DROP COLUMN `id_sekolah`;

-- DropTable
DROP TABLE `kontak_sekolah`;

-- DropTable
DROP TABLE `profil_sekolah`;

-- CreateTable
CREATE TABLE `profil` (
    `id_profil` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_sekolah` VARCHAR(191) NOT NULL,
    `visi` TEXT NOT NULL,
    `misi` TEXT NOT NULL,
    `deskripsi` TEXT NOT NULL,
    `logo` VARCHAR(191) NULL,
    `nama_kepala_sekolah` VARCHAR(191) NULL,
    `foto_kepala_sekolah` VARCHAR(191) NULL,
    `sambutan_kepala_sekolah` TEXT NULL,
    `id_admin` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `profil_nama_sekolah_key`(`nama_sekolah`),
    INDEX `profil_id_admin_idx`(`id_admin`),
    PRIMARY KEY (`id_profil`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kontak` (
    `id_kontak` INTEGER NOT NULL AUTO_INCREMENT,
    `alamat` TEXT NOT NULL,
    `no_telpon` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `media_sosial` TEXT NULL,
    `whatsapp` VARCHAR(191) NULL,
    `link_maps` VARCHAR(191) NULL,
    `id_admin` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `kontak_id_admin_idx`(`id_admin`),
    PRIMARY KEY (`id_kontak`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `profil` ADD CONSTRAINT `profil_id_admin_fkey` FOREIGN KEY (`id_admin`) REFERENCES `admin`(`id_admin`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kontak` ADD CONSTRAINT `kontak_id_admin_fkey` FOREIGN KEY (`id_admin`) REFERENCES `admin`(`id_admin`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `berita` ADD CONSTRAINT `berita_id_admin_fkey` FOREIGN KEY (`id_admin`) REFERENCES `admin`(`id_admin`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pengumuman` ADD CONSTRAINT `pengumuman_id_admin_fkey` FOREIGN KEY (`id_admin`) REFERENCES `admin`(`id_admin`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fasilitas` ADD CONSTRAINT `fasilitas_id_admin_fkey` FOREIGN KEY (`id_admin`) REFERENCES `admin`(`id_admin`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `program_unggulan` ADD CONSTRAINT `program_unggulan_id_admin_fkey` FOREIGN KEY (`id_admin`) REFERENCES `admin`(`id_admin`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ekstrakurikuler` ADD CONSTRAINT `ekstrakurikuler_id_admin_fkey` FOREIGN KEY (`id_admin`) REFERENCES `admin`(`id_admin`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prestasi` ADD CONSTRAINT `prestasi_id_admin_fkey` FOREIGN KEY (`id_admin`) REFERENCES `admin`(`id_admin`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RedefineIndex
CREATE INDEX `dokumen_status_idx` ON `dokumen`(`status_verifikasi`);
DROP INDEX `dokumen_status_verifikasi_idx` ON `dokumen`;

-- RedefineIndex
CREATE INDEX `pendaftar_status_idx` ON `pendaftar`(`status_pendaftaran`);
DROP INDEX `pendaftar_status_pendaftaran_idx` ON `pendaftar`;
