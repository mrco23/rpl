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
} from "lucide-react";
import logo from "@assets/logo.jpg";

const menu = [
  {
    title: "Beranda",
    icon: <LayoutDashboard size={18} />,
    path: "/admin",
  },
  {
    section: "Profil Sekolah",
  },
  {
    title: "Profil Sekolah",
    icon: <User size={18} />,
    path: "/admin/profil",
  },
  {
    title: "Ekstrakurikuler",
    icon: <Users size={18} />,
    path: "/admin/ekstrakurikuler",
  },
  {
    title: "Prestasi",
    icon: <Trophy size={18} />,
    path: "/admin/prestasi",
  },
  {
    title: "Berita",
    icon: <Newspaper size={18} />,
    path: "/admin/berita",
  },
  {
    title: "Fasilitas",
    icon: <Building size={18} />,
    path: "/admin/fasilitas",
  },
  {
    title: "Program Unggulan",
    icon: <Megaphone size={18} />,
    path: "/admin/program",
  },
  {
    section: "PPDB",
  },
  {
    title: "Akun Verifikator",
    icon: <UserCheck size={18} />,
    path: "/admin/verifikator",
  },
  {
    title: "PPDB",
    icon: <FileText size={18} />,
    path: "/admin/ppdb",
  },
  {
    title: "Pengumuman PPDB",
    icon: <Megaphone size={18} />,
    path: "/admin/pengumuman",
  },
];

function SidebarAdmin() {
  return (
    <div className="w-64 h-screen bg-[#1f3b9a] text-white flex flex-col p-4 rounded-r-2xl">
      {/* HEADER */}
      <div className="mb-6 flex items-center gap-3">
        {/* LOGO */}
        <img
          src={logo}
          alt="logo"
          className="w-12 h-12 rounded-3xl object-cover"
        />

        {/* TEXT */}
        <div>
          <h2 className="text-lg font-semibold">Admin</h2>
          <p className="text-sm opacity-80">SMP Katolik St. Rafael Manado</p>
        </div>
      </div>
      {/* MENU */}
      <div className="flex-1 space-y-2">
        {menu.map((item, index) => {
          if (item.section) {
            return (
              <div key={index} className="mt-4">
                <p className="text-xs opacity-70 mb-1">{item.section}</p>
                <hr className="border-white/30" />
              </div>
            );
          }

          return (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-white text-[#2f4aa0] font-medium"
                    : "hover:bg-white/10"
                }`
              }
            >
              {item.icon}
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </div>

      {/* LOGOUT */}
      <button className="flex items-center gap-3 px-3 py-2 mt-4 hover:bg-white/10 rounded-lg">
        <LogOut size={18} />
        Keluar
      </button>
    </div>
  );
}

export default SidebarAdmin;
