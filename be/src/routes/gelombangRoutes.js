import express from "express";
import { getAktif, getAll, getById, create, update, remove } from "../controllers/GelombangController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/gelombang/aktif", getAktif);

router.get("/admin/gelombang", verifyToken, getAll);
router.post("/admin/gelombang", verifyToken, create);
router.get("/admin/gelombang/:id", verifyToken, getById);
router.put("/admin/gelombang/:id", verifyToken, update);
router.delete("/admin/gelombang/:id", verifyToken, remove);

export default router;
