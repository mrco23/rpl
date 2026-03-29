import prisma from "../config/prisma.js";
import {nanoid} from "nanoid";


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

    const no_pendaftaran = payload.no_pendaftaran || `REG-${nanoid(8).toUpperCase()}`;

    if (payload.nisn) {
        const existingNisn = await prisma.pendaftar.findUnique({where: {nisn: payload.nisn}});
        if (existingNisn) throw new Error("NISN sudah digunakan");
    }

    if (payload.nik) {
        const existingNik = await prisma.pendaftar.findUnique({where: {nik: payload.nik}});
        if (existingNik) throw new Error("NIK sudah digunakan");
    }

    const data = {
        no_pendaftaran,
        nama_lengkap: payload.nama_lengkap,
        nisn: payload.nisn || null,
        nik: payload.nik || null,
        jenis_kelamin: payload.jenis_kelamin || null,
        tempat_lahir: payload.tempat_lahir || null,
        tanggal_lahir: payload.tanggal_lahir ? new Date(payload.tanggal_lahir) : null,
        alamat: payload.alamat,
        no_hp: payload.no_hp,
        email: payload.email || null,
        asal_sekolah: payload.asal_sekolah || null,
        nama_ayah: payload.nama_ayah || null,
        nama_ibu: payload.nama_ibu || null,
        nama_wali: payload.nama_wali || null,
        tahun_ajaran: payload.tahun_ajaran || null,
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
