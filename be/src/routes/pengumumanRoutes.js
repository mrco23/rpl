import express from "express";
import {
  getAll,
  getPublic,
  getDetailPublic,
  create,
  updateData,
  remove,
  getByPendaftar,
} from "../controllers/PengumumanController.js";
import { verifyToken, authorizeRole } from "../middleware/authMiddleware.js";

const pengumumanRoutes = express.Router();

pengumumanRoutes.get("/public", getPublic);
pengumumanRoutes.get("/public/:id", getDetailPublic);

pengumumanRoutes.get("/pendaftar", verifyToken, authorizeRole("pendaftar"), getByPendaftar);
pengumumanRoutes.get("", verifyToken, authorizeRole("admin"), getAll);
pengumumanRoutes.post("", verifyToken, authorizeRole("admin"), create);
pengumumanRoutes.put("/:id", verifyToken, authorizeRole("admin"), updateData);
pengumumanRoutes.delete("/:id", verifyToken, authorizeRole("admin"), remove);


export default pengumumanRoutes;
