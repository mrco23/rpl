import express from "express";
import {
  getAll,
  getPublic,
  getDetailPublic,
  create,
  updateData,
  updateImage,
  remove,
} from "../controllers/ProgramUnggulanController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const programUnggulanRoutes = express.Router();

programUnggulanRoutes.get("/public", getPublic);
programUnggulanRoutes.get("/public/:id", getDetailPublic);

programUnggulanRoutes.get("", verifyToken, getAll);
programUnggulanRoutes.post("", verifyToken, upload.single("gambar"), create);
programUnggulanRoutes.put("/:id", verifyToken, updateData);
programUnggulanRoutes.patch("/:id/image", verifyToken, upload.single("gambar"), updateImage);
programUnggulanRoutes.delete("/:id", verifyToken, remove);

export default programUnggulanRoutes;
