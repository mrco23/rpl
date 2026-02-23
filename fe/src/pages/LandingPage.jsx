import React from "react";
import {createKontakSekolah} from "../services/handlers/handleForm.js";
import {AuthContext} from '../contexts/AuthContext.jsx'
import {useNavigate} from "react-router";
import {Button} from '../components/ui/Button.jsx'

export default function LandingPage() {
    const navigate = useNavigate();

    return (<>
        <Button onClick={() => navigate('/login')}>go to login !</Button>
    </>);
}
