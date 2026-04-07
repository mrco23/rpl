import React, { useState } from "react";
import logo from "@assets/logo.jpg";
import { ChevronDown, Menu, X } from "lucide-react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router"; //for login
import { Link } from "react-router";

function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openModal, setOpenModal] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const handleModal = (content) => {
    setOpenModal(content);
    setOpenDropdown(null);
    setIsOpen(false);
  };

  return (
    <>
      <nav className="w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 ml-2">
            <img src={logo} alt="logo" className="w-14 h-14  object-contain" />
          </div>

          {/* Menu */}
          <ul className="hidden md:flex space-x-10 text-gray-600 font-medium items-center">
            {/* Beranda */}
            <li>
              <Link
                to="/"
                className={`px-3 py-2 border-2 rounded transition-colors ${
                  location.pathname === "/"
                    ? "border-transparent  text-gray-950 font-semibold"
                    : "border-transparent"
                } hover:bg-gray-100`}
              >
                Beranda
              </Link>
            </li>

            {/* Tentang */}
            <li className="relative">
              <button
                onClick={() => handleDropdown("tentang")}
                className={`flex items-center gap-1 px-3 py-2 border-2 rounded transition-colors appearance-none bg-transparent ${
                  location.pathname.includes("/tentang")
                    ? "border-transparent text-gray-950 font-semibold"
                    : "border-transparent"
                } hover:bg-gray-100`}
              >
                Tentang
                <ChevronDown
                  size={16}
                  className={openDropdown === "tentang" ? "rotate-180" : ""}
                />
              </button>

              {openDropdown === "tentang" && (
                <div className="absolute top-full mt-2 left-0 bg-white shadow-lg rounded-lg p-2 w-48 z-50">
                  <Link
                    to="/sejarah"
                    className="p-2 hover:bg-gray-100 block cursor-pointer"
                  >
                    Sejarah Sekolah
                  </Link>
                  <Link
                    to="/visi-misi"
                    className="p-2 hover:bg-gray-100 block cursor-pointer"
                  >
                    Visi dan Misi Sekolah
                  </Link>
                  <p
                    onClick={() => handleModal("kepsek")}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Sambutan Kepala Sekolah
                  </p>
                  <Link
                    to="/fasilitas"
                    className="p-2 hover:bg-gray-100 block cursor-pointer"
                  >
                    Fasilitas Sekolah
                  </Link>
                </div>
              )}
            </li>

            {/* Akademik */}
            <li className="relative">
              <button
                onClick={() => handleDropdown("akademik")}
                className={`flex items-center gap-1 px-3 py-2 border-2 rounded transition-colors appearance-none bg-transparent ${
                  location.pathname.includes("/akademik")
                    ? "border-transparent text-gray-950 font-semibold"
                    : "border-transparent"
                } hover:bg-gray-100`}
              >
                Akademik
                <ChevronDown
                  size={16}
                  className={openDropdown === "akademik" ? "rotate-180" : ""}
                />
              </button>

              {openDropdown === "akademik" && (
                <div className="absolute top-full mt-2 left-0 bg-white shadow-lg rounded-lg p-2 w-48 z-50">
                  <Link
                    to="/program"
                    className="p-2 hover:bg-gray-100 block cursor-pointer"
                  >
                    Program Unggulan
                  </Link>
                  <Link
                    to="/ekstrakurikuler"
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Ekstrakurikuler
                  </Link>
                  <p
                    onClick={() => handleModal("prestasi")}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Prestasi Siswa
                  </p>
                </div>
              )}
            </li>

            {/* Panduan */}
            <li>
              <Link
                to="/panduan"
                className={`px-3 py-2 border-2 rounded transition-colors ${
                  location.pathname === "/panduan"
                    ? "border-transparent text-gray-950 font-semibold"
                    : "border-transparent"
                } hover:bg-gray-100`}
              >
                Panduan
              </Link>
            </li>

            {/* Berita */}
            <li>
              <Link
                to="/berita"
                className={`px-3 py-2 border-2 rounded transition-colors ${
                  location.pathname === "/berita"
                    ? "border-transparent text-gray-950 font-semibold"
                    : "border-transparent"
                } hover:bg-gray-100`}
              >
                Berita
              </Link>
            </li>
          </ul>

          {/* Button DESKTOP*/}
          <div className="hidden md:flex space-x-4">
            <button
              onClick={() => navigate("/login")}
              className="px-3 py-2 border-2 border-blue-800 text-blue-900 rounded-md font-normal hover:bg-blue-50 transition-colors duration-200 cursor-pointer"
            >
              Masuk
            </button>

            <button
              onClick={() => navigate("/register")}
              className="px-4 py-2 bg-[#1d3890] text-white rounded-md hover:bg-[#172c73] transition-colors duration-200 cursor-pointer"
            >
              Daftar Sekarang
            </button>
          </div>

          {/* ✅ HAMBURGER BUTTON (MOBILE) */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden px-6 pb-4 space-y-4 text-gray-700 font-medium">
            <Link to="/" className="block">
              Beranda
            </Link>

            <div>
              <p
                onClick={() => handleDropdown("tentang")}
                className="flex justify-between cursor-pointer"
              >
                Tentang <ChevronDown size={16} />
              </p>
              {openDropdown === "tentang" && (
                <div className="ml-4 mt-2 space-y-2 text-sm">
                  <p onClick={() => handleModal("sejarah")}>Sejarah Sekolah</p>
                  <p onClick={() => handleModal("visi")}>Visi Misi</p>
                  <p onClick={() => handleModal("kepsek")}>Sambutan Kepsek</p>
                  <p onClick={() => handleModal("fasilitas")}>Fasilitas</p>
                </div>
              )}
            </div>

            <div>
              <p
                onClick={() => handleDropdown("akademik")}
                className="flex justify-between cursor-pointer"
              >
                Akademik <ChevronDown size={16} />
              </p>
              {openDropdown === "akademik" && (
                <div className="ml-4 mt-2 space-y-2 text-sm">
                  <p onClick={() => handleModal("kurikulum")}>
                    Program Unggulan
                  </p>
                  <p onClick={() => handleModal("guru")}>Ekstrakurikuler</p>
                  <p onClick={() => handleModal("prestasi")}>Prestasi</p>
                </div>
              )}
            </div>

            <Link to="/panduan" className="block">
              Panduan
            </Link>

            <Link to="/berita" className="block">
              Berita
            </Link>

            {/* BUTTON MOBILE */}
            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => navigate("/login")}
                className="border border-blue-900 py-2 rounded-md"
              >
                Masuk
              </button>
              <button
                onClick={() => navigate("/register")}
                className="bg-blue-800 text-white py-2 rounded-md"
              >
                Daftar Sekarang
              </button>
            </div>
          </div>
        )}
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

            {openModal === "prestasi" && (
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
