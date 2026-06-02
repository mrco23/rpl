export async function seedPrestasi(prisma, idAdmin) {
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
		where: { id_admin: idAdmin },
	});

	await prisma.prestasi.createMany({
		data: prestasiData.map((item) => ({
			...item,
			id_admin: idAdmin,
		})),
	});
	console.log(`✅ ${prestasiData.length} Prestasi dibuat`);
}
