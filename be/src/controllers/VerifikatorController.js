import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";
import * as VerifikatorService from "../services/VerifikatorService.js";

class VerifikatorController {
    register = async (req, res) => {
        try {
            const { nama, username, password } = req.body;

            // Validasi input
            if (!nama || !username || !password) {
                return res.status(400).json({ message: "Nama, username, dan password wajib diisi" });
            }

            // Cek duplikasi
            const existingVerifikator = await VerifikatorService.getVerifikatorByUsername(username);
            if (existingVerifikator) {
                return res.status(400).json({ message: "Username sudah digunakan" });
            }

            const verifikator = await VerifikatorService.createVerifikator({ username, password, nama });

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

            const verifikator = await VerifikatorService.getVerifikatorByUsername(username);
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
            const data = await VerifikatorService.getBerandaData();
            res.status(200).json({ message: "success", data });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    getAll = async (req, res) => {
        try {
            const data = await VerifikatorService.getAllVerifikator();
            res.status(200).json({ message: "Success", data });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    updateVerifikatorData = async (req, res) => {
        try {
            const { id } = req.params;
            const updated = await VerifikatorService.updateVerifikator(id, req.body);
            res.status(200).json({ message: "Update verifikator berhasil", data: updated });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    remove = async (req, res) => {
        try {
            const { id } = req.params;
            await VerifikatorService.deleteVerifikator(id);
            res.status(200).json({ message: "Hapus verifikator berhasil" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    getPendaftarVerifikasi = async (req, res) => {
        try {
            const data = await VerifikatorService.getPendaftarForVerifikator();
            res.status(200).json({ message: "success", data });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    getMyAssignedPendaftar = async (req, res) => {
        try {
            const data = await VerifikatorService.getAssignedPendaftar(req.user.id);
            res.status(200).json({ message: "success", data });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    assignPendaftar = async (req, res) => {
        try {
            const { id } = req.params;
            const updated = await VerifikatorService.assignPendaftar(id, req.user.id);
            res.status(200).json({ message: "Berhasil mengambil alih pemeriksaan pendaftar", data: updated });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    verifyPendaftar = async (req, res) => {
        try {
            const { id } = req.params;
            const { status, catatan } = req.body;
            const updated = await VerifikatorService.verifyPendaftar(id, req.user.id, status, catatan);
            res.status(200).json({ message: "Proses verifikasi pendaftar selesai", data: updated });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };
}

export default VerifikatorController;
