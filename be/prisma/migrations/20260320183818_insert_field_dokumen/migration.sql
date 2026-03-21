/*
  Warnings:

  - Added the required column `ukuran_file` to the `dokumen` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `dokumen` ADD COLUMN `ukuran_file` INTEGER NOT NULL;
