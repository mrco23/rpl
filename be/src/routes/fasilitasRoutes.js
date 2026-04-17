import express from "express";
import {
	getAll,
	getPublic,
	getDetailPublic,
	create,
	updateData,
	updateImage,
	remove,
} from "../controllers/FasilitasController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const fasilitasRoutes = express.Router();

// PUBLIC
fasilitasRoutes.get("/", getPublic);
fasilitasRoutes.get("/:id", getDetailPublic);

// PRIVATE
fasilitasRoutes.post("", verifyToken, upload.single("gambar"), create);
fasilitasRoutes.put("/:id", verifyToken, updateData);
fasilitasRoutes.patch("/:id/image", verifyToken, upload.single("gambar"), updateImage);
fasilitasRoutes.delete("/:id", verifyToken, remove);

export default fasilitasRoutes;
