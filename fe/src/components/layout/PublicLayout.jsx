import React, { useEffect, useState } from "react";
import { Footer, PublicNavbar } from "@components/ui/ui";
import { getPublicProfile } from "@services/profileService.js";

export default function PublicLayout({ children, hideFooter = false, hideNav = false }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getPublicProfile().then(setProfile).catch(() => setProfile(null));
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {!hideNav && <PublicNavbar profile={profile} />}
      {children}
      {!hideFooter && <Footer profile={profile} />}
    </div>
  );
}
