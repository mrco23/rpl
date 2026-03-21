/*
  Warnings:

  - You are about to drop the column `is_active` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `isi` on the `berita` table. All the data in the column will be lost.
  - You are about to drop the column `published_at` on the `berita` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `berita` table. All the data in the column will be lost.
  - You are about to drop the column `file_asli` on the `dokumen` table. All the data in the column will be lost.
  - You are about to drop the column `file_path` on the `dokumen` table. All the data in the column will be lost.
  - You are about to drop the column `mime_type` on the `dokumen` table. All the data in the column will be lost.
  - You are about to drop the column `ukuran_file` on the `dokumen` table. All the data in the column will be lost.
  - You are about to drop the column `mentor` on the `ekstrakurikuler` table. All the data in the column will be lost.
  - You are about to drop the column `is_archived` on the `pendaftar` table. All the data in the column will be lost.
  - You are about to drop the column `isi` on the `pengumuman` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `pengumuman` table. All the data in the column will be lost.
  - You are about to drop the column `tahun_ajaran` on the `pengumuman` table. All the data in the column will be lost.
  - You are about to drop the column `tampil_mulai` on the `pengumuman` table. All the data in the column will be lost.
  - You are about to drop the column `tampil_sampai` on the `pengumuman` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `verifikator` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `admin` DROP COLUMN `is_active`;

-- AlterTable
ALTER TABLE `berita` DROP COLUMN `isi`,
    DROP COLUMN `published_at`,
    DROP COLUMN `status`;

-- AlterTable
ALTER TABLE `dokumen` DROP COLUMN `file_asli`,
    DROP COLUMN `file_path`,
    DROP COLUMN `mime_type`,
    DROP COLUMN `ukuran_file`;

-- AlterTable
ALTER TABLE `ekstrakurikuler` DROP COLUMN `mentor`,
    ADD COLUMN `pembina` TEXT NULL;

-- AlterTable
ALTER TABLE `pendaftar` DROP COLUMN `is_archived`,
    MODIFY `status_pendaftaran` VARCHAR(191) NOT NULL DEFAULT 'seleksi';

-- AlterTable
ALTER TABLE `pengumuman` DROP COLUMN `isi`,
    DROP COLUMN `status`,
    DROP COLUMN `tahun_ajaran`,
    DROP COLUMN `tampil_mulai`,
    DROP COLUMN `tampil_sampai`,
    ADD COLUMN `deksripsi` TEXT NULL;

-- AlterTable
ALTER TABLE `verifikator` DROP COLUMN `is_active`;
