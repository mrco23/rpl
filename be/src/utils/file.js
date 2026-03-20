import fs from "fs";
import path from "path";

export const buildFileUrl = (req, fileName) => {
  if (!fileName) return null;
  if (/^https?:\/\//i.test(fileName)) return fileName;
  return `${req.protocol}://${req.get("host")}/uploads/${fileName}`;
};

export const deleteFile = (fileName) => {
  if (!fileName) return;
  // Jangan hapus file yang berupa URL http
  if (/^https?:\/\//i.test(fileName)) return;
  
  const filePath = path.join(process.cwd(), "public", "uploads", fileName);
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
    } catch (err) {
      console.error("Failed to delete file:", err);
    }
  }
};
