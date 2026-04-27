import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  UserCircle,
  FileText,
  ShieldCheck,
  Megaphone,
  LogOut,
} from "lucide-react";
import logo from "@assets/logo.png";

function SidebarPendaftar({ onClose }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin keluar?");

    if (confirmLogout) {
      if (onClose) onClose();
      navigate("/login");
    }
  };

  const menu = [
    {
      title: "Biodata",
      icon: <UserCircle size={18} />,
      path: "/pendaftar",
    },
    {
      title: "Unggah Dokumen",
      icon: <FileText size={18} />,
      path: "/pendaftar/unggah-dokumen",
    },
    {
      title: "Status Verifikasi",
      icon: <ShieldCheck size={18} />,
      path: "/pendaftar/status-verifikasi",
    },
    {
      title: "PendaftarPengumumanPage",
      icon: <Megaphone size={18} />,
      path: "/pendaftar/pengumuman",
    },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="w-64 h-screen bg-[#1f3fa6] text-white flex flex-col px-4 py-5 rounded-r-2xl shadow-xl">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8 shrink-0">
        <img
          src={logo}
          alt="logo"
          className="w-12 h-12 rounded-full object-cover bg-white p-1"
        />

        <div>
          <h2 className="text-base font-semibold">PPDB</h2>
          <p className="text-xs text-white/80">SMP Katolik St. Rafael</p>
          <p className="text-xs text-white/80">Manado</p>
        </div>
      </div>

      {/* MENU */}
      <div className="flex-1 space-y-2">
        {menu.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all cursor-pointer ${isActive(item.path)
              ? "bg-white text-[#1f3fa6] font-bold shadow-md"
              : "text-white hover:bg-white/10"
              }`}
          >
            {item.icon}
            <span>{item.title}</span>
          </Link>
        ))}
      </div>

      {/* LOGOUT */}
      <div className="pt-3 mt-auto border-t border-white/20 mb-2">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-sm w-full hover:bg-white/10 hover:text-red-300 rounded-xl transition cursor-pointer font-semibold"
        >
          <LogOut size={18} />
          Keluar
        </button>
      </div>
    </div>
  );
}

export default SidebarPendaftar;
