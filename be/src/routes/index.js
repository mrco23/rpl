import express from "express";
import userRoutes from "./userRoutes.js";
import profilSekolahRoute from "./profilSekolahRoute.js";
import {
  achievementsRoutes,
  extracurricularRoutes,
  newsRoutes,
} from "./contentRoutes.js";

const routes = express.Router();

routes.use("", userRoutes);
routes.use("/profile", profilSekolahRoute);
routes.use("/extracurriculars", extracurricularRoutes);
routes.use("/news", newsRoutes);
routes.use("/achievements", achievementsRoutes);

export default routes;