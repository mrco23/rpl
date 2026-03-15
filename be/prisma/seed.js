import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin12345", 10);

  const profilSekolah = await prisma.profil_Sekolah.upsert({
    where: {
      nama_sekolah: "SMP Katolik St. Rafael",
    },
    update: {
      visi: "Menjadi sekolah yang unggul dalam iman, ilmu, dan karakter.",
      misi: `
1. Menanamkan nilai iman, integritas, dan disiplin.
2. Mengembangkan potensi akademik dan non akademik peserta didik.
3. Membangun budaya belajar yang aktif, kreatif, dan kolaboratif.
4. Menyiapkan siswa yang peduli terhadap lingkungan dan masyarakat.
      `.trim(),
      deskripsi:
        "SMP Katolik St. Rafael adalah sekolah yang berkomitmen membentuk generasi yang cerdas, berkarakter, disiplin, dan berlandaskan nilai moral serta spiritual.",
      logo: "/uploads/default-logo.png",
      nama_kepala_sekolah: "Yohanes Maria, S.Pd.",
      foto_kepala_sekolah: "/uploads/default-kepsek.png",
      sambutan_kepala_sekolah:
        "Selamat datang di website resmi SMP Katolik St. Rafael. Website ini kami hadirkan sebagai sarana informasi sekolah yang terbuka, informatif, dan mudah diakses oleh siswa, orang tua, dan masyarakat. Kami berharap media ini dapat menjadi jembatan komunikasi yang baik antara sekolah dan seluruh pihak yang terlibat dalam pendidikan.",
    },
    create: {
      nama_sekolah: "SMP Katolik St. Rafael",
      visi: "Menjadi sekolah yang unggul dalam iman, ilmu, dan karakter.",
      misi: `
1. Menanamkan nilai iman, integritas, dan disiplin.
2. Mengembangkan potensi akademik dan non akademik peserta didik.
3. Membangun budaya belajar yang aktif, kreatif, dan kolaboratif.
4. Menyiapkan siswa yang peduli terhadap lingkungan dan masyarakat.
      `.trim(),
      deskripsi:
        "SMP Katolik St. Rafael adalah sekolah yang berkomitmen membentuk generasi yang cerdas, berkarakter, disiplin, dan berlandaskan nilai moral serta spiritual.",
      logo: "/uploads/default-logo.png",
      nama_kepala_sekolah: "Yohanes Maria, S.Pd.",
      foto_kepala_sekolah: "/uploads/default-kepsek.png",
      sambutan_kepala_sekolah:
        "Selamat datang di website resmi SMP Katolik St. Rafael. Website ini kami hadirkan sebagai sarana informasi sekolah yang terbuka, informatif, dan mudah diakses oleh siswa, orang tua, dan masyarakat. Kami berharap media ini dapat menjadi jembatan komunikasi yang baik antara sekolah dan seluruh pihak yang terlibat dalam pendidikan.",
    },
  });

  await prisma.kontak_Sekolah.upsert({
    where: {
      id_sekolah: profilSekolah.id_sekolah,
    },
    update: {
      alamat: "Jl. Pendidikan No. 10, Banjarmasin",
      no_telpon: "0511322111",
      email: "info@straphael.sch.id",
      media_sosial: "Instagram: @straphael.official | Facebook: SMP Katolik St. Rafael",
      whatsapp: "6281234567890",
    },
    create: {
      alamat: "Jl. Pendidikan No. 10, Banjarmasin",
      no_telpon: "0511322111",
      email: "info@straphael.sch.id",
      media_sosial: "Instagram: @straphael.official | Facebook: SMP Katolik St. Rafael",
      whatsapp: "6281234567890",
      id_sekolah: profilSekolah.id_sekolah,
    },
  });

  await prisma.pengguna.upsert({
    where: {
      username: "admin",
    },
    update: {
      password: hashedPassword,
      name: "Administrator",
      role: "admin",
      id_sekolah: profilSekolah.id_sekolah,
      photo_profil: "/uploads/default-admin.png",
    },
    create: {
      username: "admin",
      password: hashedPassword,
      name: "Administrator",
      role: "admin",
      id_sekolah: profilSekolah.id_sekolah,
      photo_profil: "/uploads/default-admin.png",
    },
  });

  const ekstrakurikulerData = [
    {
      nama: "Paduan Suara",
      deskripsi:
        "Kegiatan ekstrakurikuler untuk mengembangkan bakat vokal, kekompakan, dan kepercayaan diri siswa dalam bernyanyi bersama.",
      mentor: "Ibu Selomitha Nong S.Pd",
      jadwal: "Minggu, 19.00 - 22.00",
      gambar: "/uploads/ekskul-paduan-suara.jpg",
    },
    {
      nama: "Pramuka",
      deskripsi:
        "Kegiatan pembinaan karakter, kemandirian, disiplin, dan kerja sama melalui aktivitas kepramukaan.",
      mentor: "Bapak Antonius",
      jadwal: "Rabu, 14.00 - 16.00",
      gambar: "/uploads/ekskul-pramuka.jpg",
    },
    {
      nama: "Futsal",
      deskripsi:
        "Kegiatan olahraga yang bertujuan meningkatkan kebugaran, sportivitas, dan kerja sama tim siswa.",
      mentor: "Bapak Reins",
      jadwal: "Jumat, 15.00 - 17.00",
      gambar: "/uploads/ekskul-futsal.jpg",
    },
  ];

  for (const item of ekstrakurikulerData) {
    await prisma.ekstrakurikuler.create({
      data: {
        ...item,
        id_sekolah: profilSekolah.id_sekolah,
      },
    });
  }

  const beritaData = [
    {
      judul: "Pembukaan Tahun Ajaran Baru",
      deskripsi: "Kegiatan pembukaan tahun ajaran baru berlangsung dengan tertib dan meriah.",
      isi: "Sekolah mengawali tahun ajaran baru dengan kegiatan pengenalan lingkungan sekolah, sambutan kepala sekolah, serta pengarahan kepada siswa dan orang tua.",
      gambar: "/uploads/berita-tahun-ajaran.jpg",
    },
    {
      judul: "Siswa Raih Juara Lomba Pidato",
      deskripsi: "Salah satu siswa SMP Katolik St. Rafael berhasil meraih prestasi di tingkat kota.",
      isi: "Prestasi ini menjadi bukti bahwa siswa memiliki kemampuan akademik dan non akademik yang baik. Sekolah akan terus mendukung pengembangan bakat siswa di berbagai bidang.",
      gambar: "/uploads/berita-pidato.jpg",
    },
    {
      judul: "Kegiatan Bakti Sosial Sekolah",
      deskripsi: "Sekolah melaksanakan kegiatan bakti sosial sebagai bentuk kepedulian sosial.",
      isi: "Kegiatan bakti sosial melibatkan guru, siswa, dan orang tua dalam pengumpulan bantuan serta distribusi kepada masyarakat yang membutuhkan.",
      gambar: "/uploads/berita-baksos.jpg",
    },
  ];

  for (const item of beritaData) {
    await prisma.berita.create({
      data: {
        ...item,
        id_sekolah: profilSekolah.id_sekolah,
      },
    });
  }

  const prestasiData = [
    {
      judul: "Juara 1 Lomba Pidato Bahasa Indonesia",
      deskripsi: "Prestasi tingkat kota yang diraih oleh siswa kelas VIII pada ajang lomba pidato.",
      gambar: "/uploads/prestasi-pidato.jpg",
    },
    {
      judul: "Juara 2 Futsal Antar SMP",
      deskripsi: "Tim futsal sekolah berhasil meraih juara 2 pada kompetisi antar sekolah.",
      gambar: "/uploads/prestasi-futsal.jpg",
    },
    {
      judul: "Harapan 1 Olimpiade Matematika",
      deskripsi: "Siswa SMP Katolik St. Rafael meraih penghargaan pada ajang olimpiade matematika tingkat kabupaten.",
      gambar: "/uploads/prestasi-matematika.jpg",
    },
  ];

  for (const item of prestasiData) {
    await prisma.prestasi.create({
      data: {
        ...item,
        id_sekolah: profilSekolah.id_sekolah,
      },
    });
  }

  console.log("Seed berhasil dijalankan");
  console.log("Login admin:");
  console.log("username: admin");
  console.log("password: AdmingGanteng123!");
}

main()
  .catch((e) => {
    console.error("Seed gagal:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });