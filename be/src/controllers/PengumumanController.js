import * as PengumumanService from "../services/PengumumanService.js";

export const getAll = async (req, res) => {
	try {
		const data = await PengumumanService.getAllPengumuman(req.user.id);
		res.json({
			message: "success",
			data: data.map((item) => PengumumanService.serialize(req, item)),
		});
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

export const getPublic = async (req, res) => {
	try {
		const data = await PengumumanService.getPublicPengumuman();
		res.json({
			message: "success",
			data: data.map((item) => PengumumanService.serialize(req, item)),
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getDetailPublic = async (req, res) => {
	try {
		const data = await PengumumanService.getOnePublicPengumuman(req.params.id);
		if (!data) return res.status(404).json({ message: "Data tidak ditemukan" });
		res.json({ message: "success", data: PengumumanService.serialize(req, data) });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const create = async (req, res) => {
	try {
		const created = await PengumumanService.createPengumuman(req.user.id, req.body);
		res.status(201).json({
			message: "Berhasil membuat PendaftarPengumumanPage",
			data: PengumumanService.serialize(req, created),
		});
	} catch (error) {
		res.status(400).json({ message: error.message || "Gagal membuat PendaftarPengumumanPage" });
	}
};

export const updateData = async (req, res) => {
	try {
		const updated = await PengumumanService.updatePengumumanData(
			req.user.id,
			req.params.id,
			req.body,
		);
		res.json({
			message: "Data berhasil diperbarui",
			data: PengumumanService.serialize(req, updated),
		});
	} catch (error) {
		res.status(400).json({ message: error.message || "Gagal update data PendaftarPengumumanPage" });
	}
};

export const remove = async (req, res) => {
	try {
		await PengumumanService.deletePengumuman(req.user.id, req.params.id);
		res.json({ message: "Data berhasil dihapus" });
	} catch (error) {
		res.status(400).json({ message: error.message || "Gagal menghapus data" });
	}
};

export const getByPendaftar = async (req, res) => {
	try {
		const data = await PengumumanService.getPengumumanByPendaftar(req.user.id);
		res.json({
			message: "success",
			data: data.map((item) => PengumumanService.serialize(req, item)),
		});
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

