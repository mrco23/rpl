import express from "express";
import { getMyProfile, updateProfile } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Terapkan middleware verifyToken untuk semua route di bawah ini
router.use(verifyToken);

// GET profil
router.get("/me", getMyProfile);

// PUT profil (Pakai upload.single untuk handle file 'photo')
router.put("/me", upload.single("photo"), updateProfile);

export default router;
