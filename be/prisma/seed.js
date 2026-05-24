import { PrismaClient } from "@prisma/client";
import { STATUS_PENDAFTARAN } from "../src/constants/statusPendaftaran.js";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const dokumenDummyUrl = {
	ijazah:
		"https://res.cloudinary.com/degcavmhp/image/upload/v1777905195/dokumen/zlqnl5wabncrict3xycm.jpg",
	akteKelahiran:
		"https://res.cloudinary.com/degcavmhp/image/upload/v1777904727/dokumen/vfei4nwrznsckmj8zb7y.jpg",
	pasFotoLakiLaki:
		"https://res.cloudinary.com/degcavmhp/image/upload/v1777906218/dokumen/wzcunlxmycikkfasylbr.jpg",
	pasFotoPerempuan:
		"https://res.cloudinary.com/degcavmhp/image/upload/v1777907048/dokumen/t6cv9usxbwzgo6ehajrh.jpg",
	kartuKeluarga:
		"https://res.cloudinary.com/degcavmhp/image/upload/v1778030052/dokumen/e2rq5ytg2exkoyuwqmwc.jpg",
};

const alamatManadoData = [
	{ kecamatan: "Wanea", kelurahan: "Karombasan Utara", kode_pos: "95117" },
	{ kecamatan: "Wanea", kelurahan: "Tingkulu", kode_pos: "95119" },
	{ kecamatan: "Malalayang", kelurahan: "Bahu", kode_pos: "95115" },
	{ kecamatan: "Malalayang", kelurahan: "Kleak", kode_pos: "95115" },
	{ kecamatan: "Sario", kelurahan: "Titiwungen Selatan", kode_pos: "95113" },
	{ kecamatan: "Sario", kelurahan: "Sario Utara", kode_pos: "95114" },
	{ kecamatan: "Wenang", kelurahan: "Mahakeret Timur", kode_pos: "95123" },
	{ kecamatan: "Tikala", kelurahan: "Tikala Baru", kode_pos: "95124" },
	{ kecamatan: "Paal Dua", kelurahan: "Dendengan Dalam", kode_pos: "95127" },
	{ kecamatan: "Mapanget", kelurahan: "Paniki Bawah", kode_pos: "95256" },
	{ kecamatan: "Tuminting", kelurahan: "Tumumpa Dua", kode_pos: "95239" },
	{ kecamatan: "Singkil", kelurahan: "Kombos Barat", kode_pos: "95234" },
];

const asalSekolahManado = [
	"SD Katolik St. Theresia Manado",
	"SD Katolik 01 St. Antonius Manado",
	"SD Katolik 03 Don Bosco Manado",
	"SD Katolik St. Clara Manado",
	"SD Negeri 06 Manado",
	"SD Negeri 11 Manado",
	"SD Negeri 30 Manado",
	"SD Negeri 54 Manado",
	"SD Inpres Malalayang Manado",
	"SD Inpres Paal Dua Manado",
	"SD GMIM 20 Manado",
	"SD Kristen Eben Haezar Manado",
];

const namaDepanLakiLaki = [
	"Aldo",
	"Benediktus",
	"Carlo",
	"Dion",
	"Evan",
	"Fabian",
	"Gabriel",
	"Jonathan",
	"Kevin",
	"Leonardo",
];

const namaDepanPerempuan = [
	"Agatha",
	"Beatrice",
	"Celine",
	"Debora",
	"Evelyn",
	"Felicia",
	"Gabriella",
	"Ivana",
	"Jessica",
	"Nathania",
];

const namaTengah = [
	"Rafael",
	"Christo",
	"Anugerah",
	"Emanuel",
	"Putra",
	"Putri",
	"Gracia",
	"Michael",
	"Angel",
	"Blessing",
];

const namaBelakang = [
	"Sondakh",
	"Wowor",
	"Pangemanan",
	"Lumowa",
	"Manampiring",
	"Runtuwene",
	"Tumbelaka",
	"Kairupan",
	"Mandagi",
	"Polii",
];

const namaWaliDummy = [
	"Andre Sondakh",
	"Merry Wowor",
	"Daniel Pangemanan",
	"Claudia Lumowa",
	"Johan Manampiring",
	"Yuliana Runtuwene",
	"Frans Tumbelaka",
	"Monica Kairupan",
	"Stefan Mandagi",
	"Lidia Polii",
];

function nomorUrut(value, length) {
	return String(value).padStart(length, "0");
}

function tanggalUtc(tahun, bulan, tanggal, jam = 0, menit = 0) {
	return new Date(Date.UTC(tahun, bulan - 1, tanggal, jam, menit, 0));
}

function tanggalLahirDummy(index) {
	const tahun = 2012 + (index % 2);
	const bulan = (index % 12) + 1;
	const tanggal = (index % 27) + 1;

	return tanggalUtc(tahun, bulan, tanggal);
}

function tanggalDaftarGelombang1(index) {
	return new Date(Date.UTC(2026, 0, 10 + index, 8 + (index % 7), (index * 5) % 60, 0));
}

function tanggalDaftarGelombang2(index) {
	return new Date(Date.UTC(2026, 4, 1 + (index % 9), 8 + (index % 8), (index * 7) % 60, 0));
}

function buatAlamatDummy(index) {
	const alamat = alamatManadoData[index % alamatManadoData.length];

	return {
		provinsi: "Sulawesi Utara",
		kota_kabupaten: "Kota Manado",
		kecamatan: alamat.kecamatan,
		kelurahan: alamat.kelurahan,
		rt_rw: `RT ${nomorUrut((index % 9) + 1, 3)} / RW ${nomorUrut((index % 6) + 1, 3)}`,
		kode_pos: alamat.kode_pos,
	};
}

function buatDokumenDummy(jenisKelamin, idVerifikator = null) {
	return [
		{
			nama_dokumen: "Ijazah",
			jenis_dokumen: dokumenDummyUrl.ijazah,
			id_verifikator: idVerifikator,
		},
		{
			nama_dokumen: "Foto Copy Akte Kelahiran",
			jenis_dokumen: dokumenDummyUrl.akteKelahiran,
			id_verifikator: idVerifikator,
		},
		{
			nama_dokumen: "Pas Foto",
			jenis_dokumen:
				jenisKelamin === "L" ? dokumenDummyUrl.pasFotoLakiLaki : dokumenDummyUrl.pasFotoPerempuan,
			id_verifikator: idVerifikator,
		},
		{
			nama_dokumen: "Foto Copy Kartu Keluarga",
			jenis_dokumen: dokumenDummyUrl.kartuKeluarga,
			id_verifikator: idVerifikator,
		},
	];
}

function buatCatatanDokumen(statusPendaftaran) {
	if (statusPendaftaran === STATUS_PENDAFTARAN.LULUS) {
		return "Dokumen lengkap dan memenuhi kriteria seleksi.";
	}

	if (statusPendaftaran === STATUS_PENDAFTARAN.TIDAK_LULUS) {
		return "Belum memenuhi kriteria seleksi pada Gelombang 1.";
	}

	return null;
}

function sudahDiverifikasi(statusPendaftaran) {
	return [STATUS_PENDAFTARAN.LULUS, STATUS_PENDAFTARAN.TIDAK_LULUS].includes(statusPendaftaran);
}

function buatPendaftarDummy({
	nomorGelombang,
	urutan,
	indexGlobal,
	statusPendaftaran,
	idGelombang,
	idVerifikator,
	password,
	tanggalDaftar,
}) {
	const jenisKelamin = indexGlobal % 2 === 0 ? "L" : "P";
	const namaDepan = jenisKelamin === "L" ? namaDepanLakiLaki : namaDepanPerempuan;
	const namaLengkap = `${namaDepan[indexGlobal % namaDepan.length]} ${namaTengah[(indexGlobal + urutan) % namaTengah.length]
		} ${namaBelakang[(indexGlobal * 3) % namaBelakang.length]}`;
	const nisn = `20260${nomorGelombang}${nomorUrut(urutan, 4)}`;
	const idVerifikatorTerpilih = sudahDiverifikasi(statusPendaftaran) ? idVerifikator : null;

	return {
		nama_lengkap: namaLengkap,
		kata_sandi: password,
		nisn,
		tempat_lahir: "Manado",
		tanggal_lahir: tanggalLahirDummy(indexGlobal),
		jenis_kelamin: jenisKelamin,
		no_hp: `085256${nomorUrut(930000 + indexGlobal, 6)}`,
		asal_sekolah: asalSekolahManado[indexGlobal % asalSekolahManado.length],
		email: `pendaftar.g${nomorGelombang}.${nomorUrut(urutan, 3)}@dummy.santarafael.test`,
		nama_wali: namaWaliDummy[indexGlobal % namaWaliDummy.length],
		status_pendaftaran: statusPendaftaran,
		catatan_dokumen: buatCatatanDokumen(statusPendaftaran),
		tanggal_daftar: tanggalDaftar,
		id_gelombang: idGelombang,
		id_verifikator: idVerifikatorTerpilih,
		alamat: {
			create: buatAlamatDummy(indexGlobal),
		},
		dokumen: {
			create: buatDokumenDummy(jenisKelamin, idVerifikatorTerpilih),
		},
	};
}

async function buatPendaftarGelombang({
	nomorGelombang,
	jumlah,
	statusPendaftaran,
	statusPendaftaranResolver,
	idGelombang,
	idVerifikator,
	password,
	offsetIndex,
	buatTanggalDaftar,
}) {
	const pendaftarDibuat = [];

	for (let i = 1; i <= jumlah; i++) {
		const indexGlobal = offsetIndex + i;
		const statusFinal = statusPendaftaranResolver
			? statusPendaftaranResolver(i)
			: statusPendaftaran;

		const pendaftar = await prisma.pendaftar.create({
			data: buatPendaftarDummy({
				nomorGelombang,
				urutan: i,
				indexGlobal,
				statusPendaftaran: statusFinal,
				idGelombang,
				idVerifikator,
				password,
				tanggalDaftar: buatTanggalDaftar(i - 1),
			}),
		});

		pendaftarDibuat.push(pendaftar);
	}

	return pendaftarDibuat;
}

async function buatPengumumanUntukPendaftar({
	judul_pengumuman,
	deksripsi,
	tanggal_dibuat,
	idAdmin,
	pendaftar,
}) {
	const pengumuman = await prisma.pengumuman.create({
		data: {
			judul_pengumuman,
			deksripsi,
			tanggal_dibuat,
			id_admin: idAdmin,
			pengumuman_pendaftar: {
				create: pendaftar.map((item) => ({
					pendaftar: {
						connect: {
							id_pendaftar: item.id_pendaftar,
						},
					},
				})),
			},
		},
		include: {
			pengumuman_pendaftar: true,
		},
	});

	console.log(
		`✅ Pengumuman "${pengumuman.judul_pengumuman}" dibuat untuk ${pengumuman.pengumuman_pendaftar.length} pendaftar`,
	);

	return pengumuman;
}

async function main() {
	console.log("🌱 Mulai proses seeding...\n");

	const hashedAdminPass = await bcrypt.hash("Admin123!", 10);
	const hashedVerifPass = await bcrypt.hash("Mitha123!", 10);
	const hashedAngiePass = await bcrypt.hash("Angie123!", 10);
	const hashedPendaftarPass = await bcrypt.hash("Maltrian123!", 10);
	const hashedKepsekPass = await bcrypt.hash("Kepsek123!", 10);

	/* ADMIN */
	const existingAdmin = await prisma.admin.findUnique({ where: { username: "admin" } });
	if (existingAdmin) {
		await prisma.admin.update({
			where: { username: "admin" },
			data: { username: "adminSanrafa", password: hashedAdminPass }
		});
	}

	const admin = await prisma.admin.upsert({
		where: { username: "adminSanrafa" },
		update: { password: hashedAdminPass },
		create: {
			username: "adminSanrafa",
			password: hashedAdminPass,
		},
	});
	console.log("✅ Admin dibuat:", admin.username);

	/* VERIFIKATOR */
	const verifikator = await prisma.verifikator.upsert({
		where: { username: "selomitha" },
		update: {
			nama: "Selomitha Anastacia Nong",
		},
		create: {
			username: "selomitha",
			password: hashedVerifPass,
			nama: "Selomitha Anastacia Nong",
		},
	});
	console.log("✅ Verifikator dibuat:", verifikator.username);

	const verifikatorAngie = await prisma.verifikator.upsert({
		where: { username: "angie" },
		update: {
			nama: "Angela Wowor",
		},
		create: {
			username: "angie",
			password: hashedAngiePass,
			nama: "Angela Wowor",
		},
	});
	console.log("✅ Verifikator dibuat:", verifikatorAngie.username);

	/* KEPALA SEKOLAH */
	const existingKepsek = await prisma.kepalaSekolah.findUnique({ where: { username: "kepsek" } });
	if (existingKepsek) {
		await prisma.kepalaSekolah.update({
			where: { username: "kepsek" },
			data: { username: "kepsekSanrafa", password: hashedKepsekPass, nama: "Kepala Sekolah", status_aktif: true }
		});
	}

	const kepalaSekolah = await prisma.kepalaSekolah.upsert({
		where: { username: "kepsekSanrafa" },
		update: {
			nama: "Kepala Sekolah",
			password: hashedKepsekPass,
			status_aktif: true,
		},
		create: {
			username: "kepsekSanrafa",
			password: hashedKepsekPass,
			nama: "Kepala Sekolah",
			status_aktif: true,
		},
	});
	console.log("✅ Kepala Sekolah dibuat:", kepalaSekolah.username);

	/* PROFIL */
	const profilData = {
		nama_sekolah: "SMP Katolik Santu Rafael Manado",
		visi: "Membentuk peserta didik menjadi manusia yang seutuhnya ,beriman, unggul, bijaksana dan pancasilais sesuai semangat Santo Rafael.",
		misi:
			"1. Mewujudkan religiusitas dalam diri warga sekolah sehingga kehidupan beriman dan persaudaraan sejati semakin berkembang.\n" +
			"2. Meningkatkan profesionalisme tenaga pendidik dan kependidikan dengan etos kerja tinggi.\n" +
			"3. Mewujudkan lingkungan berwawasan IPTEK.\n" +
			"4. Menciptakan sekolah sehat, bersih, dan nyaman.",
		nama_kepala_sekolah: "Herman Ventje Dien, S.Fils",
		foto_kepala_sekolah:
			"https://res.cloudinary.com/degcavmhp/image/upload/v1777522663/profil/zyewl5mb99tfa5wilogf.png",
		kata_sambutan: "Selamat Datang di sekolah SMP Katolik St Rafael Manado.",
		nomor_sk_akreditasi: "283/BAN-SM/SULUT/XII/2018",
		akreditasi: "B",
	};

	const existingProfil = await prisma.profil.findFirst({
		where: { id_admin: admin.id_admin },
	});

	if (existingProfil) {
		await prisma.profil.update({
			where: { id_profil: existingProfil.id_profil },
			data: profilData,
		});
	} else {
		await prisma.profil.create({
			data: {
				...profilData,
				id_admin: admin.id_admin,
			},
		});
	}
	console.log("✅ Profil sekolah dibuat atau diperbarui");

	/* KONTAK */
	const kontakData = {
		no_telpon: "0852-5693-0373",
		email: "smpstrafael@gmail.com",
		whatsapp: "0852-5693-0373",
		youtube: "https://www.youtube.com/@smpkatolikstrafaelmanado4699",
		instagram: "https://www.instagram.com/sanrafamdo_",
		facebook: "https://www.facebook.com/p/SMP-Katolik-Santu-Rafael-Manado-100065204190176",
		tiktok: "",
	};

	const existingKontak = await prisma.kontak.findFirst({
		where: { id_admin: admin.id_admin },
	});

	if (existingKontak) {
		await prisma.kontak.update({
			where: { id_kontak: existingKontak.id_kontak },
			data: kontakData,
		});
	} else {
		await prisma.kontak.create({
			data: {
				...kontakData,
				id_admin: admin.id_admin,
			},
		});
	}
	console.log("✅ Kontak dibuat atau diperbarui");

	/* BERITA */
	const beritaData = [
		{
			judul_berita: "Upacara Bendera",
			deskripsi:
				"Melaksanakan upacara bendera rutin di lapangan utama. Petugas upacara dari kelas 9A menjalankan tugas dengan sangat disiplin. Kepala Sekolah menyampaikan amanat penting mengenai tanggung jawab sebagai pelajar.",
			gambar_berita:
				"https://res.cloudinary.com/degcavmhp/image/upload/v1777522925/berita/s48ahn33ycnyvgeypluh.jpg",
			tanggal_dibuat: new Date("2026-04-22T02:49:40.721"),
		},
		{
			judul_berita: "Ibadah Syukur Natal & Tahun Baru",
			deskripsi:
				"Sekolah melaksanakan ibadah syukur natal dan tahun baru keluarga besar SMP Katolik St. Rafael Manado.",
			gambar_berita:
				"https://res.cloudinary.com/degcavmhp/image/upload/v1777522810/berita/lpv1mvwdw4lfvfcav5cq.jpg",
			tanggal_dibuat: new Date("2026-04-22T02:49:40.815"),
		},
		{
			judul_berita: "Rayakan Hari Valentine dengan Aksi Berbagi Coklat",
			deskripsi:
				"Siswa merayakan hari kasih sayang dengan membagikan coklat kepada guru dan sesama siswa. Kegiatan ini bertujuan untuk menanamkan rasa syukur dan kepedulian sosial kepada sesama.",
			gambar_berita:
				"https://res.cloudinary.com/degcavmhp/image/upload/v1777522784/berita/aojb3tekoqysmrhl2ooc.jpg",
			tanggal_dibuat: new Date("2026-04-22T02:49:40.833"),
		},
		{
			judul_berita: "SIMULASI OSN 2026",
			deskripsi:
				"Kamis, 7 Mei 2026 SMP Katolik Santu Rafael Mengadakan SIMULASI OSN 2026, peserta yang ikut ada 15 siswa/i yang terbagi 3 mata pelajaran yakni MATEMATIKA, IPA, IPS.\r\n\r\n#proktor\r\n#teknisi",
			gambar_berita:
				"https://res.cloudinary.com/degcavmhp/image/upload/v1778114276/berita/onymxfgcymzrv6mhunqy.jpg",
			tanggal_dibuat: new Date("2026-05-07T00:37:56.895"),
		},
	];

	await prisma.berita.deleteMany({
		where: { id_admin: admin.id_admin },
	});

	await prisma.berita.createMany({
		data: beritaData.map((item) => ({
			...item,
			id_admin: admin.id_admin,
		})),
	});
	console.log(`✅ ${beritaData.length} Berita dibuat`);

	/* PRESTASI */
	const prestasiData = [
		{
			judul_prestasi: "Juara 2 Olimpiade Sains Nasional Tingkat Kota Manado 2024",
			deskripsi: "Diraih oleh siswa pada kompetisi tingkat Nasional",
			peraih_prestasi: "Kolhoze Heavenly Yang",
			gambar_prestasi:
				"https://res.cloudinary.com/degcavmhp/image/upload/v1777976047/prestasi/kzmuaajktv9wmcnce5sr.png",
		},
		{
			judul_prestasi: "Juara 1 Volly Kategori Putra",
			deskripsi: "Tim Volly Putra meraih juara 1 pada kompetisi Volly Spentig CUP",
			peraih_prestasi: "Tim Volly Putra SMP Katolik St. Rafael Manado",
			gambar_prestasi:
				"https://res.cloudinary.com/degcavmhp/image/upload/v1777522684/prestasi/pjqdyrrvz6b6rxnya9bi.jpg",
		},
		{
			judul_prestasi: "Juara 2 Taekwondo Kemenpora Manado 2025",
			deskripsi: "Meraih Juara 2 pada lomba Taekwondo Kemenpora Manado 2025",
			peraih_prestasi: "Troy Deheselle",
			gambar_prestasi:
				"https://res.cloudinary.com/degcavmhp/image/upload/v1777979425/prestasi/joabaarfbpee0sjjutkg.jpg",
		},
	];

	await prisma.prestasi.deleteMany({
		where: { id_admin: admin.id_admin },
	});

	await prisma.prestasi.createMany({
		data: prestasiData.map((item) => ({
			...item,
			id_admin: admin.id_admin,
		})),
	});
	console.log(`✅ ${prestasiData.length} Prestasi dibuat`);

	/* EKSTRAKURIKULUR */
	const ekstrakurikulerData = [
		{
			nama_ekskul: "Pramuka",
			deskripsi:
				"Kegiatan seni vokal yang melatih siswa untuk bernyanyi secara harmonis dalam kelompok. Meningkatkan kepercayaan diri, kepekaan musik, dan kerja sama antar anggota.",
			p_jwb_ekskul: "Telly Golijot , S.Pd",
			gambar_ekskul:
				"https://res.cloudinary.com/degcavmhp/image/upload/v1777991472/ekstrakurikuler/ygkpf3cspvdr7svnunvn.png",
		},
		{
			nama_ekskul: "Volly",
			deskripsi:
				"Olahraga tim yang melatih kemampuan fisik, sportivitas, dan strategi bermain. Terbuka untuk siswa putra dan putri.",
			p_jwb_ekskul: "Youce Kambey",
			gambar_ekskul:
				"https://res.cloudinary.com/degcavmhp/image/upload/v1777991627/ekstrakurikuler/bqtdtzz5s1cnekpxzyw3.png",
		},
		{
			nama_ekskul: "Kolintang",
			deskripsi:
				"Ekstrakurikuler Kolintang yang membina siswa dalam melestarikan alat musik daerah Sulawesi.",
			p_jwb_ekskul: "Herman Dien, S.Fils",
			gambar_ekskul:
				"https://res.cloudinary.com/degcavmhp/image/upload/v1777991926/ekstrakurikuler/n1h53knf77zey8xzzhg6.png",
		},
		{
			nama_ekskul: "PMR (Palang Merah Remaja)",
			deskripsi:
				"Wadah bagi siswa untuk belajar tentang kesehatan dan kepedulian sosial melalui pelatihan pertolongan pertama, edukasi kesehatan, serta keterlibatan dalam kegiatan kemanusiaan di lingkungan sekolah.",
			p_jwb_ekskul: "Maria Watugigir,S.S",
			gambar_ekskul:
				"https://res.cloudinary.com/degcavmhp/image/upload/v1777991816/ekstrakurikuler/ydvmbh3elh4mmdvncmag.png",
		},
		{
			nama_ekskul: "Basket",
			deskripsi:
				"Kegiatan pengembangan minat dan bakat siswa dalam olahraga bola basket melalui latihan rutin yang meliputi teknik dasar, kerja sama tim, serta pembinaan fisik. Siswa juga dapat mengikuti pertandingan untuk melatih sportivitas dan kepercayaan diri.",
			p_jwb_ekskul: "Selmus Makatimbang, M.Pd",
			gambar_ekskul:
				"https://res.cloudinary.com/degcavmhp/image/upload/v1777991438/ekstrakurikuler/vcnqpagipviednscollr.png",
		},
	];

	await prisma.ekstrakurikuler.deleteMany({
		where: { id_admin: admin.id_admin },
	});

	await prisma.ekstrakurikuler.createMany({
		data: ekstrakurikulerData.map((item) => ({
			...item,
			id_admin: admin.id_admin,
		})),
	});
	console.log(`✅ ${ekstrakurikulerData.length} Ekstrakurikuler dibuat`);

	/* PROGRAM UNGGULAN */
	const programData = [
		{
			nama_pu: "Program Penguatan Karakter",
			deskripsi:
				"Program rutin yang dirancang untuk membentuk karakter siswa melalui kegiatan refleksi, doa bersama, dan pembinaan moral berbasis nilai Kristiani.",
			gambar_pu:
				"https://res.cloudinary.com/degcavmhp/image/upload/v1777992343/program-unggulan/k43pzblanqkdygiyvl20.png",
		},
		{
			nama_pu: "Kelas Bilingual",
			deskripsi:
				"Program pembelajaran dwibahasa Indonesia-Inggris yang diterapkan pada mata pelajaran tertentu untuk meningkatkan kemampuan berbahasa siswa.",
			gambar_pu:
				"https://res.cloudinary.com/degcavmhp/image/upload/v1777992402/program-unggulan/epentslk5hhxf2fz0z7q.png",
		},
		{
			nama_pu: "Pendampingan Akademik",
			deskripsi:
				"Bimbingan belajar tambahan yang diberikan oleh guru untuk siswa yang membutuhkan perhatian khusus dalam mata pelajaran tertentu.",
			gambar_pu:
				"https://res.cloudinary.com/degcavmhp/image/upload/v1777992464/program-unggulan/xwhyuyzgfdiknjxhhqqn.png",
		},
	];

	await prisma.programUnggulan.deleteMany({
		where: { id_admin: admin.id_admin },
	});

	await prisma.programUnggulan.createMany({
		data: programData.map((item) => ({
			...item,
			id_admin: admin.id_admin,
		})),
	});
	console.log(`✅ ${programData.length} Program Unggulan dibuat`);

	/* FASILITAS */
	const fasilitasData = [
		{
			nama_fasilitas: "Lapangan Olahraga",
			deskripsi:
				"Lapangan serbaguna yang dapat digunakan untuk kegiatan olahraga seperti futsal, basket, dan upacara bendera. Dilengkapi dengan tribun penonton.",
			gambar_fasilitas:
				"https://res.cloudinary.com/degcavmhp/image/upload/v1777979789/fasilitas/dk5d4zwgpggezgmhlhch.jpg",
		},
		{
			nama_fasilitas: "Aula dan Kapel",
			deskripsi:
				"Ruang serbaguna yang digunakan untuk kegiatan rohani, seminar, dan acara-acara besar sekolah. Kapel menjadi pusat kegiatan ibadat seluruh warga sekolah.",
			gambar_fasilitas:
				"https://res.cloudinary.com/degcavmhp/image/upload/v1777979772/fasilitas/gftkvjmmfmq6k82pypq0.jpg",
		},
		{
			nama_fasilitas: "Perpustakaan Sekolah",
			deskripsi:
				"Perpustakaan yang nyaman dengan koleksi lebih dari 5.000 judul buku pelajaran, fiksi, dan referensi. Dilengkapi dengan area baca yang tenang.",
			gambar_fasilitas:
				"https://res.cloudinary.com/degcavmhp/image/upload/v1777979807/fasilitas/rvsme1bba8jrq4bfuvib.jpg",
		},
	];

	await prisma.fasilitas.deleteMany({
		where: { id_admin: admin.id_admin },
	});

	await prisma.fasilitas.createMany({
		data: fasilitasData.map((item) => ({
			...item,
			id_admin: admin.id_admin,
		})),
	});
	console.log(`✅ ${fasilitasData.length} Fasilitas dibuat`);

	/* GELOMBANG, PENDAFTAR, ALAMAT, DOKUMEN, DAN PENGUMUMAN */
	const namaGelombangDummy = ["Gelombang 1", "Gelombang 2"];

	const gelombangDummyLama = await prisma.gelombang.findMany({
		where: { nama: { in: namaGelombangDummy } },
		select: { id_gelombang: true },
	});

	const idGelombangDummyLama = gelombangDummyLama.map((item) => item.id_gelombang);

	await prisma.pendaftar.deleteMany({
		where: {
			OR: [
				...(idGelombangDummyLama.length > 0
					? [{ id_gelombang: { in: idGelombangDummyLama } }]
					: []),
				{ nisn: { startsWith: "202601" } },
				{ nisn: { startsWith: "202602" } },
				{ nisn: "24013058" },
				{ email: { endsWith: "@dummy.santarafael.test" } },
			],
		},
	});

	await prisma.gelombang.deleteMany({
		where: { nama: { in: namaGelombangDummy } },
	});

	const gelombang1 = await prisma.gelombang.create({
		data: {
			nama: "Gelombang 1",
			tanggal_mulai: tanggalUtc(2026, 1, 1),
			tanggal_selesai: tanggalUtc(2026, 3, 31, 23, 59),
			kuota: 68,
		},
	});

	const gelombang2 = await prisma.gelombang.create({
		data: {
			nama: "Gelombang 2",
			tanggal_mulai: tanggalUtc(2026, 5, 1),
			tanggal_selesai: tanggalUtc(2026, 6, 30, 23, 59),
			kuota: 68,
		},
	});

	const pendaftarGelombang1 = await buatPendaftarGelombang({
		nomorGelombang: 1,
		jumlah: 70,
		statusPendaftaranResolver: (urutan) => (urutan <= 68 ? STATUS_PENDAFTARAN.LULUS : STATUS_PENDAFTARAN.TIDAK_LULUS),
		idGelombang: gelombang1.id_gelombang,
		idVerifikator: verifikator.id_verifikator,
		password: hashedPendaftarPass,
		offsetIndex: 0,
		buatTanggalDaftar: tanggalDaftarGelombang1,
	});

	const pendaftarGelombang2 = await buatPendaftarGelombang({
		nomorGelombang: 2,
		jumlah: 50,
		statusPendaftaran: STATUS_PENDAFTARAN.MENUNGGU_VERIFIKASI,
		idGelombang: gelombang2.id_gelombang,
		idVerifikator: verifikatorAngie.id_verifikator,
		password: hashedPendaftarPass,
		offsetIndex: 100,
		buatTanggalDaftar: tanggalDaftarGelombang2,
	});

	const pendaftarGelombang1Lulus = pendaftarGelombang1.filter(
		(item) => item.status_pendaftaran === STATUS_PENDAFTARAN.LULUS,
	);

	const pendaftarGelombang1TidakLulus = pendaftarGelombang1.filter(
		(item) => item.status_pendaftaran === STATUS_PENDAFTARAN.TIDAK_LULUS,
	);

	await prisma.pengumuman.deleteMany({
		where: { id_admin: admin.id_admin },
	});
	console.log("✅ Pengumuman lama admin dihapus");

	await buatPengumumanUntukPendaftar({
		judul_pengumuman: "Jadwal Wawancara Orang Tua Gelombang 1",
		deksripsi:
			"Yth. orang tua/wali pendaftar Gelombang 1. Wawancara orang tua akan dilaksanakan pada Senin, 6 April 2026 pukul 08.00 WITA di SMP Katolik Santu Rafael Manado. Orang tua/wali wajib membawa kartu keluarga, akte kelahiran, dan bukti pendaftaran.",
		tanggal_dibuat: tanggalUtc(2026, 4, 1, 8, 0),
		idAdmin: admin.id_admin,
		pendaftar: pendaftarGelombang1,
	});

	await buatPengumumanUntukPendaftar({
		judul_pengumuman: "Jadwal Daftar Ulang Gelombang 1",
		deksripsi:
			"Selamat kepada pendaftar Gelombang 1 yang dinyatakan lulus. Daftar ulang dilaksanakan pada Selasa, 7 April 2026 sampai Jumat, 10 April 2026 pukul 08.00-13.00 WITA di ruang tata usaha SMP Katolik Santu Rafael Manado. Pendaftar wajib membawa dokumen asli dan bukti kelulusan.",
		tanggal_dibuat: tanggalUtc(2026, 4, 2, 8, 0),
		idAdmin: admin.id_admin,
		pendaftar: pendaftarGelombang1Lulus,
	});

	await buatPengumumanUntukPendaftar({
		judul_pengumuman: "Hasil Seleksi Gelombang 1 Belum Lulus",
		deksripsi:
			"Terima kasih kepada pendaftar Gelombang 1 yang telah mengikuti seluruh proses seleksi. Berdasarkan hasil verifikasi dan seleksi, beberapa pendaftar belum dinyatakan lulus pada Gelombang 1. Pendaftar dapat menghubungi panitia PPDB untuk informasi lebih lanjut.",
		tanggal_dibuat: tanggalUtc(2026, 4, 2, 9, 0),
		idAdmin: admin.id_admin,
		pendaftar: pendaftarGelombang1TidakLulus,
	});

	const totalPengumuman = await prisma.pengumuman.count({
		where: { id_admin: admin.id_admin },
	});

	const daftarPengumuman = await prisma.pengumuman.findMany({
		where: { id_admin: admin.id_admin },
		select: {
			id_pengumuman: true,
			judul_pengumuman: true,
			tanggal_dibuat: true,
			_count: {
				select: {
					pengumuman_pendaftar: true,
				},
			},
		},
		orderBy: {
			tanggal_dibuat: "desc",
		},
	});

	console.log(`✅ Total pengumuman admin di database: ${totalPengumuman}`);
	console.table(daftarPengumuman);

	console.log("✅ Gelombang 1 dibuat: kuota 68, pendaftar 70, lulus 68, tidak lulus 2");
	console.log("✅ Gelombang 2 dibuat: kuota 68, pendaftar 50, status menunggu verifikasi");
	console.log(
		`✅ ${pendaftarGelombang1.length + pendaftarGelombang2.length
		} Alamat dan ${(pendaftarGelombang1.length + pendaftarGelombang2.length) * 4} Dokumen pendaftar dibuat`,
	);
	console.log("✅ 3 Pengumuman gelombang dibuat dan dikirim ke pendaftar yang sesuai");

	console.log("\n🎉 Seeding selesai!\n");
	console.log("──────────────────────────────");
	console.log("  Login Akun:");
	console.log("  Admin        → username: adminSanrafa | password: Admin123!");
	console.log("  Kepsek       → username: kepsekSanrafa| password: Kepsek123!");
	console.log("  Verifikator  → username: selomitha    | password: Mitha123!");
	console.log("  Verifikator  → username: angie     | password: Angie123!");
	console.log("  Pendaftar G1 → nisn: 2026010001-2026010070 | password: Maltrian123!");
	console.log("  Pendaftar G2 → nisn: 2026020001-2026020050 | password: Maltrian123!");
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
