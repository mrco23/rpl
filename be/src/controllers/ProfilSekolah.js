import prisma from '../config/prisma.js'
import {verifyToken} from '../utils/jwt.js'

class ProfilSekolah {
    addProfilSekolah = async (req, res) => {
        try {
            const authHeaders = req.headers['authorization'].split(" ")[1]
            const token = verifyToken(authHeaders)
            const {nama_sekolah, visi, misi, deskripsi, logo} = req.body;
            const request = await prisma.profil_Sekolah.create({
                data: {
                    nama_sekolah: nama_sekolah, visi: visi, misi: misi, deskripsi: deskripsi, logo: logo
                }
            })

            const fk = await prisma.pengguna.update({
                where: {id: token.id},
                data: {
                    id_sekolah: request.id_sekolah
                }
            })
            return res.status(201).json({
                message: 'success', data: request
            })
        } catch (err) {
            console.error(err)
        }
    }
    updateProfilSekolah = async (req, res) => {
        try {
            const authHeaders = req.headers['authorization'].split(" ")[1]
            const token = verifyToken(authHeaders)

            const {id_sekolah} = await prisma.pengguna.findUnique({
                where: {id: token.id},
                select: {
                    id_sekolah: true
                }
            })
            const {nama_sekolah, visi, misi, deskripsi, logo} = req.body;
            const updateData = {
                ...(nama_sekolah && {nama_sekolah}),
                ...(visi && {visi}),
                ...(misi && {misi}),
                ...(deskripsi && {deskripsi}),
                ...(logo && {logo}),
            };
            console.log(id_sekolah)

            const request = await prisma.profil_Sekolah.update({
                where: {
                    id_sekolah: id_sekolah
                }, data: updateData
            })
            return res.status(200).json({
                message: 'success', data: request
            })
        } catch (err) {
            console.error(err)
        }
    }
    getProfilSekolah = async (req, res) => {
        try {
            const authHeader = req.headers['authorization'];
            if (!authHeader) return res.status(401).json({message: 'No token provided'});

            const token = verifyToken(authHeader.split(" ")[1]);

            const pengguna = await prisma.pengguna.findUnique({
                where: {id: token.id},
                select: {id_sekolah: true}
            });
            if (!pengguna) return res.status(404).json({message: 'User not found'});

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
            if (!profilSekolah) return res.status(404).json({message: 'School profile not found'});


            return res.status(200).set("Cache-Control", "no-store").json({message: 'success', data: profilSekolah});
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: 'Internal server error'});
        }
    };

}

export default ProfilSekolah