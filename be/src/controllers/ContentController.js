import ContentService from "../services/ContentService.js";
import { buildFileUrl } from "../utils/file.js";

const imageFieldMap = {
  berita: "gambar",
  prestasi: "gambar",
  pengumuman: null, // no image field
  program_unggulan: "gambar",
  ekstrakurikuler: "gambar",
  fasilitas: "gambar",
};

const normalizeDate = (item) => {
    // If we need to send specific date format, handle it. Let's just return item for now.
    return item;
}

const normalize = (req, type, item) => {
  if (!item) return item;
  const imageField = imageFieldMap[type];
  if (imageField && item[imageField]) {
    return {
      ...item,
      [imageField]: buildFileUrl(req, item[imageField]),
    };
  }
  return item;
};

class ContentController {
  constructor(type) {
    this.type = type;
  }

  list = async (req, res) => {
    try {
      const items = await ContentService.list(this.type, req.user.id);
      res.json({ message: "success", data: items.map((item) => normalize(req, this.type, item)) });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  listPublic = async (req, res) => {
    try {
      const items = await ContentService.listPublic(this.type);
      res.json({ message: "success", data: items.map((item) => normalize(req, this.type, item)) });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  detailPublic = async (req, res) => {
    try {
      const item = await ContentService.getOnePublic(this.type, req.params.id);
      if (!item) return res.status(404).json({ message: "Data tidak ditemukan" });
      res.json({ message: "success", data: normalize(req, this.type, item) });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  create = async (req, res) => {
    try {
      const payload = { ...req.body };
      const imageField = imageFieldMap[this.type];
      if (req.file && imageField) {
          payload[imageField] = req.file.filename;
      }
      
      // Some date fields in Pengumuman
      if (payload.tampil_mulai) payload.tampil_mulai = new Date(payload.tampil_mulai);
      if (payload.tampil_sampai) payload.tampil_sampai = new Date(payload.tampil_sampai);
      if (payload.published_at) payload.published_at = new Date(payload.published_at);

      const created = await ContentService.create(this.type, req.user.id, payload);
      res.status(201).json({ message: "success", data: normalize(req, this.type, created) });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  update = async (req, res) => {
    try {
      const payload = { ...req.body };
      const imageField = imageFieldMap[this.type];
      if (req.file && imageField) {
          payload[imageField] = req.file.filename;
      }

      if (payload.tampil_mulai) payload.tampil_mulai = new Date(payload.tampil_mulai);
      if (payload.tampil_sampai) payload.tampil_sampai = new Date(payload.tampil_sampai);
      if (payload.published_at) payload.published_at = new Date(payload.published_at);

      const updated = await ContentService.update(this.type, req.user.id, req.params.id, payload);
      res.json({ message: "success", data: normalize(req, this.type, updated) });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  remove = async (req, res) => {
    try {
      await ContentService.remove(this.type, req.user.id, req.params.id);
      res.json({ message: "success" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}

export default ContentController;
