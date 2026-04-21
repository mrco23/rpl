import express from "express";
import {
	getAll,
	getPublic,
	getDetailPublic,
	create,
	updateData,
	updateImage,
	remove,
} from "../controllers/EkstrakurikulerController.js";
import { verifyToken, authorizeRole } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const ekstrakurikulerRoutes = express.Router();

// PUBLIC
ekstrakurikulerRoutes.get("/", getPublic);
ekstrakurikulerRoutes.get("/:id", getDetailPublic);

/* 
  POST /: Membuat data baru beserta upload gambar awal.
*/
ekstrakurikulerRoutes.post("", verifyToken, authorizeRole("admin"), upload.single("gambar"), create);

/* 
  PUT /:id : Update data non-file.
*/
ekstrakurikulerRoutes.put("/:id", verifyToken, authorizeRole("admin"), updateData);

/* 
  PATCH /:id/image : Khusus update gambar (gambar lama dihapus otomatis di logic).
*/
ekstrakurikulerRoutes.patch("/:id/image", verifyToken, authorizeRole("admin"), upload.single("gambar"), updateImage);

/* 
  DELETE /:id : Hapus data berserta gambar fisiknya.
*/
ekstrakurikulerRoutes.delete("/:id", verifyToken, authorizeRole("admin"), remove);

export default ekstrakurikulerRoutes;
