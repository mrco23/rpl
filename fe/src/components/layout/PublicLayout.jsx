import React, { useEffect, useState } from "react";
import Footer from "@components/common/Footer"; // kalau memang begitu
import Navbar from "@components/common/Navbar";
import { getPublicProfile } from "@services/profileService.js";
import { Outlet } from "react-router";

export default function PublicLayout({
  children,
  hideFooter = false,
  hideNav = false,
}) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getPublicProfile()
      .then((res) => {
        if (res.success) {
          setProfile(res.data);
        } else {
          setProfile(null);
        }
      })
      .catch(() => setProfile(null));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      {!hideNav && <Navbar />}

      {/* ✅ INI KUNCI */}
      <main className="flex-1">{children}<Outlet /></main>

      {!hideFooter && <Footer profile={profile} />}
    </div>
  );
}
