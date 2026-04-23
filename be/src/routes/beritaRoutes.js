import express from "express";
import {
	getAll,
	getDetail,
	create,
	updateData,
	updateImage,
	remove,
} from "../controllers/BeritaController.js";
import { verifyToken, authorizeRole } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const beritaRoutes = express.Router();

// PUBLIC
beritaRoutes.get("/", getAll);
beritaRoutes.get("/:id", getDetail);

// PRIVATE
beritaRoutes.post("", verifyToken, authorizeRole("admin"), upload.single("gambar"), create);
beritaRoutes.put("/:id", verifyToken, authorizeRole("admin"), updateData);
beritaRoutes.patch(
	"/:id/image",
	verifyToken,
	authorizeRole("admin"),
	upload.single("gambar"),
	updateImage,
);
beritaRoutes.delete("/:id", verifyToken, authorizeRole("admin"), remove);

export default beritaRoutes;
