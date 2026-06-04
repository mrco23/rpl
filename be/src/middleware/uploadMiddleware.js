import multer from "multer";

const storage = multer.memoryStorage();

// Filter (Hanya PDF, JPG, JPEG, PNG)
const fileFilter = (req, file, cb) => {
	const allowedMimeTypes = [
		"application/pdf",
		"image/jpeg",
		"image/jpg",
		"image/png"
	];
	if (allowedMimeTypes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		console.error("Upload ditolak: Format tidak didukung ->", file.mimetype);
		cb(new Error(`Format file harus JPG, PNG, atau PDF.`), false);
	}
};

const upload = multer({
	storage,
	fileFilter,
	limits: { fileSize: 10 * 1024 * 1024 },
});

export default upload;
