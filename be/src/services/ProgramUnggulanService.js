import prisma from "../config/prisma.js";
import { buildFileUrl, deleteFile } from "../utils/file.js";

export const getAllProgram = async (id_admin) => {
  return prisma.programUnggulan.findMany({
    where: { id_admin: Number(id_admin) },
    orderBy: { id_program: "desc" },
  });
};

export const getPublicProgram = async () => {
  return prisma.programUnggulan.findMany({
    orderBy: { id_program: "desc" },
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
      nama_pu: payload.nama_pu,
      deskripsi: payload.deskripsi,
      gambar_pu: payload.gambar_pu || null,
      id_admin: Number(id_admin),
    },
  });
};

export const updateProgramData = async (id_admin, id, payload) => {
  const existing = await prisma.programUnggulan.findFirst({
    where: { id_program: Number(id), id_admin: Number(id_admin) },
  });
  if (!existing) throw new Error("Data tidak ditemukan");

  const dataToUpdate = {
    nama_pu: payload.nama_pu,
    deskripsi: payload.deskripsi,
  };

  if (payload.gambar_pu) {
    if (existing.gambar_pu) {
      deleteFile(existing.gambar_pu);
    }
    dataToUpdate.gambar_pu = payload.gambar_pu;
  }

  return prisma.programUnggulan.update({
    where: { id_program: Number(id) },
    data: dataToUpdate,
  });
};

export const deleteProgram = async (id_admin, id) => {
  const existing = await prisma.programUnggulan.findFirst({
    where: { id_program: Number(id), id_admin: Number(id_admin) },
  });
  if (!existing) throw new Error("Data tidak ditemukan");

  if (existing.gambar_pu) {
    deleteFile(existing.gambar_pu);
  }

  return prisma.programUnggulan.delete({
    where: { id_program: Number(id) },
  });
};

export const serialize = (req, item) => {
  if (!item) return item;
  return {
    ...item,
    gambar_pu: buildFileUrl(req, item.gambar_pu),
  };
};
