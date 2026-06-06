-- CreateTable
CREATE TABLE `admin` (
    `id_admin` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(100) NULL,
    `password` VARCHAR(255) NOT NULL,
    `status_aktif` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `admin_username_key`(`username`),
    PRIMARY KEY (`id_admin`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `alamat` (
    `id_alamat` INTEGER NOT NULL AUTO_INCREMENT,
    `provinsi` VARCHAR(100) NOT NULL,
    `kota_kabupaten` VARCHAR(100) NOT NULL,
    `kecamatan` VARCHAR(100) NOT NULL,
    `kelurahan` VARCHAR(100) NOT NULL,
    `rt_rw` VARCHAR(50) NOT NULL,
    `kode_pos` VARCHAR(10) NOT NULL,
    `id_pendaftar` INTEGER NOT NULL,

    UNIQUE INDEX `alamat_id_pendaftar_key`(`id_pendaftar`),
    PRIMARY KEY (`id_alamat`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `berita` (
    `id_berita` INTEGER NOT NULL AUTO_INCREMENT,
    `judul_berita` VARCHAR(200) NOT NULL,
    `deskripsi` TEXT NOT NULL,
    `gambar_berita` VARCHAR(250) NULL,
    `tanggal_dibuat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `id_admin` INTEGER NOT NULL,

    INDEX `berita_id_admin_idx`(`id_admin`),
    PRIMARY KEY (`id_berita`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dokumen` (
    `id_dokumen` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_dokumen` VARCHAR(150) NOT NULL,
    `jenis_dokumen` VARCHAR(100) NOT NULL,
    `id_pendaftar` INTEGER NOT NULL,
    `id_verifikator` INTEGER NULL,

    INDEX `dokumen_id_pendaftar_idx`(`id_pendaftar`),
    INDEX `dokumen_id_verifikator_idx`(`id_verifikator`),
    UNIQUE INDEX `dokumen_unique`(`id_pendaftar`, `nama_dokumen`),
    PRIMARY KEY (`id_dokumen`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ekstrakurikuler` (
    `id_ekstrakurikuler` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_ekskul` VARCHAR(100) NOT NULL,
    `p_jwb_ekskul` VARCHAR(150) NOT NULL,
    `gambar_ekskul` VARCHAR(250) NULL,
    `deskripsi` TEXT NOT NULL,
    `id_admin` INTEGER NOT NULL,

    INDEX `ekstrakurikuler_id_admin_idx`(`id_admin`),
    PRIMARY KEY (`id_ekstrakurikuler`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fasilitas` (
    `id_fasilitas` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_fasilitas` VARCHAR(100) NOT NULL,
    `deskripsi` TEXT NOT NULL,
    `gambar_fasilitas` VARCHAR(250) NULL,
    `id_admin` INTEGER NOT NULL,

    INDEX `fasilitas_id_admin_idx`(`id_admin`),
    PRIMARY KEY (`id_fasilitas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gelombang` (
    `id_gelombang` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(100) NOT NULL,
    `tanggal_mulai` DATETIME(3) NOT NULL,
    `tanggal_selesai` DATETIME(3) NOT NULL,
    `kuota` INTEGER NOT NULL,
    `status_validasi` VARCHAR(50) NOT NULL DEFAULT 'belum_diajukan',
    `tanggal_validasi` DATETIME(3) NULL,

    PRIMARY KEY (`id_gelombang`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kontak` (
    `id_kontak` INTEGER NOT NULL AUTO_INCREMENT,
    `no_telpon` VARCHAR(20) NOT NULL,
    `instagram` VARCHAR(100) NOT NULL,
    `tiktok` VARCHAR(100) NOT NULL,
    `facebook` VARCHAR(100) NOT NULL,
    `youtube` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `whatsapp` VARCHAR(20) NULL,
    `id_admin` INTEGER NOT NULL,

    INDEX `kontak_id_admin_idx`(`id_admin`),
    PRIMARY KEY (`id_kontak`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pendaftar` (
    `id_pendaftar` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_lengkap` VARCHAR(150) NOT NULL,
    `kata_sandi` VARCHAR(255) NULL,
    `nisn` VARCHAR(20) NULL,
    `tempat_lahir` VARCHAR(100) NULL,
    `tanggal_lahir` DATE NULL,
    `jenis_kelamin` VARCHAR(20) NOT NULL,
    `no_hp` VARCHAR(20) NOT NULL,
    `asal_sekolah` VARCHAR(150) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `nama_wali` VARCHAR(150) NULL,
    `status_pendaftaran` VARCHAR(50) NOT NULL DEFAULT 'menunggu verifikasi',
    `catatan_dokumen` TEXT NULL,
    `tanggal_daftar` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `id_gelombang` INTEGER NULL,
    `id_verifikator` INTEGER NULL,
    `resetPasswordToken` VARCHAR(255) NULL,
    `resetPasswordExpires` DATETIME(0) NULL,

    UNIQUE INDEX `pendaftar_nisn_key`(`nisn`),
    UNIQUE INDEX `email`(`email`),
    UNIQUE INDEX `pendaftar_resetPasswordToken_key`(`resetPasswordToken`),
    INDEX `pendaftar_id_gelombang_fkey`(`id_gelombang`),
    INDEX `pendaftar_id_verifikator_idx`(`id_verifikator`),
    INDEX `pendaftar_status_idx`(`status_pendaftaran`),
    PRIMARY KEY (`id_pendaftar`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pengumuman` (
    `id_pengumuman` INTEGER NOT NULL AUTO_INCREMENT,
    `judul_pengumuman` VARCHAR(200) NOT NULL,
    `deksripsi` TEXT NULL,
    `tanggal_dibuat` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `id_admin` INTEGER NOT NULL,

    INDEX `pengumuman_id_admin_idx`(`id_admin`),
    PRIMARY KEY (`id_pengumuman`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pengumuman_pendaftar` (
    `id_pengumuman_pendaftar` INTEGER NOT NULL AUTO_INCREMENT,
    `id_pendaftar` INTEGER NOT NULL,
    `id_pengumuman` INTEGER NOT NULL,

    INDEX `pengumuman_pendaftar_id_pendaftar_idx`(`id_pendaftar`),
    INDEX `pengumuman_pendaftar_id_pengumuman_idx`(`id_pengumuman`),
    PRIMARY KEY (`id_pengumuman_pendaftar`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prestasi` (
    `id_prestasi` INTEGER NOT NULL AUTO_INCREMENT,
    `judul_prestasi` VARCHAR(200) NOT NULL,
    `deskripsi` TEXT NOT NULL,
    `peraih_prestasi` VARCHAR(150) NOT NULL,
    `gambar_prestasi` VARCHAR(250) NULL,
    `id_admin` INTEGER NOT NULL,

    INDEX `prestasi_id_admin_idx`(`id_admin`),
    PRIMARY KEY (`id_prestasi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profil` (
    `id_profil` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_sekolah` VARCHAR(150) NOT NULL,
    `visi` TEXT NOT NULL,
    `misi` TEXT NOT NULL,
    `nama_kepala_sekolah` VARCHAR(150) NOT NULL,
    `foto_kepala_sekolah` VARCHAR(250) NOT NULL,
    `kata_sambutan` TEXT NOT NULL,
    `id_admin` INTEGER NOT NULL,
    `akreditasi` CHAR(1) NOT NULL,
    `nomor_sk_akreditasi` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `profil_nama_sekolah_key`(`nama_sekolah`),
    INDEX `profil_id_admin_idx`(`id_admin`),
    PRIMARY KEY (`id_profil`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `program_unggulan` (
    `id_program` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_pu` VARCHAR(150) NOT NULL,
    `deskripsi` TEXT NOT NULL,
    `gambar_pu` VARCHAR(250) NULL,
    `id_admin` INTEGER NOT NULL,

    INDEX `program_unggulan_id_admin_idx`(`id_admin`),
    PRIMARY KEY (`id_program`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `verifikator` (
    `id_verifikator` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `nama` VARCHAR(150) NOT NULL,
    `status_aktif` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `verifikator_username_key`(`username`),
    PRIMARY KEY (`id_verifikator`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kepala_sekolah` (
    `id_kepala_sekolah` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `nama` VARCHAR(100) NOT NULL,
    `status_aktif` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `kepala_sekolah_username_key`(`username`),
    PRIMARY KEY (`id_kepala_sekolah`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `alamat` ADD CONSTRAINT `alamat_id_pendaftar_fkey` FOREIGN KEY (`id_pendaftar`) REFERENCES `pendaftar`(`id_pendaftar`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `berita` ADD CONSTRAINT `berita_id_admin_fkey` FOREIGN KEY (`id_admin`) REFERENCES `admin`(`id_admin`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dokumen` ADD CONSTRAINT `dokumen_id_pendaftar_fkey` FOREIGN KEY (`id_pendaftar`) REFERENCES `pendaftar`(`id_pendaftar`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dokumen` ADD CONSTRAINT `dokumen_id_verifikator_fkey` FOREIGN KEY (`id_verifikator`) REFERENCES `verifikator`(`id_verifikator`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ekstrakurikuler` ADD CONSTRAINT `ekstrakurikuler_id_admin_fkey` FOREIGN KEY (`id_admin`) REFERENCES `admin`(`id_admin`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fasilitas` ADD CONSTRAINT `fasilitas_id_admin_fkey` FOREIGN KEY (`id_admin`) REFERENCES `admin`(`id_admin`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kontak` ADD CONSTRAINT `kontak_id_admin_fkey` FOREIGN KEY (`id_admin`) REFERENCES `admin`(`id_admin`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pendaftar` ADD CONSTRAINT `pendaftar_id_gelombang_fkey` FOREIGN KEY (`id_gelombang`) REFERENCES `gelombang`(`id_gelombang`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pendaftar` ADD CONSTRAINT `pendaftar_id_verifikator_fkey` FOREIGN KEY (`id_verifikator`) REFERENCES `verifikator`(`id_verifikator`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pengumuman` ADD CONSTRAINT `pengumuman_id_admin_fkey` FOREIGN KEY (`id_admin`) REFERENCES `admin`(`id_admin`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pengumuman_pendaftar` ADD CONSTRAINT `pengumuman_pendaftar_id_pendaftar_fkey` FOREIGN KEY (`id_pendaftar`) REFERENCES `pendaftar`(`id_pendaftar`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pengumuman_pendaftar` ADD CONSTRAINT `pengumuman_pendaftar_id_pengumuman_fkey` FOREIGN KEY (`id_pengumuman`) REFERENCES `pengumuman`(`id_pengumuman`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prestasi` ADD CONSTRAINT `prestasi_id_admin_fkey` FOREIGN KEY (`id_admin`) REFERENCES `admin`(`id_admin`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profil` ADD CONSTRAINT `profil_id_admin_fkey` FOREIGN KEY (`id_admin`) REFERENCES `admin`(`id_admin`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `program_unggulan` ADD CONSTRAINT `program_unggulan_id_admin_fkey` FOREIGN KEY (`id_admin`) REFERENCES `admin`(`id_admin`) ON DELETE CASCADE ON UPDATE CASCADE;
