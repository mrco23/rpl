import prisma from "../config/prisma.js";
import { buildFileUrl } from "../utils/file.js";
import { getUserSchoolId } from "./SchoolScopedService.js";

class ProfilSekolahService {
  async createProfil(userId, payload) {
    return prisma.$transaction(async (tx) => {
      const newProfil = await tx.profil_Sekolah.create({
        data: {
          nama_sekolah: payload.nama_sekolah,
          visi: payload.visi,
          misi: payload.misi,
          deskripsi: payload.deskripsi,
          logo: payload.logo || null,
          nama_kepala_sekolah: payload.nama_kepala_sekolah || null,
          foto_kepala_sekolah: payload.foto_kepala_sekolah || null,
          sambutan_kepala_sekolah: payload.sambutan_kepala_sekolah || null,
        },
      });

      await tx.kontak_Sekolah.create({
        data: {
          alamat: payload.alamat || "",
          no_telpon: payload.no_telpon || "",
          email: payload.email || "",
          media_sosial: payload.media_sosial || "",
          whatsapp: payload.whatsapp || "",
          id_sekolah: newProfil.id_sekolah,
        },
      });

      await tx.pengguna.update({
        where: { id: userId },
        data: { id_sekolah: newProfil.id_sekolah },
      });

      return newProfil;
    });
  }

  async updateProfil(userId, updateData) {
    const id_sekolah = await getUserSchoolId(userId);

    return prisma.$transaction(async (tx) => {
      await tx.profil_Sekolah.update({
        where: { id_sekolah },
        data: {
          nama_sekolah: updateData.nama_sekolah,
          visi: updateData.visi,
          misi: updateData.misi,
          deskripsi: updateData.deskripsi,
          logo: updateData.logo,
          nama_kepala_sekolah: updateData.nama_kepala_sekolah,
          foto_kepala_sekolah: updateData.foto_kepala_sekolah,
          sambutan_kepala_sekolah: updateData.sambutan_kepala_sekolah,
        },
      });

      await tx.kontak_Sekolah.upsert({
        where: { id_sekolah },
        update: {
          alamat: updateData.alamat,
          no_telpon: updateData.no_telpon,
          email: updateData.email,
          media_sosial: updateData.media_sosial,
          whatsapp: updateData.whatsapp,
        },
        create: {
          alamat: updateData.alamat || "",
          no_telpon: updateData.no_telpon || "",
          email: updateData.email || "",
          media_sosial: updateData.media_sosial || "",
          whatsapp: updateData.whatsapp || "",
          id_sekolah,
        },
      });

      return this.getProfilPlain(id_sekolah);
    });
  }

  async getProfilPlain(id_sekolah) {
    return prisma.profil_Sekolah.findUnique({
      where: { id_sekolah },
      include: { kontak: true },
    });
  }

  async getProfil(userId) {
    const id_sekolah = await getUserSchoolId(userId);
    return this.getProfilPlain(id_sekolah);
  }

  async getPublicProfil() {
    return prisma.profil_Sekolah.findFirst({
      orderBy: { id_sekolah: "asc" },
      include: { kontak: true },
    });
  }

  serialize(req, profil) {
    if (!profil) return null;
    return {
      id_sekolah: profil.id_sekolah,
      nama_sekolah: profil.nama_sekolah,
      visi: profil.visi,
      misi: profil.misi,
      deskripsi: profil.deskripsi,
      logo: buildFileUrl(req, profil.logo),
      nama_kepala_sekolah: profil.nama_kepala_sekolah,
      foto_kepala_sekolah: buildFileUrl(req, profil.foto_kepala_sekolah),
      sambutan_kepala_sekolah: profil.sambutan_kepala_sekolah,
      alamat: profil.kontak?.alamat || "",
      no_telpon: profil.kontak?.no_telpon || "",
      email: profil.kontak?.email || "",
      media_sosial: profil.kontak?.media_sosial || "",
      whatsapp: profil.kontak?.whatsapp || "",
    };
  }
}

export default new ProfilSekolahService();
