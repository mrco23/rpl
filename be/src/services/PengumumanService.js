import prisma from "../config/prisma.js";

// GET ALL (Private - by Admin ID)
export const getAllPengumuman = async (id_admin) => {
	return prisma.pengumuman.findMany({
		where: { id_admin: Number(id_admin) },
		include: {
			pengumuman_pendaftar: {
				include: {
					pendaftar: true,
				},
			},
		},
		orderBy: { tanggal_dibuat: "desc" },
	});
};

// GET ALL FOR PENDAFTAR
export const getPengumumanByPendaftar = async (id_pendaftar) => {
	return prisma.pengumuman.findMany({
		where: {
			pengumuman_pendaftar: {
				some: {
					id_pendaftar: Number(id_pendaftar),
				},
			},
		},
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
	const { judul_pengumuman, deksripsi, recipients } = payload; // recipients is array of id_pendaftar

	return prisma.pengumuman.create({
		data: {
			judul_pengumuman,
			deksripsi: deksripsi || null,
			id_admin: Number(id_admin),
			pengumuman_pendaftar: {
				create: (recipients || []).map((id) => ({
					id_pendaftar: Number(id),
				})),
			},
		},
	});
};

// PUT: Update data
export const updatePengumumanData = async (id_admin, id, payload) => {
	const { judul_pengumuman, deksripsi, recipients } = payload;

	const existing = await prisma.pengumuman.findFirst({
		where: { id_pengumuman: Number(id), id_admin: Number(id_admin) },
	});
	if (!existing) throw new Error("Data tidak ditemukan");

	return prisma.$transaction(async (tx) => {
		// Clear existing recipients
		await tx.pengumumanPendaftar.deleteMany({
			where: { id_pengumuman: Number(id) },
		});

		// Update pengumuman and add new recipients
		return tx.pengumuman.update({
			where: { id_pengumuman: Number(id) },
			data: {
				judul_pengumuman,
				deksripsi,
				pengumuman_pendaftar: {
					create: (recipients || []).map((pId) => ({
						id_pendaftar: Number(pId),
					})),
				},
			},
		});
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
