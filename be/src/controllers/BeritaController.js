import * as BeritaService from "../services/BeritaService.js";
import {verifyToken} from "../utils/jwt.js";

export const getAll = async (req, res) => {
  try {
    const data = await BeritaService.getAllBerita(req.user.id);
    res.json({ message: "success", data: data.map((item) => BeritaService.serialize(req, item)) });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getPublic = async (req, res) => {
  try {
    const data = await BeritaService.getPublicBerita();
    res.json({ message: "success", data: data.map((item) => BeritaService.serialize(req, item)) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDetailPublic = async (req, res) => {
  try {
    const data = await BeritaService.getOnePublicBerita(req.params.id);
    if (!data) return res.status(404).json({ message: "Data tidak ditemukan" });
    res.json({ message: "success", data: BeritaService.serialize(req, data) });
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

    const {id} = verifyToken(req);

    const created = await BeritaService.createBerita(id, payload);
    res.status(201).json({ message: "Berhasil membuat Berita", data: BeritaService.serialize(req, created) });
  } catch (error) {
    res.status(400).json({ message: error.message || "Gagal membuat Berita" });
  }
};

export const updateData = async (req, res) => {
  try {
    const token = req.headers['authorization'].split(' ')[1]
    const {id, role} = verifyToken(token);

    const updated = await BeritaService.updateBeritaData(id, req.params.id, req.body);
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
    const updated = await BeritaService.updateBeritaImage(req.user.id, req.params.id, req.file.filename);
    res.json({ message: "Gambar berhasil diperbarui", data: BeritaService.serialize(req, updated) });
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
