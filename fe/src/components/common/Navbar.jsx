import React, { useState } from "react";
import logo from "@assets/logo.jpeg";
import { ChevronDown } from "lucide-react";
import { useLocation } from "react-router";

function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openModal, setOpenModal] = useState(null);
  const location = useLocation();

  const handleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const handleModal = (content) => {
    setOpenModal(content);
    setOpenDropdown(null);
  };

  return (
    <>
      <nav className="w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src={logo} alt="logo" className="w-17 h-17 object-contain" />
          </div>

          {/* Menu */}
          <ul className="hidden md:flex space-x-8 text-gray-600 font-medium">
            <li
              className={`cursor-pointer ${
                location.pathname === "/"
                  ? "text-black font-bold"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Beranda
            </li>

            {/* Tentang */}
            <li className="relative flex items-center gap-1">
              <div
                onClick={() => handleDropdown("tentang")}
                className={`flex items-center gap-1 cursor-pointer ${
                  location.pathname.includes("/tentang")
                    ? "text-black font-bold"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Tentang
                <ChevronDown
                  size={16}
                  className={
                    location.pathname.includes("/tentang") ? "rotate-180" : ""
                  }
                />
              </div>

              {openDropdown === "tentang" && (
                <div className="absolute top-8 left-0 bg-white shadow-lg rounded-lg p-2 w-48 z-50">
                  <p
                    onClick={() => handleModal("sejarah")}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Sejarah Sekolah
                  </p>
                  <p
                    onClick={() => handleModal("visi")}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Visi dan Misi Sekolah
                  </p>
                  <p
                    onClick={() => handleModal("kepsek")}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Sambutan Kepala Sekolah
                  </p>
                  <p
                    onClick={() => handleModal("fasilitas")}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Fasilitas Sekolah
                  </p>
                </div>
              )}
            </li>

            {/* Akademik */}
            <li className="relative flex items-center gap-1">
              <div
                onClick={() => handleDropdown("akademik")}
                className="flex items-center gap-1 hover:text-blue-600 cursor-pointer"
              >
                Akademik
                <ChevronDown size={16} />
              </div>

              {openDropdown === "akademik" && (
                <div className="absolute top-8 left-0 bg-white shadow-lg rounded-lg p-2 w-48 z-50">
                  <p
                    onClick={() => handleModal("kurikulum")}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Program Unggulan
                  </p>
                  <p
                    onClick={() => handleModal("guru")}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Ekstrakurikuler
                  </p>
                  <p
                    onClick={() => handleModal("guru")}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Prestasi Siswa
                  </p>
                </div>
              )}
            </li>

            <li
              className={`cursor-pointer ${
                location.pathname === "/Panduan"
                  ? "text-black font-bold"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Panduan
            </li>
            <li
              className={`cursor-pointer ${
                location.pathname === "/Berita"
                  ? "text-black font-bold"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Berita
            </li>
          </ul>

          {/* Button */}
          <div className="hidden md:flex space-x-4">
            <button className="text-blue-900 border border-blue-900 p-3 rounded-2xl font-medium hover:underline">
              Masuk
            </button>
            <button className="bg-blue-800 text-white px-4 py-2 border rounded-2xl hover:bg-blue-900 transition">
              Daftar Sekarang
            </button>
          </div>
        </div>
      </nav>

      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-[999]">
          <div className="bg-white rounded-xl p-6 w-96 relative">
            <button
              onClick={() => setOpenModal(null)}
              className="absolute top-2 right-3 text-gray-500"
            >
              ✖
            </button>

            {/* ISI MODAL */}
            {openModal === "sejarah" && (
              <>
                <h2 className="text-xl font-bold mb-2">Sejarah Sekolah</h2>
                <p>Ini isi sejarah sekolah...</p>
              </>
            )}

            {openModal === "visi" && (
              <>
                <h2 className="text-xl font-bold mb-2">Visi & Misi</h2>
                <p>Ini isi visi dan misi...</p>
              </>
            )}

            {openModal === "kepsek" && (
              <>
                <h2 className="text-xl font-bold mb-2">
                  Sambutan Kepala Sekolah
                </h2>
                <p>Ini isi sambutan kepala sekolah...</p>
              </>
            )}

            {openModal === "fasilitas" && (
              <>
                <h2 className="text-xl font-bold mb-2">Fasilitas Sekolah</h2>
                <p>Ini isi fasilitas sekolah...</p>
              </>
            )}

            {openModal === "kurikulum" && (
              <>
                <h2 className="text-xl font-bold mb-2">Program Unggulan</h2>
                <p>Ini isi program unggulan</p>
              </>
            )}

            {openModal === "guru" && (
              <>
                <h2 className="text-xl font-bold mb-2">Ekstrkurikuler</h2>
                <p>Ini isi data ekstrakurikuler...</p>
              </>
            )}

            {openModal === "kurikulum" && (
              <>
                <h2 className="text-xl font-bold mb-2">Prestasi Siswa</h2>
                <p>Ini isi Prestasi Siswa</p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
