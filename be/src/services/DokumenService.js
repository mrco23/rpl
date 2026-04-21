import prisma from "../config/prisma.js";

class DokumenService {
  async getDokumenByPendaftar(id_pendaftar) {
    return prisma.dokumen.findMany({
      where: { id_pendaftar: Number(id_pendaftar) }
    });
  }

  async uploadDokumen(id_pendaftar, nama_dokumen, file_path) {
    // Upsert: update jika sudah ada (nama_dokumen + id_pendaftar unik), create jika belum
    return prisma.dokumen.upsert({
      where: {
        id_pendaftar_nama_dokumen: {
          id_pendaftar: Number(id_pendaftar),
          nama_dokumen: nama_dokumen
        }
      },
      update: {
        jenis_dokumen: file_path
      },
      create: {
        id_pendaftar: Number(id_pendaftar),
        nama_dokumen: nama_dokumen,
        jenis_dokumen: file_path
      }
    });
  }

  async deleteDokumen(id_dokumen) {
    return prisma.dokumen.delete({
      where: { id_dokumen: Number(id_dokumen) }
    });
  }
}

export default new DokumenService();

