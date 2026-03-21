import express from "express";
import User from "../controllers/User.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const userRoutes = express.Router();
const userController = new User();

const { getProfile, updateProfile, login, register } = userController;

// PUBLIC
userRoutes.post("/login", login);
userRoutes.post("/register", register);

// PRIVATE
userRoutes.get("/me", verifyToken, getProfile);
userRoutes.put("/me", verifyToken, upload.single("photo"), updateProfile);

export default userRoutes;