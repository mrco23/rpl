import express from "express";
import VerifikatorController from "../controllers/VerifikatorController.js";
import { verifyToken, authorizeRole } from "../middleware/authMiddleware.js";

const routes = express.Router();
const verifikatorController = new VerifikatorController();

routes.post("/register", verifikatorController.register);
routes.post("/login", verifikatorController.login);
routes.get("/beranda", verifyToken, authorizeRole("verifikator"), verifikatorController.getBeranda);

export default routes;
