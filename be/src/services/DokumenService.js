import prisma from "../config/prisma.js";

import { deleteFile } from "../utils/file.js";

class DokumenService {
  async getDokumenByPendaftar(id_pendaftar) {
    return prisma.dokumen.findMany({
      where: { id_pendaftar: Number(id_pendaftar) }
    });
  }

  async uploadDokumen(id_pendaftar, nama_dokumen, file_path) {
    // Cari pendaftar untuk validasi
    const pendaftar = await prisma.pendaftar.findUnique({
      where: { id_pendaftar: Number(id_pendaftar) }
    });

    if (pendaftar) {
      const status = pendaftar.status_pendaftaran;
      if (status === 'terverifikasi' || status === 'wawancara orang tua' || status === 'lulus' || status === 'tidak lulus') {
        throw new Error("Pendaftaran sudah terverifikasi. Tidak dapat mengubah dokumen lagi.");
      }
    }

    // Cari dokumen lama untuk dihapus filenya
    const existing = await prisma.dokumen.findUnique({
      where: {
        id_pendaftar_nama_dokumen: {
          id_pendaftar: Number(id_pendaftar),
          nama_dokumen: nama_dokumen
        }
      }
    });

    if (existing && existing.jenis_dokumen) {
      await deleteFile(existing.jenis_dokumen);
    }

    // Upsert: update jika sudah ada (nama_dokumen + id_pendaftar unik), create jika belum
    const result = await prisma.dokumen.upsert({
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

    // Jika sebelumnya "perlu perbaikan", ubah menjadi "unggah ulang"
    if (pendaftar && pendaftar.status_pendaftaran === 'perlu perbaikan') {
      await prisma.pendaftar.update({
        where: { id_pendaftar: Number(id_pendaftar) },
        data: { status_pendaftaran: 'unggah ulang' }
      });
    }

    return result;
  }

  async deleteDokumen(id_dokumen) {
    const existing = await prisma.dokumen.findUnique({
      where: { id_dokumen: Number(id_dokumen) }
    });

    if (existing && existing.jenis_dokumen) {
      await deleteFile(existing.jenis_dokumen);
    }

    return prisma.dokumen.delete({
      where: { id_dokumen: Number(id_dokumen) }
    });
  }
}

export default new DokumenService();

