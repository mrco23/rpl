import prisma from "../config/prisma.js";
import { buildFileUrl, deleteFile } from "../utils/file.js";

export const getAllPrestasi = async (id_admin) => {
  return prisma.prestasi.findMany({
    where: { id_admin: Number(id_admin) },
    orderBy: { created_at: "desc" },
  });
};

export const getPublicPrestasi = async () => {
  return prisma.prestasi.findMany({
    orderBy: { created_at: "desc" },
  });
};

export const getOnePublicPrestasi = async (id) => {
  return prisma.prestasi.findUnique({
    where: { id_prestasi: Number(id) },
  });
};

export const createPrestasi = async (id_admin, payload) => {
  return prisma.prestasi.create({
    data: {
      judul: payload.judul,
      deskripsi: payload.deskripsi,
      tahun: payload.tahun || null,
      gambar: payload.gambar || null,
      id_admin: Number(id_admin),
    },
  });
};

export const updatePrestasiData = async (id_admin, id, payload) => {
  const existing = await prisma.prestasi.findFirst({
    where: { id_prestasi: Number(id), id_admin: Number(id_admin) },
  });
  if (!existing) throw new Error("Data tidak ditemukan");

  return prisma.prestasi.update({
    where: { id_prestasi: Number(id) },
    data: {
      judul: payload.judul,
      deskripsi: payload.deskripsi,
      tahun: payload.tahun || null,
    },
  });
};

export const updatePrestasiImage = async (id_admin, id, filename) => {
  const existing = await prisma.prestasi.findFirst({
    where: { id_prestasi: Number(id), id_admin: Number(id_admin) },
  });
  if (!existing) throw new Error("Data tidak ditemukan");

  if (existing.gambar) {
    deleteFile(existing.gambar);
  }

  return prisma.prestasi.update({
    where: { id_prestasi: Number(id) },
    data: { gambar: filename },
  });
};

export const deletePrestasi = async (id_admin, id) => {
  const existing = await prisma.prestasi.findFirst({
    where: { id_prestasi: Number(id), id_admin: Number(id_admin) },
  });
  if (!existing) throw new Error("Data tidak ditemukan");

  if (existing.gambar) {
    deleteFile(existing.gambar);
  }

  return prisma.prestasi.delete({
    where: { id_prestasi: Number(id) },
  });
};

export const serialize = (req, item) => {
  if (!item) return item;
  return {
    ...item,
    gambar: buildFileUrl(req, item.gambar),
  };
};
