/*
  Warnings:

  - The primary key for the `kontak_sekolah` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idKontak` on the `kontak_sekolah` table. All the data in the column will be lost.
  - You are about to drop the column `mediaSosial` on the `kontak_sekolah` table. All the data in the column will be lost.
  - You are about to drop the column `noTelpon` on the `kontak_sekolah` table. All the data in the column will be lost.
  - You are about to drop the column `profil_SekolahIdSekolah` on the `kontak_sekolah` table. All the data in the column will be lost.
  - You are about to drop the column `photoProfile` on the `pengguna` table. All the data in the column will be lost.
  - You are about to drop the column `profil_SekolahIdSekolah` on the `pengguna` table. All the data in the column will be lost.
  - The primary key for the `profil_sekolah` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idSekolah` on the `profil_sekolah` table. All the data in the column will be lost.
  - You are about to drop the column `namaSekolah` on the `profil_sekolah` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nama_sekolah]` on the table `Profil_Sekolah` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_kontak` to the `Kontak_Sekolah` table without a default value. This is not possible if the table is not empty.
  - Added the required column `media_sosial` to the `Kontak_Sekolah` table without a default value. This is not possible if the table is not empty.
  - Added the required column `no_telpon` to the `Kontak_Sekolah` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_sekolah` to the `Profil_Sekolah` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama_sekolah` to the `Profil_Sekolah` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `kontak_sekolah` DROP FOREIGN KEY `Kontak_Sekolah_profil_SekolahIdSekolah_fkey`;

-- DropForeignKey
ALTER TABLE `pengguna` DROP FOREIGN KEY `Pengguna_profil_SekolahIdSekolah_fkey`;

-- DropIndex
DROP INDEX `Profil_Sekolah_namaSekolah_key` ON `profil_sekolah`;

-- AlterTable
ALTER TABLE `kontak_sekolah` DROP PRIMARY KEY,
    DROP COLUMN `idKontak`,
    DROP COLUMN `mediaSosial`,
    DROP COLUMN `noTelpon`,
    DROP COLUMN `profil_SekolahIdSekolah`,
    ADD COLUMN `id_kontak` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `id_sekolah` INTEGER NULL,
    ADD COLUMN `media_sosial` VARCHAR(191) NOT NULL,
    ADD COLUMN `no_telpon` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id_kontak`);

-- AlterTable
ALTER TABLE `pengguna` DROP COLUMN `photoProfile`,
    DROP COLUMN `profil_SekolahIdSekolah`,
    ADD COLUMN `id_sekolah` INTEGER NULL,
    ADD COLUMN `photo_profil` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `profil_sekolah` DROP PRIMARY KEY,
    DROP COLUMN `idSekolah`,
    DROP COLUMN `namaSekolah`,
    ADD COLUMN `id_sekolah` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `nama_sekolah` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id_sekolah`);

-- CreateIndex
CREATE INDEX `Kontak_Sekolah_profil_SekolahIdSekolah_fkey` ON `Kontak_Sekolah`(`id_sekolah`);

-- CreateIndex
CREATE INDEX `Pengguna_profil_SekolahIdSekolah_fkey` ON `Pengguna`(`id_sekolah`);

-- CreateIndex
CREATE UNIQUE INDEX `Profil_Sekolah_namaSekolah_key` ON `Profil_Sekolah`(`nama_sekolah`);

-- AddForeignKey
ALTER TABLE `Kontak_Sekolah` ADD CONSTRAINT `Kontak_Sekolah_profil_SekolahIdSekolah_fkey` FOREIGN KEY (`id_sekolah`) REFERENCES `Profil_Sekolah`(`id_sekolah`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pengguna` ADD CONSTRAINT `Pengguna_profil_SekolahIdSekolah_fkey` FOREIGN KEY (`id_sekolah`) REFERENCES `Profil_Sekolah`(`id_sekolah`) ON DELETE SET NULL ON UPDATE CASCADE;
