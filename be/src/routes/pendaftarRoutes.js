import express from "express";
import PendaftarController from "../controllers/PendaftarController.js";
import { verifyToken, authorizeRole } from "../middleware/authMiddleware.js";

const pendaftarRoute = express.Router();

// Endpoint Registrasi Pendaftar
pendaftarRoute.post("/register", PendaftarController.register);
pendaftarRoute.post("/login", PendaftarController.login);

// Endpoint Biodata Pendaftar yang sedang login (ambil id dari token)
pendaftarRoute.get("/me", verifyToken, authorizeRole("pendaftar"), PendaftarController.getMe);

// Endpoint Ambil Semua Pendaftar
pendaftarRoute.get("/", verifyToken, authorizeRole("admin", "verifikator"), PendaftarController.getAllPendaftar);

export default pendaftarRoute;
