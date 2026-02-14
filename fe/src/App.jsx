import { useState } from "react";
import { Route, Routes } from "react-router";
/* Pages */
import LandingPage from "./pages/LandingPage";
import GuruBeranda from "./pages/Guru/GuruBeranda.jsx";
import GuruPresensi from "./pages/Guru/GuruPresensi.jsx";
import LoginPage from "./pages/Login.jsx";

/* Layouts */
import UserLayout from "./layouts/UserLayout.jsx";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/user" element={<UserLayout />}>
					<Route path={"beranda"} element={<GuruBeranda />} />
					<Route path={"presensi"} element={<GuruPresensi />} />
				</Route>
				<Route path="/admin" element={<UserLayout />}>
					<Route path={"beranda"} element={<AdminBeranda />} />
					<Route path={"kelas"} element={<AdminKelas />} />
					<Route path={"siswa"} element={<AdminSiswa />} />
					<Route path={"mapel"} element={<AdminMapel />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
