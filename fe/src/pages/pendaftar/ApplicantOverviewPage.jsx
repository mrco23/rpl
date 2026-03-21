import React from 'react';
import { Link } from 'react-router';
import DashboardLayout from '@components/layout/DashboardLayout.jsx';
import { StatCard } from '@components/ui/ui';
import { mockData } from '@data/mockData';
import { applicantSidebar } from '@data/navigation.js';

export default function ApplicantOverviewPage() {
  const mine = mockData.applicants.filter((item) => item.accountId === 'u-applicant');
  const completed = mine.filter((item) => item.formCompleted).length;
  const passed = mine.filter((item) => item.selectionStatus === 'Lolos').length;

  return (
    <DashboardLayout role="Applicant" title="Multi Candidate Registration" subtitle="Satu akun dapat mengelola beberapa calon siswa, termasuk formulir, dokumen, status verifikasi, dan pengumuman hasil seleksi." sidebarItems={applicantSidebar}>
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <StatCard label="Calon Siswa Terdaftar" value={mine.length} />
        <StatCard label="Form Lengkap" value={completed} tone="yellow" />
        <StatCard label="Lolos Seleksi" value={passed} tone="dark" />
      </div>
      <div className="bg-white rounded-[28px] p-8 shadow-[0_20px_45px_var(--color-blue-normal)_/12%] border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900 mb-5">Daftar Calon Siswa Anda</h2>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {mine.map((item) => (
            <div key={item.id} className="rounded-[24px] p-6 bg-slate-50 border border-slate-100">
              <div className="font-bold text-slate-900 text-xl mb-1">{item.fullName}</div>
              <div className="text-sm text-slate-500 mb-4">{item.schoolOrigin}</div>
              <div className="space-y-2 text-sm text-slate-600">
                <div><span className="font-semibold">Verifikasi:</span> {item.verificationStatus}</div>
                <div><span className="font-semibold">Seleksi:</span> {item.selectionStatus}</div>
                <div><span className="font-semibold">Upload:</span> {item.uploadCompleted ? 'Selesai' : 'Belum lengkap'}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8"><Link to="/applicant/registration" className="px-7 py-4 rounded-2xl bg-yellow-normal text-yellow-dark-darker font-bold">Tambah Calon Siswa</Link></div>
      </div>
    </DashboardLayout>
  );
}
