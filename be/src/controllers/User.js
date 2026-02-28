import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
import {generateToken, verifyToken} from "../utils/jwt.js";
import jwt from 'jsonwebtoken';
import {getUserProfil, putUserProfil, createUser, getUser} from "../services/UserService.js";

class User {
    register = async (req, res) => {
        try {
            const {username, password} = req.body;

            const existingUser = await getUser(username)
            if (existingUser) return res.status(400).json({message: "Nama Pengguna sudah digunakan"});

            const user = await createUser(username, password);

            res
                .status(201)
                .json({message: "Register berhasil", data: {id: user.id, username: user.username}});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    };
    login = async (req, res) => {
        try {
            const {username, password} = req.body;
            if (!username || !password) return res.status(401).json({message: "Nama Pengguna atau Kata Sandi Tidak ada"});

            const user = await getUser(username);

            if (!user) return res.status(400).json({message: "Nama Pengguna atau Kata Sandi salah"});

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({message: "Email atau password salah"});

            const token = generateToken({id: user.id})

            res.json({
                message: "Login berhasil",
                token,
                username: user.username
            })
            ;
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    };
    getProfile = async (req, res) => {
        try {
            const authHeaders = req.headers['authorization'].split(' ')[1];
            const token = verifyToken(authHeaders);
            const {id} = token

            const user = await getUserProfil(id)

            if (!user) return res.status(401).json({message: 'User not found'});

            if (user.photo_profil) {
                user.photo_profil = `${req.protocol}://${req.get("host")}/uploads/${user.photo_profil}`;
            }

            res.json({
                message: 'Success', data: user,
            })
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
    updateProfile = async (req, res) => {
        try {
            const userId = req.user.id;
            const {name} = req.body;

            let updatedData = {};

            if (name) updatedData.name = name;

            if (req.file) {
                updatedData.photo_profil = req.file.filename;
            }

            const updatedUser = await putUserProfil(userId, updatedData);

            res.json({
                message: "Profil berhasil diupdate", data: updatedUser,
            });
        } catch (error) {
            res.status(500).json({message: "Gagal update profil: " + error.message});
        }
    }
}

export default User;