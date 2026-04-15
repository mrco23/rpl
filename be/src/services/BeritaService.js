import prisma from "../config/prisma.js";
import { buildFileUrl, deleteFile } from "../utils/file.js";

// GET ALL (Private - by Admin ID)
export const getAllBerita = async (id_admin) => {
  return prisma.berita.findMany({
    where: { id_admin: Number(id_admin) },
    orderBy: { tanggal_dibuat: "desc" },
  });
};

// GET ALL PUBLIC
export const getPublicBerita = async () => {
  return prisma.berita.findMany({
    orderBy: { tanggal_dibuat: "desc" },
  });
};

// GET ONE PUBLIC
export const getOnePublicBerita = async (id) => {
  return prisma.berita.findUnique({
    where: { id_berita: Number(id) },
  });
};

// POST: Create data beserta gambar di awal
export const createBerita = async (id_admin, payload) => {
  return prisma.berita.create({
    data: {
      judul_berita: payload.judul_berita,
      deskripsi: payload.deskripsi,
      gambar_berita: payload.gambar_berita || null,
      id_admin: Number(id_admin),
    },
  });
};

// PUT/PATCH: Update data beserta kondisional upload gambar
export const updateBeritaData = async (id_admin, id, payload) => {
  const existing = await prisma.berita.findFirst({
    where: { id_berita: Number(id), id_admin: Number(id_admin) },
  });
  if (!existing) throw new Error("Data tidak ditemukan");

  const dataToUpdate = {
    judul_berita: payload.judul_berita,
    deskripsi: payload.deskripsi,
  };

  // Jika user mengunggah gambar_berita yang baru, set payload baru dan hapus file lama
  if (payload.gambar_berita) {
    if (existing.gambar_berita) {
      deleteFile(existing.gambar_berita);
    }
    dataToUpdate.gambar_berita = payload.gambar_berita;
  }

  return prisma.berita.update({
    where: { id_berita: Number(id) },
    data: dataToUpdate,
  });
};

// DELETE: Hapus data beserta fisik gambarnya
export const deleteBerita = async (id_admin, id) => {
  const existing = await prisma.berita.findFirst({
    where: { id_berita: Number(id), id_admin: Number(id_admin) },
  });
  if (!existing) throw new Error("Data tidak ditemukan");

  if (existing.gambar_berita) {
    deleteFile(existing.gambar_berita);
  }

  return prisma.berita.delete({
    where: { id_berita: Number(id) },
  });
};

// Helper: Serialize response
export const serialize = (req, item) => {
  if (!item) return item;
  return {
    ...item,
    gambar_berita: buildFileUrl(req, item.gambar_berita),
  };
};
