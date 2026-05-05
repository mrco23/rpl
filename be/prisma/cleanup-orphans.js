import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	console.log("🔍 Memulai pembersihan data yatim (orphan data)...\n");

	// ──────────────────────────────────────────────────────────
	// 1. Cari baris pengumuman_pendaftar yang id_pendaftar-nya
	//    merujuk ke pendaftar yang sudah tidak ada
	// ──────────────────────────────────────────────────────────
	const orphans = await prisma.$queryRawUnsafe(`
		SELECT pp.id_pengumuman_pendaftar, pp.id_pendaftar, pp.id_pengumuman
		FROM pengumuman_pendaftar pp
		LEFT JOIN pendaftar p ON pp.id_pendaftar = p.id_pendaftar
		WHERE p.id_pendaftar IS NULL
	`);

	if (orphans.length === 0) {
		console.log("✅ Tidak ditemukan data yatim. Database sudah bersih.\n");
		return;
	}

	console.log(`⚠️  Ditemukan ${orphans.length} baris data yatim di tabel pengumuman_pendaftar:`);
	orphans.forEach((row) => {
		console.log(
			`   - id_pengumuman_pendaftar: ${row.id_pengumuman_pendaftar}, id_pendaftar: ${row.id_pendaftar}, id_pengumuman: ${row.id_pengumuman}`,
		);
	});

	// ──────────────────────────────────────────────────────────
	// 2. Hapus baris-baris orphan tersebut
	// ──────────────────────────────────────────────────────────
	const orphanIds = orphans.map((r) => r.id_pengumuman_pendaftar);

	const deleted = await prisma.pengumumanPendaftar.deleteMany({
		where: {
			id_pengumuman_pendaftar: { in: orphanIds.map(Number) },
		},
	});

	console.log(`\n🗑️  Berhasil menghapus ${deleted.count} baris data yatim.`);

	// ──────────────────────────────────────────────────────────
	// 3. Cek juga orphan di tabel lain (alamat, dokumen)
	// ──────────────────────────────────────────────────────────
	const orphanAlamat = await prisma.$queryRawUnsafe(`
		SELECT a.id_alamat, a.id_pendaftar
		FROM alamat a
		LEFT JOIN pendaftar p ON a.id_pendaftar = p.id_pendaftar
		WHERE p.id_pendaftar IS NULL
	`);

	if (orphanAlamat.length > 0) {
		console.log(`\n⚠️  Ditemukan ${orphanAlamat.length} baris orphan di tabel alamat.`);
		const alamatIds = orphanAlamat.map((r) => Number(r.id_alamat));
		const deletedAlamat = await prisma.alamat.deleteMany({
			where: { id_alamat: { in: alamatIds } },
		});
		console.log(`🗑️  Berhasil menghapus ${deletedAlamat.count} baris orphan alamat.`);
	}

	const orphanDokumen = await prisma.$queryRawUnsafe(`
		SELECT d.id_dokumen, d.id_pendaftar
		FROM dokumen d
		LEFT JOIN pendaftar p ON d.id_pendaftar = p.id_pendaftar
		WHERE p.id_pendaftar IS NULL
	`);

	if (orphanDokumen.length > 0) {
		console.log(`\n⚠️  Ditemukan ${orphanDokumen.length} baris orphan di tabel dokumen.`);
		const dokumenIds = orphanDokumen.map((r) => Number(r.id_dokumen));
		const deletedDokumen = await prisma.dokumen.deleteMany({
			where: { id_dokumen: { in: dokumenIds } },
		});
		console.log(`🗑️  Berhasil menghapus ${deletedDokumen.count} baris orphan dokumen.`);
	}

	console.log("\n🎉 Pembersihan data yatim selesai!\n");
}

main()
	.catch((e) => {
		console.error("❌ Pembersihan gagal:", e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
