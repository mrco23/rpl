export async function seedBerita(prisma, idAdmin) {
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
		where: { id_admin: idAdmin },
	});

	await prisma.berita.createMany({
		data: beritaData.map((item) => ({
			...item,
			id_admin: idAdmin,
		})),
	});
	console.log(`✅ ${beritaData.length} Berita dibuat`);
}
