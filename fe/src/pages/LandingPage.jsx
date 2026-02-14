import React from "react";
import Navbar from "../components/Navbar.jsx";
import { NavLink } from "react-router";
import { MdOutlineNavigateNext } from "react-icons/md";

export default function LandingPage() {
	return (
		<>
			<header>
				<Navbar />
			</header>
			<main className="flex flex-row min-h-150 min-w-full px-30">
				<div className="min-w-1/2 flex flex-col justify-center  gap-5">
					<h1 className="text-6xl font-bold text-slate-800">
						Mewujudkan <br />
						Generasi <span className="text-blue-600 font-bold">Credas & Berkarakter</span>
					</h1>
					<p className="text-lg">
						Sistem Manajemen Sekolah terintergrasi untuk mematau presensi siswa di SMP Katolik St.
						Rafael
					</p>
					<NavLink
						to={`/login`}
						className="bg-blue-900 items-center text-white font-semibold text-base w-60 py-3 justify-center flex rounded-xl hover:bg-blue-900 transition-colors gap-4"
					>
						Akses Guru/Admin <MdOutlineNavigateNext size={27} />
					</NavLink>
				</div>
				<div className="min-w-1/2"></div>
			</main>
		</>
	);
}
