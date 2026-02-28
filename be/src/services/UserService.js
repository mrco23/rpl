import prisma from '../config/prisma.js'
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs";

export const getUser = (username) => {
    return prisma.pengguna.findUnique({
        where: {
            username: username
        }
    })
}

export const createUser = async (username, password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return prisma.pengguna.create({
        data: {
            username, password: hashedPassword,
        },
    });
}

export const getUserProfil = (id) => {
    return prisma.pengguna.findUnique({
        where: {id: id}, select: {
            username: true, photo_profil: true,
        }
    });
}

export const putUserProfil = (id, updatedData) => {
    return prisma.pengguna.update({
        where: {id: id}, data: updatedData, select: {id: true, username: true, photo_profil: true},
    });
}


