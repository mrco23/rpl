import express from "express";
import ProfilSekolah from "../controllers/ProfilSekolah.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const profilSekolahRoute = express.Router();
const profilSekolah = new ProfilSekolah();

const {
  addProfilSekolah,
  getProfilSekolah,
  updateProfilSekolah,
  getPublicProfilSekolah,
} = profilSekolah;

const handleProfileUploads = (req, _res, next) => {
  if (req.files?.logo?.[0]) {
    req.body.logo = req.files.logo[0].filename;
  }

  if (req.files?.foto_kepala_sekolah?.[0]) {
    req.body.foto_kepala_sekolah =
      req.files.foto_kepala_sekolah[0].filename;
  }

  next();
};

// PUBLIC
profilSekolahRoute.get("/public", getPublicProfilSekolah);

// PRIVATE
profilSekolahRoute.get("", verifyToken, getProfilSekolah);

profilSekolahRoute.post(
  "",
  verifyToken,
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "foto_kepala_sekolah", maxCount: 1 },
  ]),
  handleProfileUploads,
  addProfilSekolah
);

profilSekolahRoute.put(
  "",
  verifyToken,
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "foto_kepala_sekolah", maxCount: 1 },
  ]),
  handleProfileUploads,
  updateProfilSekolah
);

export default profilSekolahRoute;