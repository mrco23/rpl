import prisma from "../config/prisma.js";

export const getAktif = async () => {
    const now = new Date();
    return prisma.gelombang.findFirst({
        where: {
            tanggal_mulai: { lte: now },
            tanggal_selesai: { gte: now }
        }
    });
};

export const getAll = async () => {
    return prisma.gelombang.findMany({
        orderBy: { tanggal_mulai: "desc" }
    });
};

export const getById = async (id) => {
    return prisma.gelombang.findUnique({
        where: { id_gelombang: Number(id) }
    });
};

export const create = async (payload) => {
    return prisma.gelombang.create({
        data: {
            nama: payload.nama,
            tanggal_mulai: new Date(payload.tanggal_mulai),
            tanggal_selesai: new Date(payload.tanggal_selesai),
            kuota: Number(payload.kuota)
        }
    });
};

export const update = async (id, payload) => {
    const data = {
        nama: payload.nama
    };
    if (payload.tanggal_mulai) data.tanggal_mulai = new Date(payload.tanggal_mulai);
    if (payload.tanggal_selesai) data.tanggal_selesai = new Date(payload.tanggal_selesai);
    if (payload.kuota) data.kuota = Number(payload.kuota);

    return prisma.gelombang.update({
        where: { id_gelombang: Number(id) },
        data
    });
};

export const remove = async (id) => {
    return prisma.gelombang.delete({
        where: { id_gelombang: Number(id) }
    });
};
