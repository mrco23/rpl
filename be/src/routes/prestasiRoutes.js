import express from "express";
import {
  getAll,
  getPublic,
  getDetailPublic,
  create,
  updateData,
  remove,
} from "../controllers/PrestasiController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const prestasiRoutes = express.Router();

prestasiRoutes.get("/public", getPublic);
prestasiRoutes.get("/public/:id", getDetailPublic);

prestasiRoutes.get("", verifyToken, getAll);
prestasiRoutes.post("", verifyToken, upload.single("gambar_prestasi"), create);
prestasiRoutes.put("/:id", verifyToken, upload.single("gambar_prestasi"), updateData);
prestasiRoutes.delete("/:id", verifyToken, remove);

export default prestasiRoutes;
