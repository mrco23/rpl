import express from "express";
import {
	createProfil,
	updateProfilData,
	updateProfilImage,
	upsertKontak,
	getProfil,
	getPublicProfil,
} from "../controllers/ProfilController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const profilRoute = express.Router();

// PUBLIC
profilRoute.get("", getPublicProfil);

// PRIVATE
profilRoute.get("", verifyToken, getProfil);

/* 
  POST: Membuat profil pertama kali beserta gambar.
*/
profilRoute.post(
	"",
	verifyToken,
	upload.fields([
		{ name: "logo", maxCount: 1 },
		{ name: "foto_kepala_sekolah", maxCount: 1 },
	]),
	createProfil,
);

/* 
  PUT: Update hanya data profil (teks) tanpa gambar.
*/
profilRoute.put("", verifyToken, updateProfilData);

/* 
  PATCH: Khusus mengganti gambar logo / foto_kepala_sekolah.
*/
profilRoute.patch(
	"/image",
	verifyToken,
	upload.fields([
		{ name: "logo", maxCount: 1 },
		{ name: "foto_kepala_sekolah", maxCount: 1 },
	]),
	updateProfilImage,
);

/* 
  POST: Upsert kontak karena relasi 1:1 dan tanpa file.
*/
profilRoute.post("/kontak", verifyToken, upsertKontak);

export default profilRoute;
