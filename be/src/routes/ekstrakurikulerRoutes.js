import express from "express";
import {
  getAll,
  getPublic,
  getDetailPublic,
  create,
  updateData,
  remove,
} from "../controllers/EkstrakurikulerController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const ekstrakurikulerRoutes = express.Router();

// PUBLIC
ekstrakurikulerRoutes.get("/public", getPublic);
ekstrakurikulerRoutes.get("/public/:id", getDetailPublic);

// PRIVATE
ekstrakurikulerRoutes.get("", verifyToken, getAll);

/* 
  POST /: Membuat data baru beserta upload gambar awal.
*/
ekstrakurikulerRoutes.post(
  "",
  verifyToken,
  upload.single("gambar_ekskul"),
  create
);

/* 
  PUT /:id : Update data teks dan opsional gambar terintegrasi.
*/
ekstrakurikulerRoutes.put(
  "/:id",
  verifyToken,
  upload.single("gambar_ekskul"),
  updateData
);

/* 
  DELETE /:id : Hapus data berserta gambar fisiknya.
*/
ekstrakurikulerRoutes.delete(
  "/:id",
  verifyToken,
  remove
);

export default ekstrakurikulerRoutes;
