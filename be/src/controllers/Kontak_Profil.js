class Kontak_Profil {
    addKontakProfil = async (req, res) => {
        const authHeaders = req.headers['authorization'].split(' ')[1];
        const {alamat, no_telpon, email, media_sosial} = req.body


    }
}

export {Kontak_Profil};