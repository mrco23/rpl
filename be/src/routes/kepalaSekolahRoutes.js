import express from "express";
import KepalaSekolahController from "../controllers/KepalaSekolahController.js";
import { LaporanKepalaSekolahController } from "../controllers/LaporanKepalaSekolahController.js";
import { verifyToken, authorizeRole } from "../middleware/authMiddleware.js";

const routes = express.Router();
const kepalaSekolahController = new KepalaSekolahController();
const auth = [verifyToken, authorizeRole("kepala_sekolah")];

// ── Auth ──────────────────────────────────────────────────────────────────────
routes.post("/login", kepalaSekolahController.login);

// ── Laporan Data JSON (digunakan oleh halaman Beranda) ────────────────────────
routes.get("/laporan/rekap-ppdb", ...auth, LaporanKepalaSekolahController.getRekapPPDB);
routes.get("/laporan/status-pendaftaran", ...auth, LaporanKepalaSekolahController.getStatusPendaftaran);
routes.get("/laporan/rekap-gelombang", ...auth, LaporanKepalaSekolahController.getRekapGelombang);
routes.get("/laporan/asal-sekolah", ...auth, LaporanKepalaSekolahController.getAsalSekolah);
routes.get("/laporan/wilayah-pendaftar", ...auth, LaporanKepalaSekolahController.getWilayahPendaftar);
routes.get("/laporan/kinerja-verifikator", ...auth, LaporanKepalaSekolahController.getKinerjaVerifikator);
routes.get("/laporan/final-penerimaan", ...auth, LaporanKepalaSekolahController.getFinalPenerimaan);

// ── Laporan Export PDF (wajib id_gelombang) ───────────────────────────────────
routes.get("/laporan/rekapitulasi/:id_gelombang/pdf", ...auth, LaporanKepalaSekolahController.exportRekapitulasiPdf);
routes.get("/laporan/final-penerimaan/:id_gelombang/pdf", ...auth, LaporanKepalaSekolahController.exportFinalPenerimaanPdf);

// ── Validasi Gelombang ────────────────────────────────────────────────────────
routes.get("/validasi-gelombang", ...auth, LaporanKepalaSekolahController.getValidasiGelombang);
routes.post("/validasi-gelombang/:id/setujui", ...auth, LaporanKepalaSekolahController.setujuiValidasiGelombang);

export default routes;
