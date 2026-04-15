import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { House, FileText, LogOut } from "lucide-react";
import logo from "@assets/logo.jpg";

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
      path: "/verifikator/verifikasiDokumen",
      icon: FileText,
    },
  ];

  const isActive = (path) => {
    if (path === "/verifikator") {
      return location.pathname === "/verifikator";
    }

    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-64 min-h-screen bg-[#f8f8f8] border-r px-4 py-12 flex flex-col">
      {/* Header */}
      <div className="pb-5 border-b border-gray-300">
        <div className="flex items-start gap-3">
          <img src={logo} alt="Logo" className="w-14 h-14 object-contain" />

          <div>
            <h2 className="text-[15px] font-bold text-slate-700 uppercase leading-tight">
              Verifikator
            </h2>

            <h3 className="text-[15px] font-bold text-black mt-1 leading-tight">
              PPDB
            </h3>

            <p className="text-sm text-gray-700 leading-5 mt-1">
              SMP Katolik St. Rafael Manado
            </p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="mt-5 space-y-2">
        {menus.map((item, index) => {
          const Icon = item.icon;

          return (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] font-medium transition-all
                ${
                  isActive(item.path)
                    ? "bg-blue-700 text-white"
                    : "text-slate-600 hover:bg-gray-200"
                }`}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="mt-6 pt-5 border-t border-gray-300">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all"
        >
          <LogOut size={18} />
          Keluar
        </button>
      </div>
    </aside>
  );
}

export default SidebarVerifikator;
