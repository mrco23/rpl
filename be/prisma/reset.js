import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🗑️  Mulai proses reset semua data...\n");

  /* Urutan penghapusan harus mengikuti dependency FK (tabel anak dulu) */
  await prisma.dokumen.deleteMany();
  console.log("✅ Tabel dokumen dikosongkan");

  await prisma.pendaftar.deleteMany();
  console.log("✅ Tabel pendaftar dikosongkan");

  await prisma.kontak.deleteMany();
  console.log("✅ Tabel kontak dikosongkan");

  await prisma.profil.deleteMany();
  console.log("✅ Tabel profil dikosongkan");

  await prisma.berita.deleteMany();
  console.log("✅ Tabel berita dikosongkan");

  await prisma.pengumuman.deleteMany();
  console.log("✅ Tabel pengumuman dikosongkan");

  await prisma.prestasi.deleteMany();
  console.log("✅ Tabel prestasi dikosongkan");

  await prisma.ekstrakurikuler.deleteMany();
  console.log("✅ Tabel ekstrakurikuler dikosongkan");

  await prisma.programUnggulan.deleteMany();
  console.log("✅ Tabel program_unggulan dikosongkan");

  await prisma.fasilitas.deleteMany();
  console.log("✅ Tabel fasilitas dikosongkan");

  await prisma.verifikator.deleteMany();
  console.log("✅ Tabel verifikator dikosongkan");

  await prisma.admin.deleteMany();
  console.log("✅ Tabel admin dikosongkan");

  console.log("\n🎉 Reset selesai! Semua data telah dihapus.\n");
}

main()
  .catch((e) => {
    console.error("❌ Reset gagal:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
