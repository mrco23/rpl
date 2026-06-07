import prisma from "../config/prisma.js";
import { getEndOfDay } from "./PendaftarService.js";

export const getAktif = async () => {
    const now = new Date();
    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);

    const gelombang = await prisma.gelombang.findFirst({
        where: {
            tanggal_mulai: { lte: now },
            // Treat tanggal_selesai as active until 23:59:59.999 of that day
            tanggal_selesai: { gte: startOfToday },
        },
        include: {
            _count: {
                select: { pendaftar: true }
            }
        }
    });

    if (gelombang) {
        // Ensure we are still within the batch end day
        if (now > getEndOfDay(gelombang.tanggal_selesai)) return null;
        return {
            ...gelombang,
            totalPendaftar: gelombang._count.pendaftar
        };
    }
    return null;
};

export const getAll = async () => {
    const data = await prisma.gelombang.findMany({
        orderBy: { tanggal_mulai: "desc" },
        include: {
            _count: {
                select: { pendaftar: true }
            }
        }
    });
    return data.map(item => ({
        ...item,
        totalPendaftar: item._count.pendaftar
    }));
};

export const getPublicAll = async () => {
    const data = await prisma.gelombang.findMany({
        orderBy: { tanggal_mulai: "desc" },
        include: {
            _count: {
                select: { pendaftar: true }
            }
        }
    });

    const now = new Date();

    return data.map(item => {
        const totalPendaftar = item._count.pendaftar;
        const sisaKuota = Math.max(0, item.kuota - totalPendaftar);

        let statusGelombang = "";
        const startDate = new Date(item.tanggal_mulai);
        const endDate = new Date(item.tanggal_selesai);
        endDate.setHours(23, 59, 59, 999);

        if (now < startDate) {
            statusGelombang = "belum dibuka";
        } else if (now > endDate) {
            statusGelombang = "ditutup";
        } else {
            statusGelombang = "aktif";
        }

        return {
            id_gelombang: item.id_gelombang,
            nama: item.nama,
            tanggal_mulai: item.tanggal_mulai,
            tanggal_selesai: item.tanggal_selesai,
            kuota: item.kuota,
            totalPendaftar,
            sisaKuota,
            statusGelombang
        };
    });
};

export const getById = async (id) => {
    return prisma.gelombang.findUnique({
        where: { id_gelombang: Number(id) }
    });
};

export const create = async (payload) => {
    const tanggal_mulai = new Date(payload.tanggal_mulai);
    const tanggal_selesai = new Date(payload.tanggal_selesai);

    if (tanggal_selesai <= tanggal_mulai) {
        throw new Error("Tanggal selesai harus lebih besar dari tanggal mulai.");
    }

    const overlap = await prisma.gelombang.findFirst({
        where: {
            AND: [
                { tanggal_mulai: { lte: tanggal_selesai } },
                { tanggal_selesai: { gte: tanggal_mulai } }
            ]
        }
    });

    if (overlap) {
        throw new Error("Gagal menyimpan: Rentang tanggal bentrok dengan gelombang lain.");
    }

    return prisma.gelombang.create({
        data: {
            nama: payload.nama,
            tanggal_mulai,
            tanggal_selesai,
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

    if (data.tanggal_mulai && data.tanggal_selesai) {
        if (data.tanggal_selesai <= data.tanggal_mulai) {
            throw new Error("Tanggal selesai harus lebih besar dari tanggal mulai.");
        }

        const overlap = await prisma.gelombang.findFirst({
            where: {
                id_gelombang: { not: Number(id) },
                AND: [
                    { tanggal_mulai: { lte: data.tanggal_selesai } },
                    { tanggal_selesai: { gte: data.tanggal_mulai } }
                ]
            }
        });

        if (overlap) {
            throw new Error("Gagal memperbarui: Rentang tanggal bentrok dengan gelombang lain.");
        }
    }

    return prisma.gelombang.update({
        where: { id_gelombang: Number(id) },
        data
    });
};

export const remove = async (id) => {
    return prisma.$transaction(async (tx) => {
        await tx.pendaftar.deleteMany({
            where: { id_gelombang: Number(id) }
        });
        return tx.gelombang.delete({
            where: { id_gelombang: Number(id) }
        });
    });
};

export const checkActive = async (id) => {
    const now = new Date();
    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);

    const gelombang = await prisma.gelombang.findFirst({
        where: {
            id_gelombang: Number(id),
            tanggal_mulai: { lte: now },
            tanggal_selesai: { gte: startOfToday },
        }
    });
    if (!gelombang) return false;
    // Verify we are within the final day boundary
    return now <= getEndOfDay(gelombang.tanggal_selesai);
}

export const ajukanValidasi = async (id) => {
    const gelombang = await prisma.gelombang.findUnique({
        where: { id_gelombang: Number(id) }
    });

    if (!gelombang) throw new Error("Gelombang tidak ditemukan.");

    const now = new Date();
    const end = new Date(gelombang.tanggal_selesai);
    end.setHours(23, 59, 59, 999);

    if (now <= end) {
        throw new Error("Gelombang belum selesai sehingga belum dapat diajukan untuk validasi.");
    }

    if (gelombang.status_validasi === "menunggu_validasi") {
        throw new Error("Laporan gelombang sudah diajukan dan sedang menunggu validasi kepala sekolah.");
    }
    
    if (gelombang.status_validasi === "disetujui") {
        throw new Error("Laporan gelombang sudah disetujui kepala sekolah.");
    }

    return prisma.gelombang.update({
        where: { id_gelombang: Number(id) },
        data: { status_validasi: "menunggu_validasi" }
    });
};