import React from 'react';
import DashboardLayout from '@components/layout/DashboardLayout.jsx';
import { StatCard } from '@components/ui/ui';
import { mockData } from '@data/mockData';
import { verifierSidebar } from '@data/navigation.js';

export default function VerifierOverviewPage() {
  const pending = mockData.applicants.filter((item) => item.verificationStatus === 'Menunggu Verifikasi').length;
  const verified = mockData.applicants.filter((item) => item.verificationStatus === 'Terverifikasi').length;
  const revise = mockData.applicants.filter((item) => item.verificationStatus === 'Perlu Revisi').length;

  return (
    <DashboardLayout role="Verifier" title="Status Verifikasi Dokumen" subtitle="Verifier fokus pada pemeriksaan kelengkapan dan validitas dokumen pendaftaran." sidebarItems={verifierSidebar}>
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard label="Menunggu Verifikasi" value={pending} tone="yellow" />
        <StatCard label="Terverifikasi" value={verified} />
        <StatCard label="Perlu Revisi" value={revise} tone="dark" />
      </div>
    </DashboardLayout>
  );
}
