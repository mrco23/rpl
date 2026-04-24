import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import routes from "./src/routes/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware Global
app.use(morgan("dev"));
app.use(
	cors({
		origin: ["http://localhost:5173", "https://vicious-kore-mrco23-5f44984d.koyeb.app/"],
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		allowedHeaders: "*",
		credentials: true,
	}),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("public/uploads"));

// Routes
app.use("/api", routes);
app.get("/", (req, res) => {
	res.json({ message: "Backend Torang Bersih is Running!", status: "Healthy" });
});

app.listen(PORT, "0.0.0.0", () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
