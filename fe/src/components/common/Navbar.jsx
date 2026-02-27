import {Button} from "../ui/Button.jsx";
import {IoSchoolSharp} from "react-icons/io5";
import {NavLink, useNavigate, useLocation} from "react-router";
import {MdOutlineKeyboardArrowDown} from "react-icons/md";
import {useState} from "react";

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation()

    return (<>
            <div className={"h-10 bg-(--blue-dark-hover)"}></div>
            <nav className={"flex justify-between items-center h-20 bg-white w-full px-15 lg:px-30"}>
                <p className={"text-xl text-slate-900"}>SMP Katolik St. Rafael</p>
                <ul className="flex justify-between text-slate-900 gap-10">
                    <li><NavLink to={"/"}
                                 className={`${location.pathname == '/' && 'text-(--yellow-normal-hover)'}`}>Beranda</NavLink>
                    </li>
                    <Dropdown dropOption={['satu', 'dua']}>Tentang</Dropdown>
                    <Dropdown dropOption={['satu', 'dua']}>Akademik</Dropdown>
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

    );
}

function Dropdown({dropOption, children}) {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => setIsOpen(prev => !prev);
    const navigate = useNavigate();
    return (<li><NavLink to={"/"}>
        <div className="relative">
            <button onClick={handleOpen} type="button"
                    className={'flex items-center gap-3 relative cursor-pointer'}>
                {children}
                <MdOutlineKeyboardArrowDown className={`transition-all ${isOpen ? "rotate-180" : ""}`}/>
            </button>

            {isOpen ? (
                <ul className="absolute bg-white min-w-45  gap-2 flex flex-col items-center justify-center shadow-lg mt-2 rounded-lg overflow-hidden">
                    {dropOption.map((option) => (<li className="hover:bg-slate-300 w-full px-2 py-2.5">
                        <button onClick={() => {
                            navigate(`/${option}`)
                        }}>{option}</button>
                    </li>))}


                </ul>) : ""}
        </div>
    </NavLink></li>)
}
