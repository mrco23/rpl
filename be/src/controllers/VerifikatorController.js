import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";
import { getVerifikatorByUsername, createVerifikator, getBerandaData } from "../services/VerifikatorService.js";

class VerifikatorController {
    register = async (req, res) => {
        try {
            const { nama, username, password } = req.body;

            // Validasi input
            if (!nama || !username || !password) {
                return res.status(400).json({ message: "Nama, username, dan password wajib diisi" });
            }

            // Cek duplikasi
            const existingVerifikator = await getVerifikatorByUsername(username);
            if (existingVerifikator) {
                return res.status(400).json({ message: "Username sudah digunakan" });
            }

            const verifikator = await createVerifikator({ username, password, nama });

            res.status(201).json({
                message: "Register verifikator berhasil",
                data: {
                    id_verifikator: verifikator.id_verifikator,
                    username: verifikator.username,
                    nama: verifikator.nama,
                    role: "verifikator"
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    login = async (req, res) => {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({ message: "Username dan password wajib diisi" });
            }

            const verifikator = await getVerifikatorByUsername(username);
            if (!verifikator) {
                return res.status(401).json({ message: "Username atau password salah" });
            }

            const isMatch = await bcrypt.compare(password, verifikator.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Username atau password salah" });
            }

            const token = generateToken({ id: verifikator.id_verifikator, role: "verifikator" });

            res.status(200).json({
                message: "Login verifikator berhasil",
                token,
                username: verifikator.username,
                nama: verifikator.nama,
                role: "verifikator"
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    getBeranda = async (req, res) => {
        try {
            const data = await getBerandaData();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
}

export default VerifikatorController;
