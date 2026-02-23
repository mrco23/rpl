/*
  Warnings:

  - Made the column `username` on table `Pengguna` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Pengguna` ADD COLUMN `profil_SekolahIdSekolah` INTEGER NULL,
    MODIFY `username` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Profil_Sekolah` (
    `idSekolah` INTEGER NOT NULL AUTO_INCREMENT,
    `namaSekolah` VARCHAR(191) NOT NULL,
    `visi` VARCHAR(191) NOT NULL,
    `misi` VARCHAR(191) NOT NULL,
    `deskripsi` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Profil_Sekolah_namaSekolah_key`(`namaSekolah`),
    PRIMARY KEY (`idSekolah`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kontak_Sekolah` (
    `idKontak` INTEGER NOT NULL AUTO_INCREMENT,
    `alamat` VARCHAR(191) NOT NULL,
    `noTelpon` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `mediaSosial` VARCHAR(191) NOT NULL,
    `profil_SekolahIdSekolah` INTEGER NULL,

    PRIMARY KEY (`idKontak`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pengguna` ADD CONSTRAINT `Pengguna_profil_SekolahIdSekolah_fkey` FOREIGN KEY (`profil_SekolahIdSekolah`) REFERENCES `Profil_Sekolah`(`idSekolah`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kontak_Sekolah` ADD CONSTRAINT `Kontak_Sekolah_profil_SekolahIdSekolah_fkey` FOREIGN KEY (`profil_SekolahIdSekolah`) REFERENCES `Profil_Sekolah`(`idSekolah`) ON DELETE SET NULL ON UPDATE CASCADE;
