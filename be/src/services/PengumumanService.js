import prisma from "../config/prisma.js";

// GET ALL (Private - by Admin ID)
export const getAllPengumuman = async (id_admin) => {
	return prisma.pengumuman.findMany({
		where: { id_admin: Number(id_admin) },
		orderBy: { tanggal_dibuat: "desc" },
	});
};

// GET ALL PUBLIC
export const getPublicPengumuman = async () => {
	return prisma.pengumuman.findMany({
		orderBy: { tanggal_dibuat: "desc" },
	});
};

// GET ONE PUBLIC
export const getOnePublicPengumuman = async (id) => {
	return prisma.pengumuman.findUnique({
		where: { id_pengumuman: Number(id) },
	});
};

// POST: Create data baru
export const createPengumuman = async (id_admin, payload) => {
	return prisma.pengumuman.create({
		data: {
			judul_pengumuman: payload.judul_pengumuman,
			deksripsi: payload.deksripsi || null,
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
			judul_pengumuman: payload.judul_pengumuman,
			deksripsi: payload.deksripsi,
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
