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
} from "../controllers/FasilitasController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const fasilitasRoutes = express.Router();

// PUBLIC
fasilitasRoutes.get("/", getPublic);
fasilitasRoutes.get("/:id", getDetailPublic);

<<<<<<< HEAD
fasilitasRoutes.post("", verifyToken, upload.single("gambar_fasilitas"), create);
fasilitasRoutes.put("/:id", verifyToken, upload.single("gambar_fasilitas"), updateData);
=======
// PRIVATE
fasilitasRoutes.post("", verifyToken, upload.single("gambar"), create);
fasilitasRoutes.put("/:id", verifyToken, updateData);
fasilitasRoutes.patch("/:id/image", verifyToken, upload.single("gambar"), updateImage);
>>>>>>> daf320f16ce680c2daf98019b2b52262fc3ade2c
fasilitasRoutes.delete("/:id", verifyToken, remove);

export default fasilitasRoutes;
