import multer from "multer";

const storage = multer.memoryStorage();

// Filter (Hanya PDF, JPG, PNG)
const fileFilter = (req, file, cb) => {
	const allowedMimeTypes = ["application/pdf", "image/jpeg", "image/png"];
	if (allowedMimeTypes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(new Error("Format file tidak didukung. Hanya PDF, JPG, dan PNG"), false);
	}
};

const upload = multer({
	storage,
	fileFilter,
	limits: { fileSize: 5 * 1024 * 1024 }, // Batas ukuran file 5MB
});

export default upload;
