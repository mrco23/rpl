import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import routes from "./src/routes/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS options
const corsOptions = {
	origin: ["http://localhost:5173", "https://vicious-kore-mrco23-5f44984d.koyeb.app"],
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization"],
	credentials: true,
};

// Middleware global
app.use(morgan("dev"));
app.use(cors(corsOptions)); // handle semua preflight OPTIONS otomatis
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder untuk upload sementara
app.use("/uploads", express.static("public/uploads"));

// API Routes
app.use("/api", routes);

// Root endpoint
app.get("/", (req, res) => {
	res.json({ message: "Backend is Running!", status: "Healthy" });
});

// 404 handler (catch-all tanpa wildcard path)
app.use((req, res, next) => {
	res.status(404).json({ message: "Route not found" });
});

// Global error handler (opsional tapi disarankan)
app.use((err, req, res, next) => {
	console.error("Server error:", err);
	res.status(500).json({ message: "Internal server error" });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
	console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
