import express from "express";
import User from "../controllers/User.js";
import {verifyToken} from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const userRoutes = express.Router();
const userController = new User()
const {getProfile, updateProfile, login, register} = userController

userRoutes.post('/login', login)
userRoutes.post('/register', register)

userRoutes.use(verifyToken);
userRoutes.get("/me", getProfile);
userRoutes.put("/me", upload.single("photo"), updateProfile);

export default userRoutes;
