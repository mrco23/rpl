import prisma from "../config/prisma.js";

const modelMap = {
  berita: prisma.berita,
  prestasi: prisma.prestasi,
  pengumuman: prisma.pengumuman,
  program_unggulan: prisma.programUnggulan,
  ekstrakurikuler: prisma.ekstrakurikuler,
  fasilitas: prisma.fasilitas,
};

const idMap = {
  berita: "id_berita",
  prestasi: "id_prestasi",
  pengumuman: "id_pengumuman",
  program_unggulan: "id_program",
  ekstrakurikuler: "id_ekstrakurikuler",
  fasilitas: "id_fasilitas",
};

class ContentService {
  async list(type, id_admin) {
    return modelMap[type].findMany({
      where: { id_admin: Number(id_admin) },
      orderBy: { created_at: "desc" },
    });
  }

  async listPublic(type) {
    return modelMap[type].findMany({
      orderBy: { created_at: "desc" },
    });
  }

  async getOnePublic(type, id) {
    return modelMap[type].findUnique({ where: { [idMap[type]]: Number(id) } });
  }

  async create(type, id_admin, payload) {
    return modelMap[type].create({
      data: { ...payload, id_admin: Number(id_admin) },
    });
  }

  async update(type, id_admin, id, payload) {
    const existing = await modelMap[type].findFirst({ 
      where: { [idMap[type]]: Number(id), id_admin: Number(id_admin) } 
    });
    if (!existing) throw new Error("Data tidak ditemukan");
    
    return modelMap[type].update({
      where: { [idMap[type]]: Number(id) },
      data: payload,
    });
  }

  async remove(type, id_admin, id) {
    const existing = await modelMap[type].findFirst({ 
      where: { [idMap[type]]: Number(id), id_admin: Number(id_admin) } 
    });
    if (!existing) throw new Error("Data tidak ditemukan");
    
    return modelMap[type].delete({ where: { [idMap[type]]: Number(id) } });
  }
}

export default new ContentService();
