import express from "express";
import {
  getAll,
  getPublic,
  getDetailPublic,
  create,
  updateData,
  updateImage,
  remove,
} from "../controllers/PrestasiController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const prestasiRoutes = express.Router();

prestasiRoutes.get("/public", getPublic);
prestasiRoutes.get("/public/:id", getDetailPublic);

prestasiRoutes.get("", verifyToken, getAll);
prestasiRoutes.post("", verifyToken, upload.single("gambar"), create);
prestasiRoutes.put("/:id", verifyToken, updateData);
prestasiRoutes.patch("/:id/image", verifyToken, upload.single("gambar"), updateImage);
prestasiRoutes.delete("/:id", verifyToken, remove);

export default prestasiRoutes;
