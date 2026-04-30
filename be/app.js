import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./src/routes/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware Global
app.use(morgan("dev"));
app.use(
	cors({
		origin: [
			"http://localhost:5173",
			"https://vicious-kore-mrco23-5f44984d.koyeb.app",
			"https://smpkatolikstrafael.netlify.app",
			"https://smpkatolikstrafael.vercel.app",
		],
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
		allowedHeaders: "*",
		credentials: true,
	}),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use("/api", routes);
app.get("/", (req, res) => {
	res.json({ message: "Backend Torang Bersih is Running!", status: "Healthy" });
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
	console.error("Global Error Handler:", err);
	const statusCode = err.statusCode || 500;
	res.status(statusCode).json({
		message: err.message || "Terjadi kesalahan internal server",
		...(process.env.NODE_ENV === "development" && { stack: err.stack }),
	});
});

app.listen(PORT, "0.0.0.0", () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
