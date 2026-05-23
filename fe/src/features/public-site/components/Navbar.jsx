import React from "react";
import { useState, useRef, useEffect } from "react";
import logo from "../../../shared/assets/logo.png";
import { ChevronDown, Menu, X } from "lucide-react";
import { useLocation, useNavigate, Link } from "react-router";

function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const closeAllMenus = () => {
    setOpenDropdown(null);
    setIsOpen(false);
  };

  useEffect(() => {
    closeAllMenus();
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav ref={dropdownRef} className="w-full sticky top-0 z-50 bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center h-full gap-2 ml-2">
            <img src={logo} alt="logo" className="w-12 xl:w-14 h-auto object-contain" />
          </div>

          {/* Menu */}
          <ul className="hidden lg:flex space-x-5 xl:space-x-10 text-gray-600 font-medium items-center">
            {/* Beranda */}
            <Li title="Beranda" to="/" />

            {/* Tentang */}
            <li className="relative">
              <button
                onClick={() => handleDropdown("tentang")}
                className={`flex items-center gap-1 px-3 cursor-pointer hover:text-blue-normal py-2 border-2 rounded transition-colors appearance-none bg-transparent ${location.pathname === "/sejarah" ||
                  location.pathname === "/visi-misi" ||
                  location.pathname === "/fasilitas"
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
                    onClick={closeAllMenus}
                    className="p-2 hover:bg-gray-100 block cursor-pointer"
                  >
                    Sejarah Sekolah
                  </Link>
                  <Link
                    to="/visi-misi"
                    onClick={closeAllMenus}
                    className="p-2 hover:bg-gray-100 block cursor-pointer"
                  >
                    Visi dan Misi Sekolah
                  </Link>

                  <Link
                    to="/fasilitas"
                    onClick={closeAllMenus}
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
                className={`flex items-center cursor-pointer hover:text-blue-normal gap-1 px-3 py-2 border-2 rounded transition-colors appearance-none bg-transparent ${location.pathname === "/program" ||
                  location.pathname === "/ekstrakurikuler" ||
                  location.pathname === "/prestasi"
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
                    onClick={closeAllMenus}
                    className="p-2 hover:bg-gray-100 block cursor-pointer"
                  >
                    Program Unggulan
                  </Link>
                  <Link
                    to="/ekstrakurikuler"
                    onClick={closeAllMenus}
                    className="p-2 hover:bg-gray-100 block cursor-pointer"
                  >
                    Ekstrakurikuler
                  </Link>

                  <Link
                    to="/prestasi"
                    onClick={closeAllMenus}
                    className="p-2 hover:bg-gray-100 block cursor-pointer"
                  >
                    Prestasi Siswa
                  </Link>
                </div>
              )}
            </li>

            {/* Info PPDB */}
            <Li to="/info-ppdb" title="Info PPDB" />

            {/* Berita */}
            <Li to="/berita" title="Berita" />
          </ul>

          {/* Button DESKTOP*/}
          <div className="hidden lg:flex space-x-3 items-center">
            <button
              onClick={() => navigate("/akses-internal")}
              className="text-sm px-3 py-1 border border-blue-800/30 text-blue-900 rounded-md font-medium hover:bg-blue-100 transition-colors duration-200 cursor-pointer"
            >
              Akses Internal
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-3 py-1 bg-white border-2 border-blue-900 text-blue-900 rounded-md font-medium hover:bg-blue-100 transition-colors duration-200 cursor-pointer"
            >
              Masuk Pendaftar
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-4 py-1 bg-blue-dark text-white rounded-md hover:bg-blue-dark-hover transition-colors duration-200 cursor-pointer"
            >
              Daftar Sekarang
            </button>
          </div>

          {/* ✅ HAMBURGER BUTTON (MOBILE) */}
          <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} className="" /> : <Menu size={28} />}
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden px-6 pb-4 gap-4 mt-2 flex flex-col text-gray-700 font-medium">
            <Link to="/" onClick={closeAllMenus} className="block">
              Beranda
            </Link>

            {/* Dropdown Tentang */}
            <div>
              <p
                onClick={() => handleDropdown("tentang")}
                className="flex justify-between cursor-pointer"
              >
                Tentang <ChevronDown size={16} />
              </p>

              <div
                className={`ml-4 mt-2 space-y-2 text-sm overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-out
                  ${openDropdown === "tentang" ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"}`}
              >
                <Link to="/sejarah" onClick={closeAllMenus} className="hover:bg-gray-100 block cursor-pointer">
                  Sejarah Sekolah
                </Link>
                <Link to="/visi-misi" onClick={closeAllMenus} className="hover:bg-gray-100 block cursor-pointer">
                  Visi dan Misi Sekolah
                </Link>
                <Link to="/fasilitas" onClick={closeAllMenus} className="hover:bg-gray-100 block cursor-pointer">
                  Fasilitas
                </Link>
              </div>
            </div>

            {/* Dropdown Akademik */}
            <div>
              <p
                onClick={() => handleDropdown("akademik")}
                className="flex justify-between cursor-pointer"
              >
                Akademik <ChevronDown size={16} />
              </p>

              <div
                className={`ml-4 mt-2 space-y-2 text-sm overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-out
                  ${openDropdown === "akademik" ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"}`}
              >
                <Link to="/program" onClick={closeAllMenus} className="hover:bg-gray-100 block cursor-pointer">
                  Program Unggulan
                </Link>
                <Link to="/ekstrakurikuler" onClick={closeAllMenus} className="hover:bg-gray-100 block cursor-pointer">
                  Ekstrakurikuler
                </Link>
                <Link to="/prestasi" onClick={closeAllMenus} className="hover:bg-gray-100 block cursor-pointer">
                  Prestasi
                </Link>
              </div>
            </div>

            <Link to="/info-ppdb" onClick={closeAllMenus} className="">
              Info PPDB
            </Link>
            <Link to="/berita" onClick={closeAllMenus} className="">
              Berita
            </Link>

            {/* BUTTON MOBILE */}
            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => {
                  closeAllMenus();
                  navigate("/register");
                }}
                className="bg-blue-800 text-white py-2 rounded-md font-medium"
              >
                Daftar Sekarang
              </button>
              <button
                onClick={() => {
                  closeAllMenus();
                  navigate("/login");
                }}
                className="bg-white border-2 border-blue-900 text-blue-900 py-2 rounded-md font-medium"
              >
                Masuk Pendaftar
              </button>
              
              <hr className="my-2 border-gray-200" />
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Akses Internal Sekolah</p>
              <Link 
                to="/akses-internal"
                onClick={closeAllMenus}
                className="text-blue-900 font-medium"
              >
                Akses Internal
              </Link>
              <p className="text-xs text-gray-400 -mt-2 mb-2">Khusus admin, verifikator, dan kepala sekolah.</p>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}


function Li({ title, to }) {
  const location = useLocation();
  return <li>
    <Link
      to={to}
      className={`px-1 lg:px-2 xl:px-3 py-2 border-2 rounded transition-colors relative hover:after:w-full after:w-0 after:h-0.5 after:absolute after:left-1/2 after:bottom-0 after:-translate-x-1/2 after:bg-blue-normal after:transition-all after:duration-300 hover:text-blue-normal ${location.pathname === to
        ? "border-transparent  text-gray-950 font-semibold"
        : "border-transparent"
        } hover:bg-gray-100`}
    >
      {title}
    </Link>
  </li>
}
export default Navbar;
