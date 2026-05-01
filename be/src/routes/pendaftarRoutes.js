import express from "express";
import PendaftarController from "../controllers/PendaftarController.js";
import { verifyToken, authorizeRole } from "../middleware/authMiddleware.js";

const pendaftarRoute = express.Router();

// Endpoint Registrasi Pendaftar
pendaftarRoute.post("/register", PendaftarController.register);
pendaftarRoute.post("/login", PendaftarController.login);
pendaftarRoute.post("/change-password", PendaftarController.changePassword);
pendaftarRoute.post("/forgot-password", PendaftarController.forgotPassword);
pendaftarRoute.get("/validate-token/:token", PendaftarController.validateResetToken);
pendaftarRoute.post("/reset-password", PendaftarController.resetPassword);

// Endpoint Biodata Pendaftar yang sedang login (ambil id dari token)
pendaftarRoute.get("/me", verifyToken, authorizeRole("pendaftar"), PendaftarController.getMe);

// Endpoint Ambil Semua Pendaftar
pendaftarRoute.get(
	"/",
	verifyToken,
	authorizeRole("admin", "verifikator"),
	PendaftarController.getAllPendaftar,
);

// Endpoint Update Status Massal
pendaftarRoute.patch(
	"/mass-status",
	verifyToken,
	authorizeRole("admin"),
	PendaftarController.updateStatusMassal,
);

pendaftarRoute.get(
	"/status",
	verifyToken,
	authorizeRole("pendaftar"),
	PendaftarController.getStatusById,
);

export default pendaftarRoute;
