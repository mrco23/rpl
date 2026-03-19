import prisma from "../config/prisma.js";
import { buildFileUrl } from "../utils/file.js";

class ProfilService {
  async upsertProfil(id_admin, payload) {
    let profil = await prisma.profil.findFirst({
        where: { id_admin: Number(id_admin) }
    });

    const data = {
        nama_sekolah: payload.nama_sekolah,
        visi: payload.visi,
        misi: payload.misi,
        deskripsi: payload.deskripsi,
        logo: payload.logo || undefined,
        nama_kepala_sekolah: payload.nama_kepala_sekolah,
        foto_kepala_sekolah: payload.foto_kepala_sekolah || undefined,
        sambutan_kepala_sekolah: payload.sambutan_kepala_sekolah,
    };

    if (profil) {
        return prisma.profil.update({
            where: { id_profil: profil.id_profil },
            data
        });
    } else {
        return prisma.profil.create({
            data: {
                ...data,
                id_admin: Number(id_admin)
            }
        });
    }
  }

  async upsertKontak(id_admin, payload) {
    let kontak = await prisma.kontak.findFirst({
        where: { id_admin: Number(id_admin) }
    });

    const data = {
        alamat: payload.alamat,
        no_telpon: payload.no_telpon,
        email: payload.email,
        media_sosial: payload.media_sosial,
        whatsapp: payload.whatsapp,
        link_maps: payload.link_maps
    };

    if (kontak) {
        return prisma.kontak.update({
            where: { id_kontak: kontak.id_kontak },
            data
        });
    } else {
        return prisma.kontak.create({
            data: {
                ...data,
                id_admin: Number(id_admin)
            }
        });
    }
  }

  async getProfilPlain(id_admin) {
    const profil = await prisma.profil.findFirst({
      where: { id_admin: Number(id_admin) }
    });
    const kontak = await prisma.kontak.findFirst({
      where: { id_admin: Number(id_admin) }
    });
    
    return { profil, kontak };
  }

  async getPublicProfil() {
    const profil = await prisma.profil.findFirst({
      orderBy: { id_profil: "asc" }
    });
    let kontak = null;
    if (profil) {
       kontak = await prisma.kontak.findFirst({
          where: { id_admin: profil.id_admin }
       });
    }
    return { profil, kontak };
  }

  serialize(req, data) {
    if (!data.profil && !data.kontak) return null;
    
    const profil = data.profil || {};
    const kontak = data.kontak || {};

    return {
      id_profil: profil.id_profil,
      nama_sekolah: profil.nama_sekolah || "",
      visi: profil.visi || "",
      misi: profil.misi || "",
      deskripsi: profil.deskripsi || "",
      logo: buildFileUrl(req, profil.logo),
      nama_kepala_sekolah: profil.nama_kepala_sekolah || "",
      foto_kepala_sekolah: buildFileUrl(req, profil.foto_kepala_sekolah),
      sambutan_kepala_sekolah: profil.sambutan_kepala_sekolah || "",
      id_kontak: kontak.id_kontak,
      alamat: kontak.alamat || "",
      no_telpon: kontak.no_telpon || "",
      email: kontak.email || "",
      media_sosial: kontak.media_sosial || "",
      whatsapp: kontak.whatsapp || "",
      link_maps: kontak.link_maps || "",
    };
  }
}

export default new ProfilService();
