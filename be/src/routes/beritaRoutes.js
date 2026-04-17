import express from "express";
import {
	getAll,
	getDetail,
	create,
	updateData,
	updateImage,
	remove,
} from "../controllers/BeritaController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const beritaRoutes = express.Router();

// PUBLIC
beritaRoutes.get("", getAll);
beritaRoutes.get("/:id", getDetail);

// PRIVATE
beritaRoutes.post("", verifyToken, upload.single("gambar"), create);
beritaRoutes.put("/:id", verifyToken, updateData);
beritaRoutes.patch("/:id/image", verifyToken, upload.single("gambar"), updateImage);
beritaRoutes.delete("/:id", verifyToken, remove);

export default beritaRoutes;
