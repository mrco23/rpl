import prisma from "../config/prisma.js";
import { buildFileUrl, deleteFile } from "../utils/file.js";

export const getProfilPlain = async (id_admin) => {
	const profil = await prisma.profil.findFirst({
		where: { id_admin: Number(id_admin) },
	});
	const kontak = await prisma.kontak.findFirst({
		where: { id_admin: Number(id_admin) },
	});

	return { profil, kontak };
};

export const getPublicProfil = async () => {
	const profil = await prisma.profil.findFirst({
		orderBy: { id_profil: "asc" },
	});
	let kontak = null;
	if (profil) {
		kontak = await prisma.kontak.findFirst({
			where: { id_admin: profil.id_admin },
		});
	}
	return { profil, kontak };
};

/* 
  POST: Membuat profil baru beserta gambar (logo & foto) di awal.
  Jika sudah ada, fungsi akan throw error.
*/
export const createProfil = async (id_admin, payload) => {
	const existing = await prisma.profil.findFirst({
		where: { id_admin: Number(id_admin) },
	});
	if (existing) throw new Error("Profil sudah ada, gunakan fitur update.");

	return prisma.profil.create({
		data: {
			nama_sekolah: payload.nama_sekolah,
			visi: payload.visi,
			misi: payload.misi,
			deskripsi: payload.deskripsi,
			logo: payload.logo || undefined,
			nama_kepala_sekolah: payload.nama_kepala_sekolah,
			foto_kepala_sekolah: payload.foto_kepala_sekolah || undefined,
			sambutan_kepala_sekolah: payload.sambutan_kepala_sekolah,
			id_admin: Number(id_admin),
		},
	});
};

/* 
  PUT: Update profil untuk data teks saja (non-file). 
  Gambar (logo / foto) tidak diupdate di fungsi ini.
*/
export const updateProfilData = async (id_admin, payload) => {
	const profil = await prisma.profil.findFirst({
		where: { id_admin: Number(id_admin) },
	});
	if (!profil) throw new Error("Profil belum dibuat.");

	return prisma.profil.update({
		where: { id_profil: profil.id_profil },
		data: {
			nama_sekolah: payload.nama_sekolah,
			visi: payload.visi,
			misi: payload.misi,
			deskripsi: payload.deskripsi,
			nama_kepala_sekolah: payload.nama_kepala_sekolah,
			sambutan_kepala_sekolah: payload.sambutan_kepala_sekolah,
		},
	});
};

/* 
  PATCH: Khusus update gambar (bisa logo, foto_kepala_sekolah, atau keduanya).
  Fungsi ini otomatis menghapus file lama dari server jika ada pergantian.
*/
export const updateProfilImage = async (id_admin, newFiles) => {
	const profil = await prisma.profil.findFirst({
		where: { id_admin: Number(id_admin) },
	});
	if (!profil) throw new Error("Profil belum dibuat.");

	const dataToUpdate = {};

	if (newFiles.logo) {
		// Hapus logo lama jika ada
		if (profil.logo) {
			deleteFile(profil.logo);
		}
		dataToUpdate.logo = newFiles.logo;
	}

	if (newFiles.foto_kepala_sekolah) {
		// Hapus foto lama jika ada
		if (profil.foto_kepala_sekolah) {
			deleteFile(profil.foto_kepala_sekolah);
		}
		dataToUpdate.foto_kepala_sekolah = newFiles.foto_kepala_sekolah;
	}

	return prisma.profil.update({
		where: { id_profil: profil.id_profil },
		data: dataToUpdate,
	});
};

/* 
  PUT/POST Kontak: Upsert logic untuk kontak (karena relasi 1:1 dan tanpa file).
*/
export const upsertKontak = async (id_admin, payload) => {
	const kontak = await prisma.kontak.findFirst({
		where: { id_admin: Number(id_admin) },
	});

	const data = {
		alamat: payload.alamat,
		no_telpon: payload.no_telpon,
		email: payload.email,
		media_sosial: payload.media_sosial,
		whatsapp: payload.whatsapp,
		link_maps: payload.link_maps,
	};

	if (kontak) {
		return prisma.kontak.update({
			where: { id_kontak: kontak.id_kontak },
			data,
		});
	} else {
		return prisma.kontak.create({
			data: {
				...data,
				id_admin: Number(id_admin),
			},
		});
	}
};

export const serialize = (req, data) => {
	if (!data.profil && !data.kontak) return null;

	const profil = data.profil || {};
	const kontak = data.kontak || {};

	return {
		id_profil: profil.id_profil,
		nama_sekolah: profil.nama_sekolah || "",
		visi: profil.visi || "",
		misi: profil.misi || "",
		deskripsi: profil.deskripsi || "",
		logo: buildFileUrl(req, profil.logo),
		nama_kepala_sekolah: profil.nama_kepala_sekolah || "",
		foto_kepala_sekolah: buildFileUrl(req, profil.foto_kepala_sekolah),
		sambutan_kepala_sekolah: profil.sambutan_kepala_sekolah || "",
		id_kontak: kontak.id_kontak,
		alamat: kontak.alamat || "",
		no_telpon: kontak.no_telpon || "",
		email: kontak.email || "",
		media_sosial: kontak.media_sosial || "",
		whatsapp: kontak.whatsapp || "",
		link_maps: kontak.link_maps || "",
	};
};
