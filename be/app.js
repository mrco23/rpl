import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./src/routes/userRoutes.js";
import exampleRoutes from './src/routes/exampleRoutes.js'
import morgan from "morgan";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware Global
app.use(morgan('dev'))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("public/uploads"));

// Routes
app.use("/api/user", userRoutes);
app.use("/api/example", exampleRoutes);

app.listen(PORT, () => {
	console.log(`Server Profil User berjalan di http://localhost:${PORT}`);
});
