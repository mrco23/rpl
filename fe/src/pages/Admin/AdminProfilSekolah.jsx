import {useNavigate} from 'react-router'
import {useEffect, useState} from "react";
import {getProfil} from "../../services/handlers/profilSekolah.js";

export default function AdminProfilSekolah() {
    const navigate = useNavigate()
    const [profilSekolah, setProfilSekolah] = useState({})
    const handleGet = async () => {
        const res = await getProfil();
        setProfilSekolah(res.data);
    };

    useEffect(() => {
        handleGet();
    }, []);
    return (
        <>
            <p>Admin Profil Sekolah</p>

            <button onClick={() => navigate('/admin')}>go to beranda admin</button>
            {profilSekolah ? Object.entries(profilSekolah).map(([key, value]) => {
                return <p key={key}>{key}: {value}</p>
            }) : ""}
        </>
    )
}
