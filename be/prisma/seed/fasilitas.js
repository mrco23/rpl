export async function seedFasilitas(prisma, idAdmin) {
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
		where: { id_admin: idAdmin },
	});

	await prisma.fasilitas.createMany({
		data: fasilitasData.map((item) => ({
			...item,
			id_admin: idAdmin,
		})),
	});
	console.log(`✅ ${fasilitasData.length} Fasilitas dibuat`);
}
