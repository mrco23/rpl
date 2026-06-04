import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { House, FileText, LogOut } from "lucide-react";
// Pastikan path ini sesuai dengan struktur folder kerjamu di VS Code
import logo from "../../../shared/assets/logo.png";

import useAuth from "../../auth/contexts/useAuth.js";

function SidebarVerifikator({ onClose }) {
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
      path: "/verifikator",
      icon: House,
    },
    {
      name: "Verifikasi Dokumen",
      path: "/verifikator/verifikasi",
      icon: FileText,
    },
  ];



  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col shrink-0 shadow-[2px_0_15px_-3px_rgba(0,0,0,0.05)]">

      <div className="p-6 border-b border-gray-200">
        <h2 className="text-[#253b80] font-bold text-sm tracking-widest mb-5 text-center uppercase">
          Verifikator
        </h2>
        <div className="flex items-center gap-3">
          {/* Logo Container */}
          <div className="w-14 h-14 shrink-0 bg-white rounded-full flex items-center justify-center shadow-sm">
            <img src={logo} alt="Logo SMP Katolik St. Rafael" className="w-full h-full object-contain" />
          </div>
          {/* Text Container */}
          <div className="flex flex-col">
            <h3 className="text-base font-bold text-gray-900 leading-tight">
              PPDB
            </h3>
            <p className="text-xs text-gray-800 font-medium leading-snug mt-1">
              SMP Katolik St. Rafael<br />Manado
            </p>
          </div>
        </div>
      </div>

      {/* User Info Block */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#253b80] text-white flex items-center justify-center uppercase font-bold text-lg">
          {user?.name ? user.name.charAt(0) : "V"}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold truncate w-36 text-gray-900" title={user?.name || "Verifikator"}>
            {user?.name || "Verifikator"}
          </span>
          <span className="text-xs text-gray-500 truncate w-36" title={user?.username || "verifikator"}>
            @{user?.username || "verifikator"}
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
              end={item.path === "/verifikator"}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer
                ${isActive
                  ? "bg-[#253b80] text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              <Icon size={20} strokeWidth={2} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 mt-2 mb-4 mx-2 text-left rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer"
      >
        <LogOut size={20} strokeWidth={2} />
        Keluar
      </button>

    </aside>
  );
}

export default SidebarVerifikator;