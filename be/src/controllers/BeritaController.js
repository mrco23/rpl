import * as BeritaService from "../services/BeritaService.js";

export const getAll = async (req, res) => {
	try {
		const data = await BeritaService.getAll();
		res.json({ message: "success", data: data.map((item) => BeritaService.serialize(req, item)) });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

export const getDetail = async (req, res) => {
	try {
		const data = await BeritaService.getDetail(req.params.id);
		if (!data) return res.status(404).json({ message: "Data tidak ditemukan" });
		res.json({ message: "success", data: BeritaService.serialize(req, data) });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

import { uploadFileToCloudinary } from "../utils/file.js";

export const create = async (req, res) => {
	try {
		const payload = { ...req.body };
		if (req.file) {
			const uploadResult = await uploadFileToCloudinary(req.file.buffer, "berita");
			payload.gambar = uploadResult.secure_url;
		}

		const created = await BeritaService.createBerita(req.user.id, payload);
		res
			.status(201)
			.json({ message: "Berhasil membuat Berita", data: BeritaService.serialize(req, created) });
	} catch (error) {
		res.status(400).json({ message: error.message || "Gagal membuat Berita" });
	}
};

export const updateData = async (req, res) => {
	try {
		const updated = await BeritaService.updateBeritaData(req.user.id, req.params.id, req.body);
		res.json({ message: "Data berhasil diperbarui", data: BeritaService.serialize(req, updated) });
	} catch (error) {
		res.status(400).json({ message: error.message || "Gagal update data Berita" });
	}
};

export const updateImage = async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({ message: "Gambar belum diupload" });
		}
		const uploadResult = await uploadFileToCloudinary(req.file.buffer, "berita");
		const updated = await BeritaService.updateBeritaImage(
			req.user.id,
			req.params.id,
			uploadResult.secure_url,
		);
		res.json({
			message: "Gambar berhasil diperbarui",
			data: BeritaService.serialize(req, updated),
		});
	} catch (error) {
		res.status(400).json({ message: error.message || "Gagal update gambar Berita" });
	}
};

export const remove = async (req, res) => {
	try {
		await BeritaService.deleteBerita(req.user.id, req.params.id);
		res.json({ message: "Data berhasil dihapus" });
	} catch (error) {
		res.status(400).json({ message: error.message || "Gagal menghapus data" });
	}
};
