import * as EkstrakurikulerService from "../services/EkstrakurikulerService.js";

export const getAll = async (req, res) => {
	try {
		const data = await EkstrakurikulerService.getAllEkstrakurikuler(req.user.id);
		res.json({
			message: "success",
			data: data.map((item) => EkstrakurikulerService.serialize(req, item)),
		});
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

export const getPublic = async (req, res) => {
	try {
		const data = await EkstrakurikulerService.getPublicEkstrakurikuler();
		res.json({
			message: "success",
			data: data.map((item) => EkstrakurikulerService.serialize(req, item)),
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getDetailPublic = async (req, res) => {
	try {
		const data = await EkstrakurikulerService.getOnePublicEkstrakurikuler(req.params.id);
		if (!data) return res.status(404).json({ message: "Data tidak ditemukan" });
		res.json({ message: "success", data: EkstrakurikulerService.serialize(req, data) });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

import { uploadFileToCloudinary } from "../utils/file.js";

/* 
  POST: Membuat data baru beserta gambar (jika ada).
*/
export const create = async (req, res) => {
	try {
		const payload = { ...req.body };
		if (req.file) {
			const uploadResult = await uploadFileToCloudinary(req.file.buffer, "ekstrakurikuler");
			payload.gambar_ekskul = uploadResult.secure_url;
		}

		const created = await EkstrakurikulerService.createEkstrakurikuler(req.user.id, payload);
		res.status(201).json({
			message: "Berhasil membuat Ekstrakurikuler",
			data: EkstrakurikulerService.serialize(req, created),
		});
	} catch (error) {
		res.status(400).json({ message: error.message || "Gagal membuat Ekstrakurikuler" });
	}
};

/* 
  PUT: Update khusus teks saja (judul, deskripsi, dsb.).
*/
export const updateData = async (req, res) => {
	try {
		const updated = await EkstrakurikulerService.updateEkstrakurikulerData(
			req.user.id,
			req.params.id,
			req.body,
		);
		res.json({
			message: "Data berhasil diperbarui",
			data: EkstrakurikulerService.serialize(req, updated),
		});
	} catch (error) {
		res.status(400).json({ message: error.message || "Gagal update data Ekstrakurikuler" });
	}
};

/* 
  PATCH: Khusus update gambar, otomatis hapus file lama di Service.
*/
export const updateImage = async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({ message: "Gambar belum diupload" });
		}
		const uploadResult = await uploadFileToCloudinary(req.file.buffer, "ekstrakurikuler");
		const updated = await EkstrakurikulerService.updateEkstrakurikulerImage(
			req.user.id,
			req.params.id,
			uploadResult.secure_url,
		);
		res.json({
			message: "Gambar berhasil diperbarui",
			data: EkstrakurikulerService.serialize(req, updated),
		});
	} catch (error) {
		res.status(400).json({ message: error.message || "Gagal update gambar Ekstrakurikuler" });
	}
};

/* 
  DELETE: Hapus row data dan hilangkan fisik file gambar jika ada.
*/
export const remove = async (req, res) => {
	try {
		await EkstrakurikulerService.deleteEkstrakurikuler(req.user.id, req.params.id);
		res.json({ message: "Data berhasil dihapus" });
	} catch (error) {
		res.status(400).json({ message: error.message || "Gagal menghapus data" });
	}
};
