import {Button} from "../ui/Button.jsx";
import {IoSchoolSharp} from "react-icons/io5";
import {NavLink, useNavigate} from "react-router";


export default function Navbar() {
    const navigate = useNavigate();
    return (<>
            <div className={"h-10 bg-(--blue-dark)"}></div>
            <nav className={"flex justify-between items-center h-20 bg-white w-full px-15 lg:px-30"}>
                <p className={"text-xl font-bold text-sky-900"}>SMP Katolik St. Rafael</p>
                <ul className="flex justify-between text-slate-800 font-semibold gap-10">
                    <li><NavLink to={"/"}>Beranda</NavLink></li>
                    <li><NavLink to={"/"}>Tentang</NavLink></li>
                    <li><NavLink to={"/"}>Akademik</NavLink></li>
                    <li><NavLink to={"/"}>SPMB</NavLink></li>
                    <li><NavLink to={"/"}>Berita</NavLink></li>
                    <li><NavLink to={"/"}>Kontak</NavLink></li>
                    <li>
                        <button className={"cursor-pointer"} onClick={() => {
                            navigate("/login")
                        }}>Login
                        </button>
                    </li>
                </ul>
            </nav>
        </>

    )
        ;
}
