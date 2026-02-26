import React from "react";
import {createKontakSekolah} from "../services/handlers/handleForm.js";
import {AuthContext} from '../contexts/AuthContext.jsx'
import {useNavigate} from "react-router";
import {Button} from '@components/ui/Button.jsx'
import Navbar from '@components/common/Navbar.jsx'
export default function LandingPage() {
    const navigate = useNavigate();

    return (<>
        <Navbar/>
        <Button onClick={() => navigate('/login')}>go to login !</Button>
    </>);
}
