-- CreateTable
CREATE TABLE `profil_sekolah` (
    `id_sekolah` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_sekolah` VARCHAR(191) NOT NULL,
    `visi` TEXT NOT NULL,
    `misi` TEXT NOT NULL,
    `deskripsi` TEXT NOT NULL,
    `logo` VARCHAR(191) NULL,
    `nama_kepala_sekolah` VARCHAR(191) NULL,
    `foto_kepala_sekolah` VARCHAR(191) NULL,
    `sambutan_kepala_sekolah` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `profil_sekolah_nama_sekolah_key`(`nama_sekolah`),
    PRIMARY KEY (`id_sekolah`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kontak_sekolah` (
    `id_kontak` INTEGER NOT NULL AUTO_INCREMENT,
    `alamat` TEXT NOT NULL,
    `no_telpon` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `media_sosial` TEXT NULL,
    `whatsapp` VARCHAR(191) NULL,
    `link_maps` VARCHAR(191) NULL,
    `id_sekolah` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `kontak_sekolah_id_sekolah_key`(`id_sekolah`),
    PRIMARY KEY (`id_kontak`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin` (
    `id_admin` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `foto_profil` VARCHAR(191) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `id_sekolah` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `admin_username_key`(`username`),
    INDEX `admin_id_sekolah_idx`(`id_sekolah`),
    PRIMARY KEY (`id_admin`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `verifikator` (
    `id_verifikator` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `foto_profil` VARCHAR(191) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `id_sekolah` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `verifikator_username_key`(`username`),
    INDEX `verifikator_id_sekolah_idx`(`id_sekolah`),
    PRIMARY KEY (`id_verifikator`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fasilitas` (
    `id_fasilitas` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `deskripsi` TEXT NOT NULL,
    `gambar` VARCHAR(191) NULL,
    `id_sekolah` INTEGER NOT NULL,
    `id_admin` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `fasilitas_id_sekolah_idx`(`id_sekolah`),
    INDEX `fasilitas_id_admin_idx`(`id_admin`),
    PRIMARY KEY (`id_fasilitas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `program_unggulan` (
    `id_program` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `deskripsi` TEXT NOT NULL,
    `gambar` VARCHAR(191) NULL,
    `id_sekolah` INTEGER NOT NULL,
    `id_admin` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `program_unggulan_id_sekolah_idx`(`id_sekolah`),
    INDEX `program_unggulan_id_admin_idx`(`id_admin`),
    PRIMARY KEY (`id_program`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ekstrakurikuler` (
    `id_ekstrakurikuler` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `deskripsi` TEXT NOT NULL,
    `mentor` VARCHAR(191) NULL,
    `jadwal` VARCHAR(191) NULL,
    `gambar` VARCHAR(191) NULL,
    `id_sekolah` INTEGER NOT NULL,
    `id_admin` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `ekstrakurikuler_id_sekolah_idx`(`id_sekolah`),
    INDEX `ekstrakurikuler_id_admin_idx`(`id_admin`),
    PRIMARY KEY (`id_ekstrakurikuler`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `berita` (
    `id_berita` INTEGER NOT NULL AUTO_INCREMENT,
    `judul` VARCHAR(191) NOT NULL,
    `deskripsi` TEXT NOT NULL,
    `isi` TEXT NOT NULL,
    `gambar` VARCHAR(191) NULL,
    `status` ENUM('DRAFT', 'PUBLISH', 'NONAKTIF') NOT NULL DEFAULT 'DRAFT',
    `published_at` DATETIME(3) NULL,
    `id_sekolah` INTEGER NOT NULL,
    `id_admin` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `berita_id_sekolah_idx`(`id_sekolah`),
    INDEX `berita_id_admin_idx`(`id_admin`),
    PRIMARY KEY (`id_berita`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prestasi` (
    `id_prestasi` INTEGER NOT NULL AUTO_INCREMENT,
    `judul` VARCHAR(191) NOT NULL,
    `deskripsi` TEXT NOT NULL,
    `gambar` VARCHAR(191) NULL,
    `tahun` VARCHAR(191) NULL,
    `id_sekolah` INTEGER NOT NULL,
    `id_admin` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `prestasi_id_sekolah_idx`(`id_sekolah`),
    INDEX `prestasi_id_admin_idx`(`id_admin`),
    PRIMARY KEY (`id_prestasi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pengumuman` (
    `id_pengumuman` INTEGER NOT NULL AUTO_INCREMENT,
    `judul` VARCHAR(191) NOT NULL,
    `isi` TEXT NOT NULL,
    `status` ENUM('DRAFT', 'PUBLISH', 'NONAKTIF') NOT NULL DEFAULT 'DRAFT',
    `tampil_mulai` DATETIME(3) NULL,
    `tampil_sampai` DATETIME(3) NULL,
    `tahun_ajaran` VARCHAR(191) NULL,
    `id_sekolah` INTEGER NOT NULL,
    `id_admin` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `pengumuman_id_sekolah_idx`(`id_sekolah`),
    INDEX `pengumuman_id_admin_idx`(`id_admin`),
    PRIMARY KEY (`id_pengumuman`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pendaftar` (
    `id_pendaftar` INTEGER NOT NULL AUTO_INCREMENT,
    `no_pendaftaran` VARCHAR(191) NOT NULL,
    `nama_lengkap` VARCHAR(191) NOT NULL,
    `nisn` VARCHAR(191) NULL,
    `nik` VARCHAR(191) NULL,
    `jenis_kelamin` ENUM('LAKI_LAKI', 'PEREMPUAN') NULL,
    `tempat_lahir` VARCHAR(191) NULL,
    `tanggal_lahir` DATE NULL,
    `alamat` TEXT NOT NULL,
    `no_hp` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `asal_sekolah` VARCHAR(191) NULL,
    `nama_ayah` VARCHAR(191) NULL,
    `nama_ibu` VARCHAR(191) NULL,
    `nama_wali` VARCHAR(191) NULL,
    `tahun_ajaran` VARCHAR(191) NOT NULL,
    `status_pendaftaran` ENUM('DRAFT', 'SUBMIT', 'PERLU_REVISI', 'TERVERIFIKASI', 'DITOLAK', 'DITERIMA', 'DIARSIPKAN') NOT NULL DEFAULT 'DRAFT',
    `is_archived` BOOLEAN NOT NULL DEFAULT false,
    `id_sekolah` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `pendaftar_no_pendaftaran_key`(`no_pendaftaran`),
    UNIQUE INDEX `pendaftar_nisn_key`(`nisn`),
    UNIQUE INDEX `pendaftar_nik_key`(`nik`),
    INDEX `pendaftar_id_sekolah_idx`(`id_sekolah`),
    INDEX `pendaftar_tahun_ajaran_idx`(`tahun_ajaran`),
    INDEX `pendaftar_status_pendaftaran_idx`(`status_pendaftaran`),
    PRIMARY KEY (`id_pendaftar`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dokumen` (
    `id_dokumen` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_dokumen` VARCHAR(191) NOT NULL,
    `file_asli` VARCHAR(191) NULL,
    `file_path` VARCHAR(191) NOT NULL,
    `mime_type` VARCHAR(191) NULL,
    `ukuran_file` INTEGER NULL,
    `versi_upload` INTEGER NOT NULL DEFAULT 1,
    `status_verifikasi` ENUM('MENUNGGU_VERIFIKASI', 'PERLU_REVISI', 'TERVERIFIKASI') NOT NULL DEFAULT 'MENUNGGU_VERIFIKASI',
    `catatan_verifikasi` TEXT NULL,
    `verified_at` DATETIME(3) NULL,
    `id_pendaftar` INTEGER NOT NULL,
    `id_verifikator` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `dokumen_id_pendaftar_idx`(`id_pendaftar`),
    INDEX `dokumen_id_verifikator_idx`(`id_verifikator`),
    INDEX `dokumen_status_verifikasi_idx`(`status_verifikasi`),
    UNIQUE INDEX `dokumen_versi_unique`(`id_pendaftar`, `nama_dokumen`, `versi_upload`),
    PRIMARY KEY (`id_dokumen`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `kontak_sekolah` ADD CONSTRAINT `kontak_sekolah_id_sekolah_fkey` FOREIGN KEY (`id_sekolah`) REFERENCES `profil_sekolah`(`id_sekolah`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `admin` ADD CONSTRAINT `admin_id_sekolah_fkey` FOREIGN KEY (`id_sekolah`) REFERENCES `profil_sekolah`(`id_sekolah`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `verifikator` ADD CONSTRAINT `verifikator_id_sekolah_fkey` FOREIGN KEY (`id_sekolah`) REFERENCES `profil_sekolah`(`id_sekolah`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fasilitas` ADD CONSTRAINT `fasilitas_id_sekolah_fkey` FOREIGN KEY (`id_sekolah`) REFERENCES `profil_sekolah`(`id_sekolah`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fasilitas` ADD CONSTRAINT `fasilitas_id_admin_fkey` FOREIGN KEY (`id_admin`) REFERENCES `admin`(`id_admin`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `program_unggulan` ADD CONSTRAINT `program_unggulan_id_sekolah_fkey` FOREIGN KEY (`id_sekolah`) REFERENCES `profil_sekolah`(`id_sekolah`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `program_unggulan` ADD CONSTRAINT `program_unggulan_id_admin_fkey` FOREIGN KEY (`id_admin`) REFERENCES `admin`(`id_admin`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ekstrakurikuler` ADD CONSTRAINT `ekstrakurikuler_id_sekolah_fkey` FOREIGN KEY (`id_sekolah`) REFERENCES `profil_sekolah`(`id_sekolah`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ekstrakurikuler` ADD CONSTRAINT `ekstrakurikuler_id_admin_fkey` FOREIGN KEY (`id_admin`) REFERENCES `admin`(`id_admin`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `berita` ADD CONSTRAINT `berita_id_sekolah_fkey` FOREIGN KEY (`id_sekolah`) REFERENCES `profil_sekolah`(`id_sekolah`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `berita` ADD CONSTRAINT `berita_id_admin_fkey` FOREIGN KEY (`id_admin`) REFERENCES `admin`(`id_admin`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prestasi` ADD CONSTRAINT `prestasi_id_sekolah_fkey` FOREIGN KEY (`id_sekolah`) REFERENCES `profil_sekolah`(`id_sekolah`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prestasi` ADD CONSTRAINT `prestasi_id_admin_fkey` FOREIGN KEY (`id_admin`) REFERENCES `admin`(`id_admin`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pengumuman` ADD CONSTRAINT `pengumuman_id_sekolah_fkey` FOREIGN KEY (`id_sekolah`) REFERENCES `profil_sekolah`(`id_sekolah`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pengumuman` ADD CONSTRAINT `pengumuman_id_admin_fkey` FOREIGN KEY (`id_admin`) REFERENCES `admin`(`id_admin`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pendaftar` ADD CONSTRAINT `pendaftar_id_sekolah_fkey` FOREIGN KEY (`id_sekolah`) REFERENCES `profil_sekolah`(`id_sekolah`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dokumen` ADD CONSTRAINT `dokumen_id_pendaftar_fkey` FOREIGN KEY (`id_pendaftar`) REFERENCES `pendaftar`(`id_pendaftar`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dokumen` ADD CONSTRAINT `dokumen_id_verifikator_fkey` FOREIGN KEY (`id_verifikator`) REFERENCES `verifikator`(`id_verifikator`) ON DELETE SET NULL ON UPDATE CASCADE;
