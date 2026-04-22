import prisma from "../config/prisma.js";
import { buildFileUrl, deleteFile } from "../utils/file.js";

export const getAllPrestasi = async (id_admin) => {
	return prisma.prestasi.findMany({
		where: { id_admin: Number(id_admin) },
		orderBy: { id_prestasi: "desc" },
	});
};

export const getPublicPrestasi = async () => {
	return prisma.prestasi.findMany({
		orderBy: { id_prestasi: "desc" },
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
			judul_prestasi: payload.judul_prestasi,
			deskripsi: payload.deskripsi,
			peraih_prestasi: payload.peraih_prestasi,
			gambar_prestasi: payload.gambar_prestasi || null,
			id_admin: Number(id_admin),
		},
	});
};

export const updatePrestasiData = async (id_admin, id, payload) => {
	const existing = await prisma.prestasi.findFirst({
		where: { id_prestasi: Number(id), id_admin: Number(id_admin) },
	});
	if (!existing) throw new Error("Data tidak ditemukan");

	const dataToUpdate = {
		judul_prestasi: payload.judul_prestasi,
		deskripsi: payload.deskripsi,
		peraih_prestasi: payload.peraih_prestasi,
	};

	if (payload.gambar_prestasi) {
		if (existing.gambar_prestasi) {
			deleteFile(existing.gambar_prestasi);
		}
		dataToUpdate.gambar_prestasi = payload.gambar_prestasi;
	}

	return prisma.prestasi.update({
		where: { id_prestasi: Number(id) },
		data: dataToUpdate,
	});
};

export const updatePrestasiImage = async (id_admin, id, filename) => {
	const existing = await prisma.prestasi.findFirst({
		where: { id_prestasi: Number(id), id_admin: Number(id_admin) },
	});
	if (!existing) throw new Error("Data tidak ditemukan");

	if (existing.gambar_prestasi) {
		deleteFile(existing.gambar_prestasi);
	}

	return prisma.prestasi.update({
		where: { id_prestasi: Number(id) },
		data: { gambar_prestasi: filename },
	});
};

export const deletePrestasi = async (id_admin, id) => {
	const existing = await prisma.prestasi.findFirst({
		where: { id_prestasi: Number(id), id_admin: Number(id_admin) },
	});
	if (!existing) throw new Error("Data tidak ditemukan");

	if (existing.gambar_prestasi) {
		deleteFile(existing.gambar_prestasi);
	}

	return prisma.prestasi.delete({
		where: { id_prestasi: Number(id) },
	});
};

export const serialize = (req, item) => {
	if (!item) return item;
	return {
		...item,
		gambar_prestasi: buildFileUrl(req, item.gambar_prestasi),
	};
};
