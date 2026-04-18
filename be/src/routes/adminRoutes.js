import express from "express";
import { verifyToken, authorizeRole } from "../middleware/authMiddleware.js";
import AdminController from "../controllers/AdminController.js";

const adminRoutes = express.Router();

const adminController = new AdminController();
const { register, login, getBeranda } = adminController;

adminRoutes.post("/register", register);
adminRoutes.post("/login", login);
adminRoutes.get("/beranda", verifyToken, authorizeRole("admin"), getBeranda);

export default adminRoutes;
