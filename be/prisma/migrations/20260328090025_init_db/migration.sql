/*
  Warnings:

  - Added the required column `deskripsi` to the `profil` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `profil` ADD COLUMN `deskripsi` TEXT NOT NULL;
