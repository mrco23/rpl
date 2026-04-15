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
			nama_kepala_sekolah: payload.nama_kepala_sekolah,
			foto_kepala_sekolah: payload.foto_kepala_sekolah || undefined,
			kata_sambutan: payload.kata_sambutan,
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
			nama_kepala_sekolah: payload.nama_kepala_sekolah,
			kata_sambutan: payload.kata_sambutan,
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
		nama_kepala_sekolah: profil.nama_kepala_sekolah || "",
		foto_kepala_sekolah: buildFileUrl(req, profil.foto_kepala_sekolah),
		kata_sambutan: profil.kata_sambutan || "",
		id_kontak: kontak.id_kontak,
		alamat: kontak.alamat || "",
		no_telpon: kontak.no_telpon || "",
		email: kontak.email || "",
		media_sosial: kontak.media_sosial || "",
		whatsapp: kontak.whatsapp || "",
		link_maps: kontak.link_maps || "",
	};
};

export const getLandingPageData = async () => {
	const [total_program, total_fasilitas, total_ekstrakurikuler, total_prestasi] = await Promise.all(
		[
			prisma.programUnggulan.count(),
			prisma.fasilitas.count(),
			prisma.ekstrakurikuler.count(),
			prisma.prestasi.count(),
		],
	);

	const fasilitas = await prisma.fasilitas.findMany({
		orderBy: { id_fasilitas: "desc" },
		take: 3,
		select: {
			nama_fasilitas: true,
			gambar_fasilitas: true,
		},
	});

	const prestasi = await prisma.prestasi.findMany({
		orderBy: { id_prestasi: "desc" },
		take: 3,
		select: {
			gambar_prestasi: true,
			judul_prestasi: true,
			deskripsi: true,
		},
	});

	const profil = await prisma.profil.findFirst({
		select: {
			kata_sambutan: true,
			foto_kepala_sekolah: true,
			nama_kepala_sekolah: true,
		},
	});

	const berita = await prisma.berita.findMany({
		orderBy: { tanggal_dibuat: "desc" },
		take: 3,
		select: {
			gambar_berita: true,
			tanggal_dibuat: true,
			judul_berita: true,
			deskripsi: true,
		},
	});

	return {
		total_data: {
			program_unggulan: total_program,
			fasilitas: total_fasilitas,
			ekstrakurikuler: total_ekstrakurikuler,
			prestasi: total_prestasi,
		},
		fasilitas: fasilitas,
		prestasi: prestasi,
		profil_kepala_sekolah: profil,
		berita_terbaru: berita,
	};
};

export const serializeLandingPage = (req, data) => {
	return {
		total_data: data.total_data,
		fasilitas: data.fasilitas.map((f) => ({
			gambar: buildFileUrl(req, f.gambar_fasilitas),
			nama_fasilitas: f.nama_fasilitas,
		})),
		prestasi: data.prestasi.map((p) => ({
			gambar: buildFileUrl(req, p.gambar_prestasi),
			nama_prestasi: p.judul_prestasi,
			deskripsi: p.deskripsi,
		})),
		berita: data.berita_terbaru.map((b) => ({
			gambar: buildFileUrl(req, b.gambar_berita),
			judul: b.judul_berita,
			deskripsi: b.deskripsi,
			tanggal: b.tanggal_dibuat,
		})),
		kepala_sekolah: data.profil_kepala_sekolah
			? {
					gambar: buildFileUrl(req, data.profil_kepala_sekolah.foto_kepala_sekolah),
					nama: data.profil_kepala_sekolah.nama_kepala_sekolah,
					kata_sambutan: data.profil_kepala_sekolah.kata_sambutan,
				}
			: null,
	};
};
