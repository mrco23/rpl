import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
import {generateToken} from "../utils/jwt.js";

export const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        // Cek email duplikat
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

export const login = async (req, res) => {
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
