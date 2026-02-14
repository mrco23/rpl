import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
import {generateToken, verifyToken} from "../utils/jwt.js";
import jwt from 'jsonwebtoken'


class User {
    register = async (req, res) => {
        try {
            const {name, email, password} = req.body;

            const existingUser = await prisma.user.findUnique({where: {email}});
            if (existingUser) return res.status(400).json({message: "Email sudah digunakan"});

            // Hash Password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Simpan ke DB
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                },
            });

            res
                .status(201)
                .json({message: "Register berhasil", data: {id: user.id, email: user.email}});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    };
    login = async (req, res) => {
        try {
            const {email, password} = req.body;
            const user = await prisma.user.findUnique({
                where: {
                    email: email
                },
                select: {
                    id: true,
                    email: true,
                    password: true
                }
            });
            if (!user) return res.status(400).json({message: "Email atau password salah"});

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({message: "Email atau password salah"});

            const token = generateToken({id: user.id})

            res.json({message: "Login berhasil", token});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    };
    getProfile = async (req, res) => {
        try {
            const authHeaders = req.headers['authorization'].split(' ')[1];
            const token = verifyToken(authHeaders);
            const {id} = token

            const user = await prisma.user.findUnique({
                where: {id: id},
                select: {
                    username:true,
                    email:true,
                    photoProfile: true,
                    createdAt:true
                },
            })

            console.log(user)

            if (!user) return res.status(401).json({message: 'User not found'});

            if (user.photoProfile) {
                user.photoUrl = `${req.protocol}://${req.get("host")}/uploads/${user.photoProfile}`;
            }

            res.json({
                message: 'Success',
                data: user,
            })
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
    updateProfile = async (req, res) => {
        try {
            const userId = req.user.id;
            const {name} = req.body;

            let updateData = {};

            if (name) updateData.name = name;

            if (req.file) {
                updateData.photoProfile = req.file.filename;
            }

            const updatedUser = await prisma.user.update({
                where: {id: userId},
                data: updateData,
                select: {id: true, name: true, email: true, photoProfile: true},
            });

            res.json({
                message: "Profil berhasil diupdate",
                data: updatedUser,
            });
        } catch (error) {
            res.status(500).json({message: "Gagal update profil: " + error.message});
        }
    }

}

export default User;