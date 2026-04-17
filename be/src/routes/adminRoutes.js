import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import AdminController from "../controllers/AdminController.js";

const adminRoutes = express.Router();

const adminController = new AdminController();
const { register, login } = adminController;

adminRoutes.post("/register", register);
adminRoutes.post("/login", login);

export default adminRoutes;
