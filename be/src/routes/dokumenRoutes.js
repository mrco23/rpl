import express from "express";
import DokumenController from "../controllers/DokumenController.js";
import { verifyToken, authorizeRole } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const dokumenRoute = express.Router();

// Get dokumen milik pendaftar yang login
dokumenRoute.get("/me", verifyToken, authorizeRole("pendaftar"), DokumenController.getMe);

// Get dokumen pendaftar tertentu (untuk verifikator/admin)
dokumenRoute.get("/pendaftar/:id_pendaftar", verifyToken, authorizeRole("admin", "verifikator"), DokumenController.getByPendaftar);

// Upload dokumen (untuk pendaftar)
dokumenRoute.post("/upload", verifyToken, authorizeRole("pendaftar"), upload.single("file"), DokumenController.upload);

export default dokumenRoute;

