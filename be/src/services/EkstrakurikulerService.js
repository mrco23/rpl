import prisma from "../config/prisma.js";
import { buildFileUrl, deleteFile } from "../utils/file.js";

// GET ALL (Private - by Admin ID)
export const getAllEkstrakurikuler = async (id_admin) => {
	return prisma.ekstrakurikuler.findMany({
		where: { id_admin: Number(id_admin) },
		orderBy: { id_ekstrakurikuler: "desc" },
	});
};

// GET ALL PUBLIC
export const getPublicEkstrakurikuler = async () => {
	return prisma.ekstrakurikuler.findMany({
		orderBy: { id_ekstrakurikuler: "desc" },
	});
};

// GET ONE PUBLIC
export const getOnePublicEkstrakurikuler = async (id) => {
	return prisma.ekstrakurikuler.findUnique({
		where: { id_ekstrakurikuler: Number(id) },
	});
};

// POST: Create data beserta gambar di awal
export const createEkstrakurikuler = async (id_admin, payload) => {
	return prisma.ekstrakurikuler.create({
		data: {
			nama_ekskul: payload.nama_ekskul,
			deskripsi: payload.deskripsi,
			p_jwb_ekskul: payload.p_jwb_ekskul || "",
			gambar_ekskul: payload.gambar_ekskul || null,
			id_admin: Number(id_admin),
		},
	});
};

// PUT: Update khusus teks dan file opsional.
export const updateEkstrakurikulerData = async (id_admin, id, payload) => {
	const existing = await prisma.ekstrakurikuler.findFirst({
		where: { id_ekstrakurikuler: Number(id), id_admin: Number(id_admin) },
	});
	if (!existing) throw new Error("Data tidak ditemukan");

	return prisma.ekstrakurikuler.update({
		where: { id_ekstrakurikuler: Number(id) },
		data: {
			nama_ekskul: payload.nama_ekskul,
			deskripsi: payload.deskripsi,
			p_jwb_ekskul: payload.p_jwb_ekskul || "",
		},
	});
};

// PATCH: Update khusus gambar saja
export const updateEkstrakurikulerImage = async (id_admin, id, filename) => {
	const existing = await prisma.ekstrakurikuler.findFirst({
		where: { id_ekstrakurikuler: Number(id), id_admin: Number(id_admin) },
	});
	if (!existing) throw new Error("Data tidak ditemukan");

	// Format lama dihapus (kalau ada)
	if (existing.gambar_ekskul) {
		deleteFile(existing.gambar_ekskul);
	}

	return prisma.ekstrakurikuler.update({
		where: { id_ekstrakurikuler: Number(id) },
		data: { gambar_ekskul: filename },
	});
};

// DELETE: Hapus data beserta fisik gambarnya
export const deleteEkstrakurikuler = async (id_admin, id) => {
	const existing = await prisma.ekstrakurikuler.findFirst({
		where: { id_ekstrakurikuler: Number(id), id_admin: Number(id_admin) },
	});
	if (!existing) throw new Error("Data tidak ditemukan");

	if (existing.gambar_ekskul) {
		deleteFile(existing.gambar_ekskul);
	}

	return prisma.ekstrakurikuler.delete({
		where: { id_ekstrakurikuler: Number(id) },
	});
};

// Helper: Serialize response
export const serialize = (req, item) => {
	if (!item) return item;
	return {
		...item,
		gambar_ekskul: buildFileUrl(req, item.gambar_ekskul),
	};
};
