import React from "react";
import {createKontakSekolah} from "@services/handlers/handleForm.js";
import {AuthContext} from '@contexts/AuthContext.jsx'
import {useNavigate} from "react-router";
import {Button} from '@components/ui/Button.jsx'
import Navbar from '@components/common/Navbar.jsx'
import LoadingSpinner from "@components/ui/LoadingSpinner.jsx";

export default function LandingPage() {
    const navigate = useNavigate();

    return (<div className={'min-w-screen min-h-screen flex flex-col'}>
        {/*<LoadingSpinner/>*/}
        <Navbar/>
    </div>);
}
