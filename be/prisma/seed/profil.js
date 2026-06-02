export async function seedProfil(prisma, idAdmin) {
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
		where: { id_admin: idAdmin },
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
				id_admin: idAdmin,
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
		where: { id_admin: idAdmin },
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
				id_admin: idAdmin,
			},
		});
	}
	console.log("✅ Kontak dibuat atau diperbarui");
}
