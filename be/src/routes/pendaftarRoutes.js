import express from "express";
import PendaftarController from "../controllers/PendaftarController.js";

const pendaftarRoute = express.Router();

// Endpoint Registrasi Pendaftar
pendaftarRoute.post("/register", PendaftarController.register);

export default pendaftarRoute;
