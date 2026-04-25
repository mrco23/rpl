import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
	const authHeader = req.headers["authorization"];

	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		return res.status(401).json({ message: "Akses ditolak! Token tidak ditemukan." });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (error) {
		return res.status(403).json({ message: "Token tidak valid atau kadaluarsa." });
	}
};

export const authorizeRole = (...roles) => {
	return (req, res, next) => {
		if (!req.user || !roles.includes(req.user.role)) {
			return res.status(403).json({ message: "Akses ditolak! Anda tidak memiliki izin." });
		}
		next();
	};
};
