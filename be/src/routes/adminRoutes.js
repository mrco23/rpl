import express from "express";
import { verifyToken, authorizeRole } from "../middleware/authMiddleware.js";
import AdminController from "../controllers/AdminController.js";
import adminKepalaSekolahController from "../controllers/AdminKepalaSekolahController.js";
import VerifikatorController from "../controllers/VerifikatorController.js";

const adminRoutes = express.Router();

const adminController = new AdminController();
const verifikatorController = new VerifikatorController();
const { register, login, getBeranda } = adminController;

adminRoutes.post("/register", verifyToken, authorizeRole("admin"), register);
adminRoutes.post("/login", login);
adminRoutes.get("/beranda", verifyToken, authorizeRole("admin"), getBeranda);

// Manajemen Kepala Sekolah
adminRoutes.get("/kepala-sekolah", verifyToken, authorizeRole("admin"), adminKepalaSekolahController.getAll);
adminRoutes.post("/kepala-sekolah", verifyToken, authorizeRole("admin"), adminKepalaSekolahController.create);
adminRoutes.put("/kepala-sekolah/:id", verifyToken, authorizeRole("admin"), adminKepalaSekolahController.update);
adminRoutes.patch("/kepala-sekolah/:id/status", verifyToken, authorizeRole("admin"), adminKepalaSekolahController.updateStatus);

// Manajemen Verifikator
adminRoutes.patch("/verifikator/:id/status", verifyToken, authorizeRole("admin"), verifikatorController.updateStatus);

export default adminRoutes;
