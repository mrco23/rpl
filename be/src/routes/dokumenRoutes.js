import express from "express";
import DokumenController from "../controllers/DokumenController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const dokumenRoute = express.Router();

// Endpoint Update Verifikasi Dokumen 
// Menggunakan verifyToken u/ verifikator login token validation
dokumenRoute.patch("/:id_dokumen/verifikasi", verifyToken, DokumenController.updateVerifikasi);

export default dokumenRoute;
