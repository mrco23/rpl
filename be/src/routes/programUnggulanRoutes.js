import express from "express";
import {
  getAll,
  getPublic,
  getDetailPublic,
  create,
  updateData,
  remove,
} from "../controllers/ProgramUnggulanController.js";
import { verifyToken, authorizeRole } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const programUnggulanRoutes = express.Router();

programUnggulanRoutes.get("/public", getPublic);
programUnggulanRoutes.get("/public/:id", getDetailPublic);

programUnggulanRoutes.get("", verifyToken, getAll);
programUnggulanRoutes.post("", verifyToken, authorizeRole("admin"), upload.single("gambar_pu"), create);
programUnggulanRoutes.put("/:id", verifyToken, authorizeRole("admin"), upload.single("gambar_pu"), updateData);
programUnggulanRoutes.delete("/:id", verifyToken, authorizeRole("admin"), remove);

export default programUnggulanRoutes;
