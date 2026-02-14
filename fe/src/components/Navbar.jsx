import { Button } from "./Button.jsx";
import { IoSchoolSharp } from "react-icons/io5";
import { NavLink } from "react-router";

export default function Navbar() {
	return (
		<nav className=" min-h-16 items-center flex justify-between px-20 ">
			<div className={`flex h-full items-center gap-5 text-blue-900`}>
				<IoSchoolSharp size={30} className={``} />
				<h1 className={`text-2xl font-bold`}>SMP Katolik St. Rafael</h1>
			</div>
			<div></div>
			<div className={`flex min-w-40 justify-around gap-10`}>
				<p className="font-bold text-slate-600 hover:text-blue-600 cursor-pointer">Beranda</p>
				<NavLink to={`/login`}>Masuk</NavLink>
			</div>
		</nav>
	);
}
