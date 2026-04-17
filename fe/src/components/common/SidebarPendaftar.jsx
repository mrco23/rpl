import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  UserCircle,
  FileText,
  ShieldCheck,
  Megaphone,
  LogOut,
} from "lucide-react";
import logo from "@assets/logo.png";

function SidebarPendaftar() {
  const location = useLocation();

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
      path: "/pendaftar/status",
    },
    {
      title: "Pengumuman",
      icon: <Megaphone size={18} />,
      path: "/pendaftar/pengumuman",
    },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="w-64 bg-[#1f3fa6] text-white flex flex-col px-4 py-5 rounded-r-2xl">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <img
          src={logo}
          alt="logo"
          className="w-12 h-12 rounded-full object-cover bg-white p-1"
        />

        <div>
          <h2 className="text-base font-semibold">PPDB</h2>
          <p className="text-xs text-white/80">
            SMP Katolik St. Rafael
          </p>
          <p className="text-xs text-white/80">Manado</p>
        </div>
      </div>

      {/* MENU */}
      <div className="space-y-2">
        {menu.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${isActive(item.path)
                ? "bg-white text-[#1f3fa6] font-medium"
                : "text-white hover:bg-white/10"
              }`}
          >
            {item.icon}
            <span>{item.title}</span>
          </Link>
        ))}

        {/* LOGOUT */}
        <div className="pt-3 mt-3 border-t border-white/20">
          <button className="flex items-center gap-3 px-3 py-3 text-sm w-full hover:bg-white/10 rounded-lg transition">
            <LogOut size={18} />
            Keluar
          </button>
        </div>
      </div>
    </div>
  );
}

export default SidebarPendaftar;