import PendaftarService from "../services/PendaftarService.js";

class PendaftarController {
  register = async (req, res) => {
    try {
      const pendaftar = await PendaftarService.register(req.body);
      return res.status(201).json({ 
        message: "Registrasi berhasil", 
        data: pendaftar 
      });
    } catch (error) {
      return res.status(400).json({ 
        message: "Gagal melakukan registrasi", 
        error: error.message 
      });
    }
  };
}

export default new PendaftarController();
