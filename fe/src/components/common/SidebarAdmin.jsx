import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Users,
  Trophy,
  Newspaper,
  Building,
  Megaphone,
  UserCheck,
  FileText,
  LogOut,
  Layers,
} from "lucide-react";
import logo from "@assets/logo.png";

const menu = [
  {
    title: "Beranda",
    icon: <LayoutDashboard size={16} />,
    path: "/admin",
  },
  {
    section: "Profil Sekolah",
  },
  {
    title: "Profil Sekolah",
    icon: <User size={16} />,
    path: "/admin/profil",
  },
  {
    title: "Ekstrakurikuler",
    icon: <Users size={16} />,
    path: "/admin/ekstrakurikuler",
  },
  {
    title: "Prestasi",
    icon: <Trophy size={16} />,
    path: "/admin/prestasi",
  },
  {
    title: "Berita",
    icon: <Newspaper size={16} />,
    path: "/admin/berita",
  },
  {
    title: "Fasilitas",
    icon: <Building size={16} />,
    path: "/admin/fasilitas",
  },
  {
    title: "Program Unggulan",
    icon: <Megaphone size={16} />,
    path: "/admin/program",
  },
  {
    section: "PPDB",
  },
  {
    title: "Akun Verifikator",
    icon: <UserCheck size={16} />,
    path: "/admin/verifikator",
  },
  {
    title: "PPDB",
    icon: <FileText size={16} />,
    path: "/admin/ppdb",
  },
  {
    title: "Pengumuman PPDB",
    icon: <Megaphone size={16} />,
    path: "/admin/pengumuman",
  },
  {
    title: "Gelombang",
    icon: <Layers size={16} />,
    path: "/admin/gelombang",
  },
];

function SidebarAdmin({ onClose }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    if (onClose) onClose();
    window.location.href = "/login";
  };

  return (
    <div className="w-64 h-screen bg-blue-dark text-white flex flex-col p-4 rounded-r-2xl shadow-xl">
      {/* HEADER */}
      <div className="mb-6 flex items-center gap-3 shrink-0">
        {/* LOGO */}
        <img
          src={logo}
          alt="logo"
          className="w-12 h-12 rounded-3xl object-cover"
        />

        {/* TEXT */}
        <div>
          <h2 className="text-lg font-semibold">Admin</h2>
          <p className="text-[10px] opacity-80 uppercase font-bold tracking-wider">Dashboard</p>
        </div>
      </div>

      {/* MENU */}
      <div className="flex-1 space-y-1 overflow-y-auto custom-scrollbar pr-2 mb-4">
        {menu.map((item, index) => {
          if (item.section) {
            return (
              <div key={index} className="mt-5 mb-2">
                <p className="text-[10px] font-bold text-blue-200 uppercase tracking-[0.2em] mb-1">{item.section}</p>
                <hr className="border-white/10" />
              </div>
            );
          }

          return (
            <NavLink
              key={index}
              to={item.path}
              onClick={onClose}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? "bg-white text-[#2f4aa0] font-bold shadow-lg"
                    : "hover:bg-white/10 text-white/80 hover:text-white"
                }`
              }
            >
              {item.icon}
              <span className="text-sm">{item.title}</span>
            </NavLink>
          );
        })}
      </div>
      <hr className="border-white/10" />

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 mt-4 hover:bg-red-500/20 text-white/90 hover:text-white rounded-xl w-full text-left transition-colors cursor-pointer font-semibold text-sm"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}

export default SidebarAdmin;
