import express from "express";
import userRoutes from "./userRoutes.js";
import profilRoute from "./profilRoutes.js";
import pendaftarRoute from "./pendaftarRoutes.js";
import dokumenRoute from "./dokumenRoutes.js";
import {
  beritaRoutes,
  prestasiRoutes,
  pengumumanRoutes,
  programUnggulanRoutes,
  ekstrakurikulerRoutes,
  fasilitasRoutes
} from "./contentRoutes.js";

const routes = express.Router();

routes.use("", userRoutes);
routes.use("/profile", profilRoute);

routes.use("/berita", beritaRoutes);
routes.use("/prestasi", prestasiRoutes);
routes.use("/pengumuman", pengumumanRoutes);
routes.use("/program-unggulan", programUnggulanRoutes);
routes.use("/ekstrakurikuler", ekstrakurikulerRoutes);
routes.use("/fasilitas", fasilitasRoutes);

routes.use("/pendaftar", pendaftarRoute);
routes.use("/dokumen", dokumenRoute);

export default routes;  