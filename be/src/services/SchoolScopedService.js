import prisma from "../config/prisma.js";

export const getUserSchoolId = async (userId) => {
  const pengguna = await prisma.pengguna.findUnique({
    where: { id: userId },
    select: { id_sekolah: true }
  });

  if (!pengguna?.id_sekolah) {
    throw new Error("Sekolah belum terhubung ke akun ini");
  }

  return pengguna.id_sekolah;
};
