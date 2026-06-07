import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
import { STATUS_PENDAFTARAN } from "../constants/statusPendaftaran.js";

/**
 * Returns a copy of `date` with time set to 23:59:59.999.
 * This makes `tanggal_selesai` inclusive for the entire final calendar day.
 */
export const getEndOfDay = (date) => {
	const d = new Date(date);
	d.setHours(23, 59, 59, 999);
	return d;
};

export const register = async (payload) => {
	const now = new Date();
	// Use end-of-day boundary so registrations on the last calendar day still work
	const activeGelombang = await prisma.gelombang.findFirst({
		where: {
			tanggal_mulai: { lte: now },
			tanggal_selesai: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
		},
	});

	// Secondary check: ensure we are still within today (up to 23:59:59.999)
	const isWithinBatch =
		activeGelombang &&
		now <= getEndOfDay(activeGelombang.tanggal_selesai) &&
		now >= new Date(activeGelombang.tanggal_mulai);

	if (!isWithinBatch) {
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
		const error = new Error(
			"Field wajib belum lengkap. Pastikan nama_lengkap, alamat, jenis_kelamin, no_hp, asal_sekolah terisi.",
		);
		error.statusCode = 400;
		throw error;
	}

	// Explicit email duplicate check
	if (payload.email) {
		const existingEmail = await prisma.pendaftar.findFirst({ where: { email: payload.email } });
		if (existingEmail) {
			const error = new Error("Email sudah digunakan oleh pendaftar lain.");
			error.statusCode = 409;
			throw error;
		}
	}

	if (payload.nisn) {
		const existingNisn = await prisma.pendaftar.findUnique({ where: { nisn: payload.nisn } });
		if (existingNisn) {
			const error = new Error("NISN sudah digunakan oleh pendaftar lain.");
			error.statusCode = 409;
			throw error;
		}
	}

	let hashedKataSandi = null;
	if (payload.kata_sandi) {
		const salt = await bcrypt.genSalt(10);
		hashedKataSandi = await bcrypt.hash(payload.kata_sandi, salt);
	}

	// Biarkan database mengisi id_pendaftar secara otomatis via auto increment
	return prisma.pendaftar.create({
		data: {
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
			status_pendaftaran: STATUS_PENDAFTARAN.MENUNGGU_VERIFIKASI,
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
		},
		include: { alamat: true },
	});
};

export const getPendaftar = async (nisn) => {
	let pendaftar = await prisma.pendaftar.findUnique({
		where: { nisn },
		include: { alamat: true },
	});
	if (pendaftar) {
		return { ...pendaftar, id: pendaftar.id_pendaftar };
	}
	return null;
};

export const getPendaftarByEmail = async (email) => {
	return await prisma.pendaftar.findFirst({
		where: { email },
	});
};

export const setResetToken = async (id, token, expires) => {
	return await prisma.pendaftar.update({
		where: { id_pendaftar: Number(id) },
		data: {
			resetPasswordToken: token,
			resetPasswordExpires: expires,
		},
	});
};

export const getPendaftarByResetToken = async (token) => {
	return await prisma.pendaftar.findFirst({
		where: {
			resetPasswordToken: token,
			resetPasswordExpires: {
				gt: new Date(),
			},
		},
	});
};

export const clearResetToken = async (id) => {
	return await prisma.pendaftar.update({
		where: { id_pendaftar: Number(id) },
		data: {
			resetPasswordToken: null,
			resetPasswordExpires: null,
		},
	});
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
	return pendaftars.map((p) => {
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
	const data = await prisma.pendaftar.findUnique({
		where: { id_pendaftar: Number(id) },
		select: {
			status_pendaftaran: true,
			tanggal_daftar: true,
			catatan_dokumen: true,
			gelombang: {
				select: {
					id_gelombang: true,
					nama: true,
					tanggal_mulai: true,
					tanggal_selesai: true,
				},
			},
		},
	});

	if (data) {
		return data;
	}
	return null;
};

export const deletePendaftar = async (id) => {
	const idNum = Number(id);

	const pendaftar = await prisma.pendaftar.findUnique({
		where: { id_pendaftar: idNum },
	});
	if (!pendaftar) throw new Error("Pendaftar tidak ditemukan");

	// Hapus secara eksplisit dalam transaksi agar aman di TiDB
	// (TiDB tidak selalu menegakkan FK CASCADE)
	return await prisma.$transaction(async (tx) => {
		await tx.pengumumanPendaftar.deleteMany({ where: { id_pendaftar: idNum } });
		await tx.dokumen.deleteMany({ where: { id_pendaftar: idNum } });
		await tx.alamat.deleteMany({ where: { id_pendaftar: idNum } });
		return tx.pendaftar.delete({ where: { id_pendaftar: idNum } });
	});
};
