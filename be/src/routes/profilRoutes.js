import express from "express";
import ProfilController from "../controllers/ProfilController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const profilRoute = express.Router();
const profilController = new ProfilController();

const {
  upsertProfil,
  upsertKontak,
  getProfil,
  getPublicProfil,
} = profilController;

const handleProfileUploads = (req, _res, next) => {
  if (req.files?.logo?.[0]) {
    req.body.logo = req.files.logo[0].filename;
  }
  if (req.files?.foto_kepala_sekolah?.[0]) {
    req.body.foto_kepala_sekolah = req.files.foto_kepala_sekolah[0].filename;
  }
  next();
};

// PUBLIC
profilRoute.get("/public", getPublicProfil);

// PRIVATE
profilRoute.get("", verifyToken, getProfil);

// We combine both profile create/update logic in upsert due to relation 1:1 logically
profilRoute.post(
  "",
  verifyToken,
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "foto_kepala_sekolah", maxCount: 1 },
  ]),
  handleProfileUploads,
  upsertProfil
);

profilRoute.post(
  "/kontak",
  verifyToken,
  upsertKontak
);

export default profilRoute;
