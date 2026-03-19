import DokumenService from "../services/DokumenService.js";

class DokumenController {
  updateVerifikasi = async (req, res) => {
    try {
      const { status_verifikasi, catatan_verifikasi } = req.body;
      const { id_dokumen } = req.params;
      
      const idVerifikator = req.user.id;

      if (!status_verifikasi) {
        return res.status(400).json({ message: "status_verifikasi wajib diisi" });
      }

      const updated = await DokumenService.updateVerifikasi(id_dokumen, idVerifikator, {
        status_verifikasi,
        catatan_verifikasi
      });

      return res.status(200).json({ 
        message: "Verifikasi dokumen berhasil diupdate", 
        data: updated 
      });
    } catch (error) {
      return res.status(400).json({ 
        message: "Gagal update verifikasi", 
        error: error.message 
      });
    }
  };
}

export default new DokumenController();
