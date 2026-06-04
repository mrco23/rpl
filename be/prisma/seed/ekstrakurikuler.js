export async function seedEkstrakurikuler(prisma, idAdmin) {
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
		where: { id_admin: idAdmin },
	});

	await prisma.ekstrakurikuler.createMany({
		data: ekstrakurikulerData.map((item) => ({
			...item,
			id_admin: idAdmin,
		})),
	});
	console.log(`✅ ${ekstrakurikulerData.length} Ekstrakurikuler dibuat`);
}
