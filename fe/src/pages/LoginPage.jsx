import {useState, useContext} from "react";
import {login} from "@services/handlers/handleAuth.js";
import {FormLogin} from '@components/common/Form.jsx'
import {AuthContext} from '@contexts/AuthContext.jsx'
import {useNavigate} from 'react-router'
import {Button} from '@components/ui/Button.jsx'

export default function LoginPage() {
    const {loading, setLoading, user, setUser} = useContext(AuthContext)
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true)
            const response = await login(formData);
            setUser({username: response.data.username});
            setLoading(false)
            navigate('/admin')
        } catch (err) {
            console.error(err)
            alert('login gagal :(')
            setLoading(false)
        }
    }
    return (<>
        <FormLogin handleSubmit={handleSubmit} formData={formData} setFormData={setFormData}/>
        <p>{loading ? 'loading ...' : `${user.username ? 'telah login' : 'belum login'}`}</p>
        <Button onClick={() => navigate("/")}>go back</Button>
    </>)
}