import bcrypt from "bcryptjs";
import prisma from "../config/prisma.js";

export const getAdmin = async (username) => {
    const admin = await prisma.admin.findUnique({where: {username: username}});
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
export const getBerandaData = async () => {
    const [totalFasilitas, totalEkstrakurikuler, totalPrestasi, totalBerita, totalProgramUnggulan] = await Promise.all([
        prisma.fasilitas.count(),
        prisma.ekstrakurikuler.count(),
        prisma.prestasi.count(),
        prisma.berita.count(),
        prisma.programUnggulan.count()
    ]);

    const card = [
        { totalFasilitas },
        { totalEkstrakurikuler },
        { totalPrestasi },
        { totalBerita },
        { totalProgramUnggulan }
    ];

    const mapStatus = (status) => {
        switch (status) {
            case "menunggu_verifikasi": return "menunggu verifikasi";
            case "perlu_perbaikan": return "perlu perbaikan";
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

    const verifikatorData = await prisma.verifikator.findMany({
        take: 3,
        select: { nama: true, username: true }
    });

    const DaftarVerifikator = verifikatorData.map(v => ({
        nama: v.nama,
        username: v.username
    }));

    return {
        card,
        pendaftarTerbaru,
        DaftarVerifikator
    };
};
