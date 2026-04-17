import * as ProfilService from "../services/ProfilService.js";

/* 
  POST: Create Profil (Pertama kali isi, boleh dengan gambar)
*/
export const createProfil = async (req, res) => {
	try {
		const idAdmin = req.user.id;
		// Tambahkan nama file ke body jika ada file yang diunggah
		if (req.files?.foto_kepala_sekolah?.[0]) {
			req.body.foto_kepala_sekolah = req.files.foto_kepala_sekolah[0].filename;
		}

		await ProfilService.createProfil(idAdmin, req.body);
		const updatedData = await ProfilService.getProfilPlain(idAdmin);
		return res
			.status(201)
			.json({ message: "Profil berhasil dibuat", data: ProfilService.serialize(req, updatedData) });
	} catch (error) {
		if (error.code === "P2002") {
			return res.status(400).json({ message: "Nama sekolah sudah terdaftar!" });
		}
		return res.status(400).json({ message: error.message || "Gagal membuat profil" });
	}
};

/* 
  PUT: Update Profil (Hanya data teks, tanpa gambar)
*/
export const updateProfilData = async (req, res) => {
	try {
		const idAdmin = req.user.id;
		await ProfilService.updateProfilData(idAdmin, req.body);
		const updatedData = await ProfilService.getProfilPlain(idAdmin);
		return res.status(200).json({
			message: "Data profil berhasil diperbarui",
			data: ProfilService.serialize(req, updatedData),
		});
	} catch (error) {
		return res.status(400).json({ message: error.message || "Gagal update data profil" });
	}
};

/* 
  PATCH: Update Foto Kepala Sekolah (Hanya gambar)
*/
export const updateProfilImage = async (req, res) => {
	try {
		const idAdmin = req.user.id;
		const newFiles = {};
		if (req.files?.foto_kepala_sekolah?.[0]) {
			newFiles.foto_kepala_sekolah = req.files.foto_kepala_sekolah[0].filename;
		}

		if (Object.keys(newFiles).length === 0) {
			return res.status(400).json({ message: "Tidak ada file gambar yang diunggah" });
		}

		await ProfilService.updateProfilImage(idAdmin, newFiles);
		const updatedData = await ProfilService.getProfilPlain(idAdmin);
		return res.status(200).json({
			message: "Gambar profil berhasil diperbarui",
			data: ProfilService.serialize(req, updatedData),
		});
	} catch (error) {
		return res.status(400).json({ message: error.message || "Gagal update gambar profil" });
	}
};

export const upsertKontak = async (req, res) => {
	try {
		const idAdmin = req.user.id;
		await ProfilService.upsertKontak(idAdmin, req.body);
		const updatedData = await ProfilService.getProfilPlain(idAdmin);
		return res.status(200).json({
			message: "Kontak berhasil diperbarui",
			data: ProfilService.serialize(req, updatedData),
		});
	} catch (error) {
		return res.status(500).json({ message: "Gagal update kontak", error: error.message });
	}
};

export const getProfil = async (req, res) => {
	try {
		const idAdmin = req.user.id;
		const data = await ProfilService.getProfilPlain(idAdmin);
		return res
			.status(200)
			.set("Cache-Control", "no-store")
			.json({
				message: "success",
				data: ProfilService.serialize(req, data),
			});
	} catch (error) {
		return res.status(404).json({ message: error.message });
	}
};

export const getPublicProfil = async (req, res) => {
	try {
		const data = await ProfilService.getPublicProfil();
		return res.status(200).json({
			message: "success",
			data: ProfilService.serialize(req, data),
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const getLandingPage = async (req, res) => {
	try {
		const data = await ProfilService.getLandingPageData();
		return res.status(200).json({
			message: "success",
			data: ProfilService.serializeLandingPage(req, data),
		});
	} catch (error) {
		return res.status(500).json({ message: error.message || "Gagal mengambil data landing page" });
	}
};
