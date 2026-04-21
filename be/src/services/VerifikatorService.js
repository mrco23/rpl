import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";

export const getVerifikatorByUsername = async (username) => {
    return await prisma.verifikator.findUnique({
        where: { username }
    });
};

export const createVerifikator = async (data) => {
    const { username, password, nama } = data;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return await prisma.verifikator.create({
        data: {
            username,
            password: hashedPassword,
            nama
        }
    });
};

export const getBerandaData = async () => {
        const totalPendaftar = await prisma.pendaftar.count();
        const menungguVerifikasi = await prisma.pendaftar.count({ where: { status_pendaftaran: "menunggu verifikasi" } });
        const perluPerbaikan = await prisma.pendaftar.count({ where: { status_pendaftaran: "perlu perbaikan" } });
        const terverifikasi = await prisma.pendaftar.count({ where: { status_pendaftaran: "terverifikasi" } });
    
        const card = [
            { status: "menunggu verifikasi", jumlah: menungguVerifikasi },
            { status: "perlu perbaikan", jumlah: perluPerbaikan },
            { status: "terverifikasi", jumlah: terverifikasi },
            { status: "total semua pendaftar", jumlah: totalPendaftar }
        ];
    
        const mapStatus = (status) => {
            switch (status) {
                case "menunggu verifikasi": return "menunggu verifikasi";
                case "perlu perbaikan": return "perlu perbaikan";
                case "terverifikasi": return "terverifikasi";
                default: return status;
            }
        };

    const formatDate = (date) => {
        if (!date) return null;
        return date.toISOString().split('T')[0];
    };

    const pendaftarTerbaruData = await prisma.pendaftar.findMany({
        orderBy: { tanggal_daftar: 'desc' },
        take: 3,
        select: { nama_lengkap: true, nisn: true, tanggal_daftar: true, status_pendaftaran: true }
    });

    const pendaftarTerbaru = pendaftarTerbaruData.map(p => ({
        nama: p.nama_lengkap,
        nisn: p.nisn,
        tanggalDaftar: formatDate(p.tanggal_daftar),
        status: mapStatus(p.status_pendaftaran)
    }));

    const pendaftarYangPerluRevisiData = await prisma.pendaftar.findMany({
        where: { status_pendaftaran: "perlu_perbaikan" },
        orderBy: { tanggal_daftar: 'desc' },
        take: 3,
        select: { nama_lengkap: true, nisn: true, tanggal_daftar: true, status_pendaftaran: true }
    });

    const pendaftarYangPerluRevisi = pendaftarYangPerluRevisiData.map(p => ({
        nama: p.nama_lengkap,
        nisn: p.nisn,
        tanggalDaftar: formatDate(p.tanggal_daftar),
        status: mapStatus(p.status_pendaftaran)
    }));

    return {
        card,
        pendaftarTerbaru,
        pendaftarYangPerluRevisi
    };
};

export const getAllVerifikator = async () => {
    return await prisma.verifikator.findMany({
        orderBy: { id_verifikator: 'desc' },
        select: {
            id_verifikator: true,
            username: true,
            nama: true
        }
    });
};

export const updateVerifikator = async (id, data) => {
    const { username, password, nama } = data;
    const updateData = { username, nama };
    
    if (password) {
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(password, salt);
    }

    return await prisma.verifikator.update({
        where: { id_verifikator: Number(id) },
        data: updateData
    });
};

export const deleteVerifikator = async (id) => {
    return await prisma.verifikator.delete({
        where: { id_verifikator: Number(id) }
    });
};

export const getPendaftarForVerifikator = async () => {
    return await prisma.pendaftar.findMany({
        where: {
            status_pendaftaran: {
                in: ["menunggu verifikasi", "unggah ulang", "perlu perbaikan"]
            }
        },
        include: {
            gelombang: true,
            verifikator: {
                select: { nama: true }
            }
        },
        orderBy: { tanggal_daftar: 'desc' }
    });
};

export const getAssignedPendaftar = async (idVerifikator) => {
    return await prisma.pendaftar.findFirst({
        where: { id_verifikator: Number(idVerifikator) },
        include: {
            gelombang: true,
            dokumen: true
        }
    });
};

export const assignPendaftar = async (idPendaftar, idVerifikator) => {
    const pendaftar = await prisma.pendaftar.findUnique({
        where: { id_pendaftar: Number(idPendaftar) }
    });

    if (!pendaftar) throw new Error("Pendaftar tidak ditemukan");

    if (pendaftar.id_verifikator && pendaftar.id_verifikator !== Number(idVerifikator)) {
        throw new Error("Pendaftar sedang diperiksa oleh verifikator lain");
    }

    // Release any previous pendaftar this verifier was checking
    await prisma.pendaftar.updateMany({
        where: { id_verifikator: Number(idVerifikator) },
        data: { id_verifikator: null }
    });

    return await prisma.pendaftar.update({
        where: { id_pendaftar: Number(idPendaftar) },
        data: { id_verifikator: Number(idVerifikator) }
    });
};

export const verifyPendaftar = async (idPendaftar, idVerifikator, status, catatan) => {
    const pendaftar = await prisma.pendaftar.findUnique({
        where: { id_pendaftar: Number(idPendaftar) }
    });

    if (!pendaftar || pendaftar.id_verifikator !== Number(idVerifikator)) {
        throw new Error("Anda tidak memiliki akses untuk memverifikasi pendaftar ini atau pendaftar tidak ditemukan");
    }

    return await prisma.pendaftar.update({
        where: { id_pendaftar: Number(idPendaftar) },
        data: {
            status_pendaftaran: status,
            catatan_dokumen: catatan,
            id_verifikator: null
        }
    });
};
