import multer from "multer";

const storage = multer.memoryStorage();

// Filter (Hanya PDF, JPG, PNG, WEBP)
const fileFilter = (req, file, cb) => {
	const allowedMimeTypes = [
		"application/pdf",
		"image/jpeg",
		"image/jpg",
		"image/png",
		"image/webp",
	];
	if (allowedMimeTypes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		console.error("Upload ditolak: Format tidak didukung ->", file.mimetype);
		cb(new Error(`Format file ${file.mimetype} tidak didukung. Hanya PDF, JPG, PNG, WEBP`), false);
	}
};

const upload = multer({
	storage,
	fileFilter,
	limits: { fileSize: 10 * 1024 * 1024 },
});

export default upload;
