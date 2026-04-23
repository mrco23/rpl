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
import { verifyToken } from "../middleware/authMiddleware.js";

const pengumumanRoutes = express.Router();

pengumumanRoutes.get("/public", getPublic);
pengumumanRoutes.get("/public/:id", getDetailPublic);

pengumumanRoutes.get("/pendaftar", verifyToken, getByPendaftar);
pengumumanRoutes.get("", verifyToken, getAll);
pengumumanRoutes.post("", verifyToken, create);
pengumumanRoutes.put("/:id", verifyToken, updateData);
pengumumanRoutes.delete("/:id", verifyToken, remove);


export default pengumumanRoutes;
