import express from "express";
import userRoutes from "./userRoutes.js";
import profilRoute from "./profilRoutes.js";
import pendaftarRoute from "./pendaftarRoutes.js";
import dokumenRoute from "./dokumenRoutes.js";
import adminRoutes from './adminRoutes.js'
import beritaRoutes from "./beritaRoutes.js";
import prestasiRoutes from "./prestasiRoutes.js";
import pengumumanRoutes from "./pengumumanRoutes.js";
import programUnggulanRoutes from "./programUnggulanRoutes.js";
import ekstrakurikulerRoutes from "./ekstrakurikulerRoutes.js";
import fasilitasRoutes from "./fasilitasRoutes.js";

const routes = express.Router();

routes.use("", userRoutes);
routes.use("/profile", profilRoute);
routes.use('/admin', adminRoutes)
routes.use("/berita", beritaRoutes);
routes.use("/prestasi", prestasiRoutes);
routes.use("/pengumuman", pengumumanRoutes);
routes.use("/program-unggulan", programUnggulanRoutes);
routes.use("/ekstrakurikuler", ekstrakurikulerRoutes);
routes.use("/fasilitas", fasilitasRoutes);

routes.use("/pendaftar", pendaftarRoute);
routes.use("/dokumen", dokumenRoute);

export default routes;