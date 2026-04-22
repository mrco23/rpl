import bcrypt from "bcryptjs";
import {getPendaftar, getPendaftarById, register, getAllPendaftar, updateStatusMassal} from "../services/PendaftarService.js";
import {generateToken} from '../utils/jwt.js'

class PendaftarController {
    register = async (req, res) => {
        try {
            const pendaftar = await register(req.body);
            return res.status(201).json({
                message: "Registrasi berhasil",
                data: pendaftar
            });
        } catch (error) {
            return res.status(400).json({
                message: "Gagal melakukan registrasi",
                error: error.message
            });
        }
    };
    login = async (req, res) => {
        try {
            const {nisn, password} = req.body
            if (!nisn || !password) return res.status(401).json({message: 'NISN atau Kata Sandi Tidak ada'})

            const pendaftar = await getPendaftar(nisn);
            if (!pendaftar) return res.status(404).json({message: "Pendaftar Tidak Terdaftar"})
            
            if (!pendaftar.kata_sandi) {
                return res.status(400).json({message: 'Pendaftar belum memiliki kata sandi, mohon hubungi admin'});
            }

            const isMatch = await bcrypt.compare(password, pendaftar.kata_sandi);
            if (!isMatch) return res.status(400).json({message: 'NISN atau Kata Sandi Salah'})

            const token = generateToken({id: pendaftar.id_pendaftar, role: 'pendaftar'})
            return res.status(200).json({
                message: "Masuk Berhasil",
                token,
                nama: pendaftar.nama_lengkap,
                nisn: pendaftar.nisn,
                role: "pendaftar"
            })
        } catch (err) {
            console.error(err);
            return res.status(500).json({message: "Terjadi kesalahan pada server", error: err.message});
        }
    }

    getMe = async (req, res) => {
        try {
            const id = req.user.id;
            const pendaftar = await getPendaftarById(id);
            if (!pendaftar) return res.status(404).json({ message: "Data pendaftar tidak ditemukan" });
            return res.status(200).json({ message: "success", data: pendaftar });
        } catch (error) {
            return res.status(500).json({ message: "Gagal mengambil biodata", error: error.message });
        }
    };

    getAllPendaftar = async (req, res) => {
        try {
            const data = await getAllPendaftar();
            return res.status(200).json({ message: "success", data });
        } catch (error) {
            return res.status(500).json({
                message: "Gagal mengambil data pendaftar",
                error: error.message
            });
        }
    };

    updateStatusMassal = async (req, res) => {
        try {
            const { ids, status } = req.body;
            if (!ids || !status) {
                return res.status(400).json({ message: "ID pendaftar dan status harus diisi" });
            }
            await updateStatusMassal(ids, status);
            return res.status(200).json({ message: "Berhasil memperbarui status pendaftar secara massal" });
        } catch (error) {
            return res.status(500).json({
                message: "Gagal memperbarui status pendaftar",
                error: error.message
            });
        }
    };
}


export default new PendaftarController();
