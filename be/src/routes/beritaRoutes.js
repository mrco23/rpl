import express from "express";
import {
  getAll,
  getPublic,
  getDetailPublic,
  create,
  updateData,
  updateImage,
  remove,
} from "../controllers/BeritaController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const beritaRoutes = express.Router();

// PUBLIC
beritaRoutes.get("/public", getPublic);
beritaRoutes.get("/public/:id", getDetailPublic);

// PRIVATE
beritaRoutes.get("", verifyToken, getAll);
beritaRoutes.post("", verifyToken, upload.single("gambar"), create);
beritaRoutes.put("/:id", verifyToken, updateData);
beritaRoutes.patch("/:id/image", verifyToken, upload.single("gambar"), updateImage);
beritaRoutes.delete("/:id", verifyToken, remove);

export default beritaRoutes;
