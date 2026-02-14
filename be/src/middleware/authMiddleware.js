import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
	console.log('middleware untuk authorization')
	const authHeader = req.headers["authorization"];

	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		return res.status(401).json({ message: "Akses ditolak! Token tidak ditemukan." });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		// Jika token valid, simpan data user (id & email) ke dalam request
		req.user = decoded;
		next();
	} catch (error) {
		return res.status(403).json({ message: "Token tidak valid atau kadaluarsa." });
	}
};
