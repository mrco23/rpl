import DokumenService from "../services/DokumenService.js";

import { uploadFileToCloudinary } from "../utils/file.js";

class DokumenController {
  getMe = async (req, res) => {
    try {
      const idPendaftar = req.user.id;
      const data = await DokumenService.getDokumenByPendaftar(idPendaftar);
      return res.status(200).json({ message: "success", data });
    } catch (error) {
      return res.status(500).json({ message: "Gagal mengambil dokumen", error: error.message });
    }
  };

  getByPendaftar = async (req, res) => {
    try {
      const { id_pendaftar } = req.params;
      const data = await DokumenService.getDokumenByPendaftar(id_pendaftar);
      return res.status(200).json({ message: "success", data });
    } catch (error) {
      return res.status(500).json({ message: "Gagal mengambil dokumen pendaftar", error: error.message });
    }
  };

  upload = async (req, res) => {
    try {
      const idPendaftar = req.user.id;
      const { nama_dokumen } = req.body;
      
      if (!req.file) {
        return res.status(400).json({ message: "File wajib diunggah" });
      }

      if (!nama_dokumen) {
        return res.status(400).json({ message: "Nama dokumen wajib diisi" });
      }

      const uploadResult = await uploadFileToCloudinary(req.file.buffer, "dokumen");
      const filePath = uploadResult.secure_url;
      const data = await DokumenService.uploadDokumen(idPendaftar, nama_dokumen, filePath);

      return res.status(200).json({ message: "Dokumen berhasil diunggah", data });
    } catch (error) {
      return res.status(500).json({ message: "Gagal mengunggah dokumen", error: error.message });
    }
  };
}

export default new DokumenController();

