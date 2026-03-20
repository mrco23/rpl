import prisma from "../config/prisma.js";
import { buildFileUrl, deleteFile } from "../utils/file.js";

export const getAllFasilitas = async (id_admin) => {
  return prisma.fasilitas.findMany({
    where: { id_admin: Number(id_admin) },
    orderBy: { created_at: "desc" },
  });
};

export const getPublicFasilitas = async () => {
  return prisma.fasilitas.findMany({
    orderBy: { created_at: "desc" },
  });
};

export const getOnePublicFasilitas = async (id) => {
  return prisma.fasilitas.findUnique({
    where: { id_fasilitas: Number(id) },
  });
};

export const createFasilitas = async (id_admin, payload) => {
  return prisma.fasilitas.create({
    data: {
      nama: payload.nama,
      deskripsi: payload.deskripsi,
      gambar: payload.gambar || null,
      id_admin: Number(id_admin),
    },
  });
};

export const updateFasilitasData = async (id_admin, id, payload) => {
  const existing = await prisma.fasilitas.findFirst({
    where: { id_fasilitas: Number(id), id_admin: Number(id_admin) },
  });
  if (!existing) throw new Error("Data tidak ditemukan");

  return prisma.fasilitas.update({
    where: { id_fasilitas: Number(id) },
    data: {
      nama: payload.nama,
      deskripsi: payload.deskripsi,
    },
  });
};

export const updateFasilitasImage = async (id_admin, id, filename) => {
  const existing = await prisma.fasilitas.findFirst({
    where: { id_fasilitas: Number(id), id_admin: Number(id_admin) },
  });
  if (!existing) throw new Error("Data tidak ditemukan");

  if (existing.gambar) {
    deleteFile(existing.gambar);
  }

  return prisma.fasilitas.update({
    where: { id_fasilitas: Number(id) },
    data: { gambar: filename },
  });
};

export const deleteFasilitas = async (id_admin, id) => {
  const existing = await prisma.fasilitas.findFirst({
    where: { id_fasilitas: Number(id), id_admin: Number(id_admin) },
  });
  if (!existing) throw new Error("Data tidak ditemukan");

  if (existing.gambar) {
    deleteFile(existing.gambar);
  }

  return prisma.fasilitas.delete({
    where: { id_fasilitas: Number(id) },
  });
};

export const serialize = (req, item) => {
  if (!item) return item;
  return {
    ...item,
    gambar: buildFileUrl(req, item.gambar),
  };
};
