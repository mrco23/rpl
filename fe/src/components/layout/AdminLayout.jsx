import React from "react";
import SidebarAdmin from "../common/SidebarAdmin";
import { Outlet } from "react-router-dom";

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
