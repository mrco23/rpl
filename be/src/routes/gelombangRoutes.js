import express from "express";
import {
	getAktif,
	getAll,
	getById,
	create,
	update,
	remove,
	exportExcel,
} from "../controllers/GelombangController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/aktif", getAktif);

router.get("", verifyToken, getAll);
router.post("", verifyToken, create);
router.get("/:id", verifyToken, getById);
router.get("/:id/export", verifyToken, exportExcel);
router.put("/:id", verifyToken, update);
router.delete("/:id", verifyToken, remove);

export default router;
