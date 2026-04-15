/*
  Warnings:

  - You are about to drop the column `created_at` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `foto_profil` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `berita` table. All the data in the column will be lost.
  - You are about to drop the column `gambar` on the `berita` table. All the data in the column will be lost.
  - You are about to drop the column `judul` on the `berita` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `berita` table. All the data in the column will be lost.
  - You are about to drop the column `catatan_verifikasi` on the `dokumen` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `dokumen` table. All the data in the column will be lost.
  - You are about to drop the column `mime_type` on the `dokumen` table. All the data in the column will be lost.
  - You are about to drop the column `status_verifikasi` on the `dokumen` table. All the data in the column will be lost.
  - You are about to drop the column `ukuran_file` on the `dokumen` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `dokumen` table. All the data in the column will be lost.
  - You are about to drop the column `verified_at` on the `dokumen` table. All the data in the column will be lost.
  - You are about to drop the column `versi_upload` on the `dokumen` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `ekstrakurikuler` table. All the data in the column will be lost.
  - You are about to drop the column `gambar` on the `ekstrakurikuler` table. All the data in the column will be lost.
  - You are about to drop the column `jadwal` on the `ekstrakurikuler` table. All the data in the column will be lost.
  - You are about to drop the column `nama` on the `ekstrakurikuler` table. All the data in the column will be lost.
  - You are about to drop the column `pembina` on the `ekstrakurikuler` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `ekstrakurikuler` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `fasilitas` table. All the data in the column will be lost.
  - You are about to drop the column `gambar` on the `fasilitas` table. All the data in the column will be lost.
  - You are about to drop the column `nama` on the `fasilitas` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `fasilitas` table. All the data in the column will be lost.
  - You are about to drop the column `alamat` on the `kontak` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `kontak` table. All the data in the column will be lost.
  - You are about to drop the column `link_maps` on the `kontak` table. All the data in the column will be lost.
  - You are about to drop the column `media_sosial` on the `kontak` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `kontak` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `pendaftar` table. All the data in the column will be lost.
  - You are about to drop the column `nama_ayah` on the `pendaftar` table. All the data in the column will be lost.
  - You are about to drop the column `nama_ibu` on the `pendaftar` table. All the data in the column will be lost.
  - You are about to drop the column `nik` on the `pendaftar` table. All the data in the column will be lost.
  - You are about to drop the column `no_pendaftaran` on the `pendaftar` table. All the data in the column will be lost.
  - You are about to drop the column `tahun_ajaran` on the `pendaftar` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `pendaftar` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `pengumuman` table. All the data in the column will be lost.
  - You are about to drop the column `judul` on the `pengumuman` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `pengumuman` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `prestasi` table. All the data in the column will be lost.
  - You are about to drop the column `gambar` on the `prestasi` table. All the data in the column will be lost.
  - You are about to drop the column `judul` on the `prestasi` table. All the data in the column will be lost.
  - You are about to drop the column `peraih` on the `prestasi` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `prestasi` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `profil` table. All the data in the column will be lost.
  - You are about to drop the column `deskripsi` on the `profil` table. All the data in the column will be lost.
  - You are about to drop the column `logo` on the `profil` table. All the data in the column will be lost.
  - You are about to drop the column `sambutan_kepala_sekolah` on the `profil` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `profil` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `program_unggulan` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `program_unggulan` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `verifikator` table. All the data in the column will be lost.
  - You are about to drop the column `foto_profil` on the `verifikator` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `verifikator` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_pendaftar,nama_dokumen]` on the table `dokumen` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `judul_berita` to the `berita` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jenis_dokumen` to the `dokumen` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama_ekskul` to the `ekstrakurikuler` table without a default value. This is not possible if the table is not empty.
  - Added the required column `p_jwb_ekskul` to the `ekstrakurikuler` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama_fasilitas` to the `fasilitas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `facebook` to the `kontak` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instagram` to the `kontak` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tiktok` to the `kontak` table without a default value. This is not possible if the table is not empty.
  - Added the required column `youtube` to the `kontak` table without a default value. This is not possible if the table is not empty.
  - Made the column `jenis_kelamin` on table `pendaftar` required. This step will fail if there are existing NULL values in that column.
  - Made the column `asal_sekolah` on table `pendaftar` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `judul_pengumuman` to the `pengumuman` table without a default value. This is not possible if the table is not empty.
  - Added the required column `judul_prestasi` to the `prestasi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `peraih_prestasi` to the `prestasi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kata_sambutan` to the `profil` table without a default value. This is not possible if the table is not empty.
  - Made the column `nama_kepala_sekolah` on table `profil` required. This step will fail if there are existing NULL values in that column.
  - Made the column `foto_kepala_sekolah` on table `profil` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `dokumen_status_idx` ON `dokumen`;

-- DropIndex
DROP INDEX `dokumen_versi_unique` ON `dokumen`;

-- DropIndex
DROP INDEX `pendaftar_nik_key` ON `pendaftar`;

-- DropIndex
DROP INDEX `pendaftar_no_pendaftaran_key` ON `pendaftar`;

-- AlterTable
ALTER TABLE `admin` DROP COLUMN `created_at`,
    DROP COLUMN `foto_profil`,
    DROP COLUMN `updated_at`;

-- AlterTable
ALTER TABLE `berita` DROP COLUMN `created_at`,
    DROP COLUMN `gambar`,
    DROP COLUMN `judul`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `gambar_berita` VARCHAR(191) NULL,
    ADD COLUMN `judul_berita` VARCHAR(191) NOT NULL,
    ADD COLUMN `tanggal_dibuat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `dokumen` DROP COLUMN `catatan_verifikasi`,
    DROP COLUMN `created_at`,
    DROP COLUMN `mime_type`,
    DROP COLUMN `status_verifikasi`,
    DROP COLUMN `ukuran_file`,
    DROP COLUMN `updated_at`,
    DROP COLUMN `verified_at`,
    DROP COLUMN `versi_upload`,
    ADD COLUMN `jenis_dokumen` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `ekstrakurikuler` DROP COLUMN `created_at`,
    DROP COLUMN `gambar`,
    DROP COLUMN `jadwal`,
    DROP COLUMN `nama`,
    DROP COLUMN `pembina`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `gambar_ekskul` VARCHAR(191) NULL,
    ADD COLUMN `nama_ekskul` VARCHAR(191) NOT NULL,
    ADD COLUMN `p_jwb_ekskul` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `fasilitas` DROP COLUMN `created_at`,
    DROP COLUMN `gambar`,
    DROP COLUMN `nama`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `gambar_fasilitas` VARCHAR(191) NULL,
    ADD COLUMN `nama_fasilitas` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `kontak` DROP COLUMN `alamat`,
    DROP COLUMN `created_at`,
    DROP COLUMN `link_maps`,
    DROP COLUMN `media_sosial`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `facebook` VARCHAR(191) NOT NULL,
    ADD COLUMN `instagram` VARCHAR(191) NOT NULL,
    ADD COLUMN `tiktok` VARCHAR(191) NOT NULL,
    ADD COLUMN `youtube` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `pendaftar` DROP COLUMN `created_at`,
    DROP COLUMN `nama_ayah`,
    DROP COLUMN `nama_ibu`,
    DROP COLUMN `nik`,
    DROP COLUMN `no_pendaftaran`,
    DROP COLUMN `tahun_ajaran`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `catatan_dokumen` TEXT NULL,
    ADD COLUMN `id_gelombang` INTEGER NULL,
    ADD COLUMN `tanggal_daftar` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `jenis_kelamin` VARCHAR(191) NOT NULL,
    MODIFY `asal_sekolah` VARCHAR(191) NOT NULL,
    MODIFY `status_pendaftaran` VARCHAR(191) NOT NULL DEFAULT 'menunggu_verifikasi';

-- AlterTable
ALTER TABLE `pengumuman` DROP COLUMN `created_at`,
    DROP COLUMN `judul`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `id_pendaftar` INTEGER NULL,
    ADD COLUMN `judul_pengumuman` VARCHAR(191) NOT NULL,
    ADD COLUMN `tanggal_dibuat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `prestasi` DROP COLUMN `created_at`,
    DROP COLUMN `gambar`,
    DROP COLUMN `judul`,
    DROP COLUMN `peraih`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `gambar_prestasi` VARCHAR(191) NULL,
    ADD COLUMN `judul_prestasi` VARCHAR(191) NOT NULL,
    ADD COLUMN `peraih_prestasi` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `profil` DROP COLUMN `created_at`,
    DROP COLUMN `deskripsi`,
    DROP COLUMN `logo`,
    DROP COLUMN `sambutan_kepala_sekolah`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `kata_sambutan` TEXT NOT NULL,
    MODIFY `nama_kepala_sekolah` VARCHAR(191) NOT NULL,
    MODIFY `foto_kepala_sekolah` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `program_unggulan` DROP COLUMN `created_at`,
    DROP COLUMN `updated_at`;

-- AlterTable
ALTER TABLE `verifikator` DROP COLUMN `created_at`,
    DROP COLUMN `foto_profil`,
    DROP COLUMN `updated_at`;

-- CreateTable
CREATE TABLE `gelombang` (
    `id_gelombang` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `tanggal_mulai` DATETIME(3) NOT NULL,
    `tanggal_selesai` DATETIME(3) NOT NULL,
    `kuota` INTEGER NOT NULL,

    PRIMARY KEY (`id_gelombang`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `dokumen_unique` ON `dokumen`(`id_pendaftar`, `nama_dokumen`);

-- CreateIndex
CREATE INDEX `pengumuman_id_pendaftar_idx` ON `pengumuman`(`id_pendaftar`);

-- AddForeignKey
ALTER TABLE `pengumuman` ADD CONSTRAINT `pengumuman_id_pendaftar_fkey` FOREIGN KEY (`id_pendaftar`) REFERENCES `pendaftar`(`id_pendaftar`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pendaftar` ADD CONSTRAINT `pendaftar_id_gelombang_fkey` FOREIGN KEY (`id_gelombang`) REFERENCES `gelombang`(`id_gelombang`) ON DELETE SET NULL ON UPDATE CASCADE;
