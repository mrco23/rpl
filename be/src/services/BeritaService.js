import prisma from "../config/prisma.js";
import { buildFileUrl, deleteFile } from "../utils/file.js";

// GET ALL (Private - by Admin ID)
export const getAllBerita = async (id_admin) => {
  return prisma.berita.findMany({
    where: { id_admin: Number(id_admin) },
    orderBy: { created_at: "desc" },
  });
};

// GET ALL PUBLIC
export const getPublicBerita = async () => {
  return prisma.berita.findMany({
    orderBy: { created_at: "desc" },
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
      judul: payload.judul,
      deskripsi: payload.deskripsi,
      isi: payload.isi,
      status: payload.status || "published",
      published_at: payload.published_at ? new Date(payload.published_at) : new Date(),
      gambar: payload.gambar || null,
      id_admin: Number(id_admin),
    },
  });
};

// PUT: Update data teks saja (tanpa mengubah gambar)
export const updateBeritaData = async (id_admin, id, payload) => {
  const existing = await prisma.berita.findFirst({
    where: { id_berita: Number(id), id_admin: Number(id_admin) },
  });
  if (!existing) throw new Error("Data tidak ditemukan");

  return prisma.berita.update({
    where: { id_berita: Number(id) },
    data: {
      judul: payload.judul,
      deskripsi: payload.deskripsi,
      isi: payload.isi,
      status: payload.status || existing.status,
      published_at: payload.published_at ? new Date(payload.published_at) : existing.published_at,
    },
  });
};

// PATCH: Update khusus gambar saja
export const updateBeritaImage = async (id_admin, id, filename) => {
  const existing = await prisma.berita.findFirst({
    where: { id_berita: Number(id), id_admin: Number(id_admin) },
  });
  if (!existing) throw new Error("Data tidak ditemukan");

  if (existing.gambar) {
    deleteFile(existing.gambar);
  }

  return prisma.berita.update({
    where: { id_berita: Number(id) },
    data: { gambar: filename },
  });
};

// DELETE: Hapus data beserta fisik gambarnya
export const deleteBerita = async (id_admin, id) => {
  const existing = await prisma.berita.findFirst({
    where: { id_berita: Number(id), id_admin: Number(id_admin) },
  });
  if (!existing) throw new Error("Data tidak ditemukan");

  if (existing.gambar) {
    deleteFile(existing.gambar);
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
    gambar: buildFileUrl(req, item.gambar),
  };
};
