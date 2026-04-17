import express from "express";
import {
<<<<<<< HEAD
  getAll,
  getPublic,
  getDetailPublic,
  create,
  updateData,
  remove,
=======
	getAll,
	getPublic,
	getDetailPublic,
	create,
	updateData,
	updateImage,
	remove,
>>>>>>> daf320f16ce680c2daf98019b2b52262fc3ade2c
} from "../controllers/EkstrakurikulerController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const ekstrakurikulerRoutes = express.Router();

// PUBLIC
ekstrakurikulerRoutes.get("/", getPublic);
ekstrakurikulerRoutes.get("/:id", getDetailPublic);

/* 
  POST /: Membuat data baru beserta upload gambar awal.
*/
<<<<<<< HEAD
ekstrakurikulerRoutes.post(
  "",
  verifyToken,
  upload.single("gambar_ekskul"),
  create
);
=======
ekstrakurikulerRoutes.post("", verifyToken, upload.single("gambar"), create);
>>>>>>> daf320f16ce680c2daf98019b2b52262fc3ade2c

/* 
  PUT /:id : Update data teks dan opsional gambar terintegrasi.
*/
<<<<<<< HEAD
ekstrakurikulerRoutes.put(
  "/:id",
  verifyToken,
  upload.single("gambar_ekskul"),
  updateData
);

/* 
=======
ekstrakurikulerRoutes.put("/:id", verifyToken, updateData);

/* 
  PATCH /:id/image : Khusus update gambar (gambar lama dihapus otomatis di logic).
*/
ekstrakurikulerRoutes.patch("/:id/image", verifyToken, upload.single("gambar"), updateImage);

/* 
>>>>>>> daf320f16ce680c2daf98019b2b52262fc3ade2c
  DELETE /:id : Hapus data berserta gambar fisiknya.
*/
ekstrakurikulerRoutes.delete("/:id", verifyToken, remove);

export default ekstrakurikulerRoutes;
