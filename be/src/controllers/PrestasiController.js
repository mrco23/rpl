import * as PrestasiService from "../services/PrestasiService.js";

export const getAll = async (req, res) => {
  try {
    const data = await PrestasiService.getAllPrestasi(req.user.id);
    res.json({ message: "success", data: data.map((item) => PrestasiService.serialize(req, item)) });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getPublic = async (req, res) => {
  try {
    const data = await PrestasiService.getPublicPrestasi();
    res.json({ message: "success", data: data.map((item) => PrestasiService.serialize(req, item)) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDetailPublic = async (req, res) => {
  try {
    const data = await PrestasiService.getOnePublicPrestasi(req.params.id);
    if (!data) return res.status(404).json({ message: "Data tidak ditemukan" });
    res.json({ message: "success", data: PrestasiService.serialize(req, data) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const payload = { ...req.body };
    if (req.file) {
      payload.gambar = req.file.filename;
    }

    const created = await PrestasiService.createPrestasi(req.user.id, payload);
    res.status(201).json({ message: "Berhasil membuat Prestasi", data: PrestasiService.serialize(req, created) });
  } catch (error) {
    res.status(400).json({ message: error.message || "Gagal membuat Prestasi" });
  }
};

export const updateData = async (req, res) => {
  try {
    const updated = await PrestasiService.updatePrestasiData(req.user.id, req.params.id, req.body);
    res.json({ message: "Data berhasil diperbarui", data: PrestasiService.serialize(req, updated) });
  } catch (error) {
    res.status(400).json({ message: error.message || "Gagal update data Prestasi" });
  }
};

export const updateImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Gambar belum diupload" });
    }
    const updated = await PrestasiService.updatePrestasiImage(req.user.id, req.params.id, req.file.filename);
    res.json({ message: "Gambar berhasil diperbarui", data: PrestasiService.serialize(req, updated) });
  } catch (error) {
    res.status(400).json({ message: error.message || "Gagal update gambar Prestasi" });
  }
};

export const remove = async (req, res) => {
  try {
    await PrestasiService.deletePrestasi(req.user.id, req.params.id);
    res.json({ message: "Data berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ message: error.message || "Gagal menghapus data" });
  }
};
