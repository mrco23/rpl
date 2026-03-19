import ProfilService from "../services/ProfilService.js";

class ProfilController {
  upsertProfil = async (req, res) => {
    try {
      const idAdmin = req.user.id;
      await ProfilService.upsertProfil(idAdmin, req.body);
      const updatedData = await ProfilService.getProfilPlain(idAdmin);
      return res.status(200).json({ message: "success", data: ProfilService.serialize(req, updatedData) });
    } catch (error) {
      if (error.code === "P2002") {
        return res.status(400).json({ message: "Nama sekolah sudah terdaftar!" });
      }
      return res.status(500).json({ message: "Gagal update profil", error: error.message });
    }
  };

  upsertKontak = async (req, res) => {
    try {
      const idAdmin = req.user.id;
      await ProfilService.upsertKontak(idAdmin, req.body);
      const updatedData = await ProfilService.getProfilPlain(idAdmin);
      return res.status(200).json({ message: "success", data: ProfilService.serialize(req, updatedData) });
    } catch (error) {
      return res.status(500).json({ message: "Gagal update kontak", error: error.message });
    }
  };

  getProfil = async (req, res) => {
    try {
      const idAdmin = req.user.id;
      const data = await ProfilService.getProfilPlain(idAdmin);
      return res.status(200).set("Cache-Control", "no-store").json({
        message: "success",
        data: ProfilService.serialize(req, data),
      });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  };

  getPublicProfil = async (req, res) => {
    try {
      const data = await ProfilService.getPublicProfil();
      return res.status(200).json({
        message: "success",
        data: ProfilService.serialize(req, data),
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
}

export default ProfilController;
