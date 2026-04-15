import express from "express";
import {
  getAll,
  getPublic,
  getDetailPublic,
  create,
  updateData,
  remove,
} from "../controllers/FasilitasController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const fasilitasRoutes = express.Router();

fasilitasRoutes.get("", getPublic);
fasilitasRoutes.get("/:id", getDetailPublic);

fasilitasRoutes.post("", verifyToken, upload.single("gambar_fasilitas"), create);
fasilitasRoutes.put("/:id", verifyToken, upload.single("gambar_fasilitas"), updateData);
fasilitasRoutes.delete("/:id", verifyToken, remove);

export default fasilitasRoutes;
