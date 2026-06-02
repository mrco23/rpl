import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

import { seedUsers } from "./users.js";
import { seedProfil } from "./profil.js";
import { seedBerita } from "./berita.js";
import { seedPrestasi } from "./prestasi.js";
import { seedEkstrakurikuler } from "./ekstrakurikuler.js";
import { seedProgramUnggulan } from "./programUnggulan.js";
import { seedFasilitas } from "./fasilitas.js";
import { seedPendaftar } from "./pendaftar.js";

const prisma = new PrismaClient();

async function main() {
	console.log("🌱 Mulai proses seeding modular...\n");

	const { admin, verifikator, verifikatorAngie } = await seedUsers(prisma, bcrypt);
	const idAdmin = admin.id_admin;

	await seedProfil(prisma, idAdmin);
	await seedBerita(prisma, idAdmin);
	await seedPrestasi(prisma, idAdmin);
	await seedEkstrakurikuler(prisma, idAdmin);
	await seedProgramUnggulan(prisma, idAdmin);
	await seedFasilitas(prisma, idAdmin);
	
	await seedPendaftar(prisma, bcrypt, idAdmin, verifikator, verifikatorAngie);

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
