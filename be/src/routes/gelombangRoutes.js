import express from "express";
import {
	getAktif,
	getAll,
	getPublic,
	getById,
	create,
	update,
	remove,
	exportExcel,
	ajukanValidasi,
} from "../controllers/GelombangController.js";
import { verifyToken, authorizeRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/aktif", getAktif);
router.get("/public", getPublic);

router.get("", verifyToken, authorizeRole("admin"), getAll);
router.post("", verifyToken, authorizeRole("admin"), create);
router.get("/:id", verifyToken, authorizeRole("admin"), getById);
router.get("/:id/export", verifyToken, authorizeRole("admin"), exportExcel);
router.put("/:id", verifyToken, authorizeRole("admin"), update);
router.delete("/:id", verifyToken, authorizeRole("admin"), remove);
router.post("/:id/ajukan-validasi", verifyToken, authorizeRole("admin"), ajukanValidasi);

export default router;
