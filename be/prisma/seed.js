import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Mulai proses seeding...\n");

  const hashedAdminPass = await bcrypt.hash("Admin123!", 10);
  const hashedVerifPass = await bcrypt.hash("Verif123!", 10);

  /* ──────────────────── ADMIN ──────────────────── */
  const admin = await prisma.admin.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: hashedAdminPass,
      nama: "Administrator Sekolah",
      is_active: true,
    },
  });
  console.log("✅ Admin dibuat:", admin.username);

  /* ──────────────────── VERIFIKATOR ──────────────────── */
  const verifikator = await prisma.verifikator.upsert({
    where: { username: "verifikator" },
    update: {},
    create: {
      username: "verifikator",
      password: hashedVerifPass,
      nama: "Syanne ",
      is_active: true,
    },
  });
  console.log("✅ Verifikator dibuat:", verifikator.username);

  /* ──────────────────── PROFIL ──────────────────── */
  const profil = await prisma.profil.upsert({
    where: { nama_sekolah: "SMP Katolik St. Rafael" },
    update: {
 visi: "Membentuk peserta didik menjadi manusia yang seutuhnya ,beriman,unggul,bijaksana dan pancasilais sesuai semangat Santo Rafael",
      misi: "1. Mewujudkan religiusitas dalam diri warga sekolah sehingga kehidupan beriman dan persaudaraan sejati semakin berkembang.\n2. Meningkatkan profesionalisme tenaga pendidik dan kependidikan dengan etos kerja tinggi.\n3. Mewujudkan lingkungan berwawasan IPTEK.\n4. Menciptakan sekolah sehat,bersih dan nyaman.",
      deskripsi: "SMP Katolik St. Rafael adalah sekolah yang berkomitmen membentuk generasi cerdas, berkarakter, dan berlandaskan nilai moral serta spiritual.",
      nama_kepala_sekolah: "Herman Ventje Dien, S.Fils",
      sambutan_kepala_sekolah: "Selamat datang di website resmi SMP Katolik St. Rafael. Website ini kami hadirkan sebagai sarana informasi sekolah yang terbuka, informatif, dan mudah diakses.",
    },
    create: {
      nama_sekolah: "SMP Katolik St. Rafael Manado",
      visi: "Membentuk peserta didik menjadi manusia yang seutuhnya ,beriman,unggul,bijaksana dan pancasilais sesuai semangat Santo Rafael",
      misi: "1. Mewujudkan religiusitas dalam diri warga sekolah sehingga kehidupan beriman dan persaudaraan sejati semakin berkembang.\n2. Meningkatkan profesionalisme tenaga pendidik dan kependidikan dengan etos kerja tinggi.\n3. Mewujudkan lingkungan berwawasan IPTEK.\n4. Menciptakan sekolah sehat,bersih dan nyaman.",
      deskripsi: "SMP Katolik St. Rafael adalah sekolah yang berkomitmen membentuk generasi cerdas, berkarakter, dan berlandaskan nilai moral serta spiritual.",
      nama_kepala_sekolah: "Herman Ventje Dien, S.Fils",
      sambutan_kepala_sekolah: "Selamat datang di website resmi SMP Katolik St. Rafael.",
      id_admin: admin.id_admin,
    },
  });
  console.log("✅ Profil sekolah dibuat");

  /* ──────────────────── KONTAK ──────────────────── */
  /* Cek apakah kontak untuk admin ini sudah ada, kalau belum baru dibuat */
  const existingKontak = await prisma.kontak.findFirst({
    where: { id_admin: admin.id_admin },
  });
  if (!existingKontak) {
    await prisma.kontak.create({
      data: {
        alamat: "Jl. Pendidikan No. 10, Banjarmasin, Kalimantan Selatan",
        no_telpon: "0511-3221110",
        email: "smp@exmaple.sch.id",
        media_sosial: JSON.stringify({
          instagram: "@straphael.official",
          facebook: "SMP Katolik St. Rafael",
          youtube: "St. Rafael Banjarmasin",
        }),
        whatsapp: "6281234567890",
        link_maps: "https://maps.google.com/?q=SMP+Katolik+St+Rafael",
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
      isi: "Sekolah mengawali tahun ajaran baru dengan Masa Pengenalan Lingkungan Sekolah (MPLS), sambutan Kepala Sekolah, serta pengarahan kepada siswa baru dan orang tua. Semua berjalan lancar dan penuh semangat.",
      status: "published",
      published_at: new Date("2024-07-15"),
    },
    {
      judul: "Siswa Raih Juara 1 Lomba Pidato Tingkat Kota",
      deskripsi: "Salah satu siswa SMP Katolik St. Rafael berhasil meraih prestasi membanggakan di bidang pidato.",
      isi: "Atas nama sekolah, kami mengucapkan selamat kepada Bintang (VIII-A) yang berhasil meraih Juara 1 Lomba Pidato Bahasa Indonesia tingkat Kota Banjarmasin. Prestasi ini membuktikan bahwa pembinaan intensif memberikan hasil.",
      status: "published",
      published_at: new Date("2024-09-20"),
    },
    {
      judul: "Kegiatan Bakti Sosial Sekolah",
      deskripsi: "Sekolah melaksanakan kegiatan bakti sosial sebagai wujud kepedulian kepada masyarakat.",
      isi: "Kegiatan bakti sosial yang melibatkan seluruh warga sekolah ini berhasil mengumpulkan dan mendistribusikan bantuan berupa sembako kepada keluarga kurang mampu di sekitar lingkungan sekolah.",
      status: "published",
      published_at: new Date("2024-10-05"),
    },
    {
      judul: "Persiapan Ujian Akhir Semester",
      deskripsi: "Pihak sekolah mengingatkan seluruh siswa untuk mempersiapkan diri menghadapi ujian akhir semester.",
      isi: "Ujian Akhir Semester (UAS) akan dilaksanakan pada bulan Desember. Siswa diharapkan untuk belajar dengan giat dan memanfaatkan bimbingan belajar yang disediakan sekolah.",
      status: "published",
      published_at: new Date("2024-11-15"),
    },
  ];

  for (const item of beritaData) {
    await prisma.berita.create({
      data: { ...item, id_admin: admin.id_admin },
    });
  }
  console.log(`✅ ${beritaData.length} Berita dibuat`);

  /* ──────────────────── PENGUMUMAN ──────────────────── */
  const pengumumanData = [
    {
      judul: "Jadwal Ujian Tengah Semester Ganjil 2024",
      isi: "Ujian Tengah Semester (UTS) Ganjil akan dilaksanakan pada tanggal 7-11 Oktober 2024. Siswa diminta hadir 15 menit sebelum ujian dimulai dan membawa perlengkapan tulis yang diperlukan.",
      status: "published",
      tampil_mulai: new Date("2024-09-25"),
      tampil_sampai: new Date("2024-10-11"),
      tahun_ajaran: "2024/2025",
    },
    {
      judul: "Libur Nasional Hari Kemerdekaan",
      isi: "Sehubungan dengan perayaan Hari Kemerdekaan Republik Indonesia ke-79, sekolah akan libur pada tanggal 17 Agustus 2024. Kegiatan belajar mengajar akan dilanjutkan kembali pada tanggal 19 Agustus 2024.",
      status: "published",
      tampil_mulai: new Date("2024-08-10"),
      tampil_sampai: new Date("2024-08-17"),
      tahun_ajaran: "2024/2025",
    },
    {
      judul: "Pendaftaran Ekstrakurikuler Tahun Ajaran Baru",
      isi: "Pendaftaran ekstrakurikuler untuk tahun ajaran 2024/2025 telah dibuka. Siswa dapat mendaftar di ruang kesiswaan setiap hari Senin-Jumat pukul 09.00-12.00. Tersedia pilihan: Paduan Suara, Pramuka, Futsal, dan lainnya.",
      status: "published",
      tampil_mulai: new Date("2024-07-20"),
      tampil_sampai: new Date("2024-08-05"),
      tahun_ajaran: "2024/2025",
    },
  ];

  for (const item of pengumumanData) {
    await prisma.pengumuman.create({
      data: { ...item, id_admin: admin.id_admin },
    });
  }
  console.log(`✅ ${pengumumanData.length} Pengumuman dibuat`);

  /* ──────────────────── PRESTASI ──────────────────── */
  const prestasiData = [
    {
      judul: "Juara 1 Lomba Pidato Bahasa Indonesia",
      deskripsi: "Diraih oleh siswa kelas VIII pada kompetisi tingkat kota yang diselenggarakan oleh Dinas Pendidikan.",
      tahun: "2024",
    },
    {
      judul: "Juara 2 Futsal Antar SMP Se-Kota",
      deskripsi: "Tim futsal sekolah berhasil meraih posisi runner-up pada kompetisi antar SMP yang diikuti 24 sekolah.",
      tahun: "2024",
    },
    {
      judul: "Harapan 1 Olimpiade Matematika Kabupaten",
      deskripsi: "Prestasi membanggakan dari siswa kelas IX yang mengikuti olimpiade matematika tingkat kabupaten.",
      tahun: "2023",
    },
    {
      judul: "Juara 3 Lomba Karya Ilmiah Remaja",
      deskripsi: "Prestasi di bidang sains yang diraih oleh tim siswa SMP Katolik St. Rafael pada ajang Lomba KIR Provinsi.",
      tahun: "2023",
    },
  ];

  for (const item of prestasiData) {
    await prisma.prestasi.create({
      data: { ...item, id_admin: admin.id_admin },
    });
  }
  console.log(`✅ ${prestasiData.length} Prestasi dibuat`);

  /* ──────────────────── EKSTRAKURIKULER ──────────────────── */
  const ekstrakurikulerData = [
    {
      nama: "Paduan Suara",
      deskripsi: "Kegiatan seni vokal yang melatih siswa untuk bernyanyi secara harmonis dalam kelompok. Meningkatkan kepercayaan diri, kepekaan musik, dan kerja sama antar anggota.",
      mentor: "Ibu Selomitha Nong, S.Pd.",
      jadwal: "Setiap Jumat, 14.00 - 16.00 WIB",
    },
    {
      nama: "Pramuka",
      deskripsi: "Kegiatan kepramukaan yang membentuk karakter siswa menjadi pribadi mandiri, disiplin, dan bertanggung jawab melalui berbagai kegiatan petualangan dan sosial.",
      mentor: "Bapak Antonius Rahmat, S.Pd.",
      jadwal: "Setiap Rabu, 14.00 - 16.00 WIB",
    },
    {
      nama: "Futsal",
      deskripsi: "Olahraga tim yang melatih kemampuan fisik, sportivitas, dan strategi bermain. Terbuka untuk siswa putra dan putri.",
      mentor: "Bapak Reins Santoso",
      jadwal: "Setiap Sabtu, 08.00 - 10.00 WIB",
    },
    {
      nama: "Tari Tradisional",
      deskripsi: "Ekstrakurikuler seni budaya yang membina siswa dalam melestarikan tarian daerah Kalimantan dan Nusantara.",
      mentor: "Ibu Dewi Karmulia, S.Sn.",
      jadwal: "Setiap Kamis, 14.00 - 16.00 WIB",
    },
  ];

  for (const item of ekstrakurikulerData) {
    await prisma.ekstrakurikuler.create({
      data: { ...item, id_admin: admin.id_admin },
    });
  }
  console.log(`✅ ${ekstrakurikulerData.length} Ekstrakurikuler dibuat`);

  /* ──────────────────── PROGRAM UNGGULAN ──────────────────── */
  const programData = [
    {
      nama: "Program Penguatan Karakter",
      deskripsi: "Program rutin yang dirancang untuk membentuk karakter siswa melalui kegiatan refleksi, doa bersama, dan pembinaan moral berbasis nilai Kristiani.",
    },
    {
      nama: "Kelas Bilingual",
      deskripsi: "Program pembelajaran dwibahasa (Indonesia-Inggris) yang diterapkan pada mata pelajaran tertentu untuk meningkatkan kemampuan berbahasa siswa.",
    },
    {
      nama: "Pendampingan Akademik",
      deskripsi: "Bimbingan belajar tambahan yang diberikan oleh guru untuk siswa yang membutuhkan perhatian khusus dalam mata pelajaran tertentu.",
    },
  ];

  for (const item of programData) {
    await prisma.programUnggulan.create({
      data: { ...item, id_admin: admin.id_admin },
    });
  }
  console.log(`✅ ${programData.length} Program Unggulan dibuat`);

  /* ──────────────────── FASILITAS ──────────────────── */
  const fasilitasData = [
    {
      nama: "Laboratorium Komputer",
      deskripsi: "Laboratorium komputer dilengkapi dengan 30 unit PC terbaru dan koneksi internet berkecepatan tinggi untuk mendukung pembelajaran TIK dan kegiatan digital.",
    },
    {
      nama: "Perpustakaan Sekolah",
      deskripsi: "Perpustakaan yang nyaman dengan koleksi lebih dari 5.000 judul buku pelajaran, fiksi, dan referensi. Dilengkapi dengan area baca yang tenang.",
    },
    {
      nama: "Lapangan Olahraga",
      deskripsi: "Lapangan serbaguna yang dapat digunakan untuk kegiatan olahraga seperti futsal, basket, dan upacara bendera. Dilengkapi dengan tribun penonton.",
    },
    {
      nama: "Laboratorium IPA",
      deskripsi: "Laboratorium sains yang dilengkapi peralatan eksperimen biologi, kimia, dan fisika untuk mendukung pembelajaran berbasis praktikum.",
    },
    {
      nama: "Aula dan Kapel",
      deskripsi: "Ruang serbaguna yang digunakan untuk kegiatan rohani, seminar, dan acara-acara besar sekolah. Kapel menjadi pusat kegiatan ibadat seluruh warga sekolah.",
    },
  ];

  for (const item of fasilitasData) {
    await prisma.fasilitas.create({
      data: { ...item, id_admin: admin.id_admin },
    });
  }
  console.log(`✅ ${fasilitasData.length} Fasilitas dibuat`);

  /* ──────────────────── PENDAFTAR (contoh) ──────────────────── */
  const pendaftar = await prisma.pendaftar.upsert({
    where: { no_pendaftaran: "RPL-2024-001" },
    update: {},
    create: {
      no_pendaftaran: "RPL-2024-001",
      nama_lengkap: "Budi Santoso",
      nisn: "0012345678",
      nik: "6371010102120001",
      jenis_kelamin: "L",
      tempat_lahir: "Banjarmasin",
      tanggal_lahir: new Date("2012-02-01"),
      alamat: "Jl. Mawar No. 5, Banjarmasin",
      no_hp: "081234567891",
      email: "budi.wali@email.com",
      asal_sekolah: "SD Negeri 1 Banjarmasin",
      nama_ayah: "Santoso",
      nama_ibu: "Dewi Lestari",
      tahun_ajaran: "2024/2025",
      status_pendaftaran: "active",
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
        file_asli: "akta-kelahiran-budi.pdf",
        file_path: "/uploads/dokumen/akta-kelahiran-budi.pdf",
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
  console.log("  Admin        → username: admin       | password: admin12345");
  console.log("  Verifikator  → username: verifikator | password: verif12345");
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