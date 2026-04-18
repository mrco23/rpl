import express from "express";
import VerifikatorController from "../controllers/VerifikatorController.js";
import { verifyToken, authorizeRole } from "../middleware/authMiddleware.js";

const routes = express.Router();
const verifikatorController = new VerifikatorController();

routes.post("/register", verifikatorController.register);
routes.post("/login", verifikatorController.login);
routes.get("/beranda", verifyToken, authorizeRole("verifikator"), verifikatorController.getBeranda);

// Admin-only routes for managing verifiers
routes.get("/", verifyToken, authorizeRole("admin"), verifikatorController.getAll);
routes.post("/", verifyToken, authorizeRole("admin"), verifikatorController.register); // Reuse register for creation
routes.put("/:id", verifyToken, authorizeRole("admin"), verifikatorController.updateVerifikatorData);
routes.delete("/:id", verifyToken, authorizeRole("admin"), verifikatorController.remove);

export default routes;
