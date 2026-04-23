import React, { useState } from "react";
import SidebarVerifikator from "../common/SidebarVerifikator";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";

function VerifikatorLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden relative">
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-[60] p-2 bg-blue-dark text-white rounded-lg shadow-lg cursor-pointer"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar - Persistent on desktop, Absolute/Slide-in on mobile */}
      <div className={`
        fixed inset-y-0 left-0 z-50 transform lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
          <SidebarVerifikator onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      <div className="flex-1 p-4 lg:p-6 bg-gray-100 overflow-y-auto w-full">
        <div className="pt-12 lg:pt-0">
            <Outlet />
        </div>
      </div>
    </div>
  );
}

export default VerifikatorLayout;
