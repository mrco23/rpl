import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";

export const register = async (payload) => {
    const now = new Date();
    const activeGelombang = await prisma.gelombang.findFirst({
        where: {
            tanggal_mulai: { lte: now },
            tanggal_selesai: { gte: now }
        }
    });

    if (!activeGelombang) {
        const error = new Error("Pendaftaran saat ini ditutup");
        error.statusCode = 400;
        throw error;
    }

    const count = await prisma.pendaftar.count({
        where: { id_gelombang: activeGelombang.id_gelombang }
    });

    if (count >= activeGelombang.kuota) {
        const error = new Error("Kuota pendaftaran gelombang ini sudah penuh");
        error.statusCode = 400;
        throw error;
    }

    if (!payload.nama_lengkap || !payload.alamat || !payload.jenis_kelamin || !payload.no_hp || !payload.asal_sekolah) {
        throw new Error("Field wajib belum lengkap. Pastikan nama_lengkap, alamat, jenis_kelamin, no_hp, asal_sekolah terisi.");
    }

    if (payload.nisn) {
        const existingNisn = await prisma.pendaftar.findUnique({where: {nisn: payload.nisn}});
        if (existingNisn) throw new Error("NISN sudah digunakan");
    }

    let hashedKataSandi = null;
    if (payload.kata_sandi) {
        const salt = await bcrypt.genSalt(10);
        hashedKataSandi = await bcrypt.hash(payload.kata_sandi, salt);
    }

    const data = {
        nama_lengkap: payload.nama_lengkap,
        kata_sandi: hashedKataSandi,
        nisn: payload.nisn || null,
        alamat: payload.alamat,
        tempat_lahir: payload.tempat_lahir || null,
        tanggal_lahir: payload.tanggal_lahir ? new Date(payload.tanggal_lahir) : null,
        jenis_kelamin: payload.jenis_kelamin,
        no_hp: payload.no_hp,
        asal_sekolah: payload.asal_sekolah,
        email: payload.email || null,
        nama_wali: payload.nama_wali || null,
        id_gelombang: activeGelombang.id_gelombang,
        status_pendaftaran: "menunggu_verifikasi",
    };

    return prisma.pendaftar.create({data});
}

export const getPendaftar = async (nisn) => {
    let pendaftar = await prisma.pendaftar.findUnique({where: {nisn}});
    if (pendaftar) {
        return {...pendaftar, id: pendaftar.id_pendaftar};
    }
    return null;
};

export const getPendaftarById = async (id) => {
    return await prisma.pendaftar.findUnique({
        where: { id_pendaftar: Number(id) }
    });
};

export const getAllPendaftar = async () => {
    return await prisma.pendaftar.findMany();
};
