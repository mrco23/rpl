import {Button} from "../ui/Button.jsx";
import {IoSchoolSharp} from "react-icons/io5";
import {NavLink} from "react-router";
import {useContext} from "react";
import {AuthContext} from "../../contexts/AuthContext.jsx";

export default function Navbar() {
    const {user} = useContext(AuthContext);
    return (<>
            <nav>
                <p>navbar</p>
                {user.username}

            </nav>
        </>

    )
        ;
}
