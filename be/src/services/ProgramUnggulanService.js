import prisma from "../config/prisma.js";
import { buildFileUrl, deleteFile } from "../utils/file.js";

export const getAllProgram = async (id_admin) => {
  return prisma.programUnggulan.findMany({
    where: { id_admin: Number(id_admin) },
    orderBy: { created_at: "desc" },
  });
};

export const getPublicProgram = async () => {
  return prisma.programUnggulan.findMany({
    orderBy: { created_at: "desc" },
  });
};

export const getOnePublicProgram = async (id) => {
  return prisma.programUnggulan.findUnique({
    where: { id_program: Number(id) },
  });
};

export const createProgram = async (id_admin, payload) => {
  return prisma.programUnggulan.create({
    data: {
      nama: payload.nama,
      deskripsi: payload.deskripsi,
      gambar: payload.gambar || null,
      id_admin: Number(id_admin),
    },
  });
};

export const updateProgramData = async (id_admin, id, payload) => {
  const existing = await prisma.programUnggulan.findFirst({
    where: { id_program: Number(id), id_admin: Number(id_admin) },
  });
  if (!existing) throw new Error("Data tidak ditemukan");

  return prisma.programUnggulan.update({
    where: { id_program: Number(id) },
    data: {
      nama: payload.nama,
      deskripsi: payload.deskripsi,
    },
  });
};

export const updateProgramImage = async (id_admin, id, filename) => {
  const existing = await prisma.programUnggulan.findFirst({
    where: { id_program: Number(id), id_admin: Number(id_admin) },
  });
  if (!existing) throw new Error("Data tidak ditemukan");

  if (existing.gambar) {
    deleteFile(existing.gambar);
  }

  return prisma.programUnggulan.update({
    where: { id_program: Number(id) },
    data: { gambar: filename },
  });
};

export const deleteProgram = async (id_admin, id) => {
  const existing = await prisma.programUnggulan.findFirst({
    where: { id_program: Number(id), id_admin: Number(id_admin) },
  });
  if (!existing) throw new Error("Data tidak ditemukan");

  if (existing.gambar) {
    deleteFile(existing.gambar);
  }

  return prisma.programUnggulan.delete({
    where: { id_program: Number(id) },
  });
};

export const serialize = (req, item) => {
  if (!item) return item;
  return {
    ...item,
    gambar: buildFileUrl(req, item.gambar),
  };
};
