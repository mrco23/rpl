import prisma from '../config/prisma.js'

class ProfilSekolahService {
    async createProfil(userId, payload) {
        return await prisma.$transaction(async (tx) => {
            const newProfil = await tx.profil_Sekolah.create({
                data: {
                    nama_sekolah: payload.nama_sekolah,
                    visi: payload.visi,
                    misi: payload.misi,
                    deskripsi: payload.deskripsi,
                    logo: payload.logo
                }
            });

            await tx.pengguna.update({
                where: {id: userId},
                data: {id_sekolah: newProfil.id_sekolah}
            });

            return newProfil;
        });
    }

    async updateProfil(userId, updateData) {
        const pengguna = await prisma.pengguna.findUnique({
            where: {id: userId},
            select: {id_sekolah: true}
        });

        if (!pengguna?.id_sekolah) {
            throw new Error('Sekolah tidak ditemukan untuk user ini');
        }

        return await prisma.profil_Sekolah.update({
            where: {id_sekolah: pengguna.id_sekolah},
            data: updateData
        });
    }

    async getProfil(userId) {
        const pengguna = await prisma.pengguna.findUnique({
            where: {id: userId},
            select: {id_sekolah: true}
        });

        if (!pengguna?.id_sekolah) {
            throw new Error('Data sekolah tidak ditemukan untuk user ini');
        }

        const profilSekolah = await prisma.profil_Sekolah.findUnique({
            where: {id_sekolah: pengguna.id_sekolah},
            select: {
                nama_sekolah: true,
                visi: true,
                misi: true,
                deskripsi: true,
                logo: true,
                Kontak_Sekolah: true,
            }
        });

        if (!profilSekolah) throw new Error('Profil sekolah tidak ditemukan');

        return profilSekolah;
    }
}

export default new ProfilSekolahService();