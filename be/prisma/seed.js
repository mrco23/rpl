import {PrismaClient} from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Mulai proses seeding...\n");

    const hashedAdminPass = await bcrypt.hash("Admin123!", 10);
    const hashedVerifPass = await bcrypt.hash("Verif123!", 10);
    const hashedPendaftarPass = await bcrypt.hash('Maltrian123!', 10);

    /* ──────────────────── ADMIN ──────────────────── */
    const admin = await prisma.admin.upsert({
        where: {username: "admin"},
        update: {},
        create: {
            username: "admin",
            password: hashedAdminPass,
        },
    });
    console.log("✅ Admin dibuat:", admin.username);

    /* ──────────────────── VERIFIKATOR ──────────────────── */
    const verifikator = await prisma.verifikator.upsert({
        where: {username: "verifikator"},
        update: {},
        create: {
            username: "verifikator",
            password: hashedVerifPass,
            nama: "Syanne Tueje",
        },
    });
    console.log("✅ Verifikator dibuat:", verifikator.username);

    /* ──────────────────── PROFIL ──────────────────── */
    const profil = await prisma.profil.upsert({
        where: {nama_sekolah: "SMP Katolik St. Rafael Manado"},
        update: {
            visi: "Membentuk peserta didik menjadi manusia yang seutuhnya ,beriman,unggul,bijaksana dan pancasilais sesuai semangat Santo Rafael",
            misi: "1. Mewujudkan religiusitas dalam diri warga sekolah sehingga kehidupan beriman dan persaudaraan sejati semakin berkembang.\n2. Meningkatkan profesionalisme tenaga pendidik dan kependidikan dengan etos kerja tinggi.\n3. Mewujudkan lingkungan berwawasan IPTEK.\n4. Menciptakan sekolah sehat,bersih dan nyaman.",
            deskripsi:
                "SMP Katolik St. Rafael adalah sekolah yang berkomitmen membentuk generasi cerdas, berkarakter, dan berlandaskan nilai moral serta spiritual.",
            nama_kepala_sekolah: "Herman Ventje Dien, S.Fils",
            sambutan_kepala_sekolah:
                "Selamat datang di website resmi SMP Katolik St. Rafael. Website ini kami hadirkan sebagai sarana informasi sekolah yang terbuka, informatif, dan mudah diakses.",
        },
        create: {
            nama_sekolah: "SMP Katolik St. Rafael Manado",
            visi: "Membentuk peserta didik menjadi manusia yang seutuhnya ,beriman,unggul,bijaksana dan pancasilais sesuai semangat Santo Rafael",
            misi: "1. Mewujudkan religiusitas dalam diri warga sekolah sehingga kehidupan beriman dan persaudaraan sejati semakin berkembang.\n2. Meningkatkan profesionalisme tenaga pendidik dan kependidikan dengan etos kerja tinggi.\n3. Mewujudkan lingkungan berwawasan IPTEK.\n4. Menciptakan sekolah sehat,bersih dan nyaman.",
            deskripsi:
                "SMP Katolik St. Rafael adalah sekolah yang berkomitmen membentuk generasi cerdas, berkarakter, dan berlandaskan nilai moral serta spiritual.",
            nama_kepala_sekolah: "Herman Ventje Dien, S.Fils",
            sambutan_kepala_sekolah: "Selamat datang di website resmi SMP Katolik St. Rafael.",
            id_admin: admin.id_admin,
        },
    });
    console.log("✅ Profil sekolah dibuat");

    /* ──────────────────── KONTAK ──────────────────── */
    /* Cek apakah kontak untuk admin ini sudah ada, kalau belum baru dibuat */
    const existingKontak = await prisma.kontak.findFirst({
        where: {id_admin: admin.id_admin},
    });
    if (!existingKontak) {
        await prisma.kontak.create({
            data: {
                alamat: "Jl. Santo Joseph, Kleak, Kec. Malalayang, Kota Manado, Sulawesi Utara",
                no_telpon: "0431826030",
                email: "smp@exmaple.sch.id",
                media_sosial: JSON.stringify({
                    instagram: "@straphael.official",
                    facebook: "SMP Katolik Santu Rafael Manado",
                    youtube: "SMP KATOLIS ST RAFAEL MANADO",
                }),
                whatsapp: "6285218978970",
                link_maps: "https://maps.app.goo.gl/LifGUcbgG4tWN5Rx5",
                id_admin: admin.id_admin,
            },
        });
    }
    console.log("✅ Kontak dibuat");

    /* ──────────────────── BERITA ──────────────────── */
    const beritaData = [
        {
            judul: "Pembukaan Tahun Ajaran Baru 2024/2025",
            deskripsi: "Kegiatan pembukaan tahun ajaran baru berlangsung dengan tertib dan meriah.",
        },
        {
            judul: "Siswa Raih Juara 1 Lomba Pidato Tingkat Kota",
            deskripsi:
                "Salah satu siswa SMP Katolik St. Rafael berhasil meraih prestasi membanggakan di bidang pidato.",
        },
        {
            judul: "Kegiatan Bakti Sosial Sekolah",
            deskripsi:
                "Sekolah melaksanakan kegiatan bakti sosial sebagai wujud kepedulian kepada masyarakat.",
        },
        {
            judul: "Persiapan Ujian Akhir Semester",
            deskripsi:
                "Pihak sekolah mengingatkan seluruh siswa untuk mempersiapkan diri menghadapi ujian akhir semester.",
        },
    ];

    for (const item of beritaData) {
        await prisma.berita.create({
            data: {...item, id_admin: admin.id_admin},
        });
    }
    console.log(`✅ ${beritaData.length} Berita dibuat`);

    /* ──────────────────── PENGUMUMAN ──────────────────── */
    const pengumumanData = [
        {
            judul: "Pendaftaran Ulang Tahun Ajaran Baru",
            deksripsi: "Pendaftaran Ulang untuk tahun ajaran 2024/2025 telah dibuka. Siswa dapat mendaftar ulang di ruang kesiswaan setiap hari Senin-Jumat pukul 09.00-12.00. ",
        },
    ];

    for (const item of pengumumanData) {
        await prisma.pengumuman.create({
            data: {...item, id_admin: admin.id_admin},
        });
    }
    console.log(`✅ ${pengumumanData.length} Pengumuman dibuat`);

    /* ──────────────────── PRESTASI ──────────────────── */
    const prestasiData = [
        {
            judul: "Juara 2 Olimpiade Sains Nasional Tingkat Kota Manado 2024",
            deskripsi:
                "Diraih oleh siswa pada kompetisi tingkat Nasional",
            peraih: "Kolhoze Heavenly Yang",
        },
        {
            judul: "Juara 2 Olimpiade IPA Mentari Group Tingkat Nasional 2024",
            deskripsi:
                "Tim futsal sekolah berhasil meraih posisi runner-up pada kompetisi antar SMP yang diikuti 24 sekolah.",
            peraih: "Ailleen Nathania Lumowa",
        }
    ];

    for (const item of prestasiData) {
        await prisma.prestasi.create({
            data: {...item, id_admin: admin.id_admin},
        });
    }
    console.log(`✅ ${prestasiData.length} Prestasi dibuat`);

    /* ──────────────────── EKSTRAKURIKULER ──────────────────── */
    const ekstrakurikulerData = [
        {
            nama: "Paduan Suara",
            deskripsi:
                "Kegiatan seni vokal yang melatih siswa untuk bernyanyi secara harmonis dalam kelompok. Meningkatkan kepercayaan diri, kepekaan musik, dan kerja sama antar anggota.",
            pembina: "Selomitha Nong S.Pd.",
            jadwal: "Setiap Jumat, 14.00 - 16.00 WIB",
        },
        {
            nama: "Pramuka",
            deskripsi:
                "Kegiatan kepramukaan yang membentuk karakter siswa menjadi pribadi mandiri, disiplin, dan bertanggung jawab melalui berbagai kegiatan petualangan dan sosial.",
            pembina: "Antonius Rahmat, S.Pd.",
            jadwal: "Setiap Rabu, 14.00 - 16.00 WIB",
        },
        {
            nama: "Volly",
            deskripsi:
                "Olahraga tim yang melatih kemampuan fisik, sportivitas, dan strategi bermain. Terbuka untuk siswa putra dan putri.",
            pembina: "Reins Santoso",
            jadwal: "Setiap Sabtu, 08.00 - 10.00 WIB",
        },
        {
            nama: "Kolintang",
            deskripsi:
                "Ekstrakurikuler Kolintang yang membina siswa dalam melestarikan alat musik daerah Sulawesi.",
            pembina: "Dewi Karmulia S.Sn.",
            jadwal: "Setiap Kamis, 14.00 - 16.00 WIB",
        },
    ];

    for (const item of ekstrakurikulerData) {
        await prisma.ekstrakurikuler.create({
            data: {...item, id_admin: admin.id_admin},
        });
    }
    console.log(`✅ ${ekstrakurikulerData.length} Ekstrakurikuler dibuat`);

    /* ──────────────────── PROGRAM UNGGULAN ──────────────────── */
    const programData = [
        {
            nama: "Program Penguatan Karakter",
            deskripsi:
                "Program rutin yang dirancang untuk membentuk karakter siswa melalui kegiatan refleksi, doa bersama, dan pembinaan moral berbasis nilai Kristiani.",
        },
        {
            nama: "Kelas Bilingual",
            deskripsi:
                "Program pembelajaran dwibahasa (Indonesia-Inggris) yang diterapkan pada mata pelajaran tertentu untuk meningkatkan kemampuan berbahasa siswa.",
        },
        {
            nama: "Pendampingan Akademik",
            deskripsi:
                "Bimbingan belajar tambahan yang diberikan oleh guru untuk siswa yang membutuhkan perhatian khusus dalam mata pelajaran tertentu.",
        },
    ];

    for (const item of programData) {
        await prisma.programUnggulan.create({
            data: {...item, id_admin: admin.id_admin},
        });
    }
    console.log(`✅ ${programData.length} Program Unggulan dibuat`);

    /* ──────────────────── FASILITAS ──────────────────── */
    const fasilitasData = [
        {
            nama: "Laboratorium Komputer",
            deskripsi:
                "Laboratorium komputer dilengkapi dengan 30 unit PC terbaru dan koneksi internet berkecepatan tinggi untuk mendukung pembelajaran TIK dan kegiatan digital.",
        },
        {
            nama: "Perpustakaan Sekolah",
            deskripsi:
                "Perpustakaan yang nyaman dengan koleksi lebih dari 5.000 judul buku pelajaran, fiksi, dan referensi. Dilengkapi dengan area baca yang tenang.",
        },
        {
            nama: "Lapangan Olahraga",
            deskripsi:
                "Lapangan serbaguna yang dapat digunakan untuk kegiatan olahraga seperti futsal, basket, dan upacara bendera. Dilengkapi dengan tribun penonton.",
        },
        {
            nama: "Laboratorium IPA",
            deskripsi:
                "Laboratorium sains yang dilengkapi peralatan eksperimen biologi, kimia, dan fisika untuk mendukung pembelajaran berbasis praktikum.",
        },
        {
            nama: "Aula dan Kapel",
            deskripsi:
                "Ruang serbaguna yang digunakan untuk kegiatan rohani, seminar, dan acara-acara besar sekolah. Kapel menjadi pusat kegiatan ibadat seluruh warga sekolah.",
        },
    ];

    for (const item of fasilitasData) {
        await prisma.fasilitas.create({
            data: {...item, id_admin: admin.id_admin},
        });
    }
    console.log(`✅ ${fasilitasData.length} Fasilitas dibuat`);

    /* ──────────────────── PENDAFTAR (contoh) ──────────────────── */
    const pendaftar = await prisma.pendaftar.upsert({
        where: {no_pendaftaran: "RPL-2024-001"},
        update: {},
        create: {
            no_pendaftaran: "RPL-2024-001",
            nama_lengkap: "Maltrian Ahmad Terok",
            kata_sandi: hashedPendaftarPass,
            nisn: "0012345678",
            nik: "6371010102120001",
            jenis_kelamin: "L",
            tempat_lahir: "Bahu",
            tanggal_lahir: new Date("2012-02-01"),
            alamat: "Jl. Mawar No. 5, Laikit",
            no_hp: "081234567891",
            email: "ahmad@email.com",
            asal_sekolah: "SD Negeri 1 Bitung",
            nama_ayah: "Mackie",
            nama_ibu: "Dewi Lestari",
            tahun_ajaran: "2024/2025",
        },
    });

    /* ──────────────────── DOKUMEN untuk Pendaftar ──────────────────── */
    const existingDokumen = await prisma.dokumen.findFirst({
        where: {
            id_pendaftar: pendaftar.id_pendaftar,
            nama_dokumen: "Akta Kelahiran",
            versi_upload: 1,
        },
    });
    if (!existingDokumen) {
        await prisma.dokumen.create({
            data: {
                nama_dokumen: "Akta Kelahiran",
                mime_type: "application/pdf",
                ukuran_file: 204800,
                versi_upload: 1,
                status_verifikasi: "menunggu_verifikasi",
                id_pendaftar: pendaftar.id_pendaftar,
            },
        });
    }
    console.log(`✅ Pendaftar dan Dokumen contoh dibuat`);

    console.log("\n🎉 Seeding selesai!\n");
    console.log("──────────────────────────────");
    console.log("  Login Akun:");
    console.log(`  Admin        → username: admin       | password: Admin123!`);
    console.log(`  Verifikator  → username: verifikator | password: Verif123!`);
    console.log(`  Pendaftar    → username: Maltrian    | password: Maltrian123!`);
    console.log("──────────────────────────────");
}

main()
    .catch((e) => {
        console.error("❌ Seed gagal:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
