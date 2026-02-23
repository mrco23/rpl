import express from 'express'
import ProfilSekolah from '../controllers/ProfilSekolah.js'
import {verifyToken} from "../utils/jwt.js";

const profilSekolahRoute = express.Router()
const profilSekolah = new ProfilSekolah()
const {addProfilSekolah, getProfilSekolah, updateProfilSekolah} = profilSekolah

// profilSekolahRoute.use(verifyToken)
profilSekolahRoute.post("", addProfilSekolah)
profilSekolahRoute.get("", getProfilSekolah)
profilSekolahRoute.put("", updateProfilSekolah)

export default profilSekolahRoute