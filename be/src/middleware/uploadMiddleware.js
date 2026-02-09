import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "public/uploads";
if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, uploadDir);
	},
	filename: (req, file, cb) => {
		// Nama file unik: timestamp-angkaacak.jpg
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, uniqueSuffix + path.extname(file.originalname));
	},
});

// 3. Filter (Hanya gambar)
const fileFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image/")) {
		cb(null, true);
	} else {
		cb(new Error("Hanya boleh upload file gambar!"), false);
	}
};

const upload = multer({ storage, fileFilter });
export default upload;
