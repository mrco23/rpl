import prisma from '../config/prisma.js'
import {verifyToken} from '../utils/jwt.js'

class ProfilSekolahService {
    createProfilSekolah(nama_sekolah, visi, misi, deskripsi, logo) {
        return prisma.profil_Sekolah.create({
            data: {
                nama_sekolah: nama_sekolah, visi: visi, misi: misi, deskripsi: deskripsi, logo: logo
            }
        })
    }
}

const profilSekolahService = new ProfilSekolahService()

export default profilSekolahService;