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

app.use(
	cors({
		origin: (origin, callback) => {
			const allowedOrigins = process.env.CLIENT_URL 
				? process.env.CLIENT_URL.split(',') 
				: [
						"http://localhost:5173",
						"https://smpkatolikstrafael.netlify.app",
						"https://smpkatolikstrafael.vercel.app",
				  ];
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true);
			} else {
				callback(new Error("Not allowed by CORS"));
			}
		},
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
		allowedHeaders: "*",
		credentials: true,
	}),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 50, // limit each IP to 50 requests per window
	message: { message: "Terlalu banyak permintaan, silakan coba lagi nanti." },
});

// Routes
app.use("/api/admin/login", authLimiter);
app.use("/api/verifikator/login", authLimiter);
app.use("/api/pendaftar/register", authLimiter);
app.use("/api/pendaftar/login", authLimiter);

app.use("/api", routes);
app.get("/", (req, res) => {
	res.json({ message: "Express is Running!", status: "Healthy" });
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
	if (process.env.NODE_ENV !== "production") {
		console.error("Global Error Handler:", err);
	}
	const statusCode = err.statusCode || 500;
	res.status(statusCode).json({
		message: err.message || "Terjadi kesalahan internal server",
		...(process.env.NODE_ENV === "development" && { stack: err.stack }),
	});
});

if (process.env.NODE_ENV !== "production" || process.env.VERCEL !== "1") {
	app.listen(PORT, "0.0.0.0", () => {
		console.log(`Server running on http://localhost:${PORT}`);
	});
}

export default app;
