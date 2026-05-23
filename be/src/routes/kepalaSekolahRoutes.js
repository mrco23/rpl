import express from "express";
import KepalaSekolahController from "../controllers/KepalaSekolahController.js";
import { LaporanKepalaSekolahController } from "../controllers/LaporanKepalaSekolahController.js";
import { verifyToken, authorizeRole } from "../middleware/authMiddleware.js";

const routes = express.Router();
const kepalaSekolahController = new KepalaSekolahController();

// Auth
routes.post("/login", kepalaSekolahController.login);

// Laporan Data
routes.get("/laporan/rekap-ppdb", verifyToken, authorizeRole("kepala_sekolah"), LaporanKepalaSekolahController.getRekapPPDB);
routes.get("/laporan/status-pendaftaran", verifyToken, authorizeRole("kepala_sekolah"), LaporanKepalaSekolahController.getStatusPendaftaran);
routes.get("/laporan/rekap-gelombang", verifyToken, authorizeRole("kepala_sekolah"), LaporanKepalaSekolahController.getRekapGelombang);
routes.get("/laporan/asal-sekolah", verifyToken, authorizeRole("kepala_sekolah"), LaporanKepalaSekolahController.getAsalSekolah);
routes.get("/laporan/wilayah-pendaftar", verifyToken, authorizeRole("kepala_sekolah"), LaporanKepalaSekolahController.getWilayahPendaftar);
routes.get("/laporan/kinerja-verifikator", verifyToken, authorizeRole("kepala_sekolah"), LaporanKepalaSekolahController.getKinerjaVerifikator);
routes.get("/laporan/final-penerimaan", verifyToken, authorizeRole("kepala_sekolah"), LaporanKepalaSekolahController.getFinalPenerimaan);

// Laporan Export
routes.get("/laporan/rekap-ppdb/excel", verifyToken, authorizeRole("kepala_sekolah"), LaporanKepalaSekolahController.exportRekapPPDBExcel);
routes.get("/laporan/rekap-ppdb/pdf", verifyToken, authorizeRole("kepala_sekolah"), LaporanKepalaSekolahController.exportRekapPPDBPdf);
routes.get("/laporan/final-penerimaan/excel", verifyToken, authorizeRole("kepala_sekolah"), LaporanKepalaSekolahController.exportFinalPenerimaanExcel);
routes.get("/laporan/final-penerimaan/pdf", verifyToken, authorizeRole("kepala_sekolah"), LaporanKepalaSekolahController.exportFinalPenerimaanPdf);

export default routes;
