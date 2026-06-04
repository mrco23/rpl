export async function seedUsers(prisma, bcrypt) {
	const hashedAdminPass = await bcrypt.hash("Admin123!", 10);
	const hashedVerifPass = await bcrypt.hash("Mitha123!", 10);
	const hashedAngiePass = await bcrypt.hash("Angie123!", 10);
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
		await prisma.kepalaSekolah.delete({
			where: { username: "kepsek" }
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

	return { admin, verifikator, verifikatorAngie };
}
