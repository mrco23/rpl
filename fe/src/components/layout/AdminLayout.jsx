// AdminLayout.jsx

import React from "react";
import { Outlet } from "react-router-dom";
import SidebarAdmin from "../common/SidebarAdmin";

function AdminLayout() {
  return (
    <div className="flex max-h-screen overflow-y-hidden">
      <SidebarAdmin />

      <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
