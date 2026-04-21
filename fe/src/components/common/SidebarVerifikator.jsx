import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { House, FileText, LogOut } from "lucide-react";
// Pastikan path ini sesuai dengan struktur folder kerjamu di VS Code
import logo from "@assets/logo.png";

function SidebarVerifikator() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin keluar?");
    if (confirmLogout) {
      navigate("/login");
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

  // Logika bawaanmu sudah tepat. Ini akan mengunci "Beranda" hanya untuk exact path.
  const isActive = (path) => {
    if (path === "/verifikator") {
      return location.pathname === "/verifikator" || location.pathname === "/verifikator/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col shrink-0 shadow-[2px_0_15px_-3px_rgba(0,0,0,0.05)]">

      {/* Header */}
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

      {/* Menu Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menus.map((item, index) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200
                ${active
                  ? "bg-[#253b80] text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 2} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200 mb-2">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut size={20} strokeWidth={2} />
          Keluar
        </button>
      </div>

    </aside>
  );
}

export default SidebarVerifikator;