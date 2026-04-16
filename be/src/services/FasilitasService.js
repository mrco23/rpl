import prisma from "../config/prisma.js";
import { buildFileUrl, deleteFile } from "../utils/file.js";

export const getAllFasilitas = async (id_admin) => {
  return prisma.fasilitas.findMany({
    where: { id_admin: Number(id_admin) },
    orderBy: { id_fasilitas: "desc" },
  });
};

export const getPublicFasilitas = async () => {
  return prisma.fasilitas.findMany({
    orderBy: { id_fasilitas: "desc" },
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
      nama_fasilitas: payload.nama_fasilitas,
      deskripsi: payload.deskripsi,
      gambar_fasilitas: payload.gambar || null,
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
      nama_fasilitas: payload.nama_fasilitas,
      deskripsi: payload.deskripsi,
    },
  });
};

export const updateFasilitasImage = async (id_admin, id, filename) => {
  const existing = await prisma.fasilitas.findFirst({
    where: { id_fasilitas: Number(id), id_admin: Number(id_admin) },
  });
  if (!existing) throw new Error("Data tidak ditemukan");

  if (existing.gambar_fasilitas) {
    deleteFile(existing.gambar_fasilitas);
  }

  return prisma.fasilitas.update({
    where: { id_fasilitas: Number(id) },
    data: { gambar_fasilitas: filename },
  });
};

export const deleteFasilitas = async (id_admin, id) => {
  const existing = await prisma.fasilitas.findFirst({
    where: { id_fasilitas: Number(id), id_admin: Number(id_admin) },
  });
  if (!existing) throw new Error("Data tidak ditemukan");

  if (existing.gambar_fasilitas) {
    deleteFile(existing.gambar_fasilitas);
  }

  return prisma.fasilitas.delete({
    where: { id_fasilitas: Number(id) },
  });
};

export const serialize = (req, item) => {
  if (!item) return item;
  return {
    ...item,
    gambar_fasilitas: buildFileUrl(req, item.gambar_fasilitas),
  };
};
