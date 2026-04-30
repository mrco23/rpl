import * as FasilitasService from "../services/FasilitasService.js";



export const getAll = async (req, res) => {
	try {
		const data = await FasilitasService.getAllFasilitas(req.user.id);
		res.json({
			message: "success",
			data: data.map((item) => FasilitasService.serialize(req, item)),
		});
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

export const getPublic = async (req, res) => {
	try {
		const data = await FasilitasService.getPublicFasilitas();
		res.json({
			message: "success",
			data: data.map((item) => FasilitasService.serialize(req, item)),
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getDetailPublic = async (req, res) => {
	try {
		const data = await FasilitasService.getOnePublicFasilitas(req.params.id);
		if (!data) return res.status(404).json({ message: "Data tidak ditemukan" });
		res.json({ message: "success", data: FasilitasService.serialize(req, data) });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

import { uploadFileToCloudinary } from "../utils/file.js";

export const create = async (req, res) => {
	try {
		const payload = { ...req.body };
		if (req.file) {
			const uploadResult = await uploadFileToCloudinary(req.file.buffer, "fasilitas");
			payload.gambar = uploadResult.secure_url;
		}
		const created = await FasilitasService.createFasilitas(req.user.id, payload);
		res.status(201).json({
			message: "Berhasil membuat Fasilitas",
			data: FasilitasService.serialize(req, created),
		});
	} catch (error) {
		res.status(400).json({ message: error.message || "Gagal membuat Fasilitas" });
	}
};

export const updateData = async (req, res) => {
	try {
		const updated = await FasilitasService.updateFasilitasData(
			req.user.id,
			req.params.id,
			req.body,
		);
		res.json({
			message: "Data berhasil diperbarui",
			data: FasilitasService.serialize(req, updated),
		});
	} catch (error) {
		res.status(400).json({ message: error.message || "Gagal update data Fasilitas" });
	}
};

export const updateImage = async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({ message: "Gambar belum diupload" });
		}
		const uploadResult = await uploadFileToCloudinary(req.file.buffer, "fasilitas");
		const updated = await FasilitasService.updateFasilitasImage(
			req.user.id,
			req.params.id,
			uploadResult.secure_url,
		);
		res.json({
			message: "Gambar berhasil diperbarui",
			data: FasilitasService.serialize(req, updated),
		});
	} catch (error) {
		res.status(400).json({ message: error.message || "Gagal update gambar Fasilitas" });
	}
};

export const remove = async (req, res) => {
	try {
		await FasilitasService.deleteFasilitas(req.user.id, req.params.id);
		res.json({ message: "Data berhasil dihapus" });
	} catch (error) {
		res.status(400).json({ message: error.message || "Gagal menghapus data" });
	}
};
