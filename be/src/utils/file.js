import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

export const uploadFileToCloudinary = (fileBuffer, folderName = "rpl") => {
  return new Promise((resolve, reject) => {
    console.log("Starting upload to Cloudinary. Buffer size:", fileBuffer.length);
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: folderName, resource_type: "auto" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return reject(error);
        }
        console.log("Cloudinary upload success:", result.secure_url);
        resolve(result);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

export const buildFileUrl = (req, fileName) => {
  if (!fileName) return null;
  // Karena kita sekarang menyimpan URL Cloudinary (secure_url) langsung di database,
  // kita cukup mengembalikan fileName jika itu adalah URL valid.
  if (/^https?:\/\//i.test(fileName)) return fileName;
  
  // Jika karena alasan tertentu yang tersimpan masih nama file lama tanpa HTTP,
  // maka kita anggap data ini sudah usang dan dikembalikan null atau fileName as-is.
  return fileName;
};

export const deleteFile = async (fileIdentifier) => {
  if (!fileIdentifier) return;
  
  // Jika ini adalah URL Cloudinary, ekstrak public_id dan hapus
  if (fileIdentifier.includes("cloudinary.com")) {
    try {
      const parts = fileIdentifier.split("/upload/");
      if (parts.length > 1) {
        const publicIdWithExt = parts[1].replace(/^v\d+\//, "");
        const lastDotIndex = publicIdWithExt.lastIndexOf(".");
        const publicId = lastDotIndex !== -1 ? publicIdWithExt.substring(0, lastDotIndex) : publicIdWithExt;
        
        await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
        await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
      }
    } catch (err) {
      console.error("Failed to delete file from Cloudinary:", err);
    }
  }
};
