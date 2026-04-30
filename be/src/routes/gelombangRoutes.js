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
import { verifyToken, authorizeRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/aktif", getAktif);

router.get("", verifyToken, authorizeRole("admin"), getAll);
router.post("", verifyToken, authorizeRole("admin"), create);
router.get("/:id", verifyToken, authorizeRole("admin"), getById);
router.get("/:id/export", verifyToken, authorizeRole("admin"), exportExcel);
router.put("/:id", verifyToken, authorizeRole("admin"), update);
router.delete("/:id", verifyToken, authorizeRole("admin"), remove);

export default router;
