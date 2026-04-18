import express from "express";
import {
	getPublic,
	getDetailPublic,
	create,
	updateData,
	updateImage,
	remove,
} from "../controllers/FasilitasController.js";
import { verifyToken, authorizeRole } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const fasilitasRoutes = express.Router();

// PUBLIC
fasilitasRoutes.get("/", getPublic);
fasilitasRoutes.get("/:id", getDetailPublic);

// PRIVATE
fasilitasRoutes.post("", verifyToken, authorizeRole("admin"), upload.single("gambar"), create);
fasilitasRoutes.put("/:id", verifyToken, authorizeRole("admin"), updateData);
fasilitasRoutes.patch("/:id/image", verifyToken, authorizeRole("admin"), upload.single("gambar"), updateImage);
fasilitasRoutes.delete("/:id", verifyToken, authorizeRole("admin"), remove);

export default fasilitasRoutes;
