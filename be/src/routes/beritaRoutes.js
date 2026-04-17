import express from "express";
import {
<<<<<<< HEAD
  getAll,
  getPublic,
  getDetailPublic,
  create,
  updateData,
  remove,
=======
	getAll,
	getDetail,
	create,
	updateData,
	updateImage,
	remove,
>>>>>>> daf320f16ce680c2daf98019b2b52262fc3ade2c
} from "../controllers/BeritaController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const beritaRoutes = express.Router();

// PUBLIC
beritaRoutes.get("", getAll);
beritaRoutes.get("/:id", getDetail);

// PRIVATE
beritaRoutes.post("", verifyToken, upload.single("gambar_berita"), create);
beritaRoutes.put("/:id", verifyToken, upload.single("gambar_berita"), updateData);
beritaRoutes.delete("/:id", verifyToken, remove);

export default beritaRoutes;
