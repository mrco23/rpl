import bcrypt from "bcryptjs";
import {generateToken, verifyToken} from "../utils/jwt.js";
import {getAdminProfil, putAdminProfil, createAdmin, getAdmin} from "../services/AdminService.js";
import {getUser} from "../services/UserService.js";

class AdminController {
    register = async (req, res) => {
        try {
            const {username, password} = req.body;

            const existingUser = await getAdmin(username);
            if (existingUser) return res.status(400).json({message: "Nama Pengguna sudah digunakan"});

            const admin = await createAdmin(username, password);

            res.status(201).json({
                message: "Register berhasil",
                data: {id: admin.id, username: admin.username},
            });
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }
    login = async (req, res) => {
        try {
            const {username, password} = req.body;
            if (!username || !password) return res.status(401).json({message: "Nama Pengguna atau Kata Sandi Tidak ada"});

            const user = await getAdmin(username);
            if (!user) return res.status(400).json({message: "Nama Pengguna atau Kata Sandi salah"});

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({message: "Nama Pengguna atau Kata Sandi salah"});

            const token = generateToken({id: user.id});

            res.json({
                message: "Login berhasil",
                username: user.username,
                token,
            });
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
    getProfile = (req, res) => {
    }
    updateProfile = (req, res) => {
    }
}

export default AdminController;