import * as ProgramUnggulanService from "../services/ProgramUnggulanService.js";

export const getAll = async (req, res) => {
  try {
    const data = await ProgramUnggulanService.getAllProgram(req.user.id);
    res.json({ message: "success", data: data.map((item) => ProgramUnggulanService.serialize(req, item)) });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getPublic = async (req, res) => {
  try {
    const data = await ProgramUnggulanService.getPublicProgram();
    res.json({ message: "success", data: data.map((item) => ProgramUnggulanService.serialize(req, item)) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDetailPublic = async (req, res) => {
  try {
    const data = await ProgramUnggulanService.getOnePublicProgram(req.params.id);
    if (!data) return res.status(404).json({ message: "Data tidak ditemukan" });
    res.json({ message: "success", data: ProgramUnggulanService.serialize(req, data) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const payload = { ...req.body };
    if (req.file) {
      payload.gambar_pu = req.file.filename;
    }

    const created = await ProgramUnggulanService.createProgram(req.user.id, payload);
    res.status(201).json({ message: "Berhasil membuat Program Unggulan", data: ProgramUnggulanService.serialize(req, created) });
  } catch (error) {
    res.status(400).json({ message: error.message || "Gagal membuat Program Unggulan" });
  }
};

export const updateData = async (req, res) => {
  try {
    const payload = { ...req.body };
    if (req.file) {
      payload.gambar_pu = req.file.filename;
    }

    const updated = await ProgramUnggulanService.updateProgramData(req.user.id, req.params.id, payload);
    res.json({ message: "Data berhasil diperbarui", data: ProgramUnggulanService.serialize(req, updated) });
  } catch (error) {
    res.status(400).json({ message: error.message || "Gagal update data Program Unggulan" });
  }
};

export const remove = async (req, res) => {
  try {
    await ProgramUnggulanService.deleteProgram(req.user.id, req.params.id);
    res.json({ message: "Data berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ message: error.message || "Gagal menghapus data" });
  }
};
