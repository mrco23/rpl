import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
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
  Bell,
  Menu,
  X,
} from "lucide-react";
import logo from "@assets/logo.png";

//  MENU GROUPS
const menuGroups = [
  {
    items: [
      {
        title: "Beranda",
        icon: <LayoutDashboard size={18} />,
        path: "/admin",
        end: true,
      },
    ],
  },

  {
    section: "Profil Sekolah",
    items: [
      { title: "Profil Sekolah", icon: <User size={18} />, path: "/admin/profil" },
      { title: "Ekstrakurikuler", icon: <Users size={18} />, path: "/admin/ekstrakurikuler" },
      { title: "Prestasi", icon: <Trophy size={18} />, path: "/admin/prestasi" },
      { title: "Berita", icon: <Newspaper size={18} />, path: "/admin/berita" },
      { title: "Fasilitas", icon: <Building size={18} />, path: "/admin/fasilitas" },
      { title: "Program Unggulan", icon: <Megaphone size={18} />, path: "/admin/program" },
    ],
  },

  {
    section: "PPDB",
    items: [
      { title: "Akun Verifikator", icon: <UserCheck size={18} />, path: "/admin/verifikator" },
      { title: "PPDB", icon: <FileText size={18} />, path: "/admin/ppdb" },
      { title: "Pengumuman PPDB", icon: <Bell size={18} />, path: "/admin/pengumuman" },
    ],
  },
];

function SidebarAdmin() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin keluar?")) {
      navigate("/login");
    }
  };

  // 🔥 reusable menu renderer
  const renderMenu = (onClickItem) =>
    menuGroups.map((group, i) => (
      <div key={i}>
        {group.section && (
          <div className="flex items-center gap-2 mb-2 mt-3">
            <p className="text-xs font-semibold text-white/70 whitespace-nowrap">
              {group.section}
            </p>
            <div className="h-px flex-1 bg-white/20"></div>
          </div>
        )}

        <div className="space-y-1">
          {group.items.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.path}
              end={item.end}
              onClick={onClickItem}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-white text-[#1f3b9a] font-medium"
                    : "hover:bg-white/10"
                }`
              }
            >
              {item.icon}
              <span className="text-sm">{item.title}</span>
            </NavLink>
          ))}
        </div>
      </div>
    ));

  return (
    <>
      {/* MOBILE BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2"
      >
        <Menu size={22} />
      </button>

      {/* MOBILE SIDEBAR */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/40 flex">
          <div className="w-72 h-full bg-[#1f3b9a] text-white p-4 overflow-y-auto">
            
            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <img
                  src={logo}
                  className="w-10 h-10 rounded-full bg-white p-1"
                />
                <div>
                  <h2 className="font-semibold">Admin</h2>
                  <p className="text-xs text-white/80">SMP Katolik St. Rafael</p>
                </div>
              </div>

              <button onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>

            {/* MENU */}
            <div className="space-y-2">
              {renderMenu(() => setOpen(false))}
            </div>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="mt-6 w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-300 hover:bg-white/10"
            >
              <LogOut size={18} />
              Keluar
            </button>
          </div>

          {/* klik luar */}
          <div className="flex-1" onClick={() => setOpen(false)} />
        </div>
      )}

      {/* DESKTOP SIDEBAR */}
      <div className="hidden lg:flex w-64 min-h-screen bg-[#1f3b9a] text-white flex-col">
        
        {/* HEADER */}
        <div className="p-4 border-b border-white/20 flex gap-3 items-center">
          <img src={logo} className="w-12 h-12 rounded-full bg-white p-1" />
          <div>
            <h2 className="font-semibold">Admin</h2>
            <p className="text-xs text-white/80">SMP Katolik St. Rafael</p>
            <p className="text-xs text-white/80">Manado</p>
          </div>
        </div>

        {/* MENU */}
        <div className="flex-1 px-4 py-4 overflow-y-auto space-y-2">
          {renderMenu()}
        </div>

        {/* LOGOUT */}
        <div className="p-4 border-t border-white/20">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10"
          >
            <LogOut size={18} />
            Keluar
          </button>
        </div>
      </div>
    </>
  );
}

export default SidebarAdmin;