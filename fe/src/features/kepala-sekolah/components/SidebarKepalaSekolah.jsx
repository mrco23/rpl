import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { House, FileText, LogOut, FileCheck } from "lucide-react";
import logo from "../../../shared/assets/logo.png";
import useAuth from "../../auth/contexts/useAuth";

function SidebarKepalaSekolah({ onClose }) {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin keluar?");
    if (confirmLogout) {
      if (onClose) onClose();
      const currentRole = user?.role;
      logout();
      if (["admin", "verifikator", "kepala_sekolah"].includes(currentRole)) {
        navigate("/akses-internal");
      } else {
        navigate("/login");
      }
    }
  };

  const menus = [
    {
      name: "Beranda",
      path: "/kepala-sekolah",
      icon: House,
    },
    {
      name: "Laporan PPDB",
      path: "/kepala-sekolah/laporan",
      icon: FileText,
    },
    {
      name: "Validasi Gelombang",
      path: "/kepala-sekolah/validasi-gelombang",
      icon: FileCheck,
    },
  ];



  return (
    <aside className="w-64 min-h-screen bg-blue-dark text-white rounded-r-2xl flex flex-col shrink-0 shadow-lg">

      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex flex-col items-center gap-3">
          {/* Logo Container */}
          <div className="w-14 h-14 shrink-0 bg-white rounded-full flex items-center justify-center shadow-sm">
            <img src={logo} alt="Logo" className="w-full h-full object-contain p-1" />
          </div>
          {/* Text Container */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-base font-bold leading-tight">
              PPDB
            </h3>
            <p className="text-xs font-medium leading-snug mt-1 opacity-80">
              SMP Katolik St. Rafael<br />Manado
            </p>
          </div>
        </div>
      </div>

      {/* User Info Block */}
      <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center uppercase font-bold text-lg">
          {user?.name ? user.name.charAt(0) : "K"}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold truncate w-36" title={user?.name || "Kepala Sekolah"}>
            {user?.name || "Kepala Sekolah"}
          </span>
          <span className="text-xs opacity-70 truncate w-36" title={user?.username || "kepsek"}>
            @{user?.username || "kepsek"}
          </span>
        </div>
      </div>

      {/* Menu Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-auto no-scrollbar-custom">
        {menus.map((item, index) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={index}
              to={item.path}
              end={item.path === "/kepala-sekolah"}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer
                ${isActive
                  ? "bg-white text-blue-dark shadow-md"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Icon size={20} strokeWidth={2} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      <hr className="border-white/30" />

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 mt-2 mb-4 mx-2 hover:bg-white/10 rounded-lg text-left text-sm font-semibold text-white/80 hover:text-white transition-colors cursor-pointer border border-transparent hover:border-white/20"
      >
        <LogOut size={20} strokeWidth={2} />
        Keluar
      </button>

    </aside>
  );
}

export default SidebarKepalaSekolah;
