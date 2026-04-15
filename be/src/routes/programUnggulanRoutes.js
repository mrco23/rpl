import express from "express";
import {
  getAll,
  getPublic,
  getDetailPublic,
  create,
  updateData,
  remove,
} from "../controllers/ProgramUnggulanController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const programUnggulanRoutes = express.Router();

programUnggulanRoutes.get("/public", getPublic);
programUnggulanRoutes.get("/public/:id", getDetailPublic);

programUnggulanRoutes.get("", verifyToken, getAll);
programUnggulanRoutes.post("", verifyToken, upload.single("gambar_pu"), create);
programUnggulanRoutes.put("/:id", verifyToken, upload.single("gambar_pu"), updateData);
programUnggulanRoutes.delete("/:id", verifyToken, remove);

export default programUnggulanRoutes;
