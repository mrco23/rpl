import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
	console.log("🌱 Mulai proses seeding...\n");

	const hashedAdminPass = await bcrypt.hash("Admin123!", 10);
	const hashedVerifPass = await bcrypt.hash("Mitha123!", 10);
	const hashedPendaftarPass = await bcrypt.hash("Maltrian123!", 10);

	/* ──────────────────── ADMIN ──────────────────── */
	const admin = await prisma.admin.upsert({
		where: { username: "admin" },
		update: {},
		create: {
			username: "admin",
			password: hashedAdminPass,
		},
	});
	console.log("✅ Admin dibuat:", admin.username);

	/* ──────────────────── VERIFIKATOR ──────────────────── */
	const verifikator = await prisma.verifikator.upsert({
		where: { username: "verifikator" },
		update: {},
		create: {
			username: "selomitha",
			password: hashedVerifPass,
			nama: "Selomitha Anastacia Nong",
		},
	});
	console.log("✅ Verifikator dibuat:", verifikator.username);

	/* ──────────────────── PROFIL ──────────────────── */
	const profil = await prisma.profil.upsert({
		where: { nama_sekolah: "SMP Katolik St. Rafael Manado" },
		update: {
			visi: "Membentuk peserta didik menjadi manusia yang seutuhnya ,beriman,unggul,bijaksana dan pancasilais sesuai semangat Santo Rafael",
			misi: "1. Mewujudkan religiusitas dalam diri warga sekolah sehingga kehidupan beriman dan persaudaraan sejati semakin berkembang.\n2. Meningkatkan profesionalisme tenaga pendidik dan kependidikan dengan etos kerja tinggi.\n3. Mewujudkan lingkungan berwawasan IPTEK.\n4. Menciptakan sekolah sehat,bersih dan nyaman.",
			nama_kepala_sekolah: "Herman Ventje Dien, S.Fils",
			foto_kepala_sekolah: "default-kepala-sekolah.jpg",
			kata_sambutan:
				"Selamat datang di website resmi SMP Katolik St. Rafael. Website ini kami hadirkan sebagai sarana informasi sekolah yang terbuka, informatif, dan mudah diakses.",
		},
		create: {
			nama_sekolah: "SMP Katolik St. Rafael Manado",
			visi: "Membentuk peserta didik menjadi manusia yang seutuhnya ,beriman,unggul,bijaksana dan pancasilais sesuai semangat Santo Rafael",
			misi: "1. Mewujudkan religiusitas dalam diri warga sekolah sehingga kehidupan beriman dan persaudaraan sejati semakin berkembang.\n2. Meningkatkan profesionalisme tenaga pendidik dan kependidikan dengan etos kerja tinggi.\n3. Mewujudkan lingkungan berwawasan IPTEK.\n4. Menciptakan sekolah sehat,bersih dan nyaman.",
			nama_kepala_sekolah: "Herman Ventje Dien, S.Fils",
			foto_kepala_sekolah: "default-kepala-sekolah.jpg",
			kata_sambutan: "Selamat datang di website resmi SMP Katolik St. Rafael.",
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
				no_telpon: "0431826030",
				email: "smp@exmaple.sch.id",
				whatsapp: "6285218978970",
				youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
				instagram: "https://www.instagram.com/smpkatolikstrafael/",
				facebook: "https://www.facebook.com/smpkatolikstrafael/",
				tiktok: "https://www.tiktok.com/smpkatolikstrafael/",
				id_admin: admin.id_admin,
			},
		});
	}
	console.log("✅ Kontak dibuat");

	/* ──────────────────── BERITA ──────────────────── */
	const beritaData = [
		{
			judul_berita: "Pembukaan Tahun Ajaran Baru 2024/2025",
			deskripsi: "Kegiatan pembukaan tahun ajaran baru berlangsung dengan tertib dan meriah.",
		},
		{
			judul_berita: "Siswa Raih Juara 1 Lomba Pidato Tingkat Kota",
			deskripsi:
				"Salah satu siswa SMP Katolik St. Rafael berhasil meraih prestasi membanggakan di bidang pidato.",
		},
		{
			judul_berita: "Kegiatan Bakti Sosial Sekolah",
			deskripsi:
				"Sekolah melaksanakan kegiatan bakti sosial sebagai wujud kepedulian kepada masyarakat.",
		},
		{
			judul_berita: "Persiapan Ujian Akhir Semester",
			deskripsi:
				"Pihak sekolah mengingatkan seluruh siswa untuk mempersiapkan diri menghadapi ujian akhir semester.",
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
			judul_pengumuman: "Pendaftaran Ulang Tahun Ajaran Baru",
			deksripsi:
				"Pendaftaran Ulang untuk tahun ajaran 2024/2025 telah dibuka. Siswa dapat mendaftar ulang di ruang kesiswaan setiap hari Senin-Jumat pukul 09.00-12.00. ",
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
			judul_prestasi: "Juara 2 Olimpiade Sains Nasional Tingkat Kota Manado 2024",
			deskripsi: "Diraih oleh siswa pada kompetisi tingkat Nasional",
			peraih_prestasi: "Kolhoze Heavenly Yang",
		},
		{
			judul_prestasi: "Juara 2 Olimpiade IPA Mentari Group Tingkat Nasional 2024",
			deskripsi:
				"Tim futsal sekolah berhasil meraih posisi runner-up pada kompetisi antar SMP yang diikuti 24 sekolah.",
			peraih_prestasi: "Ailleen Nathania Lumowa",
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
			nama_ekskul: "Paduan Suara",
			deskripsi:
				"Kegiatan seni vokal yang melatih siswa untuk bernyanyi secara harmonis dalam kelompok. Meningkatkan kepercayaan diri, kepekaan musik, dan kerja sama antar anggota.",
			p_jwb_ekskul: "Selomitha Nong S.Pd.",
		},
		{
			nama_ekskul: "Pramuka",
			deskripsi:
				"Kegiatan kepramukaan yang membentuk karakter siswa menjadi pribadi mandiri, disiplin, dan bertanggung jawab melalui berbagai kegiatan petualangan dan sosial.",
			p_jwb_ekskul: "Antonius Rahmat, S.Pd.",
		},
		{
			nama_ekskul: "Volly",
			deskripsi:
				"Olahraga tim yang melatih kemampuan fisik, sportivitas, dan strategi bermain. Terbuka untuk siswa putra dan putri.",
			p_jwb_ekskul: "Reins Santoso",
		},
		{
			nama_ekskul: "Kolintang",
			deskripsi:
				"Ekstrakurikuler Kolintang yang membina siswa dalam melestarikan alat musik daerah Sulawesi.",
			p_jwb_ekskul: "Dewi Karmulia S.Sn.",
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
			data: { ...item, id_admin: admin.id_admin },
		});
	}
	console.log(`✅ ${programData.length} Program Unggulan dibuat`);

	/* ──────────────────── FASILITAS ──────────────────── */
	const fasilitasData = [
		{
			nama_fasilitas: "Laboratorium Komputer",
			deskripsi:
				"Laboratorium komputer dilengkapi dengan 30 unit PC terbaru dan koneksi internet berkecepatan tinggi untuk mendukung pembelajaran TIK dan kegiatan digital.",
		},
		{
			nama_fasilitas: "Perpustakaan Sekolah",
			deskripsi:
				"Perpustakaan yang nyaman dengan koleksi lebih dari 5.000 judul buku pelajaran, fiksi, dan referensi. Dilengkapi dengan area baca yang tenang.",
		},
		{
			nama_fasilitas: "Lapangan Olahraga",
			deskripsi:
				"Lapangan serbaguna yang dapat digunakan untuk kegiatan olahraga seperti futsal, basket, dan upacara bendera. Dilengkapi dengan tribun penonton.",
		},
		{
			nama_fasilitas: "Laboratorium IPA",
			deskripsi:
				"Laboratorium sains yang dilengkapi peralatan eksperimen biologi, kimia, dan fisika untuk mendukung pembelajaran berbasis praktikum.",
		},
		{
			nama_fasilitas: "Aula dan Kapel",
			deskripsi:
				"Ruang serbaguna yang digunakan untuk kegiatan rohani, seminar, dan acara-acara besar sekolah. Kapel menjadi pusat kegiatan ibadat seluruh warga sekolah.",
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
		where: { nisn: "0012345678" },
		update: {},
		create: {
			nama_lengkap: "Maltrian Ahmad Terok",
			kata_sandi: hashedPendaftarPass,
			nisn: "24013058",
			jenis_kelamin: "L",
			tempat_lahir: "Bahu",
			tanggal_lahir: new Date("2012-02-01"),
			alamat: "Jl. Mawar No. 5, Laikit",
			no_hp: "081234567891",
			email: "ahmad@email.com",
			asal_sekolah: "SD Negeri 1 Bitung",
			nama_wali: "Chelsea Blessing Christenia Manahampi",
		},
	});

	/* ──────────────────── DOKUMEN untuk Pendaftar ──────────────────── */
	const existingDokumen = await prisma.dokumen.findFirst({
		where: {
			id_pendaftar: pendaftar.id_pendaftar,
			nama_dokumen: "Akta Kelahiran",
			jenis_dokumen: "pdf",
		},
	});
	if (!existingDokumen) {
		await prisma.dokumen.create({
			data: {
				nama_dokumen: "Akta Kelahiran",
				jenis_dokumen: "akta",
				id_pendaftar: pendaftar.id_pendaftar,
			},
		});
	}
	console.log(`✅ Pendaftar dan Dokumen contoh dibuat`);

	console.log("\n🎉 Seeding selesai!\n");
	console.log("──────────────────────────────");
	console.log("  Login Akun:");
	console.log(`  Admin        → username: admin       | password: Admin123!`);
	console.log(`  Verifikator  → username: selomitha | password: Verif123!`);
	console.log(`  Pendaftar    → nisn: 24013058    | password: Maltrian123!`);
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
