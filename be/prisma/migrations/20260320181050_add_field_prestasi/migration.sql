/*
  Warnings:

  - You are about to drop the column `tahun` on the `prestasi` table. All the data in the column will be lost.
  - Added the required column `peraih` to the `prestasi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `prestasi` DROP COLUMN `tahun`,
    ADD COLUMN `peraih` VARCHAR(191) NOT NULL;
