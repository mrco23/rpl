import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware Global
app.use(cors());
app.use(express.json()); // Parsing JSON body
app.use(express.urlencoded({ extended: true })); // Parsing Form Data

// Static Serving (PENTING: Agar gambar profil bisa dibuka di browser)
app.use("/uploads", express.static("public/uploads"));

// Routes
app.use("/api/auth", authRoutes); // Route publik
app.use("/api/user", userRoutes); // Route privat (butuh token)

app.listen(PORT, () => {
	console.log(`Server Profil User berjalan di http://localhost:${PORT}`);
});
