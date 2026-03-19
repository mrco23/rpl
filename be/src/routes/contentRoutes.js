import express from "express";
import ContentController from "../controllers/ContentController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const createContentRouter = (type) => {
  const router = express.Router();
  const controller = new ContentController(type);

  // PUBLIC
  router.get("/public", controller.listPublic);
  router.get("/public/:id", controller.detailPublic);

  // PRIVATE
  router.get("", verifyToken, controller.list);
  router.post("", verifyToken, upload.single("gambar"), controller.create);
  router.put("/:id", verifyToken, upload.single("gambar"), controller.update);
  router.delete("/:id", verifyToken, controller.remove);

  return router;
};

export const beritaRoutes = createContentRouter("berita");
export const prestasiRoutes = createContentRouter("prestasi");
export const pengumumanRoutes = createContentRouter("pengumuman");
export const programUnggulanRoutes = createContentRouter("program_unggulan");
export const ekstrakurikulerRoutes = createContentRouter("ekstrakurikuler");
export const fasilitasRoutes = createContentRouter("fasilitas");