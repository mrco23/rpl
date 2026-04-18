// AdminLayout.jsx

import React from "react";
import { Outlet } from "react-router-dom";
import SidebarAdmin from "../common/SidebarAdmin";

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <SidebarAdmin />

      {/* CONTENT WRAPPER */}
      <main className="flex-1 min-h-screen overflow-x-hidden">
        <div className="h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
