import prisma from "../config/prisma.js";
import { nanoid } from "nanoid";

class PendaftarService {
  async register(payload) {
    const no_pendaftaran = payload.no_pendaftaran || `REG-${nanoid(8).toUpperCase()}`;

    // Validasi data unik jika diberikan
    if (payload.nisn) {
      const existingNisn = await prisma.pendaftar.findUnique({ where: { nisn: payload.nisn } });
      if (existingNisn) throw new Error("NISN sudah digunakan");
    }

    if (payload.nik) {
      const existingNik = await prisma.pendaftar.findUnique({ where: { nik: payload.nik } });
      if (existingNik) throw new Error("NIK sudah digunakan");
    }

    const data = {
      no_pendaftaran,
      nama_lengkap: payload.nama_lengkap,
      nisn: payload.nisn || null,
      nik: payload.nik || null,
      jenis_kelamin: payload.jenis_kelamin || null,
      tempat_lahir: payload.tempat_lahir || null,
      tanggal_lahir: payload.tanggal_lahir ? new Date(payload.tanggal_lahir) : null,
      alamat: payload.alamat,
      no_hp: payload.no_hp,
      email: payload.email || null,
      asal_sekolah: payload.asal_sekolah || null,
      nama_ayah: payload.nama_ayah || null,
      nama_ibu: payload.nama_ibu || null,
      nama_wali: payload.nama_wali || null,
      tahun_ajaran: payload.tahun_ajaran || null,
      status_pendaftaran: "draft",
    };

    return prisma.pendaftar.create({ data });
  }

  async testRegistration(payload) {
    // Only a helper if we need one later
  }
}

export default new PendaftarService();
