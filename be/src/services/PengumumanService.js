import prisma from "../config/prisma.js";

// GET ALL (Private - by Admin ID)
export const getAllPengumuman = async (id_admin) => {
  return prisma.pengumuman.findMany({
    where: { id_admin: Number(id_admin) },
    orderBy: { created_at: "desc" },
  });
};

// GET ALL PUBLIC
export const getPublicPengumuman = async () => {
  return prisma.pengumuman.findMany({
    where: { status: "published" },
    orderBy: { created_at: "desc" },
  });
};

// GET ONE PUBLIC
export const getOnePublicPengumuman = async (id) => {
  return prisma.pengumuman.findUnique({
    where: { id_pengumuman: Number(id), status: "published" },
  });
};

// POST: Create data baru
export const createPengumuman = async (id_admin, payload) => {
  return prisma.pengumuman.create({
    data: {
      judul: payload.judul,
      isi: payload.isi,
      status: payload.status || "draft",
      tampil_mulai: payload.tampil_mulai ? new Date(payload.tampil_mulai) : null,
      tampil_sampai: payload.tampil_sampai ? new Date(payload.tampil_sampai) : null,
      tahun_ajaran: payload.tahun_ajaran || null,
      id_admin: Number(id_admin),
    },
  });
};

// PUT: Update data 
export const updatePengumumanData = async (id_admin, id, payload) => {
  const existing = await prisma.pengumuman.findFirst({
    where: { id_pengumuman: Number(id), id_admin: Number(id_admin) },
  });
  if (!existing) throw new Error("Data tidak ditemukan");

  return prisma.pengumuman.update({
    where: { id_pengumuman: Number(id) },
    data: {
      judul: payload.judul,
      isi: payload.isi,
      status: payload.status || existing.status,
      tampil_mulai: payload.tampil_mulai ? new Date(payload.tampil_mulai) : existing.tampil_mulai,
      tampil_sampai: payload.tampil_sampai ? new Date(payload.tampil_sampai) : existing.tampil_sampai,
      tahun_ajaran: payload.tahun_ajaran || existing.tahun_ajaran,
    },
  });
};

// DELETE: Hapus data 
export const deletePengumuman = async (id_admin, id) => {
  const existing = await prisma.pengumuman.findFirst({
    where: { id_pengumuman: Number(id), id_admin: Number(id_admin) },
  });
  if (!existing) throw new Error("Data tidak ditemukan");

  return prisma.pengumuman.delete({
    where: { id_pengumuman: Number(id) },
  });
};

// Helper: Serialize response
export const serialize = (req, item) => {
  return item;
};
