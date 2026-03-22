import bcrypt from "bcryptjs";
import prisma from "../config/prisma.js";

export const getAdmin = async (username) => {
    const admin = await prisma.admin.findUnique({where: {username: username}});``
    return admin
}
export const createAdmin = async (username, password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const data = {
        username,
        password: hashedPassword,
    };

    const created = await prisma.admin.create({data});
    return {...created, id: created.id_admin};
}
export const getAdminProfil = async () => {
}
export const putAdminProfil = async () => {
}

