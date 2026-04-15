import * as EkstrakurikulerService from "../services/EkstrakurikulerService.js";

export const getAll = async (req, res) => {
  try {
    const data = await EkstrakurikulerService.getAllEkstrakurikuler(req.user.id);
    res.json({ message: "success", data: data.map((item) => EkstrakurikulerService.serialize(req, item)) });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getPublic = async (req, res) => {
  try {
    const data = await EkstrakurikulerService.getPublicEkstrakurikuler();
    res.json({ message: "success", data: data.map((item) => EkstrakurikulerService.serialize(req, item)) });
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

/* 
  POST: Membuat data baru beserta gambar (jika ada).
*/
export const create = async (req, res) => {
  try {
    const payload = { ...req.body };
    if (req.file) {
      payload.gambar_ekskul = req.file.filename;
    }

    const created = await EkstrakurikulerService.createEkstrakurikuler(req.user.id, payload);
    res.status(201).json({ message: "Berhasil membuat Ekstrakurikuler", data: EkstrakurikulerService.serialize(req, created) });
  } catch (error) {
    res.status(400).json({ message: error.message || "Gagal membuat Ekstrakurikuler" });
  }
};

/* 
  PUT: Update khusus teks dan file opsional.
*/
export const updateData = async (req, res) => {
  try {
    const payload = { ...req.body };
    if (req.file) {
      payload.gambar_ekskul = req.file.filename;
    }

    const updated = await EkstrakurikulerService.updateEkstrakurikulerData(req.user.id, req.params.id, payload);
    res.json({ message: "Data berhasil diperbarui", data: EkstrakurikulerService.serialize(req, updated) });
  } catch (error) {
    res.status(400).json({ message: error.message || "Gagal update data Ekstrakurikuler" });
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
