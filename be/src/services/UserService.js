import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
import { buildFileUrl } from "../utils/file.js";

export const getUser = (username) => {
  return prisma.pengguna.findUnique({
    where: { username },
  });
};

export const createUser = async (username, password, name = null) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return prisma.pengguna.create({
    data: {
      username,
      password: hashedPassword,
      name,
    },
  });
};

export const getUserProfil = async (id, req) => {
  const user = await prisma.pengguna.findUnique({
    where: { id },
    select: { id: true, username: true, name: true, role: true, photo_profil: true },
  });

  if (!user) return null;
  return {
    ...user,
    photo_profil: buildFileUrl(req, user.photo_profil),
  };
};

export const putUserProfil = async (id, updatedData, req) => {
  const user = await prisma.pengguna.update({
    where: { id },
    data: updatedData,
    select: { id: true, username: true, name: true, role: true, photo_profil: true },
  });

  return {
    ...user,
    photo_profil: buildFileUrl(req, user.photo_profil),
  };
};
