import bcrypt from "bcryptjs";
import {getPendaftar, register} from "../services/PendaftarService.js";
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

            const isMatch = await bcrypt.compare(password, pendaftar.kata_sandi);
            if (!isMatch) return res.status(400).json({message: 'NISN atau Kata Sandi Salah'})

            const token = generateToken({id: pendaftar.id})
            return res.status(200).json({
                message: "Masuk Berhasil",
                token,
            })
        } catch (err) {
            console.log(err);
        }
    }
}

export default new PendaftarController();
