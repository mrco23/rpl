import express from "express";
import {
	createProfil,
	updateProfilData,
	updateProfilImage,
	upsertKontak,
	getProfil,
	getPublicProfil,
	getLandingPage,
} from "../controllers/ProfilController.js";
import { verifyToken, authorizeRole } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const profilRoute = express.Router();

// PUBLIC
profilRoute.get("", getPublicProfil);
profilRoute.get("/landing-page", getLandingPage);

// PRIVATE
profilRoute.get("/admin", verifyToken, authorizeRole("admin"), getProfil);

/* 
  POST: Membuat profil pertama kali beserta gambar.
*/
profilRoute.post(
	"",
	verifyToken,
	authorizeRole("admin"),
	upload.fields([
		{ name: "foto_kepala_sekolah", maxCount: 1 },
	]),
	createProfil,
);

/* 
  PUT: Update hanya data profil (teks) tanpa gambar.
*/
profilRoute.put("", verifyToken, authorizeRole("admin"), updateProfilData);

/* 
  PATCH: Khusus mengganti gambar foto_kepala_sekolah.
*/
profilRoute.patch(
	"/image",
	verifyToken,
	authorizeRole("admin"),
	upload.fields([
		{ name: "foto_kepala_sekolah", maxCount: 1 },
	]),
	updateProfilImage,
);

/* 
  POST: Upsert kontak karena relasi 1:1 dan tanpa file.
*/
profilRoute.post("/kontak", verifyToken, authorizeRole("admin"), upsertKontak);

export default profilRoute;
