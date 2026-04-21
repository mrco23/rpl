import React from "react";
import SidebarVerifikator from "../common/SidebarVerifikator";
import { Outlet } from "react-router-dom";

function VerifikatorLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarVerifikator />

      <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default VerifikatorLayout;
