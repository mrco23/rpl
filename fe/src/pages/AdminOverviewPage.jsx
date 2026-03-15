import React from 'react';
import DashboardLayout from '@components/layout/DashboardLayout.jsx';
import { StatCard } from '@components/ui/ui';
import { mockData } from '@data/mockData';
import { adminSidebar } from '@data/navigation.js';

export default function AdminOverviewPage() {
  const verifiers = mockData.users.filter((user) => user.role === 'verifier' && user.active).length;
  const applicants = mockData.users.filter((user) => user.role === 'applicant' && user.active).length;
  const candidates = mockData.applicants.length;

  return (
    <DashboardLayout role="Admin" title="Kontrol Sistem PPDB" subtitle="Admin mengelola profil sekolah, konten publik, akun verifikator, validasi peserta, dan distribusi pengumuman massal." sidebarItems={adminSidebar}>
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <StatCard label="Verifier Aktif" value={verifiers} />
        <StatCard label="Akun Pendaftar" value={applicants} tone="yellow" />
        <StatCard label="Calon Siswa" value={candidates} tone="dark" />
      </div>
      <div className="grid xl:grid-cols-2 gap-8">
        <div className="bg-white rounded-[28px] p-8 shadow-[0_20px_45px_var(--color-blue-normal)_/12%] border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Ringkasan Tugas</h2>
          <div className="space-y-4 text-slate-600 leading-8">
            <div className="p-4 rounded-2xl bg-blue-light">Kelola profil sekolah dan data kepala sekolah agar halaman publik selalu konsisten.</div>
            <div className="p-4 rounded-2xl bg-yellow-light">Perbarui prestasi, berita, dan ekstrakurikuler secara berkala untuk menjaga kredibilitas informasi.</div>
            <div className="p-4 rounded-2xl bg-slate-100">Pantau status verifikasi dan umumkan hasil seleksi secara massal pada waktu yang tepat.</div>
          </div>
        </div>
        <div className="bg-white rounded-[28px] p-8 shadow-[0_20px_45px_var(--color-blue-normal)_/12%] border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Notifikasi Terbaru</h2>
          <div className="space-y-4">
            {mockData.notifications.slice().reverse().map((notification) => (
              <div key={notification.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50">
                <div className="font-semibold text-slate-900">{notification.title}</div>
                <div className="text-sm text-slate-500 mb-2">{notification.date}</div>
                <p className="text-slate-600 leading-7">{notification.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
