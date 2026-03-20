import React, { useEffect, useState } from "react";
import { Footer } from "@components/ui/ui"; // kalau memang begitu
import Navbar from "@components/common/Navbar";
import { getPublicProfile } from "@services/profileService.js";

export default function PublicLayout({ children, hideFooter = false, hideNav = false }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getPublicProfile().then(setProfile).catch(() => setProfile(null));
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {!hideNav && <Navbar />}
      {children}
      {!hideFooter && <Footer profile={profile} />}
    </div>
  );
}
