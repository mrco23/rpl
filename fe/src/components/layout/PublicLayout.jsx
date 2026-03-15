import React from 'react';
import { Footer, PublicNavbar } from '@components/ui/ui';

export default function PublicLayout({ children, hideFooter = false, hideNav = false }) {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {!hideNav && <PublicNavbar />}
      {children}
      {!hideFooter && <Footer />}
    </div>
  );
}
