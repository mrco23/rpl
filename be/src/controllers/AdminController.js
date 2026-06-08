import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";
import { createAdmin, getAdmin, getBerandaData } from "../services/AdminService.js";

class AdminController {
    register = async (req, res) => {
        try {
            const { username, password } = req.body;

            const existingUser = await getAdmin(username);

            // CASE-SENSITIVE CHECK
            if (existingUser && existingUser.username === username) {
                return res.status(400).json({
                    message: "Nama Pengguna sudah digunakan",
                });
            }

            const admin = await createAdmin(username, password);

            res.status(201).json({
                message: "Register berhasil",
                data: {
                    id: admin.id_admin,
                    username: admin.username,
                },
            });
        } catch (err) {
            res.status(500).json({
                message: err.message,
            });
        }
    };

    login = async (req, res) => {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(401).json({
                    message: "Nama Pengguna atau Kata Sandi Tidak ada",
                });
            }

            const user = await getAdmin(username);

            // USER TIDAK ADA ATAU BEDA HURUF BESAR/KECIL
            if (!user || user.username !== username) {
                return res.status(400).json({
                    message: "Nama Pengguna atau Kata Sandi salah",
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({
                    message: "Nama Pengguna atau Kata Sandi salah",
                });
            }

            const payload = {
                id: user.id_admin,
                role: "admin",
            };

            const token = generateToken(payload);

            res.status(200).json({
                message: "Login berhasil",
                username: user.username,
                token,
            });
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    };

    getBeranda = async (req, res) => {
        try {
            const data = await getBerandaData();

            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    };
}

export default AdminController;
