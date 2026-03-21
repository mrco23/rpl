import prisma from "../config/prisma.js";

class DokumenService {
  async updateVerifikasi(id_dokumen, id_verifikator, payload) {
    const dokumen = await prisma.dokumen.findUnique({
      where: { id_dokumen: Number(id_dokumen) }
    });

    if (!dokumen) throw new Error("Dokumen tidak ditemukan");

    return prisma.dokumen.update({
      where: { id_dokumen: Number(id_dokumen) },
      data: {
        status_verifikasi: payload.status_verifikasi,
        catatan_verifikasi: payload.catatan_verifikasi || null,
        id_verifikator: Number(id_verifikator),
        verified_at: new Date(),
      }
    });
  }
}

export default new DokumenService();
