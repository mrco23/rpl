import prisma from "../config/prisma.js";
import { buildFileUrl, deleteFile } from "../utils/file.js";

// GET ALL (Private - by Admin ID)
export const getAllEkstrakurikuler = async (id_admin) => {
  return prisma.ekstrakurikuler.findMany({
    where: { id_admin: Number(id_admin) },
    orderBy: { created_at: "desc" },
  });
};

// GET ALL PUBLIC
export const getPublicEkstrakurikuler = async () => {
  return prisma.ekstrakurikuler.findMany({
    orderBy: { created_at: "desc" },
  });
};

// GET ONE PUBLIC
export const getOnePublicEkstrakurikuler = async (id) => {
  return prisma.ekstrakurikuler.findUnique({
    where: { id_ekstrakurikuler: Number(id) },
  });
};

// POST: Create data beserta gambar di awal
export const createEkstrakurikuler = async (id_admin, payload) => {
  return prisma.ekstrakurikuler.create({
    data: {
      nama: payload.nama,
      deskripsi: payload.deskripsi,
      mentor: payload.mentor || null,
      jadwal: payload.jadwal || null,
      gambar: payload.gambar || null,
      id_admin: Number(id_admin),
    },
  });
};

// PUT: Update data teks saja (tanpa mengubah gambar)
export const updateEkstrakurikulerData = async (id_admin, id, payload) => {
  const existing = await prisma.ekstrakurikuler.findFirst({
    where: { id_ekstrakurikuler: Number(id), id_admin: Number(id_admin) },
  });
  if (!existing) throw new Error("Data tidak ditemukan");

  return prisma.ekstrakurikuler.update({
    where: { id_ekstrakurikuler: Number(id) },
    data: {
      nama: payload.nama,
      deskripsi: payload.deskripsi,
      mentor: payload.mentor || null,
      jadwal: payload.jadwal || null,
    },
  });
};

// PATCH: Update khusus gambar saja
export const updateEkstrakurikulerImage = async (id_admin, id, filename) => {
  const existing = await prisma.ekstrakurikuler.findFirst({
    where: { id_ekstrakurikuler: Number(id), id_admin: Number(id_admin) },
  });
  if (!existing) throw new Error("Data tidak ditemukan");

  // Format lama dihapus (kalau ada)
  if (existing.gambar) {
    deleteFile(existing.gambar);
  }

  return prisma.ekstrakurikuler.update({
    where: { id_ekstrakurikuler: Number(id) },
    data: { gambar: filename },
  });
};

// DELETE: Hapus data beserta fisik gambarnya
export const deleteEkstrakurikuler = async (id_admin, id) => {
  const existing = await prisma.ekstrakurikuler.findFirst({
    where: { id_ekstrakurikuler: Number(id), id_admin: Number(id_admin) },
  });
  if (!existing) throw new Error("Data tidak ditemukan");

  if (existing.gambar) {
    deleteFile(existing.gambar);
  }

  return prisma.ekstrakurikuler.delete({
    where: { id_ekstrakurikuler: Number(id) },
  });
};

// Helper: Serialize response
export const serialize = (req, item) => {
  if (!item) return item;
  return {
    ...item,
    gambar: buildFileUrl(req, item.gambar),
  };
};
