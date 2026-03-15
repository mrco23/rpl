import prisma from "../config/prisma.js";
import { getUserSchoolId } from "./SchoolScopedService.js";

const modelMap = {
  extracurriculars: prisma.ekstrakurikuler,
  news: prisma.berita,
  achievements: prisma.prestasi,
};

const idMap = {
  extracurriculars: "id_ekstrakurikuler",
  news: "id_berita",
  achievements: "id_prestasi",
};

class ContentService {
  async list(type, userId) {
    const id_sekolah = await getUserSchoolId(userId);
    return modelMap[type].findMany({
      where: { id_sekolah },
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

  async create(type, userId, payload) {
    const id_sekolah = await getUserSchoolId(userId);
    return modelMap[type].create({
      data: { ...payload, id_sekolah },
    });
  }

  async update(type, userId, id, payload) {
    const id_sekolah = await getUserSchoolId(userId);
    const existing = await modelMap[type].findFirst({ where: { [idMap[type]]: Number(id), id_sekolah } });
    if (!existing) throw new Error("Data tidak ditemukan");
    return modelMap[type].update({
      where: { [idMap[type]]: Number(id) },
      data: payload,
    });
  }

  async remove(type, userId, id) {
    const id_sekolah = await getUserSchoolId(userId);
    const existing = await modelMap[type].findFirst({ where: { [idMap[type]]: Number(id), id_sekolah } });
    if (!existing) throw new Error("Data tidak ditemukan");
    return modelMap[type].delete({ where: { [idMap[type]]: Number(id) } });
  }
}

export default new ContentService();
