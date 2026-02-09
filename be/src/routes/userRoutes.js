import express from "express";
import UserController from "../controllers/userController.js";
import {verifyToken} from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();
const userController = new UserController()
const {getMyProfile, updateProfile} = userController

router.use(verifyToken);

router.get("/me", getMyProfile);
router.put("/me", upload.single("photo"), updateProfile);

export default router;
