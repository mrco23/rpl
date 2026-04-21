import * as GelombangService from "../services/GelombangService.js";

export const getAktif = async (req, res) => {
    try {
        const gelombang = await GelombangService.getAktif();
        if (!gelombang) return res.status(404).json({ message: "Tidak ada gelombang aktif" });
        return res.status(200).json({ message: "success", data: gelombang });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getAll = async (req, res) => {
    try {
        const gelombang = await GelombangService.getAll();
        return res.status(200).json({ message: "success", data: gelombang });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getById = async (req, res) => {
    try {
        const gelombang = await GelombangService.getById(req.params.id);
        if (!gelombang) return res.status(404).json({ message: "Data tidak ditemukan" });
        return res.status(200).json({ message: "success", data: gelombang });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const create = async (req, res) => {
    try {
        const gelombang = await GelombangService.create(req.body);
        return res.status(201).json({ message: "Berhasil membuat gelombang", data: gelombang });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const update = async (req, res) => {
    try {
        const gelombang = await GelombangService.update(req.params.id, req.body);
        return res.status(200).json({ message: "Berhasil memperbarui gelombang", data: gelombang });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const remove = async (req, res) => {
    try {
        await GelombangService.remove(req.params.id);
        return res.status(200).json({ message: "Data berhasil dihapus" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
