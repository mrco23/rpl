import {useNavigate} from 'react-router'
import {Button} from '../../components/ui/Button.jsx'
export default function AdminDashboard() {
    const navigate = useNavigate()
    const handleLogout = async () => {
        localStorage.removeItem("token")
        navigate("/")
    }
    return <>
        <p>Admin Beranda Page</p>
        <Button onClick={() => navigate('/admin/profil-sekolah')}>go to profil sekolah</Button>
        <Button onClick={handleLogout}>keluar</Button>
    </>;
}