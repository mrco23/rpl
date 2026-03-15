import ProfilSekolahService from '../services/ProfilSekolahService.js'

class ProfilSekolah {
    addProfilSekolah = async (req, res) => {
        try {
            const userId = req.user.id;
            const request = await ProfilSekolahService.createProfil(userId, req.body);

            return res.status(201).json({message: 'success', data: request});
        } catch (error) {
            console.error(error);
            if (error.code === 'P2002') {
                return res.status(400).json({message: 'Nama sekolah sudah terdaftar!'});
            }
            return res.status(500).json({message: 'Gagal membuat profil', error: error.message});
        }
    }

    updateProfilSekolah = async (req, res) => {
        try {
            const userId = req.user.id;
            const request = await ProfilSekolahService.updateProfil(userId, req.body);

            return res.status(200).json({message: 'success', data: request});
        } catch (error) {
            console.error(error);
            return res.status(400).json({message: 'Gagal update profil', error: error.message});
        }
    }

    getProfilSekolah = async (req, res) => {
        try {
            const userId = req.user.id;
            const profilSekolah = await ProfilSekolahService.getProfil(userId);

            return res.status(200).set("Cache-Control", "no-store").json({
                message: 'success',
                data: profilSekolah
            });
        } catch (error) {
            console.error(error);
            return res.status(404).json({message: error.message});
        }
    };
}

export default ProfilSekolah;