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

// Middleware Global
app.use(morgan("dev"));
app.use(cors(corsOptions));

// Handle preflight CORS untuk semua route
app.options("*", cors(corsOptions));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder uploads
app.use("/uploads", express.static("public/uploads"));

// Routes
app.use("/api", routes);

// Root endpoint
app.get("/", (req, res) => {
	res.json({ message: "Backend Torang Bersih is Running!", status: "Healthy" });
});

// 404 handler untuk wildcard route
app.all("*", (req, res) => {
	res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, "0.0.0.0", () => {
	console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
