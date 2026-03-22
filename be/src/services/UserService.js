import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
import {buildFileUrl} from "../utils/file.js";

export const getUser = async (username) => {
    let user = await prisma.admin.findUnique({where: {username}});
    if (user) {
        return {...user, id: user.id_admin, role: "admin"};
    }

    user = await prisma.verifikator.findUnique({where: {username}});
    if (user) {
        return {...user, id: user.id_verifikator, role: "verifikator"};
    }
    return null;
};

export const createUser = async (username, password, nama = null, role = "admin") => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const data = {
        username,
        password: hashedPassword,
        nama: nama || username,
    };

    if (role === "admin") {
        const created = await prisma.admin.create({data});
        return {...created, id: created.id_admin, role: "admin"};
    } else {
        const created = await prisma.verifikator.create({data});
        return {...created, id: created.id_verifikator, role: "verifikator"};
    }
};

export const getUserProfil = async (id, role, req) => {
    let user;
    if (role === "admin") {
        user = await prisma.admin.findUnique({where: {id_admin: Number(id)}});
    } else {
        user = await prisma.verifikator.findUnique({where: {id_verifikator: Number(id)}});
    }

    if (!user) return null;

    return {
        id: role === "admin" ? user.id_admin : user.id_verifikator,
        username: user.username,
        nama: user.nama,
        role,
        foto_profil: buildFileUrl(req, user.foto_profil),
    };
};

export const putUserProfil = async (id, role, updatedData, req) => {
    let user;
    if (role === "admin") {
        user = await prisma.admin.update({
            where: {id_admin: Number(id)},
            data: updatedData
        });
    } else {
        user = await prisma.verifikator.update({
            where: {id_verifikator: Number(id)},
            data: updatedData
        });
    }

    return {
        id: role === "admin" ? user.id_admin : user.id_verifikator,
        username: user.username,
        nama: user.nama,
        role,
        foto_profil: buildFileUrl(req, user.foto_profil),
    };
};
