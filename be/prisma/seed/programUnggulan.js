export async function seedProgramUnggulan(prisma, idAdmin) {
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
		where: { id_admin: idAdmin },
	});

	await prisma.programUnggulan.createMany({
		data: programData.map((item) => ({
			...item,
			id_admin: idAdmin,
		})),
	});
	console.log(`✅ ${programData.length} Program Unggulan dibuat`);
}
