import express from "express";
import {
  getAll,
  getPublic,
  getDetailPublic,
  create,
  updateData,
  remove,
} from "../controllers/BeritaController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const beritaRoutes = express.Router();

// PUBLIC
beritaRoutes.get("/", getPublic);
beritaRoutes.get("/:id", getDetailPublic);

// PRIVATE
beritaRoutes.post("", verifyToken, upload.single("gambar_berita"), create);
beritaRoutes.put("/:id", verifyToken, upload.single("gambar_berita"), updateData);
beritaRoutes.delete("/:id", verifyToken, remove);

export default beritaRoutes;
