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
beritaRoutes.get("/", getPublic);
beritaRoutes.get("/:id", getDetailPublic);

// PRIVATE
beritaRoutes.post("", verifyToken, upload.single("gambar"), create);
beritaRoutes.put("/:id", verifyToken, updateData);
beritaRoutes.patch("/:id/image", verifyToken, upload.single("gambar"), updateImage);
beritaRoutes.delete("/:id", verifyToken, remove);

export default beritaRoutes;
