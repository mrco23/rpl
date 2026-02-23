import express from 'express'
import userRoutes from './userRoutes.js'
import profilSekolahRoute from "./profilSekolahRoute.js";

const routes = express.Router();

routes.use("", userRoutes)
routes.use("/profile", profilSekolahRoute)

export default routes;