import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import routes from "./src/routes/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware Global
app.use(helmet());

if (process.env.NODE_ENV !== "production") {
	app.use(morgan("dev"));
}

// CORS
app.use(
	cors({
		origin: true,
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
		allowedHeaders: "*",
		credentials: true,
	}),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate Limiter
const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 50,
	message: {
		message: "Terlalu banyak permintaan, silakan coba lagi nanti.",
	},
});

// Routes Rate Limit
app.use("/api/admin/login", authLimiter);
app.use("/api/verifikator/login", authLimiter);
app.use("/api/pendaftar/register", authLimiter);
app.use("/api/pendaftar/login", authLimiter);

// Request Logger
app.use((req, res, next) => {
	if (process.env.NODE_ENV !== "production") {
		console.log(`[Backend Request] ${req.method} ${req.originalUrl}`);
	}
	next();
});

app.set("etag", false);

// Main Routes
app.use("/api", (req, res, next) => {
	// Jangan cache API kecuali endpoint download laporan
	if (!req.path.includes("/pdf") && !req.path.includes("/excel")) {
		res.set("Cache-Control", "no-store");
	}
	next();
}, routes);

// Health Check
app.get("/", (req, res) => {
	res.json({
		message: "Express is Running!",
		status: "Healthy",
	});
});

// 404 Handler
app.use((req, res, next) => {
	res.status(404).json({
		message: "Endpoint tidak ditemukan",
		method: req.method,
		path: req.originalUrl,
	});
});

// Handler khusus: body JSON tidak valid (misal DELETE dengan body null)
app.use((err, req, res, next) => {
	if (err.type === "entity.parse.failed") {
		return res.status(400).json({
			message: "Format request tidak valid. Body harus berupa JSON yang valid.",
		});
	}
	next(err);
});

// Global Error Handler
app.use((err, req, res, next) => {
	console.error("[Global Error Handler]", err);

	const statusCode = err.statusCode || 500;

	res.status(statusCode).json({
		message: err.message || "Terjadi kesalahan internal server",
		...(process.env.NODE_ENV === "development" && {
			stack: err.stack,
		}),
	});
});

// Start Server
if (process.env.NODE_ENV !== "production" || process.env.VERCEL !== "1") {
	app.listen(PORT, "0.0.0.0", () => {
		console.log(`Server running on http://localhost:${PORT}`);
	});
}

export default app;