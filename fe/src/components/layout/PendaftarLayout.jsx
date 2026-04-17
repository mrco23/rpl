import React from "react";
import SidebarPendaftar from "../common/SidebarPendaftar";
import { Outlet } from "react-router-dom";

function PendaftarLayout() {
  return (
    <div className="flex items-stretch min-h-screen bg-gray-100">
      <SidebarPendaftar />

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default PendaftarLayout;
