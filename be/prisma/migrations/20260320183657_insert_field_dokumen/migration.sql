/*
  Warnings:

  - Added the required column `mime_type` to the `dokumen` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `dokumen` ADD COLUMN `mime_type` VARCHAR(191) NOT NULL;
