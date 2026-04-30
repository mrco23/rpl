import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";

export const register = async (payload) => {
	const now = new Date();
	const activeGelombang = await prisma.gelombang.findFirst({
		where: {
			tanggal_mulai: { lte: now },
			tanggal_selesai: { gte: now },
		},
	});

	if (!activeGelombang) {
		const error = new Error("Pendaftaran saat ini ditutup");
		error.statusCode = 400;
		throw error;
	}



	if (
		!payload.nama_lengkap ||
		!payload.alamat ||
		!payload.jenis_kelamin ||
		!payload.no_hp ||
		!payload.asal_sekolah
	) {
		throw new Error(
			"Field wajib belum lengkap. Pastikan nama_lengkap, alamat, jenis_kelamin, no_hp, asal_sekolah terisi.",
		);
	}

	if (payload.nisn) {
		const existingNisn = await prisma.pendaftar.findUnique({ where: { nisn: payload.nisn } });
		if (existingNisn) throw new Error("NISN sudah digunakan");
	}

	let hashedKataSandi = null;
	if (payload.kata_sandi) {
		const salt = await bcrypt.genSalt(10);
		hashedKataSandi = await bcrypt.hash(payload.kata_sandi, salt);
	}

	const data = {
		nama_lengkap: payload.nama_lengkap,
		kata_sandi: hashedKataSandi,
		nisn: payload.nisn || null,
		tempat_lahir: payload.tempat_lahir || null,
		tanggal_lahir: payload.tanggal_lahir ? new Date(payload.tanggal_lahir) : null,
		jenis_kelamin: payload.jenis_kelamin,
		no_hp: payload.no_hp,
		asal_sekolah: payload.asal_sekolah,
		email: payload.email || null,
		nama_wali: payload.nama_wali || null,
		id_gelombang: activeGelombang.id_gelombang,
		status_pendaftaran: "menunggu verifikasi",
		alamat: {
			create: {
				provinsi: payload.alamat.provinsi,
				kota_kabupaten: payload.alamat.kota_kabupaten,
				kecamatan: payload.alamat.kecamatan,
				kelurahan: payload.alamat.kelurahan,
				rt_rw: payload.alamat.rt_rw,
				kode_pos: payload.alamat.kode_pos,
			},
		},
	};

	return prisma.pendaftar.create({
		data,
		include: { alamat: true },
	});
};

export const getPendaftar = async (nisn) => {
	let pendaftar = await prisma.pendaftar.findUnique({
		where: { nisn },
		include: { alamat: true },
	});
	if (pendaftar) {
		const { kata_sandi, ...pendaftarTanpaSandi } = pendaftar;
		return { ...pendaftarTanpaSandi, id: pendaftar.id_pendaftar };
	}
	return null;
};

export const getPendaftarById = async (id) => {
	const pendaftar = await prisma.pendaftar.findUnique({
		where: { id_pendaftar: Number(id) },
		include: { alamat: true },
	});
	if (pendaftar) {
		const { kata_sandi, ...pendaftarTanpaSandi } = pendaftar;
		return pendaftarTanpaSandi;
	}
	return null;
};

export const getAllPendaftar = async () => {
	const pendaftars = await prisma.pendaftar.findMany({
		include: {
			gelombang: true,
			alamat: true,
		},
	});
	return pendaftars.map(p => {
		const { kata_sandi, ...rest } = p;
		return rest;
	});
};

export const updateStatusMassal = async (ids, status) => {
	return await prisma.pendaftar.updateMany({
		where: {
			id_pendaftar: { in: ids.map((id) => Number(id)) },
		},
		data: {
			status_pendaftaran: status,
		},
	});
};

export const updatePassword = async (id, newPassword) => {
	const salt = await bcrypt.genSalt(10);
	const hashedKataSandi = await bcrypt.hash(newPassword, salt);
	return await prisma.pendaftar.update({
		where: { id_pendaftar: Number(id) },
		data: { kata_sandi: hashedKataSandi },
	});
};

export const getStatusById = async (id) => {
	return await prisma.pendaftar.findUnique({
		where: { id_pendaftar: Number(id) },
		select: { status_pendaftaran: true },
	});
};
